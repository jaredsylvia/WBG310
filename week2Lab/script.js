$(document).ready(function() {
    // Fade Out button click event
    $('#fadeOut').on('click', function() {
      var fadeSpeed = parseInt($('#fadeSpeed').val());
      $('#exampleBox').fadeOut(fadeSpeed * 1000);
    });
  
    // Fade In button click event
    $('#fadeIn').on('click', function() {
      var fadeSpeed = parseInt($('#fadeSpeed').val());
      $('#exampleBox').fadeIn(fadeSpeed * 1000);
    });
  
    // Slide Up button click event
    $('#slideUp').on('click', function() {
      var slideSpeed = parseInt($('#slideSpeed').val());
      $('#exampleBox').slideUp(slideSpeed * 1000);
    });
  
    // Slide Down button click event
    $('#slideDown').on('click', function() {
      var slideSpeed = parseInt($('#slideSpeed').val());
      $('#exampleBox').slideDown(slideSpeed * 1000);
    });
  
    // Hide button click event
    $('#hide').on('click', function() {
      var titleSpeed = $('input[name="titleSpeed"]:checked').val();
      $('#exampleBox').hide(titleSpeed);
    });
  
    // Show button click event
    $('#show').on('click', function() {
      var titleSpeed = $('input[name="titleSpeed"]:checked').val();
      $('#exampleBox').show(titleSpeed);
    });
  
    // Toggle button click event
    $('#toggle').on('click', function() {
      var toggleSpeed = $('input[name="toggleSpeed"]:checked').val();
      $('#exampleBox').toggle(toggleSpeed);
    });
  
    // Random Color button click event
    $('#randomColor').on('click', function() {
      var randomColor = getRandomColor();
      $('#exampleBox').css('background-color', randomColor);
    });
  
    // Function to generate a random color
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  });
  