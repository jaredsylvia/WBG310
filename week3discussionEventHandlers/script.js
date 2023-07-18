$(document).ready(function () {
    let youtubeClicks = 0; // Variable to track the number of clicks for the YouTube link
    let maxYoutubeClicks = 5; // Number of clicks to see the page after the alert
    let currentScale = 1; // Starting scale
    let currentFontSize = 16; // Starting font size in pixels


    // Function to handle the action for the Google link
    function handleGoogleLink(event) {
        event.preventDefault();
        let confirmed = confirm("You have unsaved information. Are you sure you want to leave this page?");
        if (confirmed) {
            let url = $(this).attr('href');
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
            let url = $(this).attr('href');
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
        let loremDiv1 = $('<div>', {
            class: 'lorem-div',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        });

        let loremDiv2 = $('<div>', {
            class: 'lorem-div',
            text: 'Nulla vestibulum purus a lectus placerat, ut tincidunt massa blandit.'
        });

        // Append the divs just under the links
        $('ul').after(loremDiv1, loremDiv2);
    }

    // Function to increase scale
    function increaseScale(event) {
        event.preventDefault();
        currentScale += 0.1; // Increase scale by 10%
        $('body').css('transform', 'scale(' + currentScale + ')');
    }

    // Function to decrease scale
    function decreaseScale(event) {
        event.preventDefault();
        currentScale -= 0.1; // Decrease scale by 10%
        $('body').css('transform', 'scale(' + currentScale + ')');
    }


    // Function to increase font size
    function increaseFontSize(event) {
        event.preventDefault();
        $('*').each(function () {
            let currentFontSize = parseInt($(this).css('font-size'));
            $(this).css('font-size', (currentFontSize + 2) + 'px');
            
        });
        
    }

    // Function to decrease font size
    function decreaseFontSize(event) {
        event.preventDefault();
        $('*').each(function () {
            let currentFontSize = parseInt($(this).css('font-size'));
            $(this).css('font-size', (currentFontSize - 2) + 'px');
        });
    }

    // Function to toggle colors to high contrast
    function contrastToggle(event) {
        event.preventDefault();
        $('body').toggleClass('highContrast');
    }

    function fontToggle(event) {
        event.preventDefault();
        $('body').toggleClass('verdanaFont');
    }

    // Get all the link elements
    let googleLink = $('#google-link');
    let youtubeLink = $('#youtube-link');
    let wikipediaLink = $('#wikipedia-link');
    let customLink = $('#custom-link');

    // Get all the accessibility button elements
    let scaleUpButton = $('#scaleUp');
    let scaleDownButton = $('#scaleDown');
    let sizeUpButton = $('#sizeUp');
    let sizeDownButton = $('#sizeDown');
    let contrastToggleLink = $('#contrastToggle');
    let fontToggleLink = $('#fontToggle');

    // Add event listeners for each link
    googleLink.on('click', handleGoogleLink);
    youtubeLink.on('click', handleYouTubeLink);
    wikipediaLink.on('click', handleWikipediaLink);
    customLink.on('click', addLoremIpsumDivs);

    // Add event listeners for accessibility buttons
    scaleUpButton.on('click', increaseScale);
    scaleDownButton.on('click', decreaseScale);
    sizeUpButton.on('click', increaseFontSize);
    sizeDownButton.on('click', decreaseFontSize);
    contrastToggleLink.on('click', contrastToggle);
    fontToggleLink.on('click', fontToggle);
});
