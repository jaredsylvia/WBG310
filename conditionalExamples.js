console.log(15 > 10); // returns true because 15 > 10, the condition has been met

console.log("" === ""); // returns true because "" is exactly equal to "".


let variable;
console.log(typeof variable !== "undefined"); // returns false because variable is undefined and the condition
                                              // that's being checked is wether the variable is not undefined


console.log(7 > 5 && 7 < 10); // returns true because 7 is greater than 5 AND 7 is less than 10

const text = "Hello, world!";
console.log(text.includes("world")); // returns true because the variable contains the word "world" so the condition is met.


const array = [1, 2, 3, 4, 5];
console.log(array.includes(3)); // returns true because the array does invlude 3, again the condition is


const number = 7;
console.log(number === 5 || number === 10); // returns false because number does not equal 5 OR 10, condition is unmet.


//loosely equal vs strictly equal

let oneInt = 1;
let oneStr = "1";
let zeroInt = 0;
let zeroStr = "0";
let trueBool = true;
let phoneStr = "2095551212";
let phoneInt = 2095551212;

console.log(oneInt == oneStr); //true, values are same even though types are not.
console.log(oneInt === oneStr); // false, types are not the same

console.log(zeroInt == false); //true, false is equivalent  0
console.log(zeroStr == false); // true, value of string is 0
console.log(oneStr == true); //same with 1 being true

console.log(zeroStr === false); //false, type is not bool even though values are same
console.log(oneInt === true);

console.log(oneInt == trueBool); //true because values are both true
console.log(oneInt === trueBool); // false, types are not the same

//console.log(phoneStr.slice(-4) == phoneInt.slice(-4)); // TypeError, can't slice an int.

let items = [
    { id: 100, name: "Jared"},
    { id: 101, name: "Jane"},
    { id: 102, name: "Bill"}
]
function searchItem(query){
    for(let item of items){
        if(item.id == query || item.name == query) {
            return item;
        }
    }
    return null;
}

console.log(searchItem(100));
console.log(searchItem("101"));
console.log(searchItem("Jared"));
