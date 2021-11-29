import { useState } from "react";
import "./App.css";
import { primeCheckFive } from "./primeCheck/primeCheckFive";
import { primeCheckFour } from "./primeCheck/primeCheckFour";
import { primeCheckOne } from "./primeCheck/primeCheckOne";
import { primeCheckThree } from "./primeCheck/primeCheckThree";
import { primeCheckTwo } from "./primeCheck/primeCheckTwo";

const App = () => {
  const [numbers, setNumbers] = useState("");

  const [processors, setProcessors] = useState(1);

  const [showTime, setShowtTime] = useState(false);

  const [timeTaken, setTimeTaken] = useState(0);

  const [error, setError] = useState(false);

  // const [originalNumbers, setOriginalNumbers] = useState([]);

  const setNotError = () => {
    setError(false);
  };

  const checkPrimes = async (event) => {
    event.preventDefault();

    if (!validateNumbers(numbers)) {
      setError(true);
    } else {
      var startTime = performance.now();
      let numbersArr = Array.from(new Set(getNumbers(numbers)));

      console.log("The values are", numbersArr);
      console.log("The number of processors are ", processors);

      const originalNumbers = [...numbersArr];

      // Function to get the answers

      let answers = [];
      switch (parseInt(processors)) {
        case 1:
          // Using 1 processor
          answers = await primeCheckOne(numbersArr);
          break;
        case 2:
          // Using 2 processor
          answers = await primeCheckTwo(numbersArr);
          break;
        case 3:
          // Using 3 processor
          answers = await primeCheckThree(numbersArr);
          break;
        case 4:
          // Using 4 processor
          answers = await primeCheckFour(numbersArr);
          break;
        case 5:
          // Using 5 processor
          answers = await primeCheckFive(numbersArr);
          break;
        default:
      }
      console.log("Answers Before", answers);
      // answers = getAnswersArray(answers);
      console.log("Answers", answers);

      console.log("Original Numbers array", originalNumbers);
      var endTime = performance.now();
      setTimeTaken(endTime - startTime);
      console.log("Total Time Take ", endTime - startTime, "milliseconds");
    }
  };

  const getAnswersArray = (answers) => {
    let res = [];

    for (let x = 0; x < answers.length; x++) {
      console.log("values", answers[x][0].answer);
      res.push(answers[x][0].answer === "True" ? true : false);
    }
    return res;
  };

  const validateNumbers = (testingString) => {
    let regex = /^[0-9,]*$/g;
    return regex.test(testingString);
  };

  const getNumbers = (testingString) => {
    return testingString.split(",");
  };

  const milisecondsToSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <div className='main'>
      <div>
        <h1>CS 524 : Distributed Systems</h1>
        <h2>Testing Primality of multiple numbers</h2>

        <form onSubmit={checkPrimes}>
          <label htmlFor='numbers'>Enter numbers : </label>
          <br />
          <br />
          <textarea
            id='numbers'
            name='numbers'
            rows='10'
            cols='50'
            placeholder='Enter the comma separated values to check for primes!!'
            value={numbers}
            onChange={(event) => {
              setNotError();
              setNumbers(event.target.value);
            }}
          ></textarea>

          <br />
          {error && (
            <p style={{ color: "red " }}>
              Please enter comma separated numbers
            </p>
          )}
          <br />
          <label htmlFor='nodes' style={{ marginTop: "10px" }}>
            Choose number of nodes to run:
          </label>
          <br />

          <select
            name='nodes'
            id='nodes'
            onChange={(e) => setProcessors(e.target.value)}
          >
            <option value={1} defaultChecked>
              1
            </option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>

          <br />

          <button type='submit' value='Submit' style={{ marginTop: "20px" }}>
            Check Primes
          </button>
          {showTime && (
            <div className='timeTaken'>
              Calculation Time :<p>{milisecondsToSeconds(timeTaken)}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;
