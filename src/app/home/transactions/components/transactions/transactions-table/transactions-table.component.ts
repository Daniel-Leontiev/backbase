import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { getKeyFromMerchantName } from '../../../../../shared/shared.config';
import { MerchantLogo } from '../../../../../shared/shared.model';
import { LocalizationCurrencyConfig } from '../../../../../state-management/internationalization/internationalization.config';
import { InternationalizationService } from '../../../../../state-management/internationalization/internationalization.service';
import { Transaction, TransactionFilterEvent } from '../../../../../state-management/transactions/transactions.model';

@Component({
  selector: 'cmp-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
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
