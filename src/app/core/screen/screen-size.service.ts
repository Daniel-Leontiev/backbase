import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

interface ResizeEvent {
  target: {
    innerWidth: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private resizeSource = new Subject<number>();

  readonly resize$ = this.resizeSource.asObservable();

  private screenWidth: number;
  private lockBodyCount = 0;
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initObservable();
  }

  get width(): number {
    return this.screenWidth;
  }

  initObservable(): void {
    fromEvent(window, 'resize')
      .pipe(
        startWith({ target: { innerWidth: window.innerWidth } })
      )
      .subscribe(({ target: { innerWidth } }: ResizeEvent) => {
        this.screenWidth = innerWidth;
        this.resizeSource.next(innerWidth);
      });
  }

  lockBody(): void {
    this.lockBodyCount += 1;
    this.renderer.addClass(this.document.body, 'fixed');
  }

  unlockBody(): void {
    this.lockBodyCount = this.lockBodyCount > 1 ? this.lockBodyCount - 1 : 0;

    if (!this.lockBodyCount) {
      this.renderer.removeClass(this.document.body, 'fixed');
    }
  }
}
