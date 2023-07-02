let firstNames = ['James', 'Jean-Luc', 'Jonathan', 'Christopher', 'Katherine', 'Benjamin', 'Michael'];
let lastNames = ['Kirk', 'Picard', 'Archer', 'Pike', 'Janeway', 'Sisko', 'Burnham'];

function randomName(arrOne, arrTwo) {
    let firstName = arrOne[Math.floor(Math.random() * arrOne.length)];
    let lastName = arrTwo[Math.floor(Math.random() * arrTwo.length)];
    return(`${firstName} ${lastName}`);
}

function randomCaptain(arrOne, arrTwo) {
    let nameIndex = Math.floor(Math.random() * arrOne.length);
    let firstName = arrOne[nameIndex];
    let lastName = arrTwo[nameIndex];
    return(`${firstName} ${lastName}`);
}

function setCaptain(firstName, lastName) {
    return(`${firstName} ${lastName}`);
}

console.log("A random name that may or may not be a Star Trek captain:");
console.log(randomName(firstNames, lastNames) + "\n");
console.log("A random name that should be a Star Trek captain:");
console.log(randomCaptain(firstNames, lastNames) + "\n");
console.log("All the captains we have defined:");

firstNames.forEach(element => {
    let indexValue = firstNames.indexOf(element);
    console.log(setCaptain(element, lastNames[indexValue]));
});



