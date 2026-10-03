import { Directive, OnDestroy } from '@angular/core';
import _ from 'lodash';
import { Subject, SubscriptionLike } from 'rxjs';

// TODO: Add Angular decorator.
@Directive()
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
