// ========== APP STATE & MAIN RENDER ==========

console.log("APP JS LOADED");

let currentPage = "customer";
let isAdminLoggedIn = false;
let showModeSelection = true;
let orderMode = null;
let showOrderSummary = false;
let safeOrders = [];
let orders = JSON.parse(localStorage.getItem("pastilhub_orders")) || [];

async function loadMenuData() {
  try {
    const endpoints = [
      "get_toppings.php",
      "get_rice.php",
      "get_cups.php",
      "get_addons.php"
    ];

    const results = await Promise.all(
      endpoints.map(async (url) => {
        const res = await fetch("http://localhost/pastilhub/backend/api/" + url);
        const text = await res.text();

        console.log("RAW RESPONSE:", url, text); // 🔥 THIS IS KEY

        return JSON.parse(text);
      })
    );

    menuData = {
      toppings: results[0],
      riceOptions: results[1],
      cupSizes: results[2],
      addOns: results[3]
    };

    render();

  } catch (err) {
    console.error("MENU LOAD FAILED:", err);
  }
}

// async function loadOrders() {
//   try {
//     const res = await fetch("http://localhost/pastilhub/backend/api/get_orders.php");

//     if (!res.ok) {
//       throw new Error("HTTP " + res.status);
//     }

//     const data = await res.json();

//     console.log("ORDERS FROM BACKEND:", data);

//     orders = data;
//     render();
//   } catch (err) {
//     console.error("LOAD ORDERS FAILED:", err);
//   }
// }

function loadOrders() {
  fetch("http://localhost/pastilhub/backend/api/get_orders.php")
    .then((res) => {
      if (!res.ok) {
        throw new Error("HTTP ERROR: " + res.status);
      }

      return res.json();
    })
    .then((data) => {
      console.log("ORDERS FROM DATABASE:", data);

      safeOrders = Array.isArray(data) ? data : [];

      render();
    })
    .catch((err) => {
      console.error("LOAD ORDERS ERROR:", err);
    });
}

// function render() {
//   const appDiv = document.getElementById("app");

//   // Show login page if admin page is selected but not logged in
//   if (currentPage === "admin" && !isAdminLoggedIn) {
//     appDiv.innerHTML = renderLoginPage();

//     const loginForm = document.getElementById("loginForm");

//     if (loginForm) {
//       loginForm.addEventListener("submit", (e) => {
//         e.preventDefault();

//         const username = document.getElementById("username").value;
//         const password = document.getElementById("password").value;

//         if (
//           username === ADMIN_USER.username &&
//           password === ADMIN_USER.password
//         ) {
//           isAdminLoggedIn = true;
//           render();
//         } else {
//           document.getElementById("loginError").textContent =
//             "Invalid credentials!";

//           document.getElementById("loginError").style.display = "block";
//         }
//       });
//     }

//     return;
//   }

function render() {
  const appDiv = document.getElementById("app");

  // =========================
  // ADMIN LOGIN SCREEN
  // =========================
  if (currentPage === "admin" && !isAdminLoggedIn) {
    appDiv.innerHTML = renderLoginPage();

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        console.log("LOGIN ATTEMPT:", username, password);

        if (
          username === ADMIN_USER.username &&
          password === ADMIN_USER.password
        ) {
          isAdminLoggedIn = true;
          currentPage = "admin";

          loadOrders();
          render();
        } else {
          const err = document.getElementById("loginError");
          err.textContent = "Invalid credentials!";
          err.style.display = "block";
        }
      }, { once: true });
    }

    return;
  }

  // =========================
  // ADMIN PANEL
  // =========================
  if (currentPage === "admin" && isAdminLoggedIn) {
    appDiv.innerHTML = `
      <div class="nav-bar">
        <h1>PastilHub Admin</h1>

        <div class="nav-links">
          <button id="customerBtn">Customer</button>
          <button id="logoutAdminBtn">Logout</button>
        </div>
      </div>

      ${renderAdminPanel()}
    `;

    document.getElementById("customerBtn")?.addEventListener("click", () => {
      currentPage = "customer";
      render();
    });

    document.getElementById("logoutAdminBtn")?.addEventListener("click", () => {
      isAdminLoggedIn = false;
      currentPage = "customer";
      render();
    });

    return;
  }

  // =========================
  // CUSTOMER PAGE
  // =========================
  appDiv.innerHTML = `
    <div class="nav-bar">
      <h1>PastilHub</h1>

      <div class="nav-links">
        <button id="customerBtn" class="active">Customer</button>
        <button id="adminBtn">Admin</button>
      </div>
    </div>

    ${renderCustomer()}
  `;

  document.getElementById("adminBtn")?.addEventListener("click", () => {
    currentPage = "admin";
    render();
  });
}

// function render() {
//   console.log("RENDER START");

//   const appDiv = document.getElementById("app");

//   console.log("APP DIV:", appDiv);

//   try {
//     appDiv.innerHTML = `
//             <h1>TEST RENDER WORKING</h1>
//         `;

//     console.log("HTML INSERTED");
//   } catch (error) {
//     console.error("RENDER FAILED:", error);
//   }
// }

window.switchToCustomer = () => {
  currentPage = "customer";
  showModeSelection = true;
  orderMode = null;
  showOrderSummary = false;

  render();
};

// START APP HERE
loadMenuData();
loadOrders();
window.render = render;
