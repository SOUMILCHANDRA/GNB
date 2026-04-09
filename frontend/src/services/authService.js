import { supabase } from '../lib/supabaseClient';

export const authService = {
  async signUp(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) throw error;

    // Create user profile in 'users' table if signup successful
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          name: name,
          email: email,
          balance: 1000.00 // Welcome bonus for being a bro
        });
      
      if (profileError) throw profileError;
    }

    return data.user;
  },

  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data.user;
  },

  async loginAnonymously() {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;

    // Check if profile exists, if not create default
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (!profile) {
      await supabase.from('users').insert([{
        id: data.user.id,
        name: 'ANON_AGENT',
        email: 'anon@gnb.com',
        balance: 1000.00
      }]);
    }

    return data.user;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }
};
