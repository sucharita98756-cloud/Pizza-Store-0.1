// ================= GET ORDER =================

const order =
    JSON.parse(
        localStorage.getItem("pizzaOrder")
    );


// ================= ELEMENTS =================

const noOrder =
    document.getElementById("noOrder");

const orderContent =
    document.getElementById("orderContent");


// ================= CART COUNT =================

const cart =
    JSON.parse(
        localStorage.getItem("pizzaCart")
    ) || [];

let totalQuantity = 0;

cart.forEach(function (item) {

    totalQuantity += item.quantity;

});

document.getElementById("cartCount")
    .innerText = totalQuantity;


// ================= CHECK ORDER =================

if (!order) {

    noOrder.style.display = "block";

    orderContent.style.display = "none";

} else {

    noOrder.style.display = "none";

    orderContent.style.display = "block";

    loadOrder();

}


// ================= LOAD ORDER =================

function loadOrder() {


    // Order ID

    document.getElementById("orderId")
        .innerText =
        order.orderId;


    // Date

    document.getElementById("orderDate")
        .innerText =
        "Placed on " + order.date;


    // Total

    document.getElementById("orderTotal")
        .innerText =
        "₹" + order.total.toFixed(2);


    // Customer

    document.getElementById("customerName")
        .innerText =
        order.customer.name;


    // Phone

    document.getElementById("customerPhone")
        .innerText =
        order.customer.phone;


    // Address

    document.getElementById("customerAddress")
        .innerText =
        order.address.house +
        ", " +
        order.address.city +
        " - " +
        order.address.pincode;


    // Payment

    let paymentText =
        order.paymentMethod;


    if (order.paymentMethod === "COD") {

        paymentText =
            "Cash on Delivery";

    } else if (
        order.paymentMethod === "UPI"
    ) {

        paymentText =
            "UPI";

    } else if (
        order.paymentMethod === "CARD"
    ) {

        paymentText =
            "Credit / Debit Card";

    }


    document.getElementById("paymentMethod")
        .innerText =
        paymentText;


    // Display Items

    displayOrderItems();


    // Display status

    updateOrderStatus();

}


// ================= DISPLAY ITEMS =================

function displayOrderItems() {

    const orderItems =
        document.getElementById(
            "orderItems"
        );


    orderItems.innerHTML = "";


    order.items.forEach(function (item) {

        const itemTotal =
            item.price * item.quantity;


        const itemDiv =
            document.createElement("div");


        itemDiv.className =
            "tracking-item";


        itemDiv.innerHTML = `

            <div class="item-image">

                ${item.image || "🍕"}

            </div>


            <div class="item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${item.size || "Medium"}
                    × ${item.quantity}
                </p>

            </div>


            <div class="item-price">

                ₹${itemTotal.toFixed(2)}

            </div>

        `;


        orderItems.appendChild(itemDiv);

    });

}


// ================= ORDER STATUS =================

function updateOrderStatus() {

    /*
        Current demo status:

        Order Placed

        Later this status will come
        from Java + Spring Boot backend.
    */

    const status =
        order.status;


    // Always active

    document.getElementById("step1")
        .classList.add("active");


    document.getElementById("line1")
        .classList.add("active");


    // Preparing

    if (
        status === "Preparing" ||
        status === "Out for Delivery" ||
        status === "Delivered"
    ) {

        document.getElementById("step2")
            .classList.add("active");

        document.getElementById("line2")
            .classList.add("active");

    }


    // Out for Delivery

    if (
        status === "Out for Delivery" ||
        status === "Delivered"
    ) {

        document.getElementById("step3")
            .classList.add("active");

        document.getElementById("line3")
            .classList.add("active");

    }


    // Delivered

    if (status === "Delivered") {

        document.getElementById("step4")
            .classList.add("active");

    }

}


// ================= SHOP NOW =================

document.getElementById("shopNowBtn")
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "menu.html";

        }
    );


// ================= CONTINUE SHOPPING =================

document.getElementById(
    "continueShoppingBtn"
).addEventListener(
    "click",
    function () {

        window.location.href =
            "menu.html";

    }
);


// ================= BACK HOME =================

document.getElementById("backHomeBtn")
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );


// ================= CART =================

document.getElementById("cartBtn")
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "cart.html";

        }
    );