// ================= CART COUNT =================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("pizzaCart")
        ) || [];


    let totalItems = 0;


    cart.forEach(function(item) {

        totalItems += item.quantity;

    });


    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.innerText =
            totalItems;

    }

}


// ================= COPY COUPON =================

function copyCoupon(coupon) {

    navigator.clipboard
        .writeText(coupon)
        .then(function() {

            alert(
                "Coupon copied: " + coupon
            );

        })
        .catch(function() {

            alert(
                "Coupon Code: " + coupon
            );

        });

}


// ================= GO TO MENU =================

function goToMenu() {

    window.location.href =
        "menu.html";

}


// ================= INITIAL LOAD =================

updateCartCount();