import { getKeyFromMerchantName } from '../../shared/shared.config';
import { NormalizedDataStore, TransactionDTO, TransactionDTOLoad } from './local-storage.model';
import { Transaction } from '../transactions/transactions.model';
import { MerchantLogo } from '../../shared/shared.model';

export function normalizeDtoData({ data: transactionsDto }: TransactionDTOLoad): NormalizedDataStore {
  return transactionsDto.reduce((collector: NormalizedDataStore, transactionDto: TransactionDTO) => {
    const { merchantLogo } = transactionDto;
    const transaction = normalizeDtoTransaction(transactionDto);
    const key = getKeyFromMerchantName(transaction.merchant);

    collector.logos[key] = merchantLogo;
    collector.transactions = [...collector.transactions, transaction];

    return collector;
  }, { transactions: [], logos: {} } as NormalizedDataStore);
}

export function loadMerchantImagesFromDtoData({ data: transactionsDto }: TransactionDTOLoad): MerchantLogo {
  return transactionsDto.reduce((collector: MerchantLogo, { merchant, merchantLogo }: TransactionDTO) => {
    const key = getKeyFromMerchantName(merchant);

    collector[key] = merchantLogo;

    return collector;
  }, {} as MerchantLogo);
}

function normalizeDtoTransaction({ amount, categoryCode, merchant, transactionDate: dateValue, transactionType }: TransactionDTO): Transaction {
  const transactionDate = Number.isNaN(dateValue) ? undefined : new Date(dateValue);

  return { amount, categoryCode, merchant, transactionDate, transactionType } as Transaction;
}

export function readDataFromLocalStorage<T>(key: string): T {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return undefined;
  }
}

export function saveDataToLocalStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}
