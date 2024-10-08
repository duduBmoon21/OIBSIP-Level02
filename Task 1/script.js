let expressionDisplay = document.getElementById('expression'); 
let resultDisplay = document.getElementById('result');
let currentExpression = '';
let ans = 0;

function btnInput(number) {
    currentExpression += number; 
    // Append the passed 'number' to 'currentExpression'.
    expressionDisplay.value = currentExpression; 
    // Update the 'expressionDisplay' to show the current expression.
}

function btnInput(operator) {
    currentExpression += operator; 
    // Append the passed 'operator' to 'currentExpression'.
    expressionDisplay.value = currentExpression; 
    // Update the 'expressionDisplay' to show the current expression.
}

function clearScreen() {
    currentExpression = ''; 
    // Reset 'currentExpression' to an empty string.
    expressionDisplay.value = ''; 
    // Clear the 'expressionDisplay'.
    resultDisplay.value = ''; 
    // Clear the 'resultDisplay'.
}

function deleteLast() {
    currentExpression = currentExpression.slice(0, -1); 
    // Remove the last character from 'currentExpression'.
    expressionDisplay.value = currentExpression; 
    // Update the 'expressionDisplay' to reflect the current expression.
}

function calculateResult() {
    try {
        // Replace 'sqrt(' with 'Math.sqrt(' for square root calculations
        let expression = currentExpression.replace(/sqrt\(/g, 'Math.sqrt(');
        
        // Check for division by zero before evaluating the expression
        if (/\/0+(?!\.)/.test(expression)) {  // Matches division by zero (not decimals)
            resultDisplay.value = 'Error: Division by Zero';
            return;
        }

        // Safely evaluate the mathematical expression using eval
        let result = eval(expression);

        // Handle results like Infinity or -Infinity due to division by zero or large numbers
        if (result === Infinity || result === -Infinity) {
            resultDisplay.value = 'Error: Division by Zero';
        } else {
            // Display the result in 'resultDisplay'
            resultDisplay.value = result;
            // Store the result in 'ans' for future use
            ans = result;
        }
    } catch (e) {
        console.error("Error evaluating expression:", e);
        resultDisplay.value = 'Error';
    }
}


function insertAns() {
    currentExpression += ans; 
    // Append the last calculated result ('ans') to 'currentExpression'.
    expressionDisplay.value = currentExpression; 
    // Update the 'expressionDisplay' to show the updated expression.
}

function toggleSign() {
    // Check if the first character of 'currentExpression' is a '-' (indicating a negative number).
    if (currentExpression.charAt(0) === '-') {
        currentExpression = currentExpression.slice(1); 
        // If it is negative, remove the '-' sign.
    } else {
        currentExpression = '-' + currentExpression;  
        // If it is positive, add a '-' sign to the beginning.
    }
    expressionDisplay.value = currentExpression; 
    // Update the 'expressionDisplay' to show the current expression with the toggled sign.
}
