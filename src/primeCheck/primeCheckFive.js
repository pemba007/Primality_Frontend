import { serversLinks } from "../constants";

export const primeCheckFive = async (numbersArr) => {
  console.log("Logging five process");
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

        if (numbersArr.length > 1) {
          let checkingNumber = numbersArr.pop();
          let promise4 = new Promise((resolve) => {
            fetch(
              `${serversLinks[3]}/checkPrime?numberToCheck=${checkingNumber}`
            ).then((response) => {
              response = response.json();
              console.log("resolve for 4", response);
              resolve(response);
            });
          });
          result = await Promise.allSettled([
            promise1,
            promise2,
            promise3,
            promise4,
          ]);
          if (numbersArr.length > 1) {
            let checkingNumber = numbersArr.pop();
            let promise5 = new Promise((resolve) => {
              fetch(
                `${serversLinks[4]}/checkPrime?numberToCheck=${checkingNumber}`
              ).then((response) => {
                response = response.json();
                console.log("resolve for 5", response);
                resolve(response);
              });
            });
            result = await Promise.allSettled([
              promise1,
              promise2,
              promise3,
              promise4,
              promise5,
            ]);
          } else {
            result = await Promise.allSettled([
              promise1,
              promise2,
              promise3,
              promise4,
            ]);
          }
        } else {
          result = await Promise.allSettled([promise1, promise2, promise3]);
        }
      } else {
        result = await Promise.allSettled([promise1, promise2]);
      }
    } else {
      result = await Promise.all([promise1]);
    }
    console.log("results", result);
    answers.push(result);

    cond = numbersArr.length > 0;
  }

  console.log("inside primce check");
  console.log("numbers arr", numbersArr);
  console.log(answers);
  result.forEach((resulttemp) => {
    answers.push(resulttemp.value ? resulttemp.value : resulttemp);
    console.log(
      "results here",
      resulttemp.value ? resulttemp.value : resulttemp
    );
  });

  return answers.reverse();
};
