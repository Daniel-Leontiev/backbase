import { CheckingAccount } from './shared.model';

export const initialCheckingAccount = {
  name: 'Free Checking(4692)',
  amount: 5824.76
} as CheckingAccount;

export const defaultCheckingAccount = {
  name: 'Free Checking(4692)',
  amount: 0
} as CheckingAccount;

export const minimumAccountBalance = -500;

export function isAmountValid(amount: string): boolean {
  if (!amount) {
    return false;
  }

  if (!(/^([0-9]+)(\.(?=\d)[0-9]{1,2})?$/gm).test(amount)) {
    return false;
  }

  return Number.parseFloat(amount) > 0;
}

export function isAmountInOverdraft(amount: number): boolean {
  return amount <= minimumAccountBalance;
}

export function willAmountBeAnOverdraft(amount: number): boolean {
  return amount < minimumAccountBalance;
}

export function isAccountNameValid(name: string): boolean {
  if (!name) {
    return false;
  }

  return (/^([a-zA-Z0-9 &-])*$/gm).test(name);
}

export function normalizeMerchantName(name: string): string {
  if (!name) {
    return '';
  }

  return name
    .replace(/[^a-z0-9 &-]/gmi, '')
    .replace(/\s+/g, ' ');
}

export function getKeyFromMerchantName(name: string): string {
  return normalizeMerchantName(name)
    .toLowerCase()
    .replace(/\s+/g, '');
}

export function getMerchantAvatar(name: string): string {
  const normalizedMerchantName = normalizeMerchantName(name);

  return tokenizeMerchantName(normalizedMerchantName)
    .filter(Boolean)
    .reduce((collector: string[], item: string) => {
      const firstLetter = item.toUpperCase().charAt(0);

      return [...collector, firstLetter];
    }, [])
    .join('');
}

function tokenizeMerchantName(name: string): string[] {
  return name.split(/\s/gm, 2);
}
