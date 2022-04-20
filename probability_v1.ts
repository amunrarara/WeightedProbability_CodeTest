type ProbabilityArray = (string | number)[][];

export default function main(inputArray: ProbabilityArray): (string|number)[] {
  try {

    // Memory Output 
    let baseMem: number = process.memoryUsage().heapUsed/1024
    console.log(">>> Node Environment Pre-Program Heap Usage: ", baseMem, 'KB');

    // Program
    let weightedArray: number[] = generateWeightedArray(inputArray)
    let totalWeight: number = weightedArray[weightedArray.length - 1] as number
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
  let totalWeight: number = 0;
  let weightedArray: number[];

  array.map((value) => {
    validateInput(value);
    totalWeight = totalWeight + (value[1] as number);
    weightedArray ? weightedArray.push(totalWeight) : weightedArray = [totalWeight];
  });

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