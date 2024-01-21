const fs = require('fs');
// Blocking, Synchronous way
/*
const textIn =fs.readFileSync('./starter/txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `this is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;
fs.writeFileSync('./starter/txt/output.txt', textOut);
console.log('file written!');
*/

//Non-Blocking, Async way
fs.readFile('./starter/txt/start.txt','utf-8' , (err,data1)=> {
    fs.readFile(`./starter/txt/${data1}.txt`,'utf-8' , (err,data2)=> {
    console.log(data2);
    fs.readFile(`./starter/txt/append.txt`,'utf-8' , (err,data3)=> {
        console.log(data3);

        fs.writeFile('./starter/txt/final.txt', `${data2} \n ${data3}` ,'utf-8', err=>{
            console.log('your file has been writthen');

        })
    });
});
});
console.log('will read file!');