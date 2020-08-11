import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TransactionsFacade } from '../../../state-management/transactions/transactions.facade';
import { ScreenSizeMonitorComponent } from '../../../core/screen/screen-size-monitor.component';
import { ScreenService } from '../../../core/screen/screen-size.service';

@Component({
  templateUrl: './transactions-view.component.html',
  styleUrls: ['./transactions-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsViewComponent extends ScreenSizeMonitorComponent {
  constructor(
    screenService: ScreenService,
    changeDetectorRef: ChangeDetectorRef,
    private transactionsFacade: TransactionsFacade
  ) {
    super(screenService, changeDetectorRef);
  }

  startNewTransfer(): void {
    this.transactionsFacade.startNewTransfer();
  }
}
