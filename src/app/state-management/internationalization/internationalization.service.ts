import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  defaultLocalizationConfig, getLocalizationConfiguration, LocalizationCurrencyConfig,
  LocalizationDateFormatConfig
} from './internationalization.config';
import { ApiDateFormatType, formatApiDate } from './api-date.config';

@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {
  private localeCodeSource = new BehaviorSubject<string>(defaultLocalizationConfig.localeCode);
  private currencyFormatSource = new BehaviorSubject<LocalizationCurrencyConfig>(defaultLocalizationConfig.currencyFormatConfig);
  private dateFormatSource = new BehaviorSubject<LocalizationDateFormatConfig>(defaultLocalizationConfig.dateFormatConfig);

  readonly localizationChanged$ = this.localeCodeSource.asObservable();

  changeConfiguration(locale: string): void {
    const config = getLocalizationConfiguration(locale);
    const { localeCode, currencyFormatConfig, dateFormatConfig } = config;

    this.currencyFormatSource.next(currencyFormatConfig);
    this.dateFormatSource.next(dateFormatConfig);

    this.localeCodeSource.next(localeCode);
  }

  get localeCode(): string {
    return this.localeCodeSource.value;
  }

  // region Date Format

  get dateFormatConfig(): LocalizationDateFormatConfig {
    return this.dateFormatSource.value;
  }

  get dateFormatDefault(): string {
    return this.dateFormatConfig.dateFormatDefault;
  }

  get dateFormatAlt(): string {
    return this.dateFormatConfig.dateFormatAlt;
  }

  formatDate(date: any, type: ApiDateFormatType = 'default'): string {
    const format = this.getDateFormat(type);

    return formatApiDate(date, format);
  }

  getDateFormat(type: ApiDateFormatType = 'default'): string {
    return this.getDateFormatType(type);
  }

  getDateFormatType(type: ApiDateFormatType): string {
    switch (type) {
      case 'alt':
        return this.dateFormatAlt;
      default:
        return this.dateFormatDefault;
    }
  }

  // endregion

  // region Currency Format

  get currencyFormatConfig(): LocalizationCurrencyConfig {
    return this.currencyFormatSource.value;
  }

  get currencySymbol(): string {
    return this.currencyFormatConfig.currencySymbol;
  }

  get currencyCode(): string {
    return this.currencyFormatConfig.currencyCode;
  }

  // endregion
}
