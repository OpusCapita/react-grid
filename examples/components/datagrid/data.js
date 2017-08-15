const bankAccountData = [];

for (let i = 1; i < 100; i += 1) {
  bankAccountData.push(
    {
      accountId: i,
      name: `Account ${i}`,
      accountNumber: `1580001233234567${i}`,
      currency: 'EUR',
      companyName: 'Test Company',
      interestRate: 2.50,
      lastChecked: '2016-04-20T00:00:00Z',
    },
  );
}

const currencyOptions = [
  { value: 'EUR', label: 'EUR' },
  { value: 'SEK', label: 'SEK' },
  { value: 'USD', label: 'USD' },
  { value: 'NOK', label: 'NOK' },
  { value: 'RUB', label: 'RUB' },
];

export { bankAccountData, currencyOptions };
