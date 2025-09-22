if (
  localStorage.getItem('userData') === null ||
  localStorage.getItem('userData') === '' ||
  localStorage.getItem('userData') === undefined ||
  !localStorage.getItem('userData')
) {
  console.log('no user data found');

  if (!window.location.href.includes('5500')) {
    window.location.href = `https://solaymanmollik.github.io/test-1/loginPage/index.html`;
  } else {
    window.location.href = `http://127.0.0.1:5500/loginPage/index.html`;
  }
} else {
  console.log('inn');

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
    let qun = document.getElementById('qun');

    let subTotal = document.getElementById('subTotal');

    /**
     * get all url parameters
     * is product , qun , price pcs, subTotal
     */

    /**
     * save to store ref is true or false
     */

    localStorage.setItem('ref', 'true');

    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');

    /**
     * add data for inputs
     */

    const getProductSize = urlParams.get('size');
    const getQuantity = urlParams.get('qun');
    const getPrice = urlParams.get('price');
    const getSubTotal = urlParams.get('subTotal');
    console.log(getProductSize, getQuantity, getPrice, getSubTotal);

    size.innerText =
      getProductSize == '500' ? '500ml' : getProductSize == '1000' ? '2' : '0';
    qun.innerHTML = `${getQuantity ? getQuantity : 0} cases / ${
      Number(getQuantity) * 24
    } pcs`;
    pcs.innerHTML = `${getPrice ? getPrice : 0} BDT`;
    document.getElementById('subTotal').value = getSubTotal ? getSubTotal : 0;
    subTotal.innerHTML = getSubTotal ? getSubTotal : 0;

    /**
     * get userData from local storage and set to the fields
     */

    // user details

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
      `product=${encodeURIComponent(getProductSize)}&`;
    `qun=${encodeURIComponent(getQuantity)}&`;
    `price=${encodeURIComponent(getPrice)}&`;
    `subTotal=${encodeURIComponent(getSubTotal)}&`;

    let submitForm = document.getElementById('submitForm');

    console.log(allData);

    console.log(submitForm);
    submitForm.innerHTML = `
    <!-- Hidden fields -->
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="নতুন ফর্ম সাবমিশন এসেছে!" />
          <input type="hidden" name="_subject" value="${allData}" />
  
      <button type="submit">Submit</button>
  
  `;
  };

  mainFunction();
}
