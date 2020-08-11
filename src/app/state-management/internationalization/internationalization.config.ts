import { registerLocaleData } from '@angular/common';
import localeUS from '@angular/common/locales/es-US';
import localeUSExtra from '@angular/common/locales/extra/es-US';
import localeGB from '@angular/common/locales/en-GB';
import localeGBExtra from '@angular/common/locales/extra/en-GB';
import localeEU from '@angular/common/locales/eu';
import localeEUExtra from '@angular/common/locales/extra/eu';

export interface LocalizationData {
  localeCode: string;
  localeData: any;
  localeDataExtra: any;
  currencyCode: string;
  config: LocalizationConfig;
}

export interface LocalizationCurrencyConfig {
  currencyCode: string;
  currencySymbol: string;
}

export interface LocalizationConfig {
  localeCode: string;

  currencyFormatConfig: LocalizationCurrencyConfig;
  dateFormatConfig: LocalizationDateFormatConfig;
}

export interface LocalizationDateFormatConfig {
  dateFormatDefault: string;
  dateFormatAlt: string;
}

export const defaultCurrencyCode = 'USD';

export const defaultLocalCode = 'us-US';

export const defaultCurrencySymbol = '$';

export const defaultLocalizationConfig = {
  localeCode: defaultLocalCode,
  currencyFormatConfig: {
    currencyCode: defaultCurrencyCode,
    currencySymbol: defaultCurrencySymbol
  },
  dateFormatConfig: {
    dateFormatDefault: 'MMM DD',
    dateFormatAlt: 'DD MMM YYYY'
  } as LocalizationDateFormatConfig
} as LocalizationConfig;

const euroLocalizationConfig = {
  localeCode: 'eu-EU',
  currencyFormatConfig: {
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  dateFormatConfig: {
    dateFormatDefault: 'DD MMM',
    dateFormatAlt: 'MMM DD YYYY'
  } as LocalizationDateFormatConfig
} as LocalizationConfig;

const gbpLocalizationConfig = {
  localeCode: 'en-GB',
  currencyFormatConfig: {
    currencyCode: 'GBP',
    currencySymbol: '£'
  },
  dateFormatConfig: {
    dateFormatDefault: 'DD MMM',
    dateFormatAlt: 'MMM DD YYYY'
  } as LocalizationDateFormatConfig
} as LocalizationConfig;

export const localeDataConfiguration = [
  {
    localeCode: defaultLocalCode,
    currencyCode: defaultCurrencyCode,
    localeData: localeUS,
    localeDataExtra: localeUSExtra,
    config: defaultLocalizationConfig
  },
  {
    localeCode: 'en-GB',
    currencyCode: 'GBP',
    localeData: localeGB,
    localeDataExtra: localeGBExtra,
    config: gbpLocalizationConfig
  },
  {
    localeCode: 'eu-EU',
    currencyCode: 'EUR',
    localeData: localeEU,
    localeDataExtra: localeEUExtra,
    config: euroLocalizationConfig
  }
] as LocalizationData[];

export function getConfiguredLocales(): LocalizationConfig[] {
  return localeDataConfiguration
    .map(({ config }: LocalizationData) => config);
}

export function getLocalizationConfiguration(locale: string): LocalizationConfig {
  return localeDataConfiguration
    .find(({ localeCode }) => localeCode === locale)?.config || defaultLocalizationConfig;
}

(function registerLocales() {
  localeDataConfiguration.forEach((item) => {
    registerLocaleData(item.localeData, item.localeCode, item.localeDataExtra);
  });
}());
