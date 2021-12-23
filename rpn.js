let readLineSync=require('readline-sync');
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
//console.log(formatedInput);
let i=0;
let tmpStr='';
while (i<formatedInput.length)
{
    //console.log(i,tmpStr);
    if (formatedInput[i]!=' ')
    {
        tmpStr+=formatedInput[i];
    }
    else
    {
        if (tmpStr==''&&i!=0) {i++; continue;}
        if (sym.includes(tmpStr))
        {
            //console.log('sym');
            a.push(tmpStr);
        }
        else
        {
            if (tmpStr==parseFloat(tmpStr))
            {
                //console.log('number');
                a.push(parseFloat(tmpStr));
            }
        }
        tmpStr='';
    }
    i++;
}


if (sym.includes(tmpStr))
{
    //console.log('sym');
    a.push(tmpStr);
}
else
{
    if (tmpStr==parseFloat(tmpStr))
    {
        //console.log('number');
        a.push(parseFloat(tmpStr));
    }
}


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
    //console.log(i,stack,output);
    if (a[i]==parseFloat(a[i]))
    {
        output.push(a[i]); 

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
console.log(stack[0]);




//----------------------------------------