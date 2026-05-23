// ========== ADMIN FUNCTIONS ==========

console.log("ADMIN JS LOADED");

// =======================
// ADD / EDIT / DELETE TOGGLES
// =======================

function addTopping() {
  const name = prompt("Enter topping name:");
  if (!name) return;

  const price = parseFloat(prompt("Enter price:"));
  if (isNaN(price)) return;

  const newId = Math.max(...menuData.toppings.map((t) => t.id), 0) + 1;

  menuData.toppings.push({
    id: newId,
    name,
    price,
    image: "images/placeholder.png",
  });

  saveMenu();
  render();
}

function editTopping(id) {
  const t = menuData.toppings.find((x) => x.id === id);
  if (!t) return;

  const name = prompt("Edit name:", t.name);
  if (!name) return;

  const price = parseFloat(prompt("Edit price:", t.price));
  if (isNaN(price)) return;

  t.name = name;
  t.price = price;

  saveMenu();
  render();
}

function deleteTopping(id) {
  if (!confirm("Delete?")) return;

  menuData.toppings = menuData.toppings.filter((t) => t.id !== id);

  saveMenu();
  render();
}

// =======================
// RICE
// =======================

function addRice() {
  const name = prompt("Enter rice name:");
  if (!name) return;

  const price = parseFloat(prompt("Enter price:"));
  if (isNaN(price)) return;

  const newId = Math.max(...menuData.riceOptions.map((r) => r.id), 0) + 1;

  menuData.riceOptions.push({
    id: newId,
    name,
    price,
    image: "images/placeholder.png",
  });

  saveMenu();
  render();
}

function editRice(id) {
  const rice = menuData.riceOptions.find((r) => r.id === id);
  if (!rice) return;

  const name = prompt("Edit name:", rice.name);
  if (!name) return;

  const price = parseFloat(prompt("Edit price:", rice.price));
  if (isNaN(price)) return;

  rice.name = name;
  rice.price = price;

  saveMenu();
  render();
}

function deleteRice(id) {
  if (!confirm("Delete?")) return;

  menuData.riceOptions = menuData.riceOptions.filter((r) => r.id !== id);

  saveMenu();
  render();
}

// =======================
// CUP SIZE
// =======================

function addCupSize() {
  const name = prompt("Enter cup size name:");
  if (!name) return;

  const price = parseFloat(prompt("Enter price:"));
  if (isNaN(price)) return;

  const newId = Math.max(...menuData.cupSizes.map((c) => c.id), 0) + 1;

  menuData.cupSizes.push({
    id: newId,
    name,
    price,
  });

  saveMenu();
  render();
}

function editCupSize(id) {
  const cup = menuData.cupSizes.find((c) => c.id === id);
  if (!cup) return;

  const name = prompt("Edit name:", cup.name);
  if (!name) return;

  const price = parseFloat(prompt("Edit price:", cup.price));
  if (isNaN(price)) return;

  cup.name = name;
  cup.price = price;

  saveMenu();
  render();
}

function deleteCupSize(id) {
  if (!confirm("Delete?")) return;

  menuData.cupSizes = menuData.cupSizes.filter((c) => c.id !== id);

  saveMenu();
  render();
}

// =======================
// ADD-ONS
// =======================

function addAddOn() {
  const name = prompt("Enter add-on name:");
  if (!name) return;

  const price = parseFloat(prompt("Enter price:"));
  if (isNaN(price)) return;

  const newId = Math.max(...menuData.addOns.map((a) => a.id), 0) + 1;

  menuData.addOns.push({
    id: newId,
    name,
    price,
    image: "images/placeholder.png",
  });

  saveMenu();
  render();
}

function editAddOn(id) {
  const addon = menuData.addOns.find((a) => a.id === id);
  if (!addon) return;

  const name = prompt("Edit name:", addon.name);
  if (!name) return;

  const price = parseFloat(prompt("Edit price:", addon.price));
  if (isNaN(price)) return;

  addon.name = name;
  addon.price = price;

  saveMenu();
  render();
}

function deleteAddOn(id) {
  if (!confirm("Delete?")) return;

  menuData.addOns = menuData.addOns.filter((a) => a.id !== id);

  saveMenu();
  render();
}

// =======================
// ORDERS
// =======================

function updateOrderStatus(orderId, status) {
  fetch("http://localhost/pastilhub/backend/api/update_order_status.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: orderId,
      status: status,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("UPDATE RESPONSE:", data);

      loadOrders();
    })
    .catch((err) => console.error(err));
}

function deleteOrder(orderId) {
  if (!confirm("Delete order?")) return;

  fetch("http://localhost/pastilhub/backend/api/delete_order.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: orderId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("DELETE RESPONSE:", data);

      loadOrders();
    })
    .catch((err) => console.error(err));
}

// =======================
// ADMIN PANEL
// =======================

function renderAdminPanel() {
  const pendingOrders = safeOrders.filter((o) => o.status === "pending");
  const completedOrders = safeOrders.filter((o) => o.status === "completed");

  const totalSales = safeOrders.reduce(
    (sum, o) => sum + Number(o.total || 0),
    0,
  );

  return `
    <div class="admin-full-width">

      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Total Orders</h3>
          <div class="number">${safeOrders.length}</div>
        </div>

        <div class="stat-card">
          <h3>Pending</h3>
          <div class="number">${pendingOrders.length}</div>
        </div>

        <div class="stat-card">
          <h3>Completed</h3>
          <div class="number">${completedOrders.length}</div>
        </div>

        <div class="stat-card">
          <h3>Total Sales</h3>
          <div class="number">₱${totalSales}</div>
        </div>
      </div>

      <h2>Orders</h2>

      <table class="admin-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          ${safeOrders
            .map(
              (o) => `
            <tr>
              <td>${o.orderNumber}</td>
              <td>${o.customer}</td>
              <td>₱${o.total}</td>

              <td>
                <select
  class="status-select ${
    o.status === "completed" ? "status-completed" : "status-pending"
  }"

  onchange="
    updateOrderStatus(${o.id}, this.value);

    this.className =
      'status-select ' +
      (this.value === 'completed'
        ? 'status-completed'
        : 'status-pending');
  "
>
                  <option value="pending"
                    ${o.status === "pending" ? "selected" : ""}>
                    Pending
                  </option>

                  <option value="completed"
                    ${o.status === "completed" ? "selected" : ""}>
                    Completed
                  </option>
                </select>
              </td>

              <td>
                <button
                  class="delete-btn"
                  onclick="deleteOrder(${o.id})"
                >
                  Delete
                </button>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

      <br><br>

      <!-- TOPPINGS -->
      <h2>Toppings</h2>

      <button class="add-btn" onclick="addTopping()">
        + Add Topping
      </button>

      <table class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          ${menuData.toppings
            .map(
              (t) => `
            <tr>
              <td>${t.name}</td>
              <td>₱${t.price}</td>

              <td>
                <button
                  class="edit-btn"
                  onclick="editTopping(${t.id})"
                >
                  Edit
                </button>

                <button
                  class="delete-btn"
                  onclick="deleteTopping(${t.id})"
                >
                  Delete
                </button>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

      <br><br>

      <!-- RICE -->
      <h2>Rice</h2>

      <button class="add-btn" onclick="addRice()">
        + Add Rice
      </button>

      <table class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          ${menuData.riceOptions
            .map(
              (r) => `
            <tr>
              <td>${r.name}</td>
              <td>₱${r.price}</td>

              <td>
                <button
                  class="edit-btn"
                  onclick="editRice(${r.id})"
                >
                  Edit
                </button>

                <button
                  class="delete-btn"
                  onclick="deleteRice(${r.id})"
                >
                  Delete
                </button>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

      <br><br>

      <!-- CUP SIZES -->
      <h2>Cup Sizes</h2>

      <button class="add-btn" onclick="addCupSize()">
        + Add Cup Size
      </button>

      <table class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          ${menuData.cupSizes
            .map(
              (c) => `
            <tr>
              <td>${c.name}</td>
              <td>₱${c.price}</td>

              <td>
                <button
                  class="edit-btn"
                  onclick="editCupSize(${c.id})"
                >
                  Edit
                </button>

                <button
                  class="delete-btn"
                  onclick="deleteCupSize(${c.id})"
                >
                  Delete
                </button>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

      <br><br>

      <!-- ADDONS -->
      <h2>Add-ons</h2>

      <button class="add-btn" onclick="addAddOn()">
        +Add Add-on
      </button>

      <table class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          ${menuData.addOns
            .map(
              (a) => `
            <tr>
              <td>${a.name}</td>
              <td>₱${a.price}</td>

              <td>
                <button
                  class="edit-btn"
                  onclick="editAddOn(${a.id})"
                >
                  Edit
                </button>

                <button
                  class="delete-btn"
                  onclick="deleteAddOn(${a.id})"
                >
                  Delete
                </button>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

    </div>
  `;
}

// =======================
// LOGIN PAGE (FIXED)
// =======================

function renderLoginPage() {
  return `
    <div class="login-admin-container">
      <div class="login-box">

        <h1>Admin Login</h1>

        <form id="loginForm">
          <input id="username" placeholder="Username" autocomplete="off" />
          <input id="password" type="password" placeholder="Password" autocomplete="off" />

          <div id="loginError" style="display:none;color:red;"></div>

          <button type="submit">Login</button>
        </form>

      </div>
    </div>
  `;
}

// =======================
// GLOBAL FUNCTIONS
// =======================

window.addTopping = addTopping;
window.editTopping = editTopping;
window.deleteTopping = deleteTopping;

window.addRice = addRice;
window.editRice = editRice;
window.deleteRice = deleteRice;

window.addCupSize = addCupSize;
window.editCupSize = editCupSize;
window.deleteCupSize = deleteCupSize;

window.addAddOn = addAddOn;
window.editAddOn = editAddOn;
window.deleteAddOn = deleteAddOn;

window.updateOrderStatus = updateOrderStatus;
window.deleteOrder = deleteOrder;

window.renderLoginPage = renderLoginPage;
window.renderAdminPanel = renderAdminPanel;
