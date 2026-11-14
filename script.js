const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx0fJwhwgSeT4zokdjGVyd7FDbtLerFxJnGX-bfEuKlTJnO8EK-625tAB2LEL0YfMFh/exec";

// STAR RATING
const stars = document.querySelectorAll(".stars span");
const ratingInput = document.getElementById("rating");

stars.forEach((star) => {
    star.addEventListener("click", () => {
        const rating = Number(star.dataset.rating);

        ratingInput.value = rating;

        stars.forEach((s) => {
            s.classList.toggle(
                "active",
                Number(s.dataset.rating) <= rating
            );
        });
    });
});

// FEEDBACK FORM
const form = document.getElementById("feedbackForm");
const statusMessage = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const rating = ratingInput.value;
    const feedback = document.getElementById("feedback").value.trim();

    if (!rating) {
        statusMessage.textContent = "Please select a star rating.";
        statusMessage.style.color = "red";
        return;
    }

    if (!feedback) {
        statusMessage.textContent = "Please enter your feedback.";
        statusMessage.style.color = "red";
        return;
    }

    const data = {
        name: name || "Anonymous",
        email: email,
        contact: contact,
        rating: rating,
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
        ratingInput.value = "";

        stars.forEach((star) => {
            star.classList.remove("active");
        });

    } catch (error) {
        statusMessage.textContent =
            "Something went wrong. Please try again.";

        statusMessage.style.color = "red";

    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Feedback";
    }
});
