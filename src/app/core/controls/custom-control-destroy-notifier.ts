import { OnDestroy } from '@angular/core';
import { Subject, SubscriptionLike } from 'rxjs';
import _ from 'lodash';

export class CustomControlDestroyNotifier implements OnDestroy {
  protected destroy$ = new Subject<void>();

  private subs: SubscriptionLike[] = [];

  set sink(subscription: SubscriptionLike) {
    this.subs.push(subscription);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
    this.destroy$.next();
    this.destroy$.complete();
  }

  addSubscriptions(...subscriptions: SubscriptionLike[]): void {
    this.subs = this.subs.concat(subscriptions);
  }

  private unsubscribeAll(): void {
    this.subs.forEach(sub => sub &&
      _.isFunction(sub.unsubscribe) &&
      !sub.closed &&
      sub.unsubscribe()
    );
  }
}
