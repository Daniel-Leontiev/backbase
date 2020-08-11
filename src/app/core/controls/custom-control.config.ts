import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ExistingProvider, forwardRef } from '@angular/core';

export function buildControlValueAccessorProvider<T>(type: T): ExistingProvider {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
