import { Injectable } from '@angular/core';
import { Transaction, TransactionFilterEvent } from './transactions.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { map, tap } from 'rxjs/operators';
import { CheckingAccount } from '../../shared/shared.model';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { isAmountInOverdraft, willAmountBeAnOverdraft } from '../../shared/shared.config';
import { filterTransactionsByFilterEvent, transactionDefaultFilter } from './transactions.config';
import { InternationalizationService } from '../internationalization/internationalization.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsFacade {
  private filterTransactionsSource = new BehaviorSubject<TransactionFilterEvent>(transactionDefaultFilter);

  readonly newTransferStart$ = new Subject<void>();
  readonly newTransferComplete$ = new Subject<void>();
  private newTransferAllowedSource = new BehaviorSubject<boolean>(false);
  readonly newTransferAllowed$ = this.newTransferAllowedSource.asObservable();

  readonly loading$ = this.localStorageService.loading$
    .pipe(
      tap((loading) => {
        if (!loading) {
          const overdraft = isAmountInOverdraft(this.checkingAccount.amount);

          this.newTransferAllowedSource.next(!overdraft);
        }
      })
    );
  readonly checkingAccount$ = this.localStorageService.checkingAccount$;
  readonly transactions$ = combineLatest([this.localStorageService.transactions$, this.filterTransactionsSource, this.i18nService.localizationChanged$])
    .pipe(
      map(([transactions, filterEvent, locale]: [Transaction[], TransactionFilterEvent, string]) => {
        const dateFormat = this.i18nService.getDateFormat();

        return filterTransactionsByFilterEvent(transactions, { ...filterEvent, dateFormat });
      })
    );
  readonly merchantLogos$ = this.localStorageService.merchantLogos$;

  constructor(
    private localStorageService: LocalStorageService,
    private i18nService: InternationalizationService
  ) {
  }

  get checkingAccount(): CheckingAccount {
    return this.localStorageService.checkingAccount;
  }

  filterTransactions(filter: TransactionFilterEvent): void {
    this.filterTransactionsSource.next(filter);
  }

  startNewTransfer(): void {
    this.newTransferStart$.next();
  }

  checkIfNewTransferCanBeCreatedWithAmount(amount: number): void {
    const newAmount = this.checkingAccount.amount - amount;

    this.checkIfTransferAllowed(newAmount);
  }

  createTransfer(merchant: string, amount: number): void {
    const newAmount = this.checkingAccount.amount - amount;

    if (this.checkIfTransferAllowed(newAmount)) {
      const transaction = {
        amount: amount.toString(10),
        categoryCode: '',
        merchant,
        transactionType: 'Online Transfer',
        transactionDate: new Date()
      } as Transaction;

      this.localStorageService.saveTransaction(transaction);

      this.localStorageService.updateCheckingAccountAmount(newAmount);
      this.newTransferComplete$.next();
    }
  }

  private checkIfTransferAllowed(newAmount: number): boolean {
    const overdraft = !willAmountBeAnOverdraft(newAmount);

    this.newTransferAllowedSource.next(overdraft);

    return overdraft;
  }
}
