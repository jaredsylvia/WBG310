const alertSpace = document.getElementById('alertSpace');

// Display alerts
function displayMessage(message, alertLevel) {
    
    let wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${alertLevel} alert-dismissible fade show" id="badAlert" role="alert">`,
        `${message}`,
        `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
        `</div>`
    ].join('');
    alertSpace.append(wrapper);
}




