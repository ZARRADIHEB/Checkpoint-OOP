class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
  addItem(product, quantity) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
    this.displayCart();
  }
  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.displayCart();
  }
  displayCart() {
    const cartList = document.querySelector(".cart-list");
    cartList.innerHTML = "";
    this.items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
              <span>${item.product.name} x ${item.quantity}</span>
              <span>$${item.getTotalPrice().toFixed(2)}</span>
              <button data-id="${item.product.id}">Remove</button>
          `;
      cartList.appendChild(div);
    });
    const total = this.items.reduce(
      (sum, item) => sum + item.getTotalPrice(),
      0
    );
    document.querySelector(".cart-total").innerText = `Total: $${total.toFixed(
      2
    )}`;
    document.querySelectorAll(".cart-item button").forEach((button) => {
      button.addEventListener("click", () => {
        const id = parseInt(button.getAttribute("data-id"));
        this.removeItem(id);
      });
    });
  }
}

const products = [
  new Product(1, "Laptop", 750),
  new Product(2, "Smartphone", 420),
  new Product(3, "Headphones", 270),
  new Product(4, "Smartwatch", 130),
];

const cart = new ShoppingCart();

function displayProducts() {
  const productList = document.querySelector(".product-list");
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
          <span>${product.name} - $${product.price.toFixed(2)}</span>
          <button data-id="${product.id}">Add to Cart</button>
      `;
    productList.appendChild(div);
  });
  document.querySelectorAll(".product button").forEach((button) => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      const product = products.find((p) => p.id === id);
      cart.addItem(product, 1);
    });
  });
}

displayProducts();
cart.displayCart();
