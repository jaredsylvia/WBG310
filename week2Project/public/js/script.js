document.getElementById('contactForm').addEventListener('submit', function (event) {
    // Reset previous validation messages
    resetValidation();

    event.preventDefault();


    // Perform your custom validation
    var form = document.getElementById('contactForm');
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var newsletter = document.querySelector('input[name="newsletter"]:checked').value;
    var message = document.getElementById('message').value;
    var interestNodes = document.querySelectorAll('input[name="interest"]:checked');
    var interestValues = Array.from(interestNodes).map(option => option.value);


    var isValid = true;
    var validationMessage = '';

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
        displayError(validationMessage);
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
                displaySuccess('Form submitted successfully.');
                form.reset(); // Clear the form fields
            } else {
                // Error occurred during form submission
                displayError('An error occurred during form submission. Please try again.');
            }
        };
        xhr.onerror = function () {
            // Error occurred during form submission
            displayError('An error occurred during form submission. Please try again.');
        };
        xhr.send(formData);

    }

    return false;
});


// Helper function to reset validation messages and remove validation styling
function resetValidation() {
    var alertArea = document.getElementById('alertArea');
    var alertMessage = alertArea.querySelector('.alert-message');

    alertArea.style.display = 'none';
    alertArea.classList.remove('alert-danger');
    alertMessage.innerHTML = '';
}

// Helper function to validate email address
function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Helper function to validate phone number
function isValidPhoneNumber(phone) {
    var phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; //Regex from - https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
    return phonePattern.test(phone);
}

// Helper function to display error in the alert area
function displayError(message) {
    var alertArea = document.getElementById('alertArea');
    var alertMessage = alertArea.querySelector('.alert-message');
    
    alertArea.style.display = 'block';
    alertArea.classList.add('alert-danger');
    alertMessage.innerHTML = message;
}

// Helper function to display success message in the alert area
function displaySuccess(message) {
    var alertArea = document.getElementById('alertArea');
    var alertMessage = alertArea.querySelector('.alert-message');
    resetValidation();
    alertArea.style.display = 'block';
    alertArea.classList.add('alert-success');
    alertMessage.innerHTML = message;
}

const newsletterRadios = document.querySelectorAll('input[name="newsletter"]');
const interestOptions = document.querySelectorAll('input[name="interest"]');

newsletterRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        const selectedValue = this.value;
        const radioGroup = document.querySelectorAll(`input[name="${this.name}"]`);

        radioGroup.forEach(radio => {
            if (radio.checked) {
                radio.parentElement.classList.add('btn-success');
            } else {
                radio.parentElement.classList.remove('btn-success');
            }
        });

        // Display success message with the selected value
        const successMessage = `Selected newsletter frequency: ${selectedValue}`;
        displaySuccess(successMessage);
    });
});



interestOptions.forEach(option => {
    option.addEventListener('change', () => {
        if (option.checked) {
            option.parentElement.classList.add('btn-success');
        } else {
            option.parentElement.classList.remove('btn-success');
        }
    });
});

const closeButton = document.querySelector('#alertArea .close');
const alertArea = document.querySelector('#alertArea');

closeButton.addEventListener('click', () => {
    alertArea.style.display = 'none';
});
