type ProbabilityArray = (string | number)[][];

let totalWeight: number = 0;

export default function main(inputArray: ProbabilityArray): (string|number)[] {
  try {
    generateTotalWeight(inputArray) // O(N) time and O(1) space
    let randomNumber: number = generateRandomInt(1,totalWeight) // O(1) time and space
    let winnerIndex: number = getWinnerIndex(inputArray, randomNumber) // O(N) time and O(1) space
    console.log("The winning element is >>", inputArray[winnerIndex])
    return inputArray[winnerIndex]
  } catch (error) {
    console.error(error);
  }
}

function validateInput(value: (string | number)[]): void {
  if (typeof value[0] !== "string") throw new Error("Provided array isn't valid. It must follow this convention: [ [string, number], ... ]")
  if (typeof value[1] !== "number") throw new Error("Provided array isn't valid. It must follow this convention: [ [string, number], ... ]")
}

function generateTotalWeight(array: ProbabilityArray): void {
  array.map((value) => {
    try {
      validateInput(value);
      totalWeight = totalWeight + (value[1] as number);
    } catch (error) {
      console.error(error);
    }
  })
}

function generateRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function getWinnerIndex(array: ProbabilityArray, randomNumber: number) : number {
    let winnerIndex: number;
    let currentValue: number = 0;
    for (let i = 0; i < array.length; i++) {
      currentValue = currentValue + (array[i][1] as number);
        if (randomNumber <= currentValue) {
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