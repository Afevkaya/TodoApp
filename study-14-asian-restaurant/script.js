class product {
  constructor({ Id, Title, Category, Price, ImageUrl, Desc }) {
    this.Id = Id;
    this.Title = Title;
    this.Category = Category;
    this.Price = Price;
    this.ImageUrl = ImageUrl;
    this.Desc = Desc;
  }
}
const categories = ["All", "Chinese", "Japanese", "Korean", "Thai"];
const productList = [
  new product({
    Id: 1,
    Title: "Sushi",
    Category: "Japanese",
    Price: 10,
    ImageUrl: "sushi.jpg",
    Desc: "Delicious Japanese sushi",
  }),
  new product({
    Id: 2,
    Title: "Pad Thai",
    Category: "Thai",
    Price: 12,
    ImageUrl: "pad-thai.jpg",
    Desc: "Spicy and flavorful Thai noodle dish",
  }),
  new product({
    Id: 3,
    Title: "Kimchi",
    Category: "Korean",
    Price: 8,
    ImageUrl: "kimchi.jpg",
    Desc: "Traditional Korean fermented vegetables",
  }),
  new product({
    Id: 4,
    Title: "Bulgogi",
    Category: "Korean",
    Price: 15,
    ImageUrl: "bulgogi.jpg",
    Desc: "Marinated Korean beef dish",
  }),
  new product({
    Id: 5,
    Title: "Dim Sum",
    Category: "Chinese",
    Price: 20,
    ImageUrl: "dim-sum.jpg",
    Desc: "Assorted Chinese steamed dumplings",
  }),
  new product({
    Id: 6,
    Title: "Green Curry",
    Category: "Thai",
    Price: 14,
    ImageUrl: "green-curry.jpg",
    Desc: "Creamy and aromatic Thai green curry",
  }),
  new product({
    Id: 7,
    Title: "Beef Noodle Soup",
    Category: "Chinese",
    Price: 12,
    ImageUrl: "beef-noodle-soup.jpg",
    Desc: "Warm and comforting Chinese beef noodle soup",
  }),
  new product({
    Id: 8,
    Title: "Mango Sticky Rice",
    Category: "Thai",
    Price: 10,
    ImageUrl: "mango-sticky-rice.jpg",
    Desc: "Sweet and creamy Thai dessert",
  }),
  new product({
    Id: 9,
    Title: "Dumplings",
    Category: "Chinese",
    Price: 15,
    ImageUrl: "dumplings.jpg",
    Desc: "Freshly made Chinese dumplings",
  }),
  new product({
    Id: 10,
    Title: "Ramen",
    Category: "Japanese",
    Price: 12,
    ImageUrl: "ramen.jpg",
    Desc: "Hearty Japanese noodle soup",
  }),
];

const categoryContainer = document.querySelector("#category-container");
const productContainer = document.querySelector("#product-container");
function displayCategories() {
  categories.forEach((cat, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-outline-dark menu-btn px-3 fw-semibold";
    button.textContent = cat;
    button.addEventListener("click", () => {
      document
        .querySelectorAll("#category-container .menu-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      displayProducts(cat);
    });

    if (index === 0) {
      button.classList.add("active");
    }

    categoryContainer.appendChild(button);
  });
}

function displayProducts(category) {
  productContainer.innerHTML = "";
  const filteredProducts =
    category === "All"
      ? productList
      : productList.filter((prod) => prod.Category === category);
  filteredProducts.forEach((prod) => {
    const col = document.createElement("div");
    col.className = "col-12 col-lg-6";

    col.innerHTML = `
      <article class="card h-100 border-2 border-dark shadow-sm">
        <div class="card-body">
          <div class="row g-3 align-items-start">
            <div class="col-4">
              <img src="${prod.ImageUrl}" alt="${prod.Title}" class="product-thumb rounded" />
            </div>
            <div class="col-8 d-flex flex-column">
              <div class="d-flex justify-content-between align-items-center border-bottom border-dark pb-2">
                <h5 class="mb-0 fw-bold">${prod.Title}</h5>
                <span class="fw-semibold">$${prod.Price}</span>
              </div>
              <p class="mb-0 mt-2 text-secondary">${prod.Desc}</p>
            </div>
          </div>
        </div>
      </article>
    `;

    productContainer.appendChild(col);
  });
}

window.onload = () => {
  displayCategories();
  displayProducts("All");
};
