import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransactionsFacade } from '../../../../state-management/transactions/transactions.facade';
import { TransactionFilterEvent } from '../../../../state-management/transactions/transactions.model';
import { InternationalizationService } from '../../../../state-management/internationalization/internationalization.service';
import {
  getConfiguredLocales,
  LocalizationConfig
} from '../../../../state-management/internationalization/internationalization.config';

@Component({
  selector: 'cmp-transactions-table-view',
  templateUrl: './transactions-table-view.component.html',
  styleUrls: ['./transactions-table-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsTableViewComponent {
  readonly loading$ = this.transactionsFacade.loading$;
  readonly transactions$ = this.transactionsFacade.transactions$;
  readonly merchantLogos$ = this.transactionsFacade.merchantLogos$;

  constructor(
    private i18nService: InternationalizationService,
    private transactionsFacade: TransactionsFacade
  ) {
  }

  get localeConfigurations(): LocalizationConfig[] {
    return getConfiguredLocales();
  }

  filterTransactions(filter: TransactionFilterEvent): void {
    this.transactionsFacade.filterTransactions(filter);
  }

  changeLocalization(locale: string): void {
    this.i18nService.changeConfiguration(locale);
  }
}
