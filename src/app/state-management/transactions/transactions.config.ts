import { Transaction, TransactionFilterEvent } from './transactions.model';
import { formatApiDate } from '../internationalization/api-date.config';

export enum TransactionsSortKey {
  DATE = 'DATE',
  BENEFICIARY = 'BENEFICIARY',
  AMOUNT = 'AMOUNT'
}

export enum TransactionsSortKeyIcon {
  DATE = '📅',
  BENEFICIARY = '👨',
  AMOUNT = '💰️'
}

export const transactionDefaultFilter = {
  query: '',
  sortKey: TransactionsSortKey.BENEFICIARY,
  sortOrder: true
} as TransactionFilterEvent;

export function filterTransactionsByFilterEvent(transactions: Transaction[], filterEvent: TransactionFilterEvent): Transaction[] {
  const { query, sortKey: key, sortOrder: order, dateFormat } = filterEvent;
  const { property, name } = getSortProperty(key);

  return filterTransactionsByQuery(query.toLowerCase(), dateFormat, transactions)
    .sort((a: Transaction, b: Transaction) => {
      if (name) {
        return (a[property] < b[property])
          ? (order ? -1 : 1)
          : (a[property] > b[property])
            ? (order ? 1 : -1) : 0;
      }

      return order
        ? a[property] - b[property]
        : b[property] - a[property];
    });
}

function filterTransactionsByQuery(query: string, dateFormat: string, transactions: Transaction[]): Transaction[] {
  if (!query) {
    return transactions
      .map(transaction => ({ ...transaction }));
  }

  const number = Number.parseFloat(query);

  if (!Number.isNaN(number)) {
    return transactions
      .filter(({ merchant, amount, transactionDate }: Transaction) => {
        const date = formatApiDate(transactionDate, dateFormat).toLowerCase();

        return merchant.toLowerCase().includes(query)
          || amount.startsWith(query)
          || date.includes(query);
      })
      .map(transaction => ({ ...transaction }));
  }

  return transactions
    .filter(({ merchant, transactionDate }: Transaction) => {
      const date = formatApiDate(transactionDate, dateFormat).toLowerCase();

      return merchant.toLowerCase().includes(query)
        || date.includes(query);
    })
    .map(transaction => ({ ...transaction }));
}

function getSortProperty(sortKey: TransactionsSortKey): { property: string; name: boolean } {
  return sortKey === TransactionsSortKey.AMOUNT
    ? { property: 'amount', name: false }
    : sortKey === TransactionsSortKey.DATE
      ? { property: 'transactionDate', name: false }
      : { property: 'merchant', name: true };
}
