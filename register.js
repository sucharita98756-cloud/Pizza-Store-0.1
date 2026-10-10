// ================= ELEMENTS =================

const registerForm =
    document.getElementById("registerForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const phoneInput =
    document.getElementById("phone");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const terms =
    document.getElementById("terms");


// ================= SHOW PASSWORD =================

document.getElementById("showPassword")
    .addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            this.innerText = "🙈";

        } else {

            passwordInput.type = "password";

            this.innerText = "👁";

        }

    });


// ================= SHOW CONFIRM PASSWORD =================

document.getElementById("showConfirmPassword")
    .addEventListener("click", function () {

        if (confirmPasswordInput.type === "password") {

            confirmPasswordInput.type = "text";

            this.innerText = "🙈";

        } else {

            confirmPasswordInput.type = "password";

            this.innerText = "👁";

        }

    });


// ================= REGISTRATION =================

registerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Clear previous errors

        document.getElementById("nameError").innerText = "";

        document.getElementById("emailError").innerText = "";

        document.getElementById("phoneError").innerText = "";

        document.getElementById("passwordError").innerText = "";

        document.getElementById("confirmPasswordError").innerText = "";

        document.getElementById("termsError").innerText = "";


        let valid = true;


        // ================= NAME =================

        if (nameInput.value.trim() === "") {

            document.getElementById("nameError").innerText =
                "Please enter your name.";

            valid = false;

        } else if (nameInput.value.trim().length < 3) {

            document.getElementById("nameError").innerText =
                "Name must contain at least 3 characters.";

            valid = false;

        }


        // ================= EMAIL =================

        if (emailInput.value.trim() === "") {

            document.getElementById("emailError").innerText =
                "Please enter your email.";

            valid = false;

        } else if (
            !emailInput.value.includes("@") ||
            !emailInput.value.includes(".")
        ) {

            document.getElementById("emailError").innerText =
                "Please enter a valid email.";

            valid = false;

        }


        // ================= PHONE =================

        if (phoneInput.value.trim() === "") {

            document.getElementById("phoneError").innerText =
                "Please enter your phone number.";

            valid = false;

        } else if (
            !/^[0-9]{10}$/.test(phoneInput.value)
        ) {

            document.getElementById("phoneError").innerText =
                "Phone number must contain 10 digits.";

            valid = false;

        }


        // ================= PASSWORD =================

        if (passwordInput.value === "") {

            document.getElementById("passwordError").innerText =
                "Please create a password.";

            valid = false;

        } else if (passwordInput.value.length < 6) {

            document.getElementById("passwordError").innerText =
                "Password must contain at least 6 characters.";

            valid = false;

        }


        // ================= CONFIRM PASSWORD =================

        if (confirmPasswordInput.value === "") {

            document.getElementById("confirmPasswordError").innerText =
                "Please confirm your password.";

            valid = false;

        } else if (
            passwordInput.value !==
            confirmPasswordInput.value
        ) {

            document.getElementById("confirmPasswordError").innerText =
                "Passwords do not match.";

            valid = false;

        }


        // ================= TERMS =================

        if (!terms.checked) {

            document.getElementById("termsError").innerText =
                "Please accept the Terms & Conditions.";

            valid = false;

        }


        // ================= SAVE USER =================

        if (valid) {

            /*
                Frontend demo only.

                Later this information will be
                sent to Java + Spring Boot backend
                and stored in MySQL.
            */

            const user = {

                name: nameInput.value.trim(),

                email: emailInput.value.trim(),

                phone: phoneInput.value.trim(),

                password: passwordInput.value

            };


            // Save user in localStorage

            localStorage.setItem(
                "pizzaUser",
                JSON.stringify(user)
            );


            alert(
                "Registration successful! Welcome to PizzaHub 🍕"
            );


            // Go to login page

            window.location.href =
                "login.html";

        }

    }
);


// ================= GOOGLE SIGN UP =================

document.getElementById("googleBtn")
    .addEventListener(
        "click",
        function () {

            alert(
                "Google Sign Up will be connected later."
            );

        }
    );


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


// ================= CART BUTTON =================

document.getElementById("cartBtn")
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "cart.html";

        }
    );