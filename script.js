document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studioForm");
  const output = document.getElementById("kitOutput");
  const darkModeToggle = document.getElementById("darkModeToggle");

  const priceList = {
    "Shure SM7B": 399,
    "Rode NT1": 269,
    "Audio-Technica AT2020": 99,
    "Neumann TLM 103": 1395,
    "AKG C414 XLII": 1180,
    "Sennheiser MK4": 299,
    "Electro-Voice RE20": 449,
    "Blue Yeti Pro": 249,
    "Beyer M160": 699,
    "Aston Origin": 299,

    "Focusrite Scarlett 2i2": 179,
    "PreSonus AudioBox USB 96": 99,
    "Universal Audio Volt 2": 189,
    "MOTU M2": 199,
    "Audient iD14": 299,
    "Steinberg UR22C": 189,
    "SSL 2+": 299,
    "Behringer UMC404HD": 129,
    "Apollo Twin X Duo": 899,
    "Tascam US-2x2HR": 179,

    "Audio-Technica ATH-M50x": 169,
    "Sony MDR-7506": 99,
    "Beyerdynamic DT 770 PRO": 179,
    "Sennheiser HD 280 Pro": 99,
    "AKG K240": 69,
    "Focal Listen Pro": 299,
    "Shure SRH840": 149,
    "Neumann NDH 20": 499,
    "Audeze LCD-X": 1199,
    "Status Audio CB-1": 79,

    "Yamaha HS5": 199,
    "KRK Rokit 5": 179,
    "JBL 305P MkII": 149,
    "Adam Audio T5V": 249,
    "Focal Alpha 65": 399,
    "Genelec 8010A": 299,
    "Presonus Eris E5": 129,
    "IK Multimedia iLoud": 349,
    "Neumann KH 120": 749,
    "Mackie CR4-X": 99,

    "Behringer Xenyx Q802USB": 99,
    "Yamaha MG10XU": 229,
    "Mackie ProFX12v3": 269,
    "Soundcraft Signature 12MTK": 499,
    "Allen & Heath ZEDi-10FX": 279,
    "Presonus StudioLive AR12c": 599,
    "Tascam Model 12": 599,
    "Zoom LiveTrak L-8": 399,
    "A&H QU-16": 1999,
    "SSL SiX": 1599
  };

  function calculateTotalAndList() {
    const selects = form.querySelectorAll("select");
    const numbers = form.querySelectorAll('input[type="number"]');
    let total = 0;
    let result = "<h2>Your Kit:</h2><ul>";

    selects.forEach((select, i) => {
      const item = select.value;
      const qty = parseInt(numbers[i].value) || 1;
      if (item !== "N/A" && priceList[item]) {
        const price = priceList[item] * qty;
        total += price;
        result += `<li>${item} × ${qty} = $${price.toLocaleString()}</li>`;
      }
    });

    result += `</ul><h3>Total: $${total.toLocaleString()}</h3>`;
    output.innerHTML = result;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    calculateTotalAndList();
  });

  darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });

  function addMore(containerId) {
    const container = document.getElementById(containerId);
    const existingGroup = container.querySelector(".form-group");
    const clone = existingGroup.cloneNode(true);
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => clone.remove();
    clone.appendChild(removeBtn);
    container.appendChild(clone);
  }

  document.getElementById("addMic").onclick = () => addMore("micContainer");
  document.getElementById("addInterface").onclick = () => addMore("interfaceContainer");
  document.getElementById("addHeadphones").onclick = () => addMore("headphonesContainer");
  document.getElementById("addMonitors").onclick = () => addMore("monitorsContainer");
  document.getElementById("addMixer").onclick = () => addMore("mixerContainer");
});
