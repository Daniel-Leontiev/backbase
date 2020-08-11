import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, EventEmitter, Input, OnChanges,
  Output, SimpleChanges
} from '@angular/core';
import { CustomControlDestroyNotifier } from '../../../../../core/controls/custom-control-destroy-notifier';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isAccountNameValid, isAmountValid } from '../../../../../shared/shared.config';
import { Transfer } from '../../../view/transactions-view.config';
import { InternationalizationService } from '../../../../../state-management/internationalization/internationalization.service';
import { CheckingAccount } from '../../../../../shared/shared.model';
import { LocalizationCurrencyConfig } from '../../../../../state-management/internationalization/internationalization.config';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cmp-new-transfer-form',
  templateUrl: './new-transfer-form.component.html',
  styleUrls: ['./new-transfer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTransferFormComponent extends CustomControlDestroyNotifier implements OnChanges {
  @Input() transferToConfirm: Transfer;
  @Input() fromAccount: CheckingAccount;
  @Input() showCloseButton = false;

  @Output() confirmTransfer = new EventEmitter<Transfer>();
  @Output() close = new EventEmitter<void>();

  form: FormGroup;

  readonly formCtrlFromAccount = 'fromAccount';
  readonly formCtrlToAccount = 'toAccount';
  readonly formCtrlAmount = 'amount';

  constructor(
    private i18nService: InternationalizationService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    super();

    this.createForm();

    this.sink = this.i18nService.localizationChanged$
      .pipe(
        tap(() => this.changeDetectorRef.markForCheck())
      )
      .subscribe();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { transferToConfirm } = simpleChanges || {};

    if (this.form && transferToConfirm) {
      const { toAccount, amount } = transferToConfirm?.currentValue || { toAccount: null, amount: null };

      this.setForm(toAccount, amount);
    }
  }

  get currencyConfig(): LocalizationCurrencyConfig {
    return this.i18nService.currencyFormatConfig;
  }

  get locale(): string {
    return this.i18nService.localeCode;
  }

  get currencySymbol(): string {
    return this.i18nService.currencySymbol;
  }

  isInputInvalid(ctrlName: string): boolean {
    const control = this.form.get(ctrlName);

    return !this.form.valid && !!control.value && control.invalid;
  }

  cancel(): void {
    this.close.emit();
  }

  private setForm(toAccount: string = null, amount: number = null): void {
    this.form.get(this.formCtrlToAccount).setValue(toAccount);
    this.form.get(this.formCtrlAmount).setValue(amount);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      fromAccount: [{ value: null, disabled: true }],
      toAccount: [null, [Validators.required, this.validateAccountName()]],
      amount: [null, [Validators.required, this.validateAmount()]]
    });
  }

  private validateAccountName(): ValidatorFn {
    return ({ value }: FormControl): ValidationErrors | null => {
      if (!!value && !isAccountNameValid(value)) {
        return { data: true };
      }

      return null;
    };
  }

  private validateAmount(): ValidatorFn {
    return ({ value }: FormControl): ValidationErrors | null => {
      if (!!value && !isAmountValid(value)) {
        return { data: true };
      }

      return null;
    };
  }
}
