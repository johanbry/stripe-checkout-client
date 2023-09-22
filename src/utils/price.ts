export const formatPrice = (price: number | undefined): string => {
  const priceSek = (price || 0) / 100;
  return `${priceSek.toFixed(2).toString().replace(".", ",")} kr`;
};
