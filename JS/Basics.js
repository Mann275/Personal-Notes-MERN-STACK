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
console.log(tdza); //TDZ , shows error
let tdza=10;    // TDZ means the variable is in inaccessible state before initialization // like 1 to 45 tdza  is for tdza variable 
     
// Hoisting Impact per variable type
// it means moving declaration to the top of the scope and initialization remains in place or at bottom
console.log(hoist); //undefined , due to hoisting
var hoist=1; //Declaration and inialization
var hoist=undefined; //Declaration is moved to the top 
hoist=1; //initialization remains in place

// 