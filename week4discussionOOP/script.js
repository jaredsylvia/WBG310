// Main/parent class CarBrand - a car needs all this information
class CarBrand {
    constructor(brand, logoUrl, slogan, countryOfOrigin) {
        this.brand = brand;
        this.logoUrl = logoUrl;
        this.slogan = slogan;
        this.countryOfOrigin = countryOfOrigin;
    }

    display() {
        return `<ul>
                <li>Car brand: ${this.brand}</li>
                <li>Slogan: ${this.slogan}</li>
              </ul>`;
    }

    getCountryOfOrigin() {
        return `<p class="country">Country of Origin: ${this.countryOfOrigin}</p>`;
    }

    getLogo() {
        return this.logoUrl;
    }

}

// Subclass/child class CarModel inheriting required information from CarBrand
class CarModel extends CarBrand {
    constructor(brand, model, logoUrl, slogan, countryOfOrigin, engineSize, fuelEconomy) {
        super(brand, logoUrl, slogan), countryOfOrigin; //inherting from the parent class by passing on attributes to constructor defined previously
        this.model = model; // new attributes that parent class does not have
        this.engineSize = engineSize;
        this.fuelEconomy = fuelEconomy;
    }

    display() {     //this function/method is pollymorphized - meaning it exists in the parent class, but operates differently in the child class
        return `<ul>
                <li>Car brand: ${this.brand}</li>
                <li>Model: ${this.model}</li>
                <li>Slogan: ${this.slogan}</li>
              </ul>`;
    }

    getDetails() {  //this function doesn't exist at all in the parent class
        return `<ul>
                <li>Engine Size: ${this.engineSize}</li>
                <li>Fuel Economy: ${this.fuelEconomy}</li>
              </ul>`;
    }

    //getLogo and getCountryOfOrigin don't exist in the child class at all, but as we see in the rendered html file they do exist in the object instantiated by the child class - inheritance
}

// Creating instances of the classes
const car1 = new CarBrand("Toyota", "./toyota.png", "Let's go places.", "Japan");
const car2 = new CarModel("Honda", "Civic", "./honda.png", "The power of dreams.", "Japan", "2.0L", "30 MPG");

// Document ready event to ensure DOM is loaded before manipulating it with jQuery
$(document).ready(function () {
    // Get the output element using jQuery
    const outputElement = $("#output");

    // Append div for car1 with ul element
    outputElement.append(`<div class="logo"><img src="${car1.getLogo()}"></div><div>${car1.display()}${car1.getCountryOfOrigin()}</div>`);

    // Append div for car2 with ul elements
    outputElement.append(`<div class="logo"><img src="${car2.getLogo()}"></div><div>${car2.display()}${car1.getCountryOfOrigin()}${car2.getDetails()}</div>`);
});
