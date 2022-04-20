// Changes:
// 1. Hoisted totalWeight and weightedArray to remove unnecessary variable duplication
// 2. Changed return value of generateWeightedArray to void and refactored to set hoisted variables
// 3. Removed main's totalWeight assignment since it now occurs within generateWeightedArray
// 4. Included memory outputs to console

type ProbabilityArray = (string | number)[][];

let totalWeight: number = 0;
let weightedArray: number[];

export default function main(inputArray: ProbabilityArray): (string|number)[] {
  try {

    // Memory Output 
    let baseMem: number = process.memoryUsage().heapUsed/1024
    console.log(">>> Node Environment Pre-Program Heap Usage: ", baseMem, 'KB');

    // Program
    generateWeightedArray(inputArray)   // O(n)
    let randomNumber: number = generateRandomInt(1,totalWeight)
    let winnerIndex: number = getWinnerIndex(weightedArray, randomNumber)
    console.log("The winning element is >>", inputArray[winnerIndex])

    // Memory Output
    let progMem: number = (process.memoryUsage().heapUsed/1024) - baseMem - (8/1024)   // -8 bytes for baseMem and progMem floats (4 bytes each)
    console.log(">>> Program Heap Usage: ", progMem, 'KB');

    // Return
    return inputArray[winnerIndex]
    
  } catch (error) {
    console.error(error);
  }
}

function validateInput(value: (string | number)[]): void {
  if (typeof value[0] !== "string") throw new Error("Provided array isn't valid. It must follow this convention: [ [string, number], ... ]")
  if (typeof value[1] !== "number") throw new Error("Provided array isn't valid. It must follow this convention: [ [string, number], ... ]")
}

function generateWeightedArray(array: ProbabilityArray): number[] {
  array.map((value) => {
    try {
      validateInput(value);
      totalWeight = totalWeight + (value[1] as number);
      weightedArray ? weightedArray.push(totalWeight) : weightedArray = [totalWeight]
    } catch (error) {
      console.error(error);
    }
  })

  return weightedArray;
}

function generateRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function getWinnerIndex(array: number[], randomNumber: number) : number {
    let winnerIndex: number;
    for (let i = 0; i < array.length; i++) {
        if (randomNumber <= array[i]) {
            winnerIndex = i
            break
        }
    }
    return winnerIndex
}

const sampleArray: ProbabilityArray = [
    ["A", 4],
    ["B", 1],
    ["C", 3],
  ];

main(sampleArray);