const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx0fJwhwgSeT4zokdjGVyd7FDbtLerFxJnGX-bfEuKlTJnO8EK-625tAB2LEL0YfMFh/exec";

// CREATE RATING BUTTONS
function createRating(containerId, count, type) {
    const container = document.querySelector(
        `#${containerId} .number-buttons`
    );

    const start = type === "recommend" ? 0 : 1;

    for (let i = start; i <= count; i++) {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = i;

        // RATING COLOURS
        if (type === "recommend") {
            if (i >= 9) {
                button.classList.add("high");
            } else if (i >= 7) {
                button.classList.add("mid");
            }
        } else {
            if (i >= 6) {
                button.classList.add("high");
            } else if (i >= 3) {
                button.classList.add("mid");
            }
        }

        // SELECT RATING
       button.addEventListener("click", () => {

    // Remove previous selection
    container.querySelectorAll("button")
        .forEach(b => b.classList.remove("selected"));

    // Highlight selected button
    button.classList.add("selected");

    // Save selected rating
    if (type === "recommend") {
        recommendation = String(i);
    } else {
        ease = String(i);
    }

});
        container.appendChild(button);
    }
}

// SELECTED RATINGS
let recommendation = "";
let ease = "";

// GENERATE RATING BUTTONS
createRating("recommendOptions", 10, "recommend");
createRating("easeOptions", 7, "ease");

// FORM ELEMENTS
const form = document.getElementById("feedbackForm");
const statusMessage = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

// SUBMIT FEEDBACK
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const service = document.getElementById("service").value;
    const feedback = document.getElementById("feedback").value.trim();

    // VALIDATION
    if (!recommendation || !ease) {
        statusMessage.textContent =
            "Please complete both rating categories.";
        statusMessage.style.color = "red";
        return;
    }

    if (!service || !feedback) {
        statusMessage.textContent =
            "Please complete all required fields.";
        statusMessage.style.color = "red";
        return;
    }

    const data = {
        name: name || "Anonymous",
        email: email,
        contact: contact,
        recommendation: recommendation,
        ease: ease,
        service: service,
        feedback: feedback
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    statusMessage.textContent = "";

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(data)
        });

        statusMessage.textContent =
            "Thank you! Your feedback has been submitted.";

        statusMessage.style.color = "green";

        form.reset();

        recommendation = "";
        ease = "";

        document.querySelectorAll(".number-buttons button")
            .forEach(button => button.classList.remove("selected"));

    } catch (error) {
        statusMessage.textContent =
            "Something went wrong. Please try again.";

        statusMessage.style.color = "red";

    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Feedback";
    }
});
