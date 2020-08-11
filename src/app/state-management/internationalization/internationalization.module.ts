import { NgModule } from '@angular/core';
import { ApiDatePipe } from './api-date.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ApiDatePipe
  ],
  providers: [
    ApiDatePipe
  ],
  exports: [
    ApiDatePipe
  ]
})
export class InternationalizationModule {
}
