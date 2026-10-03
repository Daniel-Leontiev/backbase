import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ScreenSizeMonitorComponent } from '../../../../core/screen/screen-size-monitor.component';
import { filter, tap } from 'rxjs/operators';
import { ScreenSizeMonitorViewMode } from '../../../../core/screen/screen-size-monitor.config';
import { ScreenService } from '../../../../core/screen/screen-size.service';
import { TransferFacade } from './transfer.facade';
import { Transfer } from '../../view/transactions-view.config';

@Component({
  selector: 'cmp-transfer-view',
  templateUrl: './transfer-view.component.html',
  styleUrls: ['./transfer-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferViewComponent extends ScreenSizeMonitorComponent {
  readonly newTransferStart$ = this.transferFacade.newTransferStart$
    .pipe(
      tap(() => this.showForm(this.transferForm))
    );
  readonly newTransferConfirm$ = this.transferFacade.newTransferConfirm$
    .pipe(
      tap(({ toAccount, amount }: Transfer) => {
        if (toAccount && amount) {
          this.showForm(this.transferConfirmForm);
        }
      })
    );
  readonly newTransferComplete$ = this.transferFacade.newTransferComplete$
    .pipe(
      tap(() => {
        this.closeTransferConfirmModal();
        this.closeCreateTransferModal();
      })
    );

  readonly isTransferAllowed$ = this.transferFacade.isTransferAllowed$;
  readonly fromAccount$ = this.transferFacade.fromAccount$;
  readonly viewModeChanges$ = this.viewMode$
    .pipe(
      filter((viewMode: ScreenSizeMonitorViewMode) => viewMode.isDesktop),
      tap(() => {
        this.transferFacade.reset();
        this.closeCreateTransferModal();
        this.closeTransferConfirmModal();
      })
    );
  readonly merchantLogos$ = this.transferFacade.merchantLogos$;

  @ViewChild('transferFormMobile') transferForm: ElementRef<HTMLDivElement>;
  @ViewChild('transferConfirmForm') transferConfirmForm: ElementRef<HTMLDivElement>;

  constructor(
    screenService: ScreenService,
    changeDetectorRef: ChangeDetectorRef,
    private transferFacade: TransferFacade
  ) {
    super(screenService, changeDetectorRef);
  }

  confirmTransfer(transfer: Transfer): void {
    this.transferFacade.confirmTransfer(transfer);
  }

  createTransfer(transfer: Transfer): void {
    this.transferFacade.createTransfer(transfer);
  }

  resetTestData(): void {
    this.transferFacade.resetTestData();
  }

  // region Dialog control

  cancelTransfer(): void {
    this.transferFacade.reset();
    this.showForm(this.transferForm, false);
  }

  closeCreateTransferModal(): void {
    this.showForm(this.transferForm, false);
  }

  closeTransferConfirmModal(): void {
    this.showForm(this.transferConfirmForm, false);
  }

  private showForm(formRef: ElementRef<HTMLDivElement>, show = true): void {
    const style = formRef?.nativeElement?.style;

    if (style) {
      style.display = show ? 'flex' : 'none';
    }
  }

  // endregion
}
