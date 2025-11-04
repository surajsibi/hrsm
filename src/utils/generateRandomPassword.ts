export function generatePassword(length = 12): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';
  const all = upper + lower + numbers + symbols;

  let newPassword = '';

  newPassword += upper[Math.floor(Math.random() * upper.length)];
  newPassword += lower[Math.floor(Math.random() * lower.length)];
  newPassword += numbers[Math.floor(Math.random() * numbers.length)];
  newPassword += symbols[Math.floor(Math.random() * symbols.length)];

  // eslint-disable-next-line no-restricted-syntax
  for (let i = newPassword.length; i < length; i++) {
    newPassword += all[Math.floor(Math.random() * all.length)];
  }

  return (
    newPassword
      // eslint-disable-next-line unicorn/prefer-spread
      .split('')
      // eslint-disable-next-line unicorn/no-array-sort
      .sort(() => Math.random() - 0.5)
      .join('')
  );
}
