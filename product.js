```javascript
// ================= VARIABLES =================

let quantity = 1;

let cartCount = 0;


// ================= ELEMENTS =================

const quantityElement =
    document.getElementById("quantity");

const totalPriceElement =
    document.getElementById("totalPrice");

const productPriceElement =
    document.getElementById("productPrice");


// ================= GET SELECTED SIZE =================

function getSelectedSizePrice() {

    const selectedSize =
        document.querySelector(
            'input[name="size"]:checked'
        );

    return Number(
        selectedSize.getAttribute("data-price")
    );
}


// ================= GET TOPPING PRICE =================

function getToppingPrice() {

    const toppings =
        document.querySelectorAll(
            ".topping:checked"
        );

    let toppingTotal = 0;


    toppings.forEach(function(topping) {

        toppingTotal += Number(
            topping.getAttribute("data-price")
        );

    });


    return toppingTotal;
}


// ================= CALCULATE TOTAL =================

function calculateTotal() {

    const sizePrice =
        getSelectedSizePrice();

    const toppingPrice =
        getToppingPrice();


    const singlePizzaPrice =
        sizePrice + toppingPrice;


    const total =
        singlePizzaPrice * quantity;


    // Product price

    productPriceElement.innerText =
        "₹" + sizePrice;


    // Total price

    totalPriceElement.innerText =
        "₹" + total;

}


// ================= SIZE CHANGE =================

const sizeOptions =
    document.querySelectorAll(
        'input[name="size"]'
    );


sizeOptions.forEach(function(size) {

    size.addEventListener(
        "change",
        calculateTotal
    );

});


// ================= TOPPING CHANGE =================

const toppings =
    document.querySelectorAll(
        ".topping"
    );


toppings.forEach(function(topping) {

    topping.addEventListener(
        "change",
        calculateTotal
    );

});


// ================= PLUS BUTTON =================

document.getElementById("plusBtn")
    .addEventListener("click", function() {

        quantity++;

        quantityElement.innerText =
            quantity;

        calculateTotal();

    });


// ================= MINUS BUTTON =================

document.getElementById("minusBtn")
    .addEventListener("click", function() {

        if (quantity > 1) {

            quantity--;

            quantityElement.innerText =
                quantity;

            calculateTotal();

        }

    });


// ================= ADD TO CART =================

document.getElementById("addCartBtn")
    .addEventListener("click", function() {

        const size =
            document.querySelector(
                'input[name="size"]:checked'
            ).value;


        const selectedToppings = [];


        toppings.forEach(function(topping) {

            if (topping.checked) {

                selectedToppings.push(
                    topping.value
                );

            }

        });


        const total =
            getSelectedSizePrice() +
            getToppingPrice();


        cartCount += quantity;


        document.getElementById("cartCount")
            .innerText = cartCount;


        alert(
            "🍕 Added to Cart!\n\n" +
            "Pizza: Margherita Pizza\n" +
            "Size: " + size + "\n" +
            "Quantity: " + quantity + "\n" +
            "Toppings: " +
            (
                selectedToppings.length > 0
                ? selectedToppings.join(", ")
                : "None"
            ) +
            "\nTotal: ₹" +
            (total * quantity)
        );

    });


// ================= BUY NOW =================

document.getElementById("buyNowBtn")
    .addEventListener("click", function() {

        alert(
            "🍕 Your order is ready!\n\n" +
            "Proceeding to checkout..."
        );

        window.location.href =
            "checkout.html";

    });


// ================= CART =================

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


// ================= INITIAL CALCULATION =================

calculateTotal();
```
