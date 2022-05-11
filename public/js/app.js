const priceNotebook = document.querySelectorAll(".price");

priceNotebook.forEach((item) => {
  item.textContent = new Intl.NumberFormat("us-Us", {
    currency: "USD",
    style: "currency",
  }).format(item.textContent);
});
