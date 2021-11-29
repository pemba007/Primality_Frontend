import { serversLinks } from "../constants";

export const primeCheckThree = async (numbersArr) => {
  console.log("Logging three process");
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
          console.log("resolve for 2", response);
          resolve(response);
        });
      });

      if (numbersArr.length > 1) {
        let checkingNumber = numbersArr.pop();
        let promise3 = new Promise((resolve) => {
          fetch(
            `${serversLinks[2]}/checkPrime?numberToCheck=${checkingNumber}`
          ).then((response) => {
            response = response.json();
            console.log("resolve for 3", response);
            resolve(response);
          });
        });

        result = await Promise.allSettled([promise1, promise2, promise3]);
      } else {
        result = await Promise.allSettled([promise1, promise2]);
      }
    } else {
      result = await Promise.all([promise1]);
    }
    console.log("results", result);
    // answers.push(result);
    result.forEach((resulttemp) => {
      answers.push(resulttemp.value ? resulttemp.value : resulttemp);
      console.log(
        "results here",
        resulttemp.value ? resulttemp.value : resulttemp
      );
    });

    cond = numbersArr.length > 0;
  }
  console.log("inside primce check one");
  console.log(answers);

  return answers.reverse();
};
