// ================= GET CART =================

let cart =
    JSON.parse(
        localStorage.getItem("pizzaCart")
    ) || [];


// ================= ELEMENTS =================

const checkoutItems =
    document.getElementById("checkoutItems");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryElement =
    document.getElementById("deliveryFee");

const discountElement =
    document.getElementById("discount");

const discountRow =
    document.getElementById("discountRow");

const totalElement =
    document.getElementById("total");

const cartCount =
    document.getElementById("cartCount");


// ================= CART COUNT =================

function updateCartCount() {

    let totalQuantity = 0;

    cart.forEach(function (item) {

        totalQuantity += item.quantity;

    });

    cartCount.innerText =
        totalQuantity;
}


// ================= RENDER ITEMS =================

function displayItems() {

    checkoutItems.innerHTML = "";


    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-checkout">

                <h3>
                    Your cart is empty 😔
                </h3>

                <p>
                    Please add some delicious pizzas first.
                </p>

                <button
                    onclick="goToMenu()">

                    Go to Menu

                </button>

            </div>

        `;

        document.getElementById(
            "placeOrderBtn"
        ).disabled = true;

        return;
    }


    cart.forEach(function (item) {

        const itemTotal =
            item.price * item.quantity;


        const itemDiv =
            document.createElement("div");


        itemDiv.className =
            "checkout-item";


        itemDiv.innerHTML = `

            <div class="checkout-item-image">

                ${item.image || "🍕"}

            </div>


            <div class="checkout-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${item.size || "Medium"}
                    × ${item.quantity}
                </p>

            </div>


            <div class="checkout-item-price">

                ₹${itemTotal.toFixed(2)}

            </div>

        `;


        checkoutItems.appendChild(itemDiv);

    });
}


// ================= CALCULATE TOTAL =================

function calculateTotal() {

    let subtotal = 0;


    cart.forEach(function (item) {

        subtotal +=
            item.price * item.quantity;

    });


    // Delivery fee

    let deliveryFee = 0;


    if (subtotal > 0 && subtotal < 500) {

        deliveryFee = 40;

    }


    // Get coupon discount

    let discount =
        Number(
            localStorage.getItem(
                "pizzaDiscount"
            )
        ) || 0;


    let discountAmount =
        subtotal * discount / 100;


    let total =
        subtotal +
        deliveryFee -
        discountAmount;


    subtotalElement.innerText =
        "₹" + subtotal.toFixed(2);


    deliveryElement.innerText =
        "₹" + deliveryFee.toFixed(2);


    if (discountAmount > 0) {

        discountRow.classList.remove(
            "hidden"
        );

        discountElement.innerText =
            "-₹" + discountAmount.toFixed(2);

    } else {

        discountRow.classList.add(
            "hidden"
        );

    }


    totalElement.innerText =
        "₹" + total.toFixed(2);


    return {
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        discount: discountAmount,
        total: total
    };
}


// ================= VALIDATION =================

function validateForm() {

    let valid = true;


    // Clear errors

    document.getElementById(
        "nameError"
    ).innerText = "";

    document.getElementById(
        "phoneError"
    ).innerText = "";

    document.getElementById(
        "emailError"
    ).innerText = "";

    document.getElementById(
        "addressError"
    ).innerText = "";

    document.getElementById(
        "cityError"
    ).innerText = "";

    document.getElementById(
        "pincodeError"
    ).innerText = "";


    // Name

    const name =
        document.getElementById(
            "name"
        ).value.trim();


    if (name === "") {

        document.getElementById(
            "nameError"
        ).innerText =
            "Please enter your name.";

        valid = false;

    }


    // Phone

    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    if (!/^[0-9]{10}$/.test(phone)) {

        document.getElementById(
            "phoneError"
        ).innerText =
            "Enter a valid 10-digit phone number.";

        valid = false;

    }


    // Email

    const email =
        document.getElementById(
            "email"
        ).value.trim();


    if (
        email === "" ||
        !email.includes("@") ||
        !email.includes(".")
    ) {

        document.getElementById(
            "emailError"
        ).innerText =
            "Enter a valid email.";

        valid = false;

    }


    // Address

    const address =
        document.getElementById(
            "address"
        ).value.trim();


    if (address === "") {

        document.getElementById(
            "addressError"
        ).innerText =
            "Please enter your delivery address.";

        valid = false;

    }


    // City

    const city =
        document.getElementById(
            "city"
        ).value.trim();


    if (city === "") {

        document.getElementById(
            "cityError"
        ).innerText =
            "Please enter your city.";

        valid = false;

    }


    // PIN

    const pincode =
        document.getElementById(
            "pincode"
        ).value.trim();


    if (!/^[0-9]{6}$/.test(pincode)) {

        document.getElementById(
            "pincodeError"
        ).innerText =
            "Enter a valid 6-digit PIN.";

        valid = false;

    }


    return valid;
}


// ================= PLACE ORDER =================

document.getElementById(
    "placeOrderBtn"
).addEventListener(
    "click",
    function () {


        // Cart check

        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;

        }


        // Validate

        if (!validateForm()) {

            return;

        }


        // Payment method

        const paymentMethod =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        // Calculate price

        const priceDetails =
            calculateTotal();


        // Create order ID

        const orderId =
            "PH" +
            Date.now();


        // Create order object

        const order = {

            orderId: orderId,

            customer: {

                name:
                    document.getElementById(
                        "name"
                    ).value.trim(),

                phone:
                    document.getElementById(
                        "phone"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "email"
                    ).value.trim()

            },


            address: {

                house:
                    document.getElementById(
                        "address"
                    ).value.trim(),

                city:
                    document.getElementById(
                        "city"
                    ).value.trim(),

                pincode:
                    document.getElementById(
                        "pincode"
                    ).value.trim()

            },


            paymentMethod:
                paymentMethod,


            instructions:
                document.getElementById(
                    "instructions"
                ).value.trim(),


            items: cart,


            subtotal:
                priceDetails.subtotal,

            deliveryFee:
                priceDetails.deliveryFee,

            discount:
                priceDetails.discount,

            total:
                priceDetails.total,


            status:
                "Order Placed",


            date:
                new Date().toLocaleString()

        };


        // Save order

        localStorage.setItem(
            "pizzaOrder",
            JSON.stringify(order)
        );


        // Clear cart

        localStorage.removeItem(
            "pizzaCart"
        );


        // Clear coupon

        localStorage.removeItem(
            "pizzaDiscount"
        );


        // Success message

        alert(
            "Order placed successfully! 🍕\n\n" +
            "Order ID: " +
            orderId
        );


        // Go to order tracking

        window.location.href =
            "order-tracking.html";

    }
);


// ================= BACK TO CART =================

document.getElementById(
    "backToCartBtn"
).addEventListener(
    "click",
    function () {

        window.location.href =
            "cart.html";

    }
);


// ================= CART BUTTON =================

document.getElementById(
    "cartBtn"
).addEventListener(
    "click",
    function () {

        window.location.href =
            "cart.html";

    }
);


// ================= MENU =================

function goToMenu() {

    window.location.href =
        "menu.html";

}


// ================= INITIAL LOAD =================

updateCartCount();

displayItems();

calculateTotal();