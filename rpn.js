let readLineSync=require('readline-sync');
const { equal } = require('assert');
const { PRIORITY_LOW } = require('constants');
let fs=require('fs');
const { exit, mainModule } = require('process');
let rawinput=readLineSync.question();
//console.log(rawinput);
let formatedInput='';
let a= new Array();

let sym='+-*/^()';
let num='123456789';
for (let i=0;i<rawinput.length;i++)
{
    if (sym.includes(rawinput[i]))
    {
        formatedInput=formatedInput+' '+rawinput[i]+' ';
    }
    else
    {
        formatedInput=formatedInput+rawinput[i];
    }
}
a=formatedInput.split(' ');
console.log(a);



let stack=[];
let output=[];
let prior=new Map();
prior.set('(',4);
prior.set(')',4);
prior.set('^',1);
prior.set('*',2);
prior.set('/',2);
prior.set('+',3);
prior.set('-',3);
//console.log(prior);
for (i=0;i<a.length;i++)
{
    if (a[i]=='') {continue;}
    //console.log(i,stack,output);
    if (a[i]==parseFloat(a[i]))
    {
        output.push(parseFloat(a[i])); 
    }
    else
    {
        if (a[i]=='(')
        {
            stack.push(a[i]);
            continue;
        }
        if (a[i]==')')
        {
            while (stack[stack.length-1]!='(')
            {
                output.push(stack[stack.length-1]);
                stack.pop();
                if (stack.length==0) {break;}
            }
            stack.pop();
            continue;
        }
        if (stack.length==0) {stack.push(a[i]); continue;}
        while (prior.get(stack[stack.length-1])<=prior.get(a[i]))
        {
            output.push(stack[stack.length-1]);
            stack.pop();
            if (stack.length==0) {break;}
        }
        stack.push(a[i]);
    }
}
while (stack.length!=0)
{
    output.push(stack[stack.length-1]);
    stack.pop();
}
let otpStr=output[0];
for (i=1;i<output.length;i++)
{
    otpStr+=' '+output[i];
}
console.log(otpStr);

//----------------------------------------

let res=0;
let tmpFlt=0;
stack=[];
for (i=0;i<output.length;i++)
{
    if (output[i]==parseFloat(output[i]))
    {
        stack.push(output[i]);
        continue;
    }
    if (output[i]=='+')
    {
        tmpFlt=stack[stack.length-2]+stack[stack.length-1];
        stack.pop();
        stack.pop();
    }
    if (output[i]=='-')
    {
        tmpFlt=stack[stack.length-2]-stack[stack.length-1];
        stack.pop();
        stack.pop();
    }
    if (output[i]=='*')
    {
        tmpFlt=stack[stack.length-2]*stack[stack.length-1];
        stack.pop();
        stack.pop();
    }
    if (output[i]=='/')
    {
        tmpFlt=stack[stack.length-2]/stack[stack.length-1];
        stack.pop();
        stack.pop();
    }
    if (output[i]=='^')
    {
        tmpFlt=stack[stack.length-2]**stack[stack.length-1];
        stack.pop();
        stack.pop();
    }
    stack.push(tmpFlt);
}

if (stack.length>1) {console.log('Wrong input'); exit();}
if (stack[0]!=parseFloat(stack[0])) {console.log('Wrong input'); exit();}
console.log(stack[0]);




//----------------------------------------