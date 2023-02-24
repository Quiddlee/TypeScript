function add(num1: number, num2: number, showResult: boolean, resultPhrase: string) {
	// if (typeof num1 !== 'number' || typeof num2 !== 'number') {
	// 	throw new Error('incorrect input!');
	// }
    const result = num1 + num2
    if (showResult) {
        console.log(resultPhrase + result);
    }
    else {
        return result; 
    }
}

let number1: number;
number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: ';

add(number1, number2, printResult, resultPhrase);