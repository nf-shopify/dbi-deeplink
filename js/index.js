let orderCreated = false;
console.log("It's alive");

function toggleCart() {
  const button = document.getElementById("orderButton");
  if (!orderCreated) {
    orderCreated = true;
    console.log("About to create draft Order");
    draftOrderCreate();
    button.textContent = "Open Order in Shopify POS";
  } else {
    window.location.href =
      "com.shopify.pos://orders/draftOrderDetails/1131440209976";
  }
}

async function draftOrderCreate() {
  const API_URL = process.env.API_URL;
  const API_TOKEN = process.env.API_TOKEN;
  const mutationQuery =
    "mutation draftOrderCreate($input: DraftOrderInput!) { draftOrderCreate(input: $input) {draftOrder {id, invoiceUrl}}}";

  const input = {
    input: {
      customerId: "gid://shopify/Customer/22182663815224",
      note: "Draft Order Generated via API",
      email: "zoe.smith@example.com",
      taxExempt: false,
      billingAddress: {
        address1: "456 Main St",
        city: "Toronto",
        province: "Ontario",
        country: "Canada",
        zip: "Z9Z 9Z9",
      },
      lineItems: [
        {
          variantId: "gid://shopify/ProductVariant/48422488768568",
          quantity: 1,
        },
        {
          variantId: "gid://shopify/ProductVariant/48422488801336",
          quantity: 1,
        },
      ],
    },
  };

  const jsonBody = {
    query: mutationQuery,
    variables: { input },
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": API_TOKEN,
    },
    body: jsonBody,
  });

  draftOrderData = await res.json();
  console.log(draftOrderData);
}
