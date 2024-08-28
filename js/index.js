console.log("It's alive");

let orderCreated = false;

async function toggleCart() {
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

  const button = document.getElementById("orderButton");

  if (!orderCreated) {
    orderCreated = true;
    console.log("it's working")

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": API_TOKEN,
      },
      body: jsonBody,
    });

    draftOrderData = await res.json();
    console.log(draftOrderData);
    button.textContent = "Open Order in Shopify POS";
  } else {
    window.location.href =
      "com.shopify.pos://orders/draftOrderDetails/1131440209976";
  }
}
