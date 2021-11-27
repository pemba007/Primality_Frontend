import { serversLinks } from "../constants";

export const primeCheckOne = (numbersArr) => {
  let usageArr = [false];

  let cond = true;
  let answers = [];

  while (cond) {
    if (!usageArr[0] && usageArr.length > 0) {
      let checkingNumber = usageArr.pop();
      usageArr[0] = true;
      fetch(serversLinks[0]).then((response) => {
        usageArr[0] = false;
        console.log("The Reponse", response);
      });
    }

    // cond =
    numbersArr === 0 &&
      usageArr.every(function (e) {
        return !e;
      });
  }
  return answers;
};
