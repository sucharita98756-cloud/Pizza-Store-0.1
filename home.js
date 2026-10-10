```javascript
// ================= CART =================

let cartCount = 0;


// Get all Add to Cart buttons

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const pizzaName =
            button.getAttribute("data-name");

        const pizzaPrice =
            button.getAttribute("data-price");


        // Increase cart count

        cartCount++;

        document.getElementById("cartCount")
            .innerText = cartCount;


        // Show message

        alert(
            pizzaName +
            " added to cart! Price: ₹" +
            pizzaPrice
        );

    });

});


// ================= ORDER NOW =================

document.getElementById("orderBtn")
    .addEventListener("click", function() {

        window.location.href = "menu.html";

    });


// ================= VIEW MENU =================

document.getElementById("menuBtn")
    .addEventListener("click", function() {

        window.location.href = "menu.html";

    });


document.getElementById("viewMenuBtn")
    .addEventListener("click", function() {

        window.location.href = "menu.html";

    });


// ================= OFFER =================

document.getElementById("offerBtn")
    .addEventListener("click", function() {

        window.location.href = "menu.html";

    });


// ================= CART BUTTON =================

document.getElementById("cartBtn")
    .addEventListener("click", function() {

        if (cartCount === 0) {

            alert("Your cart is empty!");

        } else {

            window.location.href = "cart.html";

        }

    });


// ================= LOGIN =================

document.getElementById("loginBtn")
    .addEventListener("click", function() {

        window.location.href = "login.html";

    });


// ================= SEARCH =================

document.getElementById("searchBtn")
    .addEventListener("click", function() {

        alert("Search feature will be available soon!");

    });
```
