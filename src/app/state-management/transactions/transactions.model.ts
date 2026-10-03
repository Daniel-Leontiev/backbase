import { TransactionsSortKey } from './transactions.config';

export interface TransactionBase {
  amount: string;
  categoryCode: string;
  merchant: string;
  transactionType: string;
}

export interface Transaction extends TransactionBase {
  transactionDate: Date;
}

export interface TransactionFilterEvent {
  query: string;
  sortKey: TransactionsSortKey;
  sortOrder: boolean;
  dateFormat?: string;
}
