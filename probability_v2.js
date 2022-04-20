"use strict";
// Changes:
// 1. Hoisted totalWeight and weightedArray to remove unnecessary variable duplication
// 2. Changed return value of generateWeightedArray to void and refactored to set hoisted variables
// 3. Removed main's totalWeight assignment since it now occurs within generateWeightedArray
// 4. Included memory outputs to console
exports.__esModule = true;
var totalWeight = 0;
var weightedArray;
function main(inputArray) {
    try {
        // Memory Output 
        var baseMem = process.memoryUsage().heapUsed / 1024;
        console.log(">>> Node Environment Pre-Program Heap Usage: ", baseMem, 'KB');
        // Program
        generateWeightedArray(inputArray); // O(n)
        var randomNumber = generateRandomInt(1, totalWeight);
        var winnerIndex = getWinnerIndex(weightedArray, randomNumber);
        console.log("The winning element is >>", inputArray[winnerIndex]);
        // Memory Output
        var progMem = (process.memoryUsage().heapUsed / 1024) - baseMem - (8 / 1024); // -8 bytes for baseMem and progMem floats (4 bytes each)
        console.log(">>> Program Heap Usage: ", progMem, 'KB');
        // Return
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
function generateWeightedArray(array) {
    array.map(function (value) {
        try {
            validateInput(value);
            totalWeight = totalWeight + value[1];
            weightedArray ? weightedArray.push(totalWeight) : weightedArray = [totalWeight];
        }
        catch (error) {
            console.error(error);
        }
    });
    return weightedArray;
}
function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getWinnerIndex(array, randomNumber) {
    var winnerIndex;
    for (var i = 0; i < array.length; i++) {
        if (randomNumber <= array[i]) {
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
