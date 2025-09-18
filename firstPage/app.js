import { data } from '../refarerData.js';
import { check } from './next.js';
import { prices } from '../price.js';

/**
 *
 * start main code
 */
function showPreview(x) {
  let product = document.getElementById('product').value;
  let getQuantity = Number(document.getElementById('quantity').value);
  let refer = document.getElementById('refer').value;
  // let productBrand = document.getElementById('productBrand').value;
  // preview elements
  let prevProduct = document.getElementById('prevProduct');
  let prevQuantity = document.getElementById('prevQuantity');
  let prevTotal = document.getElementById('prevTotal');
  let prevPrice = document.getElementById('prevPrice');
  let prevRefer = document.getElementById('prevRefer');
  let prevDiscount = document.getElementById('prevDiscount');
  let prevSubTotal = document.getElementById('prevSubTotal');
  let prevDiscountAmount = document.getElementById('prevDiscountAmount');
  // btn
  let nextBtn = document.getElementById('nextBtn');
  // discount
  let discount = 0;

  // refer array
  const referData = data;

  let checkRefer = () => {
    referData.forEach((x) => {
      if (x.id == refer) {
        discount = x.discount;
      }
    });
  };
  checkRefer();

  // quantity formatting

  let quantity = 0;
  let caseQun = 24;

  if (product == '1') {
    quantity = getQuantity * 24;
    caseQun = 24;
  } else if (product == '2' || product == '3') {
    quantity = getQuantity * 12;
    caseQun = 12;
  } else if (product == '4') {
    quantity = getQuantity * 6;
    caseQun = 6;
  }

  // pricing
  let price = prices(product, quantity);

  // calculate totals
  let total = price * quantity;
  let subTotal = total - (total / 100) * discount;
  let disAmount = (total / 100) * discount;

  // update preview
  prevProduct.innerHTML = product + ' Liter';
  prevQuantity.innerHTML = `${getQuantity} case x ${caseQun} pcs = ${quantity} pcs`;
  // prevBrand.innerHTML = productBrand;
  prevPrice.innerHTML = price;
  prevTotal.innerHTML = Math.round(total);
  prevRefer.innerHTML = Math.round(refer);
  prevDiscount.innerHTML = discount + ' %';
  prevDiscountAmount.innerHTML = Math.round(disAmount);
  prevSubTotal.innerHTML = Math.round(subTotal);

  // save to localStorage

  if (x == 'save') {
    let orderData = {
      product: product + ' Liter',
      productBrand: productBrand,
      quantity: quantity,
      price: price,
      total: total,
      refer: refer,
      discount: discount,
      disAmount: disAmount,
      subTotal: subTotal,
    };

    // সেভ করা
    localStorage.setItem('lastOrder', JSON.stringify(orderData));

    console.log('Order Saved:', orderData);
  }
}
/**
 * call the show preview btn
 */

document
  .getElementById('product')
  .addEventListener('input', (x) => showPreview());
document
  .getElementById('quantity')
  .addEventListener('input', (x) => showPreview());
document
  .getElementById('refer')
  .addEventListener('input', (x) => showPreview());
document
  .getElementById('productBrand')
  .addEventListener('input', (x) => showPreview());
nextBtn.addEventListener('click', () => {
  showPreview('save');
  setTimeout(check(), 5000);
});
