import { serversLinks } from "../constants";

export const primeCheckOne = async (numbersArr) => {
  let cond = true;
  let answers = [];

  // Working Code
  cond = true;

  while (cond) {
    let checkingNumber = numbersArr.pop();
    const promise1 = new Promise((resolve) => {
      fetch(
        `${serversLinks[0]}/checkPrime?numberToCheck=${checkingNumber}`
      ).then((response) => {
        response = response.json();
        resolve(response);
      });
    });
    let result = await Promise.all([promise1]);
    answers.push(result);

    cond = numbersArr.length > 0;
  }
  console.log("inside primce check one");
  console.log(answers);

  return answers.reverse();
};
