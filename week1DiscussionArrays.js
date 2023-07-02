let firstNames = ['James', 'Jean-Luc', 'Jonathan', 'Christopher', 'Katherine', 'Benjamin', 'Michael']; //Defining some arrays using names of Star Trek captains.
let lastNames = ['Kirk', 'Picard', 'Archer', 'Pike', 'Janeway', 'Sisko', 'Burnham'];

function randomName(arrOne, arrTwo) {   //This function randomly chooses a name from two arrays provided and returns a concatenated string of both.
    let firstName = arrOne[Math.floor(Math.random() * arrOne.length)];
    let lastName = arrTwo[Math.floor(Math.random() * arrTwo.length)];
    return(`${firstName} ${lastName}`);
}

function randomCaptain(arrOne, arrTwo) {    //This function selects a random number from the length of an array provided and returns a concatenated string where each item is in the same index location.
    let nameIndex = Math.floor(Math.random() * arrOne.length);
    let firstName = arrOne[nameIndex];
    let lastName = arrTwo[nameIndex];
    return(`${firstName} ${lastName}`);
}

function setCaptain(firstName, lastName) {  //This function combines two provided strings concatenated.
    return(`${firstName} ${lastName}`);
}

console.log("A random name that may or may not be a Star Trek captain:");
console.log(randomName(firstNames, lastNames) + "\n"); //Print the results of the randomName function.
console.log("A random name that should be a Star Trek captain:");
console.log(randomCaptain(firstNames, lastNames) + "\n"); //Print the results of the randomCaptain function.
console.log("All the captains we have defined:");

firstNames.forEach(element => {     //This loops over each item in firstNames array, uses the index position of the current firstName to pull an entry from lastNames and then prints each of the results from the setCaptain function.
    let indexValue = firstNames.indexOf(element);
    console.log(setCaptain(element, lastNames[indexValue]));
});



