import { Pipe, PipeTransform } from '@angular/core';
import { ApiDateFormatType } from './api-date.config';
import { InternationalizationService } from './internationalization.service';

@Pipe({
  name: 'apiDate'
})
export class ApiDatePipe implements PipeTransform {
  constructor(
    private i18nService: InternationalizationService
  ) {
  }

  transform(value: any, type: ApiDateFormatType = 'default'): any {
    return this.i18nService.formatDate(value, type);
  }
}
