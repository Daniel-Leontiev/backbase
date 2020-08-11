import { Transaction, TransactionBase } from '../transactions/transactions.model';
import { MerchantLogo } from '../../shared/shared.model';

export interface TransactionDTO extends TransactionBase {
  transactionDate: number;
  merchantLogo: Blob;
}

export interface NormalizedDataStore {
  transactions: Transaction[];
  logos: MerchantLogo;
}

export interface TransactionDTOLoad {
  data: TransactionDTO[];
}
