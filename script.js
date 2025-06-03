// Pricing database
const prices = {
  microphones: {
    "N/A": 0,
    "Shure SM7B": 399,
    "Rode NT1": 269,
    "Audio-Technica AT2020": 99,
    "Neumann TLM 103": 1395,
    "AKG C414 XLII": 1099,
    "Blue Yeti Pro": 249,
    "Sennheiser MK4": 299,
    "Lewitt LCT 440 PURE": 269,
    "Warm Audio WA-87": 599,
    "Aston Spirit": 379,
    "BeyerDynamic M160": 699
  },
  interfaces: {
    "N/A": 0,
    "Focusrite Scarlett 2i2": 189,
    "PreSonus AudioBox USB 96": 99,
    "Universal Audio Volt 2": 189,
    "MOTU M2": 199,
    "Audient EVO 4": 129,
    "Behringer UMC204HD": 109,
    "Native Instruments Komplete Audio 2": 139,
    "SSL 2+": 299,
    "Steinberg UR22C": 189,
    "Tascam US-2x2HR": 149
  },
  headphones: {
    "N/A": 0,
    "Audio-Technica ATH-M50x": 149,
    "Sony MDR-7506": 99,
    "Beyerdynamic DT 770 PRO": 179,
    "Sennheiser HD 280 Pro": 99,
    "AKG K240": 69,
    "Shure SRH840": 149,
    "Focal Listen Professional": 299,
    "Status Audio CB-1": 79,
    "Neumann NDH 20": 499,
    "AIAIAI TMA-2": 230
  },
  monitors: {
    "N/A": 0,
    "Yamaha HS5": 199,
    "KRK Rokit 5": 179,
    "JBL 305P MkII": 149,
    "Adam Audio T5V": 249,
    "Mackie CR4-X": 119,
    "Presonus Eris E5": 149,
    "Focal Alpha 50 Evo": 349,
    "Genelec 8010A": 350,
    "IK Multimedia iLoud Micro": 299,
    "Behringer Truth B2031A": 229
  },
  mixers: {
    "N/A": 0,
    "Behringer Xenyx Q802USB": 99,
    "Yamaha MG10XU": 229,
    "Allen & Heath ZEDi-10": 269,
    "Mackie Mix12FX": 129,
    "Soundcraft Notepad-12FX": 179,
    "PreSonus StudioLive AR8c": 499,
    "Tascam Model 12": 599,
    "Zoom LiveTrak L-8": 399,
    "Allen & Heath QU-16": 2399,
    "Behringer X32": 2399
  }
};

// Toggle Dark Mode
document.getElementById('darkModeToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode');
});

// Build Kit Output
function buildKit() {
  const categories = ['microphones', 'interfaces', 'headphones', 'monitors', 'mixers'];
  let total = 0;
  let output = `<h3>Your Custom Studio Kit:</h3><ul>`;

  categories.forEach(cat => {
    const selects = document.querySelectorAll(`select.${cat}`);
    selects.forEach((select, i) => {
      const selectedItem = select.value;
      const quantityInput = document.getElementById(`${cat}-qty-${i}`);
      const qty = parseInt(quantityInput.value) || 0;
      const price = prices[cat][selectedItem] || 0;
      const itemTotal = price * qty;
      total += itemTotal;

      if (selectedItem !== "N/A" && qty > 0) {
        output += `<li><strong>${selectedItem}</strong> x ${qty} = $${itemTotal.toFixed(2)}</li>`;
      }
    });
  });

  output += `</ul><h4>Total: $${total.toFixed(2)}</h4>`;
  document.getElementById('kitOutput').innerHTML = output;
}

// Add Kit Item Functionality
function addKitItem(type) {
  const container = document.getElementById(`${type}-container`);
  const index = container.querySelectorAll(`select`).length;

  const select = document.createElement('select');
  select.className = type;
  select.name = `${type}-${index}`;

  Object.keys(prices[type]).forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.text = name;
    select.appendChild(option);
  });

  const qty = document.createElement('input');
  qty.type = 'number';
  qty.min = 0;
  qty.max = 99;
  qty.value = 1;
  qty.id = `${type}-qty-${index}`;

  const removeBtn = document.createElement('button');
  removeBtn.innerText = "Remove";
  removeBtn.type = "button";
  removeBtn.onclick = () => container.removeChild(wrapper);

  const wrapper = document.createElement('div');
  wrapper.className = 'kit-group';
  wrapper.appendChild(select);
  wrapper.appendChild(qty);
  wrapper.appendChild(removeBtn);

  container.appendChild(wrapper);
}
