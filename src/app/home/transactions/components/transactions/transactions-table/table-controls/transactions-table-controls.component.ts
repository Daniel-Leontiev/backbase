import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { convertEnumToArray, KeyValuePair } from '../../../../../../core/utils';
import {
  transactionDefaultFilter,
  TransactionsSortKey, TransactionsSortKeyIcon
} from '../../../../../../state-management/transactions/transactions.config';
import { TransactionFilterEvent } from '../../../../../../state-management/transactions/transactions.model';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { CustomControlDestroyNotifier } from '../../../../../../core/controls/custom-control-destroy-notifier';

@Component({
  selector: 'cmp-transactions-table-controls',
  templateUrl: './transactions-table-controls.component.html',
  styleUrls: ['./transactions-table-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsTableControlsComponent extends CustomControlDestroyNotifier {
  @Output() filterTransactions = new EventEmitter<TransactionFilterEvent>();

  readonly buttons: KeyValuePair[] = convertEnumToArray(TransactionsSortKey);
  readonly icons = TransactionsSortKeyIcon;

  filter = transactionDefaultFilter;
  search$ = new Subject<string>();
  filterDelay = 400;

  constructor(
  ) {
    super();

    this.sink = this.search$
      .pipe(
        debounceTime(this.filterDelay),
        tap((value: string) => {
          this.filter.query = value;
          this.filterTransactions.emit(this.filter);
        })
      )
      .subscribe();
  }

  get filterBy(): string {
    return this.filter.query;
  }

  set filterBy(value: string) {
    this.search$.next(value);
  }

  sortBy(key: string): void {
    this.filter.sortOrder = this.filter.sortKey === key
      ? !this.filter.sortOrder : this.filter.sortOrder;

    this.filter.sortKey = key as TransactionsSortKey;
    this.filterTransactions.emit(this.filter);
  }
}
