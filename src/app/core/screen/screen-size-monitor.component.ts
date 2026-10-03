import { ChangeDetectorRef, HostBinding, OnInit } from '@angular/core';
import { startWith, tap } from 'rxjs/operators';
import { getScreenSizeViewMode, ScreenSizeMonitorViewMode } from './screen-size-monitor.config';
import { CustomControlDestroyNotifier } from '../controls/custom-control-destroy-notifier';
import { ScreenService } from './screen-size.service';
import { BehaviorSubject } from 'rxjs';

export abstract class ScreenSizeMonitorComponent extends CustomControlDestroyNotifier implements OnInit {
  private viewModeSource = new BehaviorSubject<ScreenSizeMonitorViewMode>(getScreenSizeViewMode(window.innerWidth));

  readonly viewMode$ = this.viewModeSource.asObservable();

  protected constructor(
    protected screenService: ScreenService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.sink = this.screenService.resize$.pipe(
      startWith(window.innerWidth),
      tap(screenSize => this.updateViewMode(screenSize))
    ).subscribe();
  }

  get viewMode(): ScreenSizeMonitorViewMode {
    return this.viewModeSource.value;
  }

  @HostBinding('class.view-mode-desktop')
  get isDesktop(): boolean {
    return this.viewMode.isDesktop;
  }

  @HostBinding('class.view-mode-tablet')
  get isTablet(): boolean {
    return this.viewMode.isTablet;
  }

  @HostBinding('class.view-mode-mobile')
  get isMobile(): boolean {
    return this.viewMode.isMobile;
  }

  private updateViewMode(screenSize: number): void {
    const viewMode = getScreenSizeViewMode(screenSize);

    this.changeDetectorRef.detectChanges();
    this.viewModeSource.next(viewMode);
  }
}
