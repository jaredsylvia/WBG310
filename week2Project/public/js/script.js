// Display alerts
function displayMessage(message, alertLevel) {
    
    let wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${alertLevel} alert-dismissible fade show" id="${alertLevel}Alert" role="alert">`,
        `${message}`,
        `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
        `</div>`
    ].join('');
    $('#alertSpace').append(wrapper);
}

// display modal
function showModal(title, message) {
    $('#generalModal .modal-title').text(title);
    $('#generalModal .modal-body').text(message);
    $('#generalModal').modal('show');
  }



