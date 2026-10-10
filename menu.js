```javascript
// ================= CART =================

let cartCount = 0;


// ================= GET ELEMENTS =================

const pizzaCards =
    document.querySelectorAll(".pizza-card");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const typeFilter =
    document.getElementById("typeFilter");

const sortFilter =
    document.getElementById("sortFilter");

const resultCount =
    document.getElementById("resultCount");

const noResult =
    document.getElementById("noResult");


// ================= ADD TO CART =================

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const pizzaName =
            button.getAttribute("data-name");

        const pizzaPrice =
            button.getAttribute("data-price");

        const card =
            button.closest(".pizza-card");

        const size =
            card.querySelector(".size-select").value;


        cartCount++;

        document.getElementById("cartCount")
            .innerText = cartCount;


        alert(
            pizzaName +
            "\nSize: " +
            size +
            "\nPrice: ₹" +
            pizzaPrice +
            "\n\nAdded to cart!"
        );

    });

});


// ================= FILTER FUNCTION =================

function filterPizzas() {

    const searchValue =
        searchInput.value.toLowerCase();

    const categoryValue =
        categoryFilter.value;

    const typeValue =
        typeFilter.value;


    let visibleCount = 0;


    pizzaCards.forEach(function(card) {

        const name =
            card.getAttribute("data-name")
                .toLowerCase();

        const category =
            card.getAttribute("data-category");

        const type =
            card.getAttribute("data-type");


        // Search condition

        const matchesSearch =
            name.includes(searchValue);


        // Category condition

        const matchesCategory =
            categoryValue === "all" ||
            category === categoryValue;


        // Type condition

        const matchesType =
            typeValue === "all" ||
            type === typeValue;


        // Final condition

        if (
            matchesSearch &&
            matchesCategory &&
            matchesType
        ) {

            card.style.display = "block";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    // Update result count

    resultCount.innerText =
        visibleCount + " pizzas";


    // No result message

    if (visibleCount === 0) {

        noResult.style.display = "block";

    } else {

        noResult.style.display = "none";

    }

}


// ================= SEARCH =================

searchInput.addEventListener(
    "input",
    filterPizzas
);


// ================= CATEGORY =================

categoryFilter.addEventListener(
    "change",
    filterPizzas
);


// ================= TYPE =================

typeFilter.addEventListener(
    "change",
    filterPizzas
);


// ================= SORT =================

sortFilter.addEventListener(
    "change",
    function() {

        const pizzaContainer =
            document.getElementById(
                "pizzaContainer"
            );


        const cards =
            Array.from(pizzaCards);


        const sortValue =
            sortFilter.value;


        if (sortValue === "low") {

            cards.sort(function(a, b) {

                return (
                    Number(
                        a.getAttribute("data-price")
                    )
                    -
                    Number(
                        b.getAttribute("data-price")
                    )
                );

            });

        }


        else if (sortValue === "high") {

            cards.sort(function(a, b) {

                return (
                    Number(
                        b.getAttribute("data-price")
                    )
                    -
                    Number(
                        a.getAttribute("data-price")
                    )
                );

            });

        }


        else if (sortValue === "name") {

            cards.sort(function(a, b) {

                return (
                    a.getAttribute("data-name")
                    .localeCompare(
                        b.getAttribute("data-name")
                    )
                );

            });

        }


        // Put sorted cards back

        cards.forEach(function(card) {

            pizzaContainer.appendChild(card);

        });

    }
);


// ================= SEARCH BUTTON =================

document.getElementById("searchButton")
    .addEventListener("click", function() {

        filterPizzas();

    });


// ================= CART BUTTON =================

document.getElementById("cartBtn")
    .addEventListener("click", function() {

        if (cartCount === 0) {

            alert("Your cart is empty!");

        } else {

            window.location.href =
                "cart.html";

        }

    });


// ================= LOGIN =================

document.getElementById("loginBtn")
    .addEventListener("click", function() {

        window.location.href =
            "login.html";

    });
```
