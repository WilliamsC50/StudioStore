// Price dictionary
const prices = {
  microphones: {
    'N/A': 0,
    'Shure SM7B': 399,
    'Neumann TLM 103': 1095,
    'Rode NT1-A': 229,
    'AKG C414 XLII': 1099,
    'Audio-Technica AT2020': 99,
    'Electro-Voice RE20': 449,
    'Blue Yeti Pro': 249,
    'Sennheiser MKH 416': 999,
    'Lewitt LCT 440 PURE': 269,
    'Warm Audio WA-87': 599
  },
  interfaces: {
    'N/A': 0,
    'Focusrite Scarlett 2i2': 179,
    'Universal Audio Volt 2': 189,
    'PreSonus Studio 24c': 149,
    'MOTU M2': 199,
    'Audient iD4': 199,
    'SSL 2+': 279,
    'Behringer UMC404HD': 149,
    'Apogee Duet 3': 649,
    'Steinberg UR22C': 189,
    'Tascam US-2x2HR': 169
  },
  headphones: {
    'N/A': 0,
    'Audio-Technica ATH-M50x': 149,
    'Sony MDR-7506': 99,
    'Beyerdynamic DT 770 PRO': 179,
    'Sennheiser HD 280 Pro': 99,
    'AKG K240': 69,
    'Focal Listen Professional': 299,
    'Shure SRH840': 149,
    'Neumann NDH 20': 499,
    'Austrian Audio Hi-X55': 299,
    'Status Audio CB-1': 79
  },
  monitors: {
    'N/A': 0,
    'Yamaha HS5': 199,
    'KRK Rokit 5': 179,
    'JBL 305P MkII': 149,
    'Adam Audio T5V': 249,
    'PreSonus Eris E5': 129,
    'Focal Alpha 50': 349,
    'Mackie CR5-X': 149,
    'Genelec 8010A': 350,
    'Kali Audio LP-6': 199,
    'IK Multimedia iLoud': 299
  },
  mixers: {
    'N/A': 0,
    'Behringer Xenyx Q802USB': 89,
    'Yamaha MG10XU': 209,
    'Mackie ProFX10v3': 229,
    'Allen & Heath ZEDi-10FX': 269,
    'Tascam Model 12': 599,
    'Zoom LiveTrak L-8': 399,
    'Presonus StudioLive AR12c': 599,
    'Soundcraft Signature 10': 399,
    'Behringer X32': 999,
    'Midas M32R': 1699
  }
};

// Populate dropdowns
document.addEventListener("DOMContentLoaded", () => {
  const types = Object.keys(prices);
  types.forEach(type => {
    const selects = document.querySelectorAll(`select.${type}`);
    selects.forEach((select, index) => {
      select.innerHTML = '';
      Object.keys(prices[type]).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      });
    });
  });

  document.getElementById('darkModeToggle').addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');
  });
});

function buildKit() {
  const categories = Object.keys(prices);
  let total = 0;
  let output = `<h3>Your Custom Studio Kit:</h3><ul>`;

  categories.forEach(cat => {
    const selects = document.querySelectorAll(`select.${cat}`);
    selects.forEach((select, i) => {
      const selectedItem = select.value;
      const qty = parseInt(document.getElementById(`${cat}-qty-${i}`)?.value) || 0;
      const price = prices[cat][selectedItem] || 0;
      const itemTotal = qty * price;
      total += itemTotal;

      if (selectedItem !== 'N/A' && qty > 0) {
        output += `<li>${selectedItem} x ${qty} = $${itemTotal.toFixed(2)}</li>`;
      }
    });
  });

  output += `</ul><h4>Total: $${total.toFixed(2)}</h4>`;
  document.getElementById('kitOutput').innerHTML = output;
}

function addKitItem(type) {
  const container = document.getElementById(`${type}-container`);
  const index = container.querySelectorAll(`select.${type}`).length;

  const select = document.createElement('select');
  select.className = type;
  Object.keys(prices[type]).forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });

  const qty = document.createElement('input');
  qty.type = 'number';
  qty.min = 0;
  qty.max = 99;
  qty.value = 1;
  qty.id = `${type}-qty-${index}`;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.type = 'button';
  removeBtn.onclick = () => container.removeChild(wrapper);

  const wrapper = document.createElement('div');
  wrapper.className = 'kit-group';
  wrapper.appendChild(select);
  wrapper.appendChild(qty);
  wrapper.appendChild(removeBtn);

  container.appendChild(wrapper);
}
