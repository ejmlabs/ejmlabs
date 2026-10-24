export function orderTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
