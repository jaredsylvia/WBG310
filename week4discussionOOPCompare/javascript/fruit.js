class Fruit {
    constructor() {
      this._name = '';
      this._color = '';
    }
  
    _toLowerCase(input) {
      return input.toLowerCase();
    }
  
    _capitalizeFirstLetter(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    }
  
    set name(name) {
      this._name = this._toLowerCase(name);
    }
  
    get name() {
      return this._capitalizeFirstLetter(this._name);
    }
  
    set color(color) {
      this._color = this._toLowerCase(color);
    }
  
    get color() {
      return this._capitalizeFirstLetter(this._color);
    }
  }

  module.exports = { Fruit };
  