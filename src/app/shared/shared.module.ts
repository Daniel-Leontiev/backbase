import { NgModule } from '@angular/core';
import { TextInputComponent } from './controls/text-input/text-input.component';
import { CommonModule } from '@angular/common';

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
