const prices = {
  "Shure SM7B": 399,
  "Rode NT1": 269,
  "Audio-Technica AT2020": 99,
  "Neumann TLM 103": 1099,
  "Electro-Voice RE20": 449,
  "AKG C414 XLII": 1099,
  "Lewitt LCT 440 PURE": 269,
  "Sennheiser MK4": 299,
  "Blue Bluebird SL": 299,
  "Warm Audio WA-87": 599,
  "Slate Digital ML-1": 799,
  "N/A": 0,

  "Focusrite Scarlett 2i2": 179,
  "PreSonus AudioBox USB 96": 99,
  "Universal Audio Volt 2": 189,
  "Audient iD14": 299,
  "MOTU M2": 199,
  "Steinberg UR22C": 189,
  "Apollo Twin X": 899,
  "SSL 2+": 299,
  "Behringer UMC404HD": 129,
  "Tascam US-2x2HR": 169,

  "Audio-Technica ATH-M50x": 149,
  "Sony MDR-7506": 99,
  "Beyerdynamic DT 770 PRO": 159,
  "Sennheiser HD 280 Pro": 99,
  "Focal Listen Professional": 299,
  "AKG K240": 69,
  "Shure SRH840": 149,
  "Audeze LCD-1": 399,
  "KRK KNS 8400": 149,
  "Status Audio CB-1": 79,

  "Yamaha HS5": 399,
  "KRK Rokit 5": 299,
  "JBL 305P MkII": 298,
  "Focal Alpha 50 Evo": 598,
  "ADAM Audio T5V": 499,
  "Kali Audio LP-6": 298,
  "PreSonus Eris E5": 250,
  "Genelec 8010A": 690,
  "IK Multimedia iLoud MTM": 699,
  "Mackie CR5-XBT": 200,

  "Behringer Xenyx Q802USB": 99,
  "Yamaha MG10XU": 249,
  "Soundcraft Signature 10": 399,
  "Allen & Heath ZEDi-10FX": 299,
  "PreSonus StudioLive AR8c": 599,
  "Mackie ProFX10v3": 279,
  "Zoom LiveTrak L-8": 399,
  "Tascam Model 12": 599,
  "Behringer X32 Compact": 2499,
  "A&H SQ-5": 3999
};

function updateOutput() {
  const sections = ['mic', 'interface', 'headphones', 'monitors', 'console'];
  let outputHTML = '<h3>Your Custom Studio Kit:</h3><ul>';
  let total = 0;

  sections.forEach(section => {
    const selects = document.querySelectorAll(`select[name="${section}"]`);
    selects.forEach((sel, i) => {
      const item = sel.value;
      const qty = document.getElementById(`${section}Qty${i}`).value;
      const itemPrice = prices[item] || 0;
      const subtotal = itemPrice * qty;
      total += subtotal;

      if (item !== 'N/A') {
        outputHTML += `
          <li class="kit-entry">
            <span><strong>${section.charAt(0).toUpperCase() + section.slice(1)}:</strong> ${item} × ${qty} ($${subtotal.toFixed(2)})</span>
            <button type="button" onclick="removeItem('${section}', ${i})">Remove</button>
          </li>
        `;
      }
    });
  });

  outputHTML += `</ul><div class="total-price">Total: $${total.toFixed(2)}</div>`;
  document.getElementById('kitOutput').innerHTML = outputHTML;
}

function addDropdown(section) {
  const container = document.getElementById(`${section}Container`);
  const index = container.querySelectorAll('select').length;

  const select = document.createElement('select');
  select.name = section;
  select.innerHTML = Object.keys(prices).filter(p => p !== "N/A" || section === 'console').map(p => `<option value="${p}">${p}</option>`).join('');
  const qty = document.createElement('input');
  qty.type = 'number';
  qty.min = '1';
  qty.max = '99';
  qty.value = '1';
  qty.id = `${section}Qty${index}`;

  const row = document.createElement('div');
  row.className = 'select-row';
  row.appendChild(select);
  row.appendChild(qty);
  container.appendChild(row);
  updateOutput();
}

function removeItem(section, index) {
  const container = document.getElementById(`${section}Container`);
  container.removeChild(container.children[index]);
  updateOutput();
}

document.getElementById('darkModeToggle').addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

document.addEventListener('DOMContentLoaded', () => {
  updateOutput();
});
