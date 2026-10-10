// ================= CART DATA =================

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("pizzaCart")) || [];


// ================= ELEMENTS =================

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const itemCount = document.getElementById("itemCount");

const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("deliveryFee");
const discountElement = document.getElementById("discount");
const totalElement = document.getElementById("total");

const cartCountElement = document.getElementById("cartCount");


// ================= COUPON =================

let discount = 0;
let couponApplied = false;


// ================= DISPLAY CART =================

function displayCart() {

    cartItems.innerHTML = "";

    let subtotal = 0;
    let totalItems = 0;


    // ================= EMPTY CART =================

    if (cart.length === 0) {

        cartItems.style.display = "none";
        emptyCart.style.display = "block";

        itemCount.innerText = "0 Items";

        updateSummary(0);
        updateCartCount(0);

        return;
    }


    // ================= SHOW CART =================

    cartItems.style.display = "block";
    emptyCart.style.display = "none";


    // ================= CREATE CART ITEMS =================

    cart.forEach(function (item, index) {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        totalItems += item.quantity;


        // Create cart item div
        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        // Cart item HTML
        cartItem.innerHTML = `
            
            <div class="cart-image">
                ${item.image || "🍕"}
            </div>

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>
                    Size: ${item.size || "Regular"}
                </p>

                <p>
                    Price: ₹${item.price}
                </p>

                <div class="quantity-box">

                    <button 
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button 
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <button 
                    class="remove-btn"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

            <div class="item-total">
                ₹${itemTotal}
            </div>

        `;


        // Add item to cart container
        cartItems.appendChild(cartItem);

    });


    // ================= ITEM COUNT =================

    itemCount.innerText =
        totalItems +
        (totalItems === 1 ? " Item" : " Items");


    // ================= SUMMARY =================

    updateSummary(subtotal);


    // ================= CART COUNT =================

    updateCartCount(totalItems);

}


// ================= UPDATE SUMMARY =================

function updateSummary(subtotal) {

    let deliveryFee = 0;


    // ================= DELIVERY FEE =================

    // Free delivery above ₹500
    if (subtotal > 0 && subtotal < 500) {

        deliveryFee = 40;

    }


    // ================= DISCOUNT =================

    let discountAmount = 0;

    if (couponApplied) {

        discountAmount = Math.round(subtotal * 0.20);

    }


    // ================= FINAL TOTAL =================

    const finalTotal =
        subtotal +
        deliveryFee -
        discountAmount;


    // ================= DISPLAY =================

    subtotalElement.innerText =
        "₹" + subtotal;

    deliveryElement.innerText =
        deliveryFee === 0
            ? "FREE"
            : "₹" + deliveryFee;

    discountElement.innerText =
        "- ₹" + discountAmount;

    totalElement.innerText =
        "₹" + finalTotal;

}


// ================= UPDATE CART COUNT =================

function updateCartCount(count) {

    cartCountElement.innerText = count;

}


// ================= INCREASE QUANTITY =================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    displayCart();

}


// ================= DECREASE QUANTITY =================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    displayCart();

}


// ================= REMOVE ITEM =================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}


// ================= SAVE CART =================

function saveCart() {

    localStorage.setItem(
        "pizzaCart",
        JSON.stringify(cart)
    );

}


// ================= APPLY COUPON =================

const couponBtn =
    document.getElementById("couponBtn");

if (couponBtn) {

    couponBtn.addEventListener(
        "click",
        function () {

            const couponInput =
                document.getElementById("couponInput");

            const couponMessage =
                document.getElementById("couponMessage");


            const coupon =
                couponInput.value
                    .trim()
                    .toUpperCase();


            // ================= EMPTY CART =================

            if (cart.length === 0) {

                couponMessage.innerText =
                    "Add items to your cart first.";

                couponMessage.style.color = "red";

                return;

            }


            // ================= VALID COUPON =================

            if (coupon === "WELCOME20") {

                couponApplied = true;

                discount = 20;


                couponMessage.innerText =
                    "✓ Coupon applied! 20% discount.";

                couponMessage.style.color =
                    "green";


                displayCart();

            }

            // ================= INVALID COUPON =================

            else {

                couponApplied = false;

                discount = 0;


                couponMessage.innerText =
                    "Invalid coupon code.";

                couponMessage.style.color =
                    "red";


                displayCart();

            }

        }
    );

}


// ================= CHECKOUT =================

const checkoutBtn =
    document.getElementById("checkoutBtn");

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert("Your cart is empty!");

                return;

            }


            // Save discount information
            if (couponApplied) {

                localStorage.setItem(
                    "pizzaDiscount",
                    "20"
                );

            } else {

                localStorage.removeItem(
                    "pizzaDiscount"
                );

            }


            // Go to checkout
            window.location.href =
                "checkout.html";

        }
    );

}


// ================= START SHOPPING =================

const startShopping =
    document.getElementById("startShopping");

if (startShopping) {

    startShopping.addEventListener(
        "click",
        function () {

            window.location.href =
                "menu.html";

        }
    );

}


// ================= CONTINUE SHOPPING =================

const continueShopping =
    document.getElementById("continueShopping");

if (continueShopping) {

    continueShopping.addEventListener(
        "click",
        function () {

            window.location.href =
                "menu.html";

        }
    );

}


// ================= LOGIN =================

const loginBtn =
    document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "login.html";

        }
    );

}


// ================= CART BUTTON =================

const cartBtn =
    document.getElementById("cartBtn");

if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        function () {

            displayCart();

        }
    );

}


// ================= INITIAL LOAD =================

displayCart();