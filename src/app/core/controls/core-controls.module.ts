import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsyncExecutorComponent } from './async-executor.component';
import { CustomControlTemplateDirective } from './custom-control-template.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomControlTemplateDirective,
    AsyncExecutorComponent
  ],
  exports: [
    CustomControlTemplateDirective,
    AsyncExecutorComponent
  ]
})
export class CoreControlsModule { }
