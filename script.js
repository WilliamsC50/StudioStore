document.addEventListener('DOMContentLoaded', () => {
  const darkToggle = document.getElementById('darkModeToggle');

  darkToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });

  document.getElementById('studioForm').addEventListener('submit', function (e) {
    e.preventDefault();
    buildKit();
  });

  document.getElementById('addMic').addEventListener('click', () => addItem('mic'));
  document.getElementById('addInterface').addEventListener('click', () => addItem('interface'));
  document.getElementById('addHeadphones').addEventListener('click', () => addItem('headphones'));
  document.getElementById('addMonitors').addEventListener('click', () => addItem('monitors'));
  document.getElementById('addMixer').addEventListener('click', () => addItem('mixer'));
});

const prices = {
  // Microphones
  "Shure SM7B": 399, "Rode NT1": 269, "Audio-Technica AT2020": 99,
  "Neumann TLM 103": 1395, "AKG C414 XLII": 1199, "Sennheiser MK4": 299,
  "Electro-Voice RE20": 449, "Blue Yeti Pro": 249, "Beyer M160": 699, "Aston Origin": 299,
  "N/A": 0,

  // Interfaces
  "Focusrite Scarlett 2i2": 189, "PreSonus AudioBox USB 96": 99, "Universal Audio Volt 2": 189,
  "MOTU M2": 199, "Audient iD14": 299, "Steinberg UR22C": 189,
  "SSL 2+": 279, "Behringer UMC404HD": 139, "Apollo Twin X Duo": 1099, "Tascam US-2x2HR": 149,

  // Headphones
  "Audio-Technica ATH-M50x": 169, "Sony MDR-7506": 99, "Beyerdynamic DT 770 PRO": 179,
  "Sennheiser HD 280 Pro": 99, "AKG K240": 69, "Focal Listen Pro": 299,
  "Shure SRH840": 149, "Neumann NDH 20": 499, "Audeze LCD-X": 1199, "Status Audio CB-1": 79,

  // Monitors
  "Yamaha HS5": 199, "KRK Rokit 5": 179, "JBL 305P MkII": 149,
  "Adam Audio T5V": 249, "Focal Alpha 65": 349, "Genelec 8010A": 295,
  "Presonus Eris E5": 149, "IK Multimedia iLoud": 299, "Neumann KH 120": 749, "Mackie CR4-X": 129,

  // Mixers
  "Behringer Xenyx Q802USB": 99, "Yamaha MG10XU": 229, "Mackie ProFX12v3": 329,
  "Soundcraft Signature 12MTK": 549, "Allen & Heath ZEDi-10FX": 299, "Presonus StudioLive AR12c": 599,
  "Tascam Model 12": 699, "Zoom LiveTrak L-8": 399, "A&H QU-16": 2199, "SSL SiX": 1499
};

function buildKit() {
  const categories = ['mic', 'interface', 'headphones', 'monitors', 'mixer'];
  let output = `<h3>Your Custom Studio Kit:</h3><ul>`;
  let total = 0;

  categories.forEach(category => {
    const container = document.getElementById(`${category}Container`);
    const selects = container.querySelectorAll('select');
    const qtyInputs = container.querySelectorAll('input[type="number"]');

    selects.forEach((select, i) => {
      const item = select.value;
      const qty = parseInt(qtyInputs[i].value) || 0;
      const price = prices[item] || 0;
      const lineTotal = price * qty;
      total += lineTotal;

      if (item !== 'N/A' && qty > 0) {
        output += `<li><strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong> ${item} x${qty} - $${lineTotal.toFixed(2)}</li>`;
      }
    });
  });

  output += `</ul><h4>Total: $${total.toFixed(2)}</h4>`;
  document.getElementById('kitOutput').innerHTML = output;
}

function addItem(category) {
  const container = document.getElementById(`${category}Container`);
  const original = container.querySelector('.form-group');
  const clone = original.cloneNode(true);
  clone.querySelector('select').selectedIndex = 0;
  clone.querySelector('input[type="number"]').value = 1;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = "Remove";
  removeBtn.classList.add('remove-btn');
  removeBtn.type = 'button';
  removeBtn.onclick = () => clone.remove();

  clone.appendChild(removeBtn);
  container.appendChild(clone);
}
