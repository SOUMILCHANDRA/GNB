export const MOCK_USER = {
  name: "Barney Stinson",
  id: "8008",
  balance: 523450.00,
  tier: "Elite Wingman",
};

export const MOCK_TRANSACTIONS = [
  { id: 1, type: "Deposit", amount: 15000.00, timestamp: "2024-04-08 14:30", note: "Bonus for being awesome" },
  { id: 2, type: "Transfer", amount: -2400.00, timestamp: "2024-04-08 11:15", note: "Sent to Ted (Suits Rental)" },
  { id: 3, type: "Withdraw", amount: -500.00, timestamp: "2024-04-07 23:45", note: "MacLaren's Tab" },
  { id: 4, type: "Transfer", amount: 1000.00, timestamp: "2024-04-07 09:20", note: "Received from Marshall" },
  { id: 5, type: "Purchase", amount: -12000.00, timestamp: "2024-04-06 18:00", note: "Limited Edition Suit" },
];
