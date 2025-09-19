import { locationData } from './locationData.js';

/**
 * divitio , zila, upozila option update
 */
const division = document.getElementById('division');
const zila = document.getElementById('zila');
const upo = document.getElementById('upozila');

// Division চেঞ্জ হলে District আপডেট হবে
division.addEventListener('change', function () {
  zila.innerHTML = '<option value="">Select District</option>';
  upo.innerHTML = '<option value="">Select Upazila</option>';
  const selectedDivision = this.value;

  if (locationData[selectedDivision]) {
    Object.keys(locationData[selectedDivision]).forEach((district) => {
      const opt = document.createElement('option');
      opt.value = district;
      opt.textContent = district.charAt(0).toUpperCase() + district.slice(1);
      zila.appendChild(opt);
    });
  }
});

// District চেঞ্জ হলে Upazila আপডেট হবে
zila.addEventListener('change', function () {
  upo.innerHTML = '<option value="">Select Upazila</option>';
  const selectedDivision = division.value;
  const selectedDistrict = this.value;

  if (
    locationData[selectedDivision] &&
    locationData[selectedDivision][selectedDistrict]
  ) {
    locationData[selectedDivision][selectedDistrict].forEach((u) => {
      const opt = document.createElement('option');
      opt.value = u.toLowerCase();
      opt.textContent = u;
      upo.appendChild(opt);
    });
  }
});

/**
 * local store save
 */
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault(); // ডিফল্ট সাবমিট বন্ধ

  let customerData = {
    name: document.getElementById('name').value.trim(),
    address: document.getElementById('address').value.trim(),
    postcode: document.getElementById('postcode').value.trim(),
    division: document.getElementById('division').value,
    zila: document.getElementById('zila').value,
    upozila: document.getElementById('upozila').value,
    mobile: document.getElementById('mobile').value.trim(),
    whatsapp: document.getElementById('whatsapp').value.trim(),
    company: document.getElementById('company').value.trim(),
  };

  // লোকালস্টোরেজে সেভ
  localStorage.setItem('userData', JSON.stringify(customerData));

  console.log('Saved Data:', customerData);

  // চাইলে ফর্ম খালি করা যাবে
  //   e.target.reset();

  /**
   * assing to quatation form
   */
  let getQut = () => {
    window.location.href = 'http://127.0.0.1:5500/index.html';
  };
  setTimeout(getQut, 1000);
});

/**
 * if user data are saved in store fill it auto
 */
window.addEventListener('DOMContentLoaded', () => {
  let savedData = JSON.parse(localStorage.getItem('userData'));

  if (savedData) {
    document.getElementById('name').value = savedData.name || '';
    document.getElementById('address').value = savedData.address || '';
    document.getElementById('postcode').value = savedData.postcode || '';
    document.getElementById('mobile').value = savedData.mobile || '';
    document.getElementById('whatsapp').value = savedData.whatsapp || '';
    document.getElementById('company').value = savedData.company || '';

    // Division সেট
    if (savedData.division) {
      division.value = savedData.division;
      division.dispatchEvent(new Event('change')); // zila আপডেট

      // District সেট
      setTimeout(() => {
        if (savedData.zila) {
          zila.value = savedData.zila;
          zila.dispatchEvent(new Event('change')); // upo আপডেট

          // Upazila সেট
          setTimeout(() => {
            if (savedData.upozila) {
              upo.value = savedData.upozila.toLowerCase();
            }
          }, 100);
        }
      }, 100);
    }
  }
});
