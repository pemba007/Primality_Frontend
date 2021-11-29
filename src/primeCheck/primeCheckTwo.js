import { serversLinks } from "../constants";

export const primeCheckTwo = async (numbersArr) => {
  console.log("Logging two process");
  let cond = true;
  let answers = [];

  // Working Code
  cond = true;
  let result = {};
  while (cond) {
    let checkingNumber = numbersArr.pop();
    let promise1 = new Promise((resolve) => {
      fetch(
        `${serversLinks[0]}/checkPrime?numberToCheck=${checkingNumber}`
      ).then((response) => {
        response = response.json();
        console.log("resolve for 1", response);
        console.log(
          `${serversLinks[0]}/checkPrime?numberToCheck=${checkingNumber}`
        );
        resolve(response);
      });
    });

    if (numbersArr.length > 1) {
      let checkingNumber = numbersArr.pop();
      let promise2 = new Promise((resolve) => {
        fetch(
          `${serversLinks[1]}/checkPrime?numberToCheck=${checkingNumber}`
        ).then((response) => {
          response = response.json();
          console.log(
            `${serversLinks[1]}/checkPrime?numberToCheck=${checkingNumber}`
          );
          console.log("resolve for 2", response);
          resolve(response);
        });
      });
      result = await Promise.allSettled([promise1, promise2]);
    } else {
      result = await Promise.all([promise1]);
    }
    // eslint-disable-next-line no-loop-func
    result.forEach((resulttemp) => {
      answers.push(resulttemp.value);
      console.log("results", resulttemp);
    });

    // answers.push(result);

    cond = numbersArr.length > 0;
  }
  console.log("inside primce check one");
  console.log(answers);

  return answers;
};
