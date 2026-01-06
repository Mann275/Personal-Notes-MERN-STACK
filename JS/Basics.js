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

