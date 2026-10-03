import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'async-executor',
  template: `
    <ng-container *ngFor="let job of jobs">
      <ng-container *ngIf="job | async"></ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncExecutorComponent {
  @Input() jobs: Array<Observable<any>> = [];
}
