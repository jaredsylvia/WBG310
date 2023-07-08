const newsletterRadios = document.querySelectorAll('input[name="newsletter"]');
const interestOptions = document.querySelectorAll('input[name="interest"]');

// validate email
function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// validate phone
function isValidPhoneNumber(phone) {
    var phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; //Regex from - https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
    return phonePattern.test(phone);
}

newsletterRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        const selectedValue = this.value;
        // Display success message with the selected value
        const successMessage = `Selected newsletter frequency: ${selectedValue}`;
        displayMessage(successMessage, "primary");
    });
});

document.getElementById('contactSubmit').addEventListener("click", function(event) {
    event.preventDefault();

    //Set variables for validation logic
    let form = document.getElementById('contactForm');
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let newsletter = document.querySelector('input[name="newsletter"]:checked').value;
    let message = document.getElementById('message').value;
    let interestNodes = document.querySelectorAll('input[name="interest"]:checked');
    let interestValues = Array.from(interestNodes).map(option => option.value);
    
    // bool and message for checking
    let isValid = true;
    let validationMessage = '';

    // Validate first name and last name
    if (!firstName || !lastName) {
        isValid = false;
        validationMessage += 'Please enter your first name and last name.<br>';
    }

    // Validate email
    if (!isValidEmail(email)) {
        isValid = false;
        validationMessage += 'Please enter a valid email address.<br>';
    }

    // Validate phone number
    if (!isValidPhoneNumber(phone)) {
        isValid = false;
        validationMessage += 'Please enter a valid phone number.<br>';
    }

    // Validate newsletter for contacting
    if (!newsletter) {
        isValid = false;
        validationMessage += 'Please select a newsletter frequency.<br>';
    }

    // Validate message length
    if (message.length < 50) {
        isValid = false;
        validationMessage += 'Please enter a message with at least 50 characters.<br>';
    }

    if (!isValid) {
        // Display validation errors
        event.preventDefault();
        displayMessage(validationMessage, "warning");
    } else {
        // Create the form data string
        var formData = "firstName=" + encodeURIComponent(firstName) +
            "&lastName=" + encodeURIComponent(lastName) +
            "&email=" + encodeURIComponent(email) +
            "&phone=" + encodeURIComponent(phone) +
            "&newsletter=" + encodeURIComponent(newsletter) +
            "&interest=" + encodeURIComponent(interestValues.join(',')) +
            "&message=" + encodeURIComponent(message);

        // Send the form data using AJAX
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/submit', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Form submission is successful
                displayMessage('Form submitted successfully.', "success");
                form.reset(); // Clear the form fields
            } else {
                // Error occurred during form submission
                displayMessage('An error occurred during form submission. Please try again.', "danger");
            }
        };
        xhr.onerror = function () {
            // Error occurred during form submission
            displayMessage('An error occurred during form submission. Please try again.', "danger");
        };
        xhr.send(formData);

    }

    return false;

});

