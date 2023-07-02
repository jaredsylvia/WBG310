function validateForm() {
    //Make it easier to access the HTML elements we're working with	
    const resultsDiv = document.getElementById('results');
    const moreDiv = document.getElementById('more');

    // Clear previous error messages
    resultsDiv.textContent = '';

    // Get form values
    const fName = document.getElementById('fName').value;
    const age = document.getElementById('age').value;
    const skillType = document.querySelector('input[name="skilltype"]:checked');

    // Validate form fields
    if (!fName) {
        showError('First Name is required.');
    } else if (/\d/.test(fName)) {
        showError('First Name should not contain numbers.');
    }
    if (!age) {
        showError('Age is required.');
    } else if (isNaN(age) || +age <= 0 || +age >= 200) {
        showError('Age should be a positive number less than 200.');
    }
    if (!skillType) {
        showError('Skill Type is required.');
    }

    // If no errors, display success message
    if (resultsDiv.textContent === '') {
        resultsDiv.textContent = 'Form submitted successfully.';
        moreDiv.textContent = `First Name: ${fName}\nAge: ${age}\nSkill Type: ${skillType.value}`;
    }
}

// Show previously generated errors in the "results" div
function showError(message) {
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.textContent = message;
    resultsDiv.appendChild(errorDiv);
}

// Show selected radio button in the "more" div
function showSelectedOption() {
    const selectedOption = document.querySelector('input[name="skilltype"]:checked');
    const moreDiv = document.getElementById('more');

    if (selectedOption) {
        moreDiv.textContent = `Selected Skill: ${selectedOption.value}`;
    } else {
        moreDiv.textContent = 'Please select a skill.';
    }
}

//Instead of writing every radio option, this will do it dynamically based on what's listed in the skillOptions array.
//This could be easily modified to take in an array and an elementId, but I just did it for what we're working with here.
const skillOptions = [
    'Designer',
    'Developer',
    'Programmer',
    'Jared'
];

function generateSkillOptions() {
    const skillOptionsDiv = document.getElementById('skillOptions');

    skillOptions.forEach((option) => {
        const radioLabel = document.createElement('label');

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'skilltype';
        radioInput.value = option;
        radioInput.onclick = showSelectedOption;

        radioLabel.appendChild(radioInput);
        radioLabel.appendChild(document.createTextNode(option));

        skillOptionsDiv.appendChild(radioLabel);
        //skillOptionsDiv.appendChild(document.createElement('br')); // Add line break after each option, removed option for aesthetics
    });
}
generateSkillOptions();