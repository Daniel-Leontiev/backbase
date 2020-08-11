import { Directive, Input, TemplateRef } from '@angular/core';
import { CustomControlTemplateReference } from './custom-control-template.config';

@Directive({
  selector: '[ctrlTemplate]'
})
export class CustomControlTemplateDirective implements CustomControlTemplateReference {
  @Input('ctrlTemplate') name: string;
  @Input() show = true;

  constructor(
    public template: TemplateRef<any>
  ) {
  }
}
