export let prices = (product, quantity) => {
  /**
   * Pricing Logic
   */

  let price = 0;

  if (product === '1') {
    // 1 mean 500ml bottle
    if (144 <= quantity && quantity <= 240) price = 17; // 6-10 cases
    else if (240 < quantity && quantity <= 456) price = 16; // 11-19 cases
    else if (456 < quantity && quantity <= 576) price = 15; // 20-24 cases
    else if (576 < quantity && quantity <= 696) price = 14.5; // 25-29 cases
    else if (696 < quantity) price = 13.5; // 30+ cases
    else price = 'NaN';
  } else if (product === '2') {
    // 2 mean 1 litre bottle
    if (120 <= quantity && quantity <= 192) price = 25; // 10-16 cases
    else if (192 < quantity && quantity <= 300) price = 24; // 17-25 cases
    else if (300 < quantity && quantity <= 360) price = 23.5; // 26-30 cases
    else if (360 < quantity) price = 22.5; // 31+ cases
    else price = 'NaN';
  } else if (product === '3') {
    // currently not in use
  }
  return Number(price);
};

/**
 * 10-16 25
 * 17-25 24
 * 26-30 23.5
 * 31+ 22.5
 */
