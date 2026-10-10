document
    .getElementById("contactForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            alert("Please fill all fields.");

            return;
        }


        alert(
            "Thank you " +
            name +
            "! Your message has been sent successfully."
        );


        document
            .getElementById("contactForm")
            .reset();

    });