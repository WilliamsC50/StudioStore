// Price dictionary
const prices = { /* same as before */ };

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
