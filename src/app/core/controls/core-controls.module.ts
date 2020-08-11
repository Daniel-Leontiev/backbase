import { NgModule } from '@angular/core';
import { CustomControlTemplateDirective } from './custom-control-template.directive';
import { CommonModule } from '@angular/common';
import { AsyncExecutorComponent } from './async-executor.component';

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
