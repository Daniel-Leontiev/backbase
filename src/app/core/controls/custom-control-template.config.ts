import { TemplateRef } from '@angular/core';

export interface CustomControlTemplateReference {
  name: string;
  show: boolean;
  template: TemplateRef<any>;
}

export const customControlTemplateNullReference = {
  name: '',
  show: false,
  template: undefined
} as CustomControlTemplateReference;
