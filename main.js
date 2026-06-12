const form = document.getElementById("form-enrollment");

// Google Apps Script URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwOtunzcMI0wDysWiLui_YHBqvZEF-opSYMphItr6uj82lcmBDuS_y4gwib5t19yq4KAg/exec";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        fullName: form.querySelector('input[type="text"]').value,
        email: form.querySelector('input[type="email"]').value,
        phone: form.querySelector('input[type="tel"]').value,
        location: form.querySelectorAll('input[type="text"]')[1].value,
        course: form.querySelector('select').value,
        startDate: form.querySelector('input[type="date"]').value,
        payment: form.querySelector('input[name="payment"]:checked')?.value || "",
        signature: form.querySelectorAll('input[type="text"]')[2].value,
        agreed: form.querySelector('input[type="checkbox"]').checked
    };

    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("location", data.location);
    formData.append("course", data.course);
    formData.append("startDate", data.startDate);
    formData.append("payment", data.payment);
    formData.append("signature", data.signature);
    formData.append("agreed", data.agreed);

    try {

        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            body: formData
        });

        const result = await response.text();

        console.log("Server Response:", result);

        alert("Enrollment submitted successfully!");

        form.reset();

    } catch (error) {

        console.error("Error:", error);

        alert("Submission failed.\n\n" + error.message);

    }
});