import './css/NumberMachine.css';
import React from 'react';

/* This is the master function that contains everything!*/
function MathsHelper() {
  
/* This state controls the yellow numbers in the display */
const [calculation, setCalculation] = React.useState("0");
  
/* This state valus is calculated and updated once the equal sign is pressed, it is shown in yellow text on the display (after the calculation string) only when it contains a value, ie the answer */
const [answer, setAnswer] = React.useState("");
  
/* This state controls the white number in the display */
const [numInput, setNumInput] = React.useState("0");

/* This is the function that controls everything that happens in the display when keys are pressed, updating the numInput and answer states as required. It also contains logic to clean up key presses, for example pressing a '+' followed by a '-', or trying to put two decimal points in a number */
function calcInput(event) {
const lastIndex = calculation.length - 1;
const secondLastIndex = calculation.length - 2;
const lastNumInput = numInput.length - 1;
  
if(!Number.isNaN(Number(event.target.value))) {
 if (numInput === "0") {
  setNumInput(event.target.value)
  setCalculation(event.target.value)
}
  else if (Number.isNaN(Number(numInput))) {
    setNumInput(event.target.value);
    setCalculation(calculation + event.target.value)
  }
  else {
  setNumInput(numInput + event.target.value)
  setCalculation(calculation + event.target.value)
}
}
else if (answer !== "") {
  setCalculation(answer + event.target.value);    
  setNumInput(event.target.value);
  setAnswer("");
}
  else if ( calculation[lastIndex] === "+" && event.target.value === "-" || calculation[lastIndex] === "*" && event.target.value === "-" || calculation[lastIndex] === "/" && event.target.value === "-" ) {
 setCalculation(calculation + event.target.value)
 setNumInput(event.target.value)      
           }
  else if ( calculation[lastIndex] === "+" || calculation[lastIndex] === "*" || calculation[lastIndex] === "/" ) {
 const removeLastOperator = calculation.slice(0, -1);
 setCalculation(removeLastOperator + event.target.value)
 setNumInput(event.target.value)
 }
else if ( calculation[lastIndex] === "-" && calculation[lastIndex - 1] === "-" ) {
 const removeLastOperator = calculation.slice(0, -2);
 setCalculation(removeLastOperator + event.target.value)
 setNumInput(event.target.value)
}
else if ( calculation[secondLastIndex] !== "-" && calculation[lastIndex] === "-" ) {
 const cleanLongOperators = calculation.slice(0, -2);
 setCalculation(cleanLongOperators + event.target.value)
 setNumInput(event.target.value)
}
else if ( numInput[lastNumInput] ==="." && event.target.value === ".") {
  setNumInput(numInput);
  setCalculation(calculation);
}
 else if ( numInput.includes(".") && event.target.value === ".") {
  setNumInput(numInput);
}
else if ( event.target.value === ".") {
  setNumInput(numInput + event.target.value)
  setCalculation(calculation + event.target.value)
}
else if ( calculation[lastIndex] === "+" && event.target.value === "+") {
  setNumInput(numInput)
  setCalculation(calculation);
}
else if (event.target.value === "+") {
  setCalculation(calculation + event.target.value)
  setNumInput(event.target.value);
}
else if ( calculation[lastIndex] === "*" && event.target.value === "*") {
  setNumInput(numInput)
  setCalculation(calculation);
}
else if (event.target.value === "*") {
  setCalculation(calculation + event.target.value)
  setNumInput(event.target.value);
}
else if ( calculation[lastIndex] === "/" && event.target.value === "/") {
  setNumInput(numInput)
  setCalculation(calculation);
}
else if (event.target.value === "/") {
  setCalculation(calculation + event.target.value)
  setNumInput(event.target.value);
}
else if ( calculation[lastIndex] === "-" && event.target.value === "-") {
  setCalculation(calculation + event.target.value)
  setNumInput(event.target.value);
}
else if (event.target.value === "-") {
  setCalculation(calculation + event.target.value)
  setNumInput(event.target.value);
}
else {
  setCalculation(calculation + event.target.value)
}
} 

/* This is the handler to clear all states when the AC button is pressed */
function clearCalcInput(){
setCalculation("0");
setAnswer("");
setNumInput("0");
}

/* This is the magic button to calculate the answer. It takes the string stored in the calculation, and computes it using eval() native javascript function (amazing!). Note that this cleans up the double minus, eg '--5', in the string. This could be moved to the calcInput function, but I prefer to leave it here as the user will see '--' in the display, rather than this be converted to a plus */
function calcAnswer(event) {
  const regexMinus = /--/g;
  const minusDoubleMinus = calculation.replace( regexMinus, "+");
  setCalculation(calculation + event.target.value)
  setAnswer(eval(minusDoubleMinus))
  setNumInput(eval(minusDoubleMinus))
}


/* The return statements. For the FCC tests to work, the id display needs to correctly tagged to look at the input button (white text) and not the yellow text. Also, the buttons need to be tagged with the id, and NOT the divs that contain them */
return (
<div id="wrapper">
<div id="calculator-container">
    <div id="logo-area">
      <i style={{'font-size': '2em', 'padding-right':'0.5em'}} class="fab fa-react"></i><div style={{'padding-top':'20px'}} >Liam's React Number Machine</div>
      </div>
      <div className="lcd">
      <div className="input" style={{'font-size':'0.8em', 'color':'#FDF9AC', 'background-color':'#333333'}} >{calculation}{answer}</div>
      <div id="display" className="answer" type="number" style={{'font-size':'1.4em', 'color':'#e5e5e5', 'padding':'10px 0 10px 0'}}>
       {numInput} 
      </div>
      
  </div>
    <div id="button-area">
      <div id="one-style" >
        <button id="one" value="1" class="number" onClick={calcInput}>1</button>
        </div>
      <div id="two-style">
        <button id="two" value="2" class="number" onClick={calcInput}>2</button>
      </div>
      <div id="three-style">
        <button id="three" value="3" class="number" onClick={calcInput}>3</button>
      </div>
      <div id="clear-style">
        <button id="clear" class="number" style={{'background-color':'#FDF9AC', 'color':'#333333'}} onClick={clearCalcInput}>AC</button>
      </div>
      <div id="four-style">
        <button id="four" value="4" class="number" onClick={calcInput}>4</button>
        </div>
      <div id="five-style">
        <button id="five" value="5" class="number" onClick={calcInput}>5</button>
      </div>
      <div id="six-style">
        <button id="six" value="6" class="number" onClick={calcInput}>6</button>
      </div>
      <div id="add-style">
        <button id="add" value="+" class="number" style={{'font-size':'1.5em'}} onClick={calcInput}>+</button>
      </div>
      <div id="subtract-style">
        <button id="subtract" value="-" class="number" style={{'font-size':'2em'}} onClick={calcInput}>-</button>
      </div>
      <div id="seven-style">
        <button id="seven" value="7" class="number" onClick={calcInput}>7</button>
        </div>
      <div id="eight-style">
        <button id="eight" value="8" class="number" onClick={calcInput}>8</button>
      </div>
      <div id="nine-style">
        <button id="nine" value="9" class="number" onClick={calcInput}>9</button>
      </div>
      <div id="multiply-style">
        <button id="multiply" value="*" class="number" style={{'font-size':'1.3em'}} onClick={calcInput}>x</button>
      </div>
      <div id="divide-style">
        <button id="divide" value="/" class="number" style={{'font-size':'1.8em'}} onClick={calcInput}>÷</button>
      </div>
      <div value="0" id="zero-style">
        <button id="zero" value="0" class="number" onClick={calcInput}>0</button>
      </div>
      <div id="decimal-style">
        <button id="decimal" value="." class="number" onClick={calcInput}>.</button>
      </div>
      <div id="equals-style">
        <button id="equals" value="=" class="number" style={{'background-color':'#333333', 'color':'#e5e5e5'}} onClick={calcAnswer}>=</button>
      </div>
      </div>
  </div>
  </div>
)

}

export default MathsHelper;
