$(document).ready(function() {
    // Variable to track the number of clicks for the YouTube link
    var youtubeClicks = 0;
    var maxYoutubeClicks = 5; // Number of clicks to see the page after the alert
  
    // Function to handle the action for the Google link
    function handleGoogleLink(event) {
      event.preventDefault();
      var confirmed = confirm("You have unsaved information. Are you sure you want to leave this page?");
      if (confirmed) {
        var url = $(this).attr('href');
        window.location.href = url;
      }
    }
  
    // Function to handle the action for the YouTube link
    function handleYouTubeLink(event) {
      event.preventDefault();
      if (youtubeClicks < maxYoutubeClicks) {
        alert("You have " + (maxYoutubeClicks - youtubeClicks) + " clicks left to stop seeing ads.");
        youtubeClicks++;
      } else {
        var url = $(this).attr('href');
        window.location.href = url;
      }
    }
  
    // Function to handle the action for the Wikipedia link
    function handleWikipediaLink(event) {
      event.preventDefault();
      alert("This could be code that performs a function on the backend before leaving this site for the next.");
    }
  
    // Function to handle the action for adding lorem ipsum divs
    function addLoremIpsumDivs(event) {
      event.preventDefault();
      var loremDiv1 = $('<div>', {
        class: 'lorem-div',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      });
  
      var loremDiv2 = $('<div>', {
        class: 'lorem-div',
        text: 'Nulla vestibulum purus a lectus placerat, ut tincidunt massa blandit.'
      });
  
      // Append the divs just under the links
      $('ul').after(loremDiv1, loremDiv2);
    }
  
    // Get all the link elements
    var googleLink = $('#google-link');
    var youtubeLink = $('#youtube-link');
    var wikipediaLink = $('#wikipedia-link');
    var customLink = $('#custom-link');
  
    // Add event listeners for each link
    googleLink.on('click', handleGoogleLink);
    youtubeLink.on('click', handleYouTubeLink);
    wikipediaLink.on('click', handleWikipediaLink);
    customLink.on('click', addLoremIpsumDivs);
  });
