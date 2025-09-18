export let prices = (product, quantity) => {
  /**
   * Pricing Logic
   */

  let price = 0;

  if (product === '1') {
    if (quantity >= 144 && quantity <= 240) price = 17; // 6-10 cases
    else if (quantity <= 456) price = 16; // 11-19 cases
    else if (quantity <= 576) price = 15; // 20-24 cases
    else if (quantity <= 696) price = 14.5; // 25-29 cases
    else if (quantity > 720) price = 13.5; // 30+ cases
  } else if (product === '2') {
    if (quantity >= 120 && quantity <= 180) price = 18;
    else if (quantity <= 240) price = 15;
    else if (quantity <= 360) price = 14.4;
    else if (quantity > 360) price = 13.8;
  } else if (product === '3') {
    if (quantity < 240) price = 18;
    else if (quantity <= 360) price = 15;
    else if (quantity <= 480) price = 14.4;
    else if (quantity <= 600) price = 13.8;
    else if (quantity <= 960) price = 13;
    else if (quantity <= 1440) price = 12.5;
    else price = 12;
  }
  return Number(price);
};
