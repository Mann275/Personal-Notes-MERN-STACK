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
