import { PhoneNumberFormat, PhoneNumberType, PhoneNumberUtil } from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();

const ACCEPTABLE_TYPES = [
  PhoneNumberType.MOBILE,
  PhoneNumberType.FIXED_LINE_OR_MOBILE,
  PhoneNumberType.FIXED_LINE,
];

export function normalizePhoneNumber(number: string): string {
  // Try to normalize the phone number as a Japanese number
  const parsed = phoneUtil.parseAndKeepRawInput(number, 'VN');
  if (!ACCEPTABLE_TYPES.includes(phoneUtil.getNumberType(parsed))) {
    return;
  }

  return phoneUtil.format(parsed, PhoneNumberFormat.E164);
}

export function normalizePhoneNumberNoThrow(number: string): string | null {
  try {
    return normalizePhoneNumber(number);
  } catch(e) {
    console.warn(e.message);
    return null;
  }
}