import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction, TransactionFilterEvent } from '../../../../../state-management/transactions/transactions.model';
import { InternationalizationService } from '../../../../../state-management/internationalization/internationalization.service';
import { LocalizationCurrencyConfig } from '../../../../../state-management/internationalization/internationalization.config';
import { MerchantLogo } from '../../../../../shared/shared.model';
import { getKeyFromMerchantName } from '../../../../../shared/shared.config';

@Component({
  selector: 'cmp-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsTableComponent {
  @Input() transactions: Transaction[] = [];
  @Input() merchantLogos: MerchantLogo;
  @Input() loading = false;

  @Output() filterTransactions = new EventEmitter<TransactionFilterEvent>();

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

  getMerchantLogo({ merchant }: Transaction): Blob {
    const key = getKeyFromMerchantName(merchant);

    return this.merchantLogos[key];
  }
}
