import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap, take, finalize, delay } from 'rxjs/operators';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs';
import {
  normalizeDtoData,
  saveDataToLocalStorage,
  readDataFromLocalStorage,
  loadMerchantImagesFromDtoData
} from './local-storage.config';
import { defaultCheckingAccount, initialCheckingAccount } from '../../shared/shared.config';
import { Transaction } from '../transactions/transactions.model';
import { TransactionDTOLoad } from './local-storage.model';
import { CheckingAccount, MerchantLogo } from '../../shared/shared.model';

const initialDataSource = 'assets/data/transactions.json';
const localStorageTransactionsKey = 'sessionTransactions';
const localStorageCheckingAccountKey = 'sessionCheckingAccount';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private loadingSource = new BehaviorSubject<boolean>(false);
  private checkingAccountSource = new BehaviorSubject<CheckingAccount>(defaultCheckingAccount);
  private transactionsSource = new BehaviorSubject<Transaction[]>([]);
  private merchantLogosSource = new BehaviorSubject<MerchantLogo>({});

  readonly loading$ = this.loadingSource.asObservable();
  readonly checkingAccount$ = this.checkingAccountSource.asObservable();
  readonly transactions$ = this.transactionsSource.asObservable();
  readonly merchantLogos$ = this.merchantLogosSource.asObservable();

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadDataSource();
  }

  get checkingAccount(): CheckingAccount {
    return this.checkingAccountSource.value;
  }

  resetTestData(): void {
    localStorage.clear();
    this.loadDataSource();
  }

  updateCheckingAccountAmount(amount: number): void {
    const updatedAccount = { ...this.checkingAccount, amount };

    saveDataToLocalStorage(localStorageCheckingAccountKey, updatedAccount);
    this.checkingAccountSource.next(updatedAccount);
  }

  saveTransaction(newTransaction: Transaction): void {
    const transactions = [...this.transactionsSource.value, newTransaction];

    saveDataToLocalStorage(localStorageTransactionsKey, transactions);
    this.transactionsSource.next(transactions);
  }

  private loadDataSource(): void {
    this.loadingSource.next(true);

    this.getSavedTransactions()
      .pipe(
        delay(1000),
        switchMap((savedTransactions: Transaction[]) => {
          return this.loadTransactions(savedTransactions);
        }),
        switchMap((transactions: Transaction[]) => {
          return this.getSavedCheckingAccount()
            .pipe(
              map((checkingAccount: CheckingAccount) => {
                return [transactions, checkingAccount];
              })
            );
        }),
        tap(([transactions, checkingAccount]: [Transaction[], CheckingAccount]) => {
          this.checkingAccountSource.next(checkingAccount);
          this.transactionsSource.next(transactions);
        }),
        finalize(() => {
          this.loadingSource.next(false);
        }),
        take(1)
      )
      .subscribe();
  }

  private getSavedTransactions(): Observable<Transaction[]> {
    return new Observable<Transaction[]>((observer: Subscriber<Transaction[]>) => {
      const transactions = (readDataFromLocalStorage<Transaction[]>(localStorageTransactionsKey) || [])
        .map((transaction: Transaction) => {
          return { ...transaction, transactionDate: new Date(transaction.transactionDate) };
        });

      observer.next(transactions);
    });
  }

  private getSavedCheckingAccount(): Observable<CheckingAccount> {
    return new Observable<CheckingAccount>((observer: Subscriber<CheckingAccount>) => {
      const checkingAccount = readDataFromLocalStorage<CheckingAccount>(localStorageCheckingAccountKey) || initialCheckingAccount;

      observer.next(checkingAccount);
    });
  }

  private loadTransactions(savedTransactions: Transaction[]): Observable<Transaction[]> {
    if (savedTransactions.length) {
      return this.readDataFromStaticResource()
        .pipe(
          map((dataLoad: TransactionDTOLoad) => {
            const logos = loadMerchantImagesFromDtoData(dataLoad);

            this.merchantLogosSource.next(logos);

            return savedTransactions;
          })
        );
    }

    return this.initializeForTheFirstTime();
  }

  // First time initialization

  private initializeForTheFirstTime(): Observable<Transaction[]> {
    return this.readDataFromStaticResource()
      .pipe(
        map((dataLoad: TransactionDTOLoad) => {
          const { logos, transactions } = normalizeDtoData(dataLoad);

          saveDataToLocalStorage(localStorageTransactionsKey, transactions);
          this.merchantLogosSource.next(logos);

          return transactions;
        })
      );
  }

  protected readDataFromStaticResource(): Observable<TransactionDTOLoad> {
    return this.httpClient.get<TransactionDTOLoad>(initialDataSource);
  }

  // endregion
}
