const searchBar = document.getElementById("search-bar");
const resultsContainer = document.getElementById("results-container");

function myFunction() {
  alert("Added to cart");
}

function fetchData() {
  fetch("http://localhost:8111/med/ordermedicine")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Clear previous results
      resultsContainer.innerHTML = "";

      // Loop through the data and create HTML elements for each item
      data.products.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `
      <div class="card">
        <div class="image">
          <img src= ${item.thumbnail} alt="" class="img" />
        </div>
        <div class="details">
          <div class="row">
            <h3 class="name">${item.title}</h3>
        </div>
        <div class="row">
            <p class="price">$ ${item.price}</p>
            <button class="symbol" onclick="myFunction()" >Add</button>
        </div>
      </div>`;

        // Append the item element to the results container
        resultsContainer.appendChild(itemElement);
      });
    });
}

fetchData();

searchBar.addEventListener("input", () => {
  const searchValue = searchBar.value.toLowerCase();

  // Loop through the results and hide/show items based on search value
  resultsContainer.childNodes.forEach((itemElement) => {
    const title = itemElement.querySelector("h3").textContent.toLowerCase();
    const description = itemElement
      .querySelector("p")
      .textContent.toLowerCase();
    const shouldShow =
      title.includes(searchValue) || description.includes(searchValue);
    itemElement.style.display = shouldShow ? "block" : "none";
  });
});
{
  /* <div class="card">
<div class="image">
  <img src= ${item.thumbnail} alt="" class="img" />
</div>
<div class="details">
  <div class="row">
    <span class="name">${item.title}</span>
  </div>
  <div class="row">
  <span class="price">$ ${item.price}</span>
    <button class="symbol">Add</button>
  </div>
  </div>
  </div> */
}
