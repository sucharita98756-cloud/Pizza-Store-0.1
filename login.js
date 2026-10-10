// ================= ELEMENTS =================

const loginForm =
    document.getElementById("loginForm");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const emailError =
    document.getElementById("emailError");

const passwordError =
    document.getElementById("passwordError");


// ================= SHOW PASSWORD =================

const showPassword =
    document.getElementById("showPassword");

showPassword.addEventListener(
    "click",
    function () {

        if (password.type === "password") {

            password.type = "text";

            showPassword.innerText = "🙈";

        } else {

            password.type = "password";

            showPassword.innerText = "👁";

        }

    }
);


// ================= LOGIN =================

loginForm.addEventListener(
    "submit",
    function (event) {

        // Prevent page refresh

        event.preventDefault();


        // Clear previous errors

        emailError.innerText = "";

        passwordError.innerText = "";


        let valid = true;


        // ================= EMAIL VALIDATION =================

        if (email.value.trim() === "") {

            emailError.innerText =
                "Please enter your email.";

            valid = false;

        } else if (
            !email.value.includes("@") ||
            !email.value.includes(".")
        ) {

            emailError.innerText =
                "Please enter a valid email.";

            valid = false;

        }


        // ================= PASSWORD VALIDATION =================

        if (password.value.trim() === "") {

            passwordError.innerText =
                "Please enter your password.";

            valid = false;

        } else if (password.value.length < 6) {

            passwordError.innerText =
                "Password must contain at least 6 characters.";

            valid = false;

        }


        // ================= LOGIN SUCCESS =================

        if (valid) {

            /*
                This is currently frontend-only.

                Later:
                Java/Spring Boot backend
                will verify email + password
                from MySQL database.
            */

            alert(
                "Login successful! Welcome to PizzaHub 🍕"
            );


            // Go to home page

            window.location.href =
                "index.html";

        }

    }
);


// ================= GOOGLE LOGIN =================

document.getElementById("googleBtn")
    .addEventListener(
        "click",
        function () {

            alert(
                "Google Login will be connected later."
            );

        }
    );


// ================= CART COUNT =================

// Get cart from localStorage

const cart =
    JSON.parse(
        localStorage.getItem("pizzaCart")
    ) || [];


// Calculate total quantity

let totalQuantity = 0;

cart.forEach(function (item) {

    totalQuantity +=
        item.quantity;

});


document.getElementById("cartCount")
    .innerText =
        totalQuantity;


// ================= CART BUTTON =================

document.getElementById("cartBtn")
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "cart.html";

        }
    );