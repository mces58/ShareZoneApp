export const formatPhoneNumber = (number: string): string => {
  let cleaned = number.replace(/\D/g, '');

  if (cleaned.startsWith('0')) cleaned = cleaned.slice(1);

  if (cleaned.length <= 3) return cleaned;

  const match = /^(\d{0,3})(\d{0,3})(\d{0,4})$/.exec(cleaned);

  if (match) {
    const part1 = match[1] ? `(${match[1]}) ` : '';
    const part2 = match[2] ? `${match[2]} ` : '';
    const part3 = match[3] ? match[3] : '';
    return `${part1}${part2}${part3}`.trim();
  }
  return number;
};
