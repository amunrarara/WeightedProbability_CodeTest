"use strict";
exports.__esModule = true;
var totalWeight = 0;
function main(inputArray) {
    try {
        generateTotalWeight(inputArray); // O(N) time and O(1) space
        var randomNumber = generateRandomInt(1, totalWeight); // O(1) time and space
        var winnerIndex = getWinnerIndex(inputArray, randomNumber); // O(N) time and O(1) space
        console.log("The winning element is >>", inputArray[winnerIndex]);
        return inputArray[winnerIndex];
    }
    catch (error) {
        console.error(error);
    }
}
exports["default"] = main;
function validateInput(value) {
    if (typeof value[0] !== "string")
        throw new Error("Provided array isn't valid. It must follow this convention: [ [string, number], ... ]");
    if (typeof value[1] !== "number")
        throw new Error("Provided array isn't valid. It must follow this convention: [ [string, number], ... ]");
}
function generateTotalWeight(array) {
    array.map(function (value) {
        try {
            validateInput(value);
            totalWeight = totalWeight + value[1];
        }
        catch (error) {
            console.error(error);
        }
    });
}
function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getWinnerIndex(array, randomNumber) {
    var winnerIndex;
    var currentValue = 0;
    for (var i = 0; i < array.length; i++) {
        currentValue = currentValue + array[i][1];
        if (randomNumber <= currentValue) {
            winnerIndex = i;
            break;
        }
    }
    return winnerIndex;
}
var sampleArray = [
    ["A", 4],
    ["B", 1],
    ["C", 3],
];
main(sampleArray);
