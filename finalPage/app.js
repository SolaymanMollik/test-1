const mainFunction = () => {
  let userName = document.getElementById('name');
  let phn = document.getElementById('phn');
  let waNum = document.getElementById('waNum');
  let address = document.getElementById('address');
  let post = document.getElementById('post');
  let division = document.getElementById('division');
  let zila = document.getElementById('zila');
  let upozila = document.getElementById('upozila');
  let company = document.getElementById('company');
  let size = document.getElementById('size');
  let brand = document.getElementById('brand');
  let qun = document.getElementById('qun');
  let pcs = document.getElementById('pcs');
  let total = document.getElementById('total');
  let dis = document.getElementById('dis');
  let disAmount = document.getElementById('disAmount');
  let delCrg = document.getElementById('delCrg');
  let subTotal = document.getElementById('subTotal');
  let rCode = document.getElementById('rCode');

  /**
   * get lastOrder and userData from local storage and set to the fields
   */

  // user details

  let lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
  let userData = JSON.parse(localStorage.getItem('userData'));

  userName.innerHTML = userData.name;
  phn.innerHTML = userData.mobile;
  waNum.innerText = userData.whatsapp || 'N/A';

  address.innerHTML = userData.address;
  post.innerHTML = userData.postcode;
  division.innerHTML = userData.division;
  zila.innerText = userData.zila;
  upozila.innerHTML = userData.upozila;
  company.innerHTML = userData.company || 'N/A';

  let assUserData = JSON.parse(localStorage.getItem('userData'));
  let assLastOrder = JSON.parse(localStorage.getItem('lastOrder'));

  console.log(assLastOrder);

  // order details

  size.innerHTML = lastOrder.product;
  brand.innerHTML = lastOrder.productBrand;
  qun.innerHTML = lastOrder.quantity;
  pcs.innerHTML = lastOrder.price;
  total.innerHTML = lastOrder.total;
  dis.innerHTML = lastOrder.discount + '%';
  disAmount.innerHTML = lastOrder.disAmount;
  delCrg.innerHTML = lastOrder.delCharge || 0;
  subTotal.innerHTML = lastOrder.subTotal;
  rCode.innerHTML = lastOrder.refer || 'N/A';

  // form submission

  let allData =
    `https://solaymanmollik.github.io/userOrder?` +
    `name=${encodeURIComponent(userData.name)}&` +
    `phone=${encodeURIComponent(userData.mobile)}&` +
    `whatsapp=${encodeURIComponent(userData.whatsapp || 'N/A')}&` +
    `address=${encodeURIComponent(userData.address)}&` +
    `postcode=${encodeURIComponent(userData.postcode)}&` +
    `division=${encodeURIComponent(userData.division)}&` +
    `zila=${encodeURIComponent(userData.zila)}&` +
    `upozila=${encodeURIComponent(userData.upozila)}&` +
    `brandName=${encodeURIComponent(userData.company || 'N/A')}&` +
    `product=${encodeURIComponent(lastOrder.product)}&` +
    `productBrand=${encodeURIComponent(lastOrder.productBrand)}&` +
    `quantity=${encodeURIComponent(lastOrder.quantity)}&` +
    `price=${encodeURIComponent(lastOrder.price)}&` +
    `total=${encodeURIComponent(lastOrder.total)}&` +
    `discount=${encodeURIComponent(lastOrder.discount + '%')}&` +
    `discountAmount=${encodeURIComponent(lastOrder.disAmount)}&` +
    `deliveryCharge=${encodeURIComponent(lastOrder.delCharge || 0)}&` +
    `subTotal=${encodeURIComponent(lastOrder.subTotal)}&` +
    `referCode=${encodeURIComponent(lastOrder.refer || 'N/A')}`;

  console.log(allData);

  let submitForm = document.getElementById('submitForm');
  submitForm.innerHTML = `
    <!-- Hidden fields -->
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="নতুন ফর্ম সাবমিশন এসেছে!" />
          <input type="hidden" name="_subject" value="${allData}" />
  
      <button type="submit">Submit</button>
  
  `;
};

mainFunction();
