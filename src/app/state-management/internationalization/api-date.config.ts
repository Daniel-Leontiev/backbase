import moment_ from 'moment';

const moment = moment_;

export type ApiDateFormatType =
  'default' |
  'alt';

const apiDateFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

export function formatApiDate(date: string | Date, format: string): string {
  const result = date && moment(date, apiDateFormat).format(format);

  return (result && result !== 'Invalid date') ? result : '';
}
