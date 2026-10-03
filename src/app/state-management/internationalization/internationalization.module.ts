import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiDatePipe } from './api-date.pipe';

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
