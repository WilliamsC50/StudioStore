const prices = {
  // Microphones
  "Shure SM7B": 399,
  "Neumann TLM 103": 1195,
  "Rode NT1": 269,
  "AKG C414": 1099,
  "Sennheiser MK4": 299,
  "Audio-Technica AT2020": 99,
  "Blue Yeti Pro": 249,
  "Slate ML-1": 799,
  "Warm Audio WA-87": 599,
  "Lewitt LCT 440": 299,

  // Interfaces
  "Focusrite Scarlett 2i2": 179,
  "Apollo Twin X": 899,
  "PreSonus AudioBox": 99,
  "MOTU M2": 199,
  "Behringer UMC404HD": 130,
  "Audient iD14": 299,
  "Steinberg UR44": 249,
  "SSL 2+": 279,
  "Antelope Zen Go": 499,
  "Universal Audio Volt 2": 189,

  // Headphones
  "Audio-Technica ATH-M50x": 169,
  "Sony MDR-7506": 99,
  "Beyerdynamic DT 770 PRO": 159,
  "Sennheiser HD 280 PRO": 99,
  "AKG K240": 69,
  "Focal Listen Professional": 299,
  "Shure SRH840": 149,
  "Audeze LCD-1": 399,
  "Status Audio CB-1": 79,
  "Tascam TH-02": 29,

  // Monitors
  "Yamaha HS5": 199,
  "KRK Rokit 5": 179,
  "JBL 305P MkII": 149,
  "Adam Audio T5V": 249,
  "Focal Alpha 50 Evo": 349,
  "PreSonus Eris E5": 149,
  "Mackie CR4-X": 99,
  "Kali Audio LP-6": 179,
  "Tannoy Reveal 502": 129,
  "Behringer Truth B2031A": 229,

  // Mixers
  "Behringer Xenyx 1202FX": 109,
  "Yamaha MG10XU": 229,
  "Allen & Heath ZEDi-10": 269,
  "Mackie ProFX10v3": 219,
  "Zoom LiveTrak L-8": 399,
  "PreSonus StudioLive AR12": 599,
  "Soundcraft EPM6": 229,
  "Tascam Model 12": 599,
  "Behringer X32": 2399,
  "Allen & Heath SQ-5": 3999
};

function buildKit() {
  const selections = [
    { id: "mic", qty: "micQty" },
    { id: "interface", qty: "interfaceQty" },
    { id: "headphones", qty: "headphonesQty" },
    { id: "monitors", qty: "monitorsQty" },
    { id: "mixer", qty: "mixerQty" },
  ];

  let output = "<h3>Your Custom Studio Kit:</h3><ul>";
  let total = 0;

  selections.forEach((item) => {
    const select = document.getElementById(item.id);
    const qty = parseInt(document.getElementById(item.qty).value) || 0;
    const product = select.value;

    if (product !== "N/A" && qty > 0) {
      const price = prices[product] || 0;
      total += price * qty;
      output += `<li>${qty} × ${product} — $${(price * qty).toFixed(2)}</li>`;
    }
  });

  output += "</ul>";
  document.getElementById("kitOutput").innerHTML = output;
  document.getElementById("kitTotal").innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Optional: Dark mode toggle
document.getElementById("darkModeToggle").addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
