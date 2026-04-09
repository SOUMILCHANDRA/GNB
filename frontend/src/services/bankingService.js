import { supabase } from '../lib/supabaseClient';

export const bankingService = {
  // 1. Fetch User Data
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // 2. Deposit
  async deposit(userId, amount) {
    // We use a transaction-like approach or just direct update for simplicity in this demo
    // Ideally use a database function (RPC) for atomicity
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('balance')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;

    const newBalance = parseFloat(user.balance) + parseFloat(amount);

    const { error: updateError } = await supabase
      .from('users')
      .update({ balance: newBalance })
      .eq('id', userId);

    if (updateError) throw updateError;

    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        type: 'deposit',
        amount: amount,
        receiver_id: userId,
        status: 'success',
        note: 'Personal deposit into the vault.'
      });

    if (txError) throw txError;
    return newBalance;
  },

  // 3. Withdraw
  async withdraw(userId, amount) {
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('balance')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;
    if (parseFloat(user.balance) < amount) throw new Error("Insufficient capital, bro.");

    const newBalance = parseFloat(user.balance) - parseFloat(amount);

    const { error: updateError } = await supabase
      .from('users')
      .update({ balance: newBalance })
      .eq('id', userId);

    if (updateError) throw updateError;

    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        type: 'withdraw',
        amount: amount,
        sender_id: userId,
        status: 'success',
        note: 'Withdrawal from the vault.'
      });

    if (txError) throw txError;
    return newBalance;
  },

  // 4. Transfer
  async transfer(senderId, recipientId, amount) {
    // 1. Check sender balance
    const { data: sender, error: senderError } = await supabase
      .from('users')
      .select('balance')
      .eq('id', senderId)
      .single();

    if (senderError) throw senderError;
    if (parseFloat(sender.balance) < amount) throw new Error("Insufficient funds to make a bro's life awesome.");

    // 2. Adjust sender
    const { error: deductError } = await supabase
      .from('users')
      .update({ balance: parseFloat(sender.balance) - amount })
      .eq('id', senderId);

    if (deductError) throw deductError;

    // 3. Adjust recipient
    const { data: recipient, error: recipientFetchError } = await supabase
      .from('users')
      .select('balance')
      .eq('id', recipientId)
      .single();

    if (recipientFetchError) throw new Error("Recipient account not found. Are they even a bro?");

    const { error: addError } = await supabase
      .from('users')
      .update({ balance: parseFloat(recipient.balance) + amount })
      .eq('id', recipientId);

    if (addError) throw addError;

    // 4. Log transaction
    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        type: 'transfer',
        amount: amount,
        sender_id: senderId,
        receiver_id: recipientId,
        status: 'success',
        note: `Transfer to bro #${recipientId.slice(0,4)}`
      });

    if (txError) throw txError;
    return true;
  },

  // 5. Reverse Last Transaction (Signature Feature)
  async reverseLastTransaction(userId) {
    // Fetch last transaction for this user
    const { data: lastTx, error: txError } = await supabase
      .from('transactions')
      .select('*')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .eq('status', 'success')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (txError) throw new Error("No legendary moves found to reverse.");

    // Logic for reversal depends on type
    if (lastTx.type === 'transfer') {
      if (lastTx.sender_id === userId) {
        // We were the sender, take money back from recipient
        await this.transfer(lastTx.receiver_id, lastTx.sender_id, parseFloat(lastTx.amount));
      } else {
        // We were the recipient, give money back to sender
        await this.transfer(lastTx.sender_id, lastTx.receiver_id, parseFloat(lastTx.amount));
      }
    } else if (lastTx.type === 'deposit') {
      await this.withdraw(userId, parseFloat(lastTx.amount));
    } else if (lastTx.type === 'withdraw') {
      await this.deposit(userId, parseFloat(lastTx.amount));
    }

    // Mark as reversed
    await supabase
      .from('transactions')
      .update({ status: 'reversed' })
      .eq('id', lastTx.id);

    return true;
  },

  // 6. Real-time Subscriptions
  subscribeToBalance(userId, callback) {
    return supabase
      .channel('public:users')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${userId}` }, 
        payload => callback(payload.new.balance))
      .subscribe();
  },

  subscribeToTransactions(userId, callback) {
    return supabase
      .channel('public:transactions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, 
        payload => {
          if (payload.new.sender_id === userId || payload.new.receiver_id === userId) {
            callback(payload.new);
          }
        })
      .subscribe();
  }
};
