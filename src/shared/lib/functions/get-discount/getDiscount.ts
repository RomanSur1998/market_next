export function getDiscount(price: number, discount: number) {
  let onePercent = +price / (100 - +discount);
  return Math.floor(onePercent * 100);
}
