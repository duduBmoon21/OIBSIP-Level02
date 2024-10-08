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
        // Replace 'sqrt(' with 'Math.sqrt(' to handle square root calculations correctly.
        let expression = currentExpression.replace(/sqrt\(/g, 'Math.sqrt(');
        // Safely evaluate the mathematical expression using eval.
        let result = eval(expression); 
        resultDisplay.value = result; 
        // Display the result in 'resultDisplay'.
        ans = result;  
        // Store the result in 'ans' for future use.
    } catch (e) {
        resultDisplay.value = 'Error'; 
        // If there's an error during evaluation, display 'Error' in 'resultDisplay'.
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
