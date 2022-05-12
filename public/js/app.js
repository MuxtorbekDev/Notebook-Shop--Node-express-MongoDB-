const priceNotebook = document.querySelectorAll(".price");

priceNotebook.forEach((item) => {
  item.textContent = new Intl.NumberFormat("us-Us", {
    currency: "USD",
    style: "currency",
  }).format(item.textContent);
});

const $card = document.querySelector("#card");

if ($card) {
  $card.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-remove")) {
      const id = e.target.dataset.id;
      fetch("/card/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.notebooks.length === 0) {
            const dynamicHTML = card.notebooks
              .map((c) => {
                return `
              <tr>
              <td>${c.title}</td>
              <td>${c.count}</td>
              <td>
                <button class="btn btn-small js-remove" data-id="${c.id}">Delete</button>
              </td>
            </tr>
              `;
              })
              .join("");
            $card.querySelector("tbody").innerHTML = dynamicHTML;
            $card.querySelector(".price").textContent = card.price;
          } else {
            $card.innerHTML = "<b>Basket is empty</b>";
          }
        });
    }
  });
}
