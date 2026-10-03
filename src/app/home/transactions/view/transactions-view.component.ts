import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ScreenSizeMonitorComponent } from '../../../core/screen/screen-size-monitor.component';
import { ScreenService } from '../../../core/screen/screen-size.service';
import { TransactionsFacade } from '../../../state-management/transactions/transactions.facade';

@Component({
  templateUrl: './transactions-view.component.html',
  styleUrls: ['./transactions-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TransactionsViewComponent extends ScreenSizeMonitorComponent {
  constructor(
    screenService: ScreenService,
    changeDetectorRef: ChangeDetectorRef,
    private transactionsFacade: TransactionsFacade
  ) {
    super(screenService, changeDetectorRef);
    console.log('TransactionsViewComponent constructed');
  }

  ngOnDestroy(): void {
    console.log('TransactionsViewComponent destroyed');
    super.ngOnDestroy();
  }

  startNewTransfer(): void {
    this.transactionsFacade.startNewTransfer();
  }
}
