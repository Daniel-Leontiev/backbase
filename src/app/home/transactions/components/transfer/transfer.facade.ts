import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TransactionsFacade } from '../../../../state-management/transactions/transactions.facade';
import { Transfer } from '../../view/transactions-view.config';
import { Subject } from 'rxjs';
import { InternationalizationService } from '../../../../state-management/internationalization/internationalization.service';

@Injectable({
  providedIn: 'root'
})
export class TransferFacade {
  readonly newTransferConfirm$ = new Subject<Transfer>();
  readonly newTransferStart$ = this.transactionsFacade.newTransferStart$;
  readonly newTransferComplete$ = this.transactionsFacade.newTransferComplete$
    .pipe(
      tap(() => this.reset())
    );

  readonly isTransferAllowed$ = this.transactionsFacade.newTransferAllowed$;
  readonly fromAccount$ = this.transactionsFacade.checkingAccount$;
  readonly merchantLogos$ = this.transactionsFacade.merchantLogos$;

  constructor(
    private i18nService: InternationalizationService,
    private transactionsFacade: TransactionsFacade
  ) {
  }

  confirmTransfer(transfer: Transfer): void {
    this.transactionsFacade.checkIfNewTransferCanBeCreatedWithAmount(transfer.amount);
    this.newTransferConfirm$.next(transfer);
  }

  createTransfer({ toAccount, amount }: Transfer): void {
    this.transactionsFacade.createTransfer(toAccount, amount);
  }

  resetTestData(): void {
    this.transactionsFacade.resetTestData();
  }

  reset(): void {
    this.newTransferConfirm$.next({ toAccount: null, amount: null });
  }
}
