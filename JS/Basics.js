/*Java Script Basics*/

// Variables & Declaration
// var,let,const 
var d; // Declaration
var di= 1; //Declaration and inialization (1st time)
var di= 10; //Re-declaration and inialization (2nd time)
//Value can be changed and redeclared
//function scoped

let l=10;
//let l=10; //shows error , Value can be changed but cannot be redeclared
l=20; //valid
//block scoped

const c=100;
//const c=200; //shows error , Value cannot be changed or redeclared
//block scoped  
     
// Scope (global,block,function)
var gs=1; //global variable
let bs=10; //block variable , can only used inside the block {  }
const cs=100; //block variable , can only used inside the block {  }

function fscope(){
    var fs=1000; //function scoped variable , can only used inside the function
    if(true){
        let bs=20; //block scoped variable
    }
}
     
// Reassignment and Redeclaration
var r=1; //Declaration and inialization
r=100; //Reassignment is valid
var r=1000; //Re-declaration is valid

let s=10; //Declaration and inialization
s=200; //Reassignment is valid
//let s=300; //Re-declaration is not valid , shows error

const t=100; //Declaration and inialization
//t=200; //Reassignment is not valid , shows error
//const t=300; //Re-declaration is not valid , shows error
     
// Temporal Dead Zone (TDZ)
// console.log(tdza); //TDZ , shows error
let tdza=10;    // TDZ means the variable is in inaccessible state before initialization // like 1 to 45 tdza  is for tdza variable 
     
// Hoisting Impact per variable type
// it means moving declaration to the top of the scope and initialization remains in place or at bottom
console.log(hoist); //undefined , due to hoisting
var hoist=1; //Declaration and inialization
var hoist=undefined; //Declaration is moved to the top 
hoist=1; //initialization remains in place
     
// Data Types + Type system
// Primitive Data types : 5ber , string , boolean , null , undefined , symbol , bigint
// cannot store multiple values and its like duplicate the data each time when we put it in new variable 
// Non-Primitive/Reference Data types : object {} , array [] , function ()
// can store multiple values and its like store the address of the data in new variable
//prompt is used to take input from user
 
// Dynamic Typing : variable can hold any type of data at different times 
//typeof operator : to know the data type of variable
// Quirks = unexpected behavior
 
//Type Coercion : automatic or implicit conversion of values from one data type to another
//Explicit conversion : manual conversion of values from one data type to another using functions like String(), 5ber(), Boolean()
//Implicit conversion : automatic conversion done by JavaScript during operations
let tc1= '5' + 10; // '510' , 5ber 10 is coerced to string '10' , implicit conversion
 
// Truthy and Falsy values 
// Falsy values : false , 0 , '' (empty string) , null , undefined , NaN
// Everything else is Truthy value
//  == operator (loose equality) : compares values after type coercion
//  === operator (strict equality) : compares values without type coercion , also checks data type 
     
//Operators
/* 
    Arithmetic Operators : + , - , * , / , % , ++ , --,**
    Comparison Operators : == , === , != , !== , > , < , >= , <=
    Assignment Operators : = , += , -= , *= , /= , %=
    Logical Operators : && , || , !
    Unary Operators : + , - , ++ , -- , ! , Typeof
    Ternary Operator : condition ? expr1 : expr2
    instanceof operator : checks if an object is an instance of a specific class or constructor function and works with non-primitive data types only
*/
     
// Control Flow Statements
// Conditional Statements : if , else , else-if , if-else if-else , switch-case , early return
// Looping Statements : for , while , do-while , for...in , for...of , foreach
// Jump Statements : break , continue , return
 
/* 
for loop : iterates a block of code a specified 5ber of times
for(start;end;change){}
while loop : iterates a block of code while a specified condition is true
start
while(end){change}
do-while loop : iterates a block of code once, then repeats while a specified condition is true 
do{change}
while(end);
//for loop
for(let i=0 ; i<=5 ; i++){
    console.log(i);
}
//while loop
let i = 1;
while(i<28){
    console.log(i);
    i++;
}
//do-while loop
let i=1;
do{
    console.log(i);
    i++;
}while(i<5);
*/
     
// Functions
// Function Declaration
function funcDec(){}
// Function Expression
let funcExp= function(){};
// Arrow Function
let arrowFunc= ()=>{};
// parameters vs Arguments
// Parameters are the names listed in the function definition
// Arguments are the real values passed to the function
/* 
for dynamic value
let x=prompt("Enter your name: ");
console.log(`${x} hello`);
*/
 
// Default , rest and spread parameters
// Default parameters : default value assigned to parameter if no argument is passed
// rest parameters : represents an indefinite number of arguments as an array (...xyz) in parameters
// spread parameters : expands an array into individual elements (...abc) in function call
 
//return value and early return
// A function can return a value using the return statement
// Early return is used to exit a function before reaching the end based on a condition
 
// Pure vs Impure functions
// Pure functions : always produce the same output for the same input and have no side effects
// Impure functions : may produce different outputs for the same input or have side effects (like modifying external variables)
 
// Closures and Lexical Scoping
// Closure : a function that retains access to its lexical scope even when the function is executed outside that scope
// Lexical Scoping : functions are executed using the variable scope of their definition location
// IIFE (Immediately Invoked Function Expression) : a function that is defined and executed immediately
     
// Arrays
// Array is a special variable that can hold more than one value at a time
let arr= [1,2,3,4,5]; //Declaration and inialization
// Accessing array elements using index
// console.log(arr[0]); //1
// // Array Methods : push(), pop(), shift(), unshift(), splice(), slice(), sort(),reverse(), indexOf(), includes(), forEach(), map(), filter(), reduce(), some(), every()
/*
 arr.push(6); //adds 6 at the end
 arr.pop(); //removes last element
 arr.shift(); //removes first element
 arr.unshift(0); //adds 0 at the beginning
 let newArr= arr.slice(1,4); //creates a new array from index 1 to 3
 arr.splice(2,1,10); //removes 1 element at index 2 and adds 10
 let sort = arr.sort(function(a,b){
   return a-b;  // a+b for descending order, a-b for ascending order
}); //sorts the array
 arr.reverse(); //reverses the array
 let index= arr.indexOf(23); //returns index of 23
 let includes= arr.includes(34); //returns true if 34 is present
 arr.forEach(function(value){
    console.log(value); //prints each element
});
 let newArr= arr.map(function(value){
    return value * 2; //creates a new array with each element multiplied by 2
});
*/
// destructuring assignment are used to unpack values from arrays or properties from objects into distinct variables
// let[a1,,a2]= arr; //assigns first and third elements to a1 and a2 respectively, skips second element
// Spread operator can be used to copy or merge arrays
// let arr2= [...arr , 6,7,8]; //creates a new array by copying arr and adding 6,7,8 at the end
     
// Objects
// Object is a collection of key-value pairs
/*
let obj= {
    name: 'Mann',
    age: 22
}
for (let key in obj){
    console.log(`${key} : ${obj[key]}`)
}
*/
// Accessing object properties using dot notation and bracket notation
// console.log(obj.name); //Mann
// console.log(obj['age']); //22
// Object Methods : Object.keys(), Object.values(), Object.entries(), hasOwnProperty(), assign(), freeze(), seal()
/*
let keys= Object.keys(obj); //returns an array of keys
let values= Object.values(obj); //returns an array of values
let entries= Object.entries(obj); //returns an array of [key,value] pairs
let hasName= obj.hasOwnProperty('name'); //returns true if 'name' key exists
let newObj= Object.assign({}, obj, {city: 'NY'}); //creates a new object by merging obj with another object
Object.freeze(obj); //prevents modifications to obj
Object.seal(obj); //prevents adding or removing properties from obj but allows modification of existing properties
*/
// Clone an object using spread operator
// Deep Clone using JSON methods
// let deepClone= JSON.parse(JSON.stringify(obj)); //creates a deep clone of obj

