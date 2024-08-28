let orderCreated = false;

function toggleCart() {
  const button = document.getElementById("orderButton");

  if (!orderCreated) {
    orderCreated = true;
    button.textContent = "Open Order in Shopify POS";
  } else {
    window.location.href =
      "com.shopify.pos://orders/draftOrderDetails/1131440275512";
  }
}
