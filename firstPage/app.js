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

  /**
   * if quantity less than minimum
   */

  if (
    (product == '1' && getQuantity < 6) ||
    (product == '2' && getQuantity < 10) ||
    product == '0'
  ) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'inline-block';
  }

  // pricing
  let price = prices(product, quantity);

  // calculate totals
  let total = price * quantity;
  let subTotal = total - (total / 100) * discount;
  let disAmount = (total / 100) * discount;

  // update preview
  prevProduct.innerHTML = `${
    product == '1' ? '500ml' : product == '2' ? '1 Liter' : ''
  }`;
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
// default call
showPreview();
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

nextBtn.addEventListener('click', () => {
  console.log('ok');

  showPreview('save');

  if (
    localStorage.getItem('userData') === null ||
    localStorage.getItem('userData') === '' ||
    localStorage.getItem('userData') === undefined ||
    !localStorage.getItem('userData')
  ) {
    window.location.href = `http://127.0.0.1:5500/loginPage/index.html`;
    return;
  }

  setTimeout(check(), 5000);
});

/**
 * if user came from offer page
 * then auto fill the form
 */

window.onload = () => {
  /**
   * save to store ref is true or false
   */

  localStorage.setItem('ref', 'false');

  const isFromOffer = location.href.includes('ref=');
  if (isFromOffer) {
    localStorage.setItem('ref', 'true');

    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    console.log(refCode);
    document.getElementById('refer').value = refCode;

    /**
     * add data for inputs
     */

    const getProductSize = urlParams.get('size');
    const getQuantity = urlParams.get('qun');

    document.getElementById('product').value =
      getProductSize == '500' ? '1' : getProductSize == '1000' ? '2' : '0';
    document.getElementById('quantity').value = getQuantity ? getQuantity : 0;

    /**
     * disable all input
     */

    showPreview();
    let inp = document.getElementsByTagName('input');
    let sel = document.getElementsByTagName('select');
    for (let i = 0; i < sel.length; i++) {
      sel[i].disabled = true;
    }

    for (let i = 0; i < inp.length; i++) {
      inp[i].disabled = true;
    }
  }
};
