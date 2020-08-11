import {
  ChangeDetectionStrategy,
  Component, EventEmitter, Input,
  Output
} from '@angular/core';
import { Transfer } from '../../../view/transactions-view.config';
import { InternationalizationService } from '../../../../../state-management/internationalization/internationalization.service';
import {
  LocalizationCurrencyConfig
} from '../../../../../state-management/internationalization/internationalization.config';
import { CheckingAccount, MerchantLogo } from '../../../../../shared/shared.model';
import { getKeyFromMerchantName } from '../../../../../shared/shared.config';

@Component({
  selector: 'cmp-new-transfer-confirmation-form',
  templateUrl: './new-transfer-confirmation-form.component.html',
  styleUrls: ['./new-transfer-confirmation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTransferConfirmationFormComponent {
  @Input() fromAccount: CheckingAccount;
  @Input() transferToConfirm: Transfer;
  @Input() isTransferAllowed = true;
  @Input() merchantLogos: MerchantLogo;

  @Output() createTransfer = new EventEmitter<Transfer>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private i18nService: InternationalizationService
  ) {
  }

  get currencyConfig(): LocalizationCurrencyConfig {
    return this.i18nService.currencyFormatConfig;
  }

  get locale(): string {
    return this.i18nService.localeCode;
  }

  getMerchantLogo(): Blob {
    const merchant = this.transferToConfirm?.toAccount;
    const key = getKeyFromMerchantName(merchant);

    return this.merchantLogos[key];
  }
}
