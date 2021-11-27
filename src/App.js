import "./App.css";
import { useState } from "react";

const App = () => {
  const [numbers, setNumbers] = useState("");

  const [processors, setProcessors] = useState(1);

  // This is the function to check the validity of the given values to be checked
  // const checkValidity = ({ values }) => {};

  const checkPrimes = (event) => {
    event.preventDefault();
    console.log("The values are", numbers);
    console.log("The number of processors are ", processors);
  };

  return (
    <div className='main'>
      <div>
        <h1> Group C Project</h1>
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
              setNumbers(event.target.value);
            }}
          ></textarea>
          <br />
          <label htmlFor='nodes'>Choose number of nodes to run: </label>
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
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>

          <br />

          <button type='submit' value='Submit' style={{ marginTop: "20px" }}>
            Check Primes
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
