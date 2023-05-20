import { menuArray } from "./data.js";
import { getMenuKeyFromDataset } from "./utils.js";

// enums
const States = Object.freeze({
  Ordering: Symbol("ordering"),
  Paying: Symbol("paying"),
  Paid: Symbol("paid"),
});

// pre-state
function initializeOrders() {
  let orders = {};
  menuArray.map((item) => {
    orders[item.name] = { quantity: 0, price: item.price };
  });
  console.log(orders);
  return orders;
}

// state
let orders = initializeOrders();
let state = States.Ordering;

// render
function render() {
  renderSectionMenu();
  renderSectionOrder();
  renderCardDetails();
  renderThanks();
}

function renderSectionMenu() {
  function getMenuItemHTML(menuItem) {
    return `
      <div class="menu-item" id=${menuItem.name}>
        <p class="menu-item-emoji">${menuItem.emoji}</p>
        <div class="menu-item-text-container">
          <p class="menu-item-name">${menuItem.name}</p>
          <p class="menu-item-ingredients">${menuItem.ingredients.join(
            ", "
          )}</p>
          <p class="menu-item-price">\$${menuItem.price}</p>
        </div>
        <button class="menu-item-add-button" data-${menuItem.name}>+</button>
      </div>
    `;
  }
  document.querySelector("section.menu").innerHTML = menuArray
    .map(getMenuItemHTML)
    .join("");
}

function renderSectionOrder() {
  function getOrderItemHTML([name, order]) {
    return `
        <li class="order-item">
          <div class="order-item-row">
            <div>${name}<button class="order-remove" data-${name}>remove</button></div>
            <div class="price">\$${order.price}</div>
          </div>
        </li>
      `;
  }
  function getSectionOrderHTML(orders) {
    const liHtml = Object.entries(orders).map(getOrderItemHTML).join("");
    const total = Object.values(orders).reduce(
      (acc, el) => acc + el.quantity * el.price,
      0
    );
    return `
      <h1 class="order-title">Your order</h1>
      <div class="order-container">
        <ul class="order-list">
          ${liHtml}
        </ul>
        <div class="order-item-row border-top">
          <div class="order-item">Total price:</div>
          <div class="price">\$${total}</div>
        </div>
        <button class="complete-order">Complete order</button>
      </div>
`;
  }

  const ordersWithQty = Object.fromEntries(
    Object.entries(orders).filter((x) => x[1].quantity >= 1)
  );
  const html =
    (state === States.Ordering && Object.keys(ordersWithQty).length >= 1) ||
    state === States.Paying
      ? getSectionOrderHTML(ordersWithQty)
      : "";
  document.querySelector("section.order").innerHTML = html;
}

function renderCardDetails() {
  const display = state === States.Paying ? "block" : "none";
  document.querySelector("div.card-details").style.display = display;
}

function renderThanks() {
  const display = state === States.Paid ? "block" : "none";
  document.querySelector("div.thanks-container").style.display = display;
}

render();

// event handler

document.addEventListener("click", function (event) {
  const target = event.target;
  const className = target.className;
  const type = target.type;
  const dataset = target.dataset;
  if (type === "submit" && dataset) {
    switch (className) {
      case "menu-item-add-button": {
        return handleUpdateOrders(dataset, (quantity) => quantity + 1);
      }
      case "order-remove": {
        return handleUpdateOrders(dataset, (_) => 0);
      }
      case "complete-order": {
        return handleCompleteOrder(event);
      }
      case "pay": {
        return handlePay(event);
      }
      default: {
        console.log(`Unknown className: ${className}`);
      }
    }
  }
});

function handleUpdateOrders(dataset, updater) {
  const name = getMenuKeyFromDataset(dataset);
  console.log(`Updating ${name}`);
  const curr = orders[name];
  orders = {
    ...orders,
    [name]: { ...curr, quantity: updater(curr.quantity) },
  };
  console.log(orders);
  render();
}

function handleCompleteOrder(event) {
  event.preventDefault();
  console.log(`Updating state=${state.toString()}`);
  state = States.Paying;
  render();
}

function handlePay(event) {
  event.preventDefault();
  console.log(`Updating state=${state.toString()}`);
  state = States.Paid;
  render();
}
