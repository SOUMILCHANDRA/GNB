import { create } from 'zustand';

export const useBankingStore = create((set, get) => ({
  user: null,
  balance: 0,
  transactions: [],
  systemStatus: 'STABLE', // 'STABLE', 'ACTIVE', 'CRITICAL'
  isReversing: false,
  
  // Actions
  setUser: (user) => set({ user }),
  setBalance: (balance) => {
    const status = balance < 1000 ? 'CRITICAL' : 'STABLE';
    set({ balance, systemStatus: status });
  },
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (tx) => set((state) => ({ 
    transactions: [tx, ...state.transactions],
    systemStatus: 'ACTIVE' 
  })),
  setSystemStatus: (status) => set({ systemStatus: status }),
  setIsReversing: (isReversing) => set({ isReversing }),
  
  // Reset for logout
  clearStore: () => set({ 
    user: null, 
    balance: 0, 
    transactions: [], 
    systemStatus: 'STABLE', 
    isReversing: false 
  })
}));
