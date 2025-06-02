const itemPrices = {
  microphones: {
    "N/A": 0,
    "Shure SM7B": 399,
    "Rode NT1": 269,
    "Audio-Technica AT2020": 99,
    "Neumann TLM 103": 1395,
    "AKG C414 XLII": 1099,
    "Sennheiser MK4": 299,
    "Blue Yeti Pro": 249,
    "Electro-Voice RE20": 449,
    "Beyerdynamic M 160": 699,
    "Lewitt LCT 440 PURE": 269,
    "Warm Audio WA-47": 899
  },
  interfaces: {
    "N/A": 0,
    "Focusrite Scarlett 2i2": 179,
    "PreSonus AudioBox USB 96": 99,
    "Universal Audio Volt 2": 199,
    "Apollo Twin X": 899,
    "Behringer UMC404HD": 129,
    "MOTU M2": 199,
    "Steinberg UR22C": 189,
    "Audient iD14": 299,
    "SSL 2+": 279,
    "Arturia MiniFuse 2": 149,
    "Native Instruments Komplete Audio 2": 139
  },
  headphones: {
    "N/A": 0,
    "Audio-Technica ATH-M50x": 169,
    "Sony MDR-7506": 99,
    "Beyerdynamic DT 770 PRO": 179,
    "Sennheiser HD 650": 399,
    "Shure SRH1540": 499,
    "Focal Listen Professional": 299,
    "AKG K240": 69,
    "Audeze LCD-1": 399,
    "Fostex T50RP": 159,
    "KRK KNS 8400": 149,
    "Status Audio CB-1": 79
  },
  monitors: {
    "N/A": 0,
    "Yamaha HS5": 199,
    "KRK Rokit 5": 179,
    "JBL 305P MkII": 149,
    "Adam Audio T5V": 249,
    "Focal Alpha 50 Evo": 299,
    "PreSonus Eris E5": 149,
    "Genelec 8010A": 350,
    "IK Multimedia iLoud": 299,
    "Mackie CR4-X": 119,
    "Tannoy Reveal 502": 129,
    "Behringer B1030A": 169
  },
  mixers: {
    "N/A": 0,
    "Behringer Xenyx Q802USB": 99,
    "Yamaha MG10XU": 229,
    "Mackie ProFX10v3": 239,
    "Allen & Heath ZEDi-10": 249,
    "Soundcraft Notepad-12FX": 199,
    "PreSonus StudioLive AR8c": 599,
    "Tascam Model 12": 599,
    "Zoom LiveTrak L-12": 649,
    "Midas MR18": 999,
    "SSL BiG SiX": 2299
  }
};

function buildKit() {
  const categories = ['microphones', 'interfaces', 'headphones', 'monitors', 'mixers'];
  let total = 0;
  let outputHTML = '<h3>Your Custom Studio Kit:</h3><ul>';

  categories.forEach(category => {
    const selects = document.querySelectorAll(`select[data-category="${category}"]`);
    selects.forEach((select, index) => {
      const quantityInput = document.getElementById(`${category}-quantity-${index}`);
      const quantity = parseInt(quantityInput.value) || 0;
      const selectedItem = select.value;
      const price = itemPrices[category][selectedItem] || 0;
      const subtotal = price * quantity;

      if (quantity > 0 && selectedItem !== "N/A") {
        outputHTML += `<li><strong>${selectedItem}</strong> x${quantity} - $${subtotal.toFixed(2)}</li>`;
        total += subtotal;
      }
    });
  });

  outputHTML += `</ul><h4>Total: $${total.toFixed(2)}</h4>`;
  document.getElementById('kitOutput').innerHTML = outputHTML;
}

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode');
});

// Add and remove item functionality
function addKitItem(category) {
  const container = document.getElementById(`${category}-container`);
  const index = container.querySelectorAll('select').length;

  const wrapper = document.createElement('div');
  wrapper.className = 'select-row';

  const select = document.createElement('select');
  select.setAttribute('data-category', category);
  select.id = `${category}-select-${index}`;

  const naOption = document.createElement('option');
  naOption.value = 'N/A';
  naOption.text = 'N/A';
  select.appendChild(naOption);

  Object.keys(itemPrices[category]).forEach(item => {
    if (item !== 'N/A') {
      const option = document.createElement('option');
      option.value = item;
      option.text = item;
      select.appendChild(option);
    }
  });

  const quantity = document.createElement('input');
  quantity.type = 'number';
  quantity.min = '0';
  quantity.max = '99';
  quantity.value = '1';
  quantity.id = `${category}-quantity-${index}`;

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = () => wrapper.remove();

  wrapper.appendChild(select);
  wrapper.appendChild(quantity);
  wrapper.appendChild(removeBtn);

  container.appendChild(wrapper);
}
