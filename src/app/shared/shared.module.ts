import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextInputComponent } from './controls/text-input/text-input.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TextInputComponent
  ],
  exports: [
    TextInputComponent
  ]
})
export class SharedModule { }
