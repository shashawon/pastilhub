// ========== CUSTOMER STATE & FUNCTIONS ==========

console.log("CUSTOMER JS LOADED");

let selectedToppingId = null;
let selectedRiceId = null;
let selectedCupSizeId = null;
let selectedAddOnIds = [];

let customerNameInput = "";
let adminUsernameInput = "";
let adminPasswordInput = "";

// =========================
// GETTERS
// =========================

function getSelectedTopping() {
  return menuData.toppings.find(
    (t) => Number(t.id) === Number(selectedToppingId),
  );
}

function getSelectedRice() {
  return menuData.riceOptions.find(
    (r) => Number(r.id) === Number(selectedRiceId),
  );
}

function getSelectedCupSize() {
  return menuData.cupSizes.find(
    (c) => Number(c.id) === Number(selectedCupSizeId),
  );
}

function getSelectedAddOns() {
  return menuData.addOns.filter((a) => selectedAddOnIds.includes(Number(a.id)));
}

// =========================
// TOTAL
// =========================

function calculateTotal() {
  let total = 0;

  const topping = getSelectedTopping();
  const rice = getSelectedRice();
  const cup = getSelectedCupSize();
  const addOns = getSelectedAddOns();

  if (topping) total += Number(topping.price || 0);
  if (rice) total += Number(rice.price || 0);
  if (cup) total += Number(cup.price || 0);

  if (Array.isArray(addOns)) {
    addOns.forEach((addon) => {
      total += Number(addon.price || 0);
    });
  }

  return total;
}

// =========================
// SELECTORS
// =========================

window.selectTopping = (id) => {
  id = Number(id);

  selectedToppingId = Number(selectedToppingId) === id ? null : id;

  render();
};

window.selectRice = (id) => {
  id = Number(id);

  selectedRiceId = Number(selectedRiceId) === id ? null : id;

  render();
};

window.selectCupSize = (id) => {
  id = Number(id);

  selectedCupSizeId = Number(selectedCupSizeId) === id ? null : id;

  render();
};

window.toggleAddOn = (id) => {
  id = Number(id);

  if (selectedAddOnIds.includes(id)) {
    selectedAddOnIds = selectedAddOnIds.filter((i) => i !== id);
  } else {
    selectedAddOnIds.push(id);
  }

  render();
};

// =========================
// MODE SELECTION
// =========================

function renderModeSelection() {
  return `
    <div class="mode-selection">

      <h2>PastilHub</h2>

      <p>How would you like to order?</p>

      <div class="mode-buttons">

        <div
          class="mode-btn"
          onclick="selectMode('dinein')"
        >
          <span class="emoji">🍽️</span>
          <h3>Dine In</h3>
        </div>

        <div
          class="mode-btn"
          onclick="selectMode('takeout')"
        >
          <span class="emoji">🛍️</span>
          <h3>Take Out</h3>
        </div>

      </div>

    </div>
  `;
}

window.selectMode = (mode) => {
  orderMode = mode;
  showModeSelection = false;

  render();
};

// =========================
// TOPPINGS
// =========================

function renderToppingsColumn() {
  return menuData.toppings
    .map(
      (topping) => `
      <div
        class="menu-item ${
          Number(selectedToppingId) === Number(topping.id) ? "selected" : ""
        }"

        onclick="selectTopping(${Number(topping.id)})"
      >

        <img
          class="menu-item-img"
          src="${topping.image.replace(".jpg", ".png")}"
          alt="${topping.name}"
          onerror="this.src='https://placehold.co/55x55'"
        >

        <div class="menu-item-info">
          <div class="menu-item-name">
            ${topping.name}
          </div>

          <div class="menu-item-price">
            ₱${topping.price}
          </div>
        </div>

        <input
          type="checkbox"
          class="menu-item-checkbox"
          ${Number(selectedToppingId) === Number(topping.id) ? "checked" : ""}
        >

      </div>
    `,
    )
    .join("");
}

// =========================
// RICE
// =========================

function renderRiceColumn() {
  return menuData.riceOptions
    .map(
      (rice) => `
      <div
        class="menu-item ${
          Number(selectedRiceId) === Number(rice.id) ? "selected" : ""
        }"

        onclick="selectRice(${Number(rice.id)})"
      >

        <img
          class="menu-item-img"
          src="${rice.image}"
          alt="${rice.name}"
          onerror="this.src='https://placehold.co/55x55'"
        >

        <div class="menu-item-info">

          <div class="menu-item-name">
            ${rice.name}
          </div>

          <div class="menu-item-price">
            ₱${rice.price}
          </div>

        </div>

        <input
          type="checkbox"
          class="menu-item-checkbox"
          ${Number(selectedRiceId) === Number(rice.id) ? "checked" : ""}
        >

      </div>
    `,
    )
    .join("");
}

// =========================
// CUP
// =========================

function renderCupColumn() {
  return menuData.cupSizes
    .map(
      (cup) => `
      <div
        class="menu-item ${
          Number(selectedCupSizeId) === Number(cup.id) ? "selected" : ""
        }"

        onclick="selectCupSize(${Number(cup.id)})"
      >

        <div class="menu-item-info">

          <div class="menu-item-name">
            ${cup.name}
          </div>

          <div class="menu-item-price">
            ₱${cup.price}
          </div>

        </div>

        <input
          type="checkbox"
          class="menu-item-checkbox"
          ${Number(selectedCupSizeId) === Number(cup.id) ? "checked" : ""}
        >

      </div>
    `,
    )
    .join("");
}

// =========================
// MENU TABLE
// =========================

function renderMenuTable() {
  return `
    <div class="menu-container">

      <table class="menu-table">

        <thead>
          <tr>
            <th>Topping</th>
            <th>Rice</th>
            <th>Cup</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>${renderToppingsColumn()}</td>
            <td>${renderRiceColumn()}</td>
            <td>${renderCupColumn()}</td>
          </tr>
        </tbody>

      </table>

    </div>
  `;
}

// =========================
// ADDONS
// =========================

function renderAddOnsSection() {
  return `
    <div class="addons-section">

      <h3>Add-ons</h3>

      <div class="addons-grid">

        ${menuData.addOns
          .map(
            (addon) => `
            <div
              class="addon-item ${
                selectedAddOnIds.includes(Number(addon.id)) ? "selected" : ""
              }"
              onclick="toggleAddOn(${Number(addon.id)})"
            >

              <img
                src="${addon.image}"
                alt="${addon.name}"
                class="addon-img"
                onerror="this.src='https://placehold.co/50x50'"
              >

              <div>${addon.name}</div>
              <div>₱${addon.price}</div>

              <input
                type="checkbox"
                class="addon-checkbox"
                ${selectedAddOnIds.includes(Number(addon.id)) ? "checked" : ""}
              >

            </div>
          `,
          )
          .join("")}

      </div>

    </div>
  `;
}

// =========================
// TOTAL
// =========================

function renderTotalSection() {
  return `
    <div class="total-section">

      <span>
        Total: ₱${calculateTotal()}
      </span>

      <button
        class="ok-btn"
        onclick="proceedToSummary()"
      >
        OK
      </button>

    </div>
  `;
}

// =========================
// ORDER SUMMARY
// =========================

function proceedToSummary() {
  if (selectedToppingId == null) {
    alert("Select topping");
    return;
  }

  if (selectedRiceId == null) {
    alert("Select rice");
    return;
  }

  if (selectedCupSizeId == null) {
    alert("Select cup size");
    return;
  }

  showOrderSummary = true;

  render();
}

function renderOrderingPage() {
  return renderMenuTable() + renderAddOnsSection() + renderTotalSection();
}

function renderOrderSummary() {
  const topping = getSelectedTopping();
  const rice = getSelectedRice();
  const cup = getSelectedCupSize();
  const addOns = getSelectedAddOns();

  return `
    <div class="order-summary-page">

      <h2>Order Summary</h2>

      <div class="summary-box">

        <p>
          <strong>Topping:</strong>
          ${topping.name}
        </p>

        <p>
          <strong>Rice:</strong>
          ${rice.name}
        </p>

        <p>
          <strong>Cup:</strong>
          ${cup.name}
        </p>

        <p>
          <strong>Add-ons:</strong>
          ${addOns.length > 0 ? addOns.map((a) => a.name).join(", ") : "None"}
        </p>

        <h3>
          Total: ₱${calculateTotal()}
        </h3>

      </div>

      <input
  type="text"
  id="customerName"
  placeholder="Enter customer name"
  class="customer-input"
  value="${customerNameInput}"
  oninput="updateCustomerName(this.value)"
>

      <button onclick="placeOrder()">
        Place Order
      </button>

      <button onclick="backToOrdering()">
        Back
      </button>

    </div>
  `;
}

// =========================
// PLACE ORDER
// =========================

function placeOrder() {
  const customerName = customerNameInput;
  if (!customerName) {
    alert("Enter customer name");
    return;
  }

  const topping = getSelectedTopping();
  const rice = getSelectedRice();
  const cup = getSelectedCupSize();
  const addOns = getSelectedAddOns();

  const order = {
    orderNumber: "ORD-" + Math.floor(Math.random() * 10000),
    customer: customerName,
    mode: orderMode,
    topping: topping.name,
    rice: rice.name,
    cup: cup.name,
    addOns: addOns.map((a) => a.name),
    total: calculateTotal(),
    status: "pending",
    time: new Date().toLocaleString(),
  };

  fetch("http://localhost/pastilhub/backend/api/create_order.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("CREATE ORDER RESPONSE:", data);
      if (!data.success) {
        alert("Order failed to save!");
        return;
      }

      alert("Order saved!");

      order.id = data.id;

      orders.unshift(order);

      selectedToppingId = null;
      selectedRiceId = null;
      selectedCupSizeId = null;
      selectedAddOnIds = [];

      showOrderSummary = false;
      showModeSelection = true;

      render();
    })
    .catch((err) => {
      console.error("SAVE ERROR:", err);
    });
}

function backToOrdering() {
  showOrderSummary = false;
  render();
}

// =========================
// MAIN RENDER
// =========================

function renderCustomer() {
  if (showModeSelection) {
    return renderModeSelection();
  }

  if (showOrderSummary) {
    return renderOrderSummary();
  }

  return renderOrderingPage();
}

// =========================
// GLOBALS
// =========================

window.renderCustomer = renderCustomer;
window.proceedToSummary = proceedToSummary;
window.backToOrdering = backToOrdering;
window.calculateTotal = calculateTotal;
window.placeOrder = placeOrder;
window.updateCustomerName = (value) => {
  customerNameInput = value;
};
