import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { bankingService } from '../services/bankingService';
import { useBankingStore } from '../store/useBankingStore';

export const useRealtime = (userId) => {
  const { setBalance, addTransaction, setTransactions, setSystemStatus } = useBankingStore();

  useEffect(() => {
    if (!userId) return;

    // 1. Initial Fetch
    const initData = async () => {
      try {
        const profile = await bankingService.getUserProfile(userId);
        setBalance(profile.balance);

        const { data: txData } = await supabase
          .from('transactions')
          .select('*')
          .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
          .order('created_at', { ascending: false });
        
        if (txData) setTransactions(txData);
      } catch (err) {
        console.error("Failed to sync initial system data:", err);
      }
    };
    initData();

    // 2. Real-time Balance Subscription
    const balanceSub = supabase
      .channel(`user_balance_${userId}`)
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${userId}` }, 
        (payload) => {
          setBalance(payload.new.balance);
          // Briefly set status to ACTIVE to trigger visual pulse
          setSystemStatus('ACTIVE');
          setTimeout(() => {
             const currentBalance = payload.new.balance;
             setSystemStatus(currentBalance < 1000 ? 'CRITICAL' : 'STABLE');
          }, 2000);
        }
      )
      .subscribe();

    // 3. Real-time Transaction Subscription
    const txSub = supabase
      .channel(`user_tx_${userId}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'transactions' }, 
        (payload) => {
          if (payload.new.sender_id === userId || payload.new.receiver_id === userId) {
            addTransaction(payload.new);
            setSystemStatus('ACTIVE');
            setTimeout(() => {
               // Re-check balance from store for correct status
               const currentBalance = useBankingStore.getState().balance;
               setSystemStatus(currentBalance < 1000 ? 'CRITICAL' : 'STABLE');
            }, 2000);
          }
        }
      )
      .subscribe();

    return () => {
      balanceSub.unsubscribe();
      txSub.unsubscribe();
    };
  }, [userId, setBalance, addTransaction, setTransactions, setSystemStatus]);
};
