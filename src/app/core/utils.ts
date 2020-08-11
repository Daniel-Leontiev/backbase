import _ from 'lodash';

export interface KeyValuePair {
  key: string;
  value: any;
}

export function convertEnumToArray(enumType: any): KeyValuePair[] {
  if (!_.isObject(enumType)) {
    return [];
  }

  return Object.keys(enumType)
    .filter(key => isNaN(Number(key)))
    .reduce((result: KeyValuePair[], key: string) => {
      return [...result, {
        key,
        value: enumType[key]
      } as KeyValuePair];
    }, []);
}
