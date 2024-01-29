const fs = require('fs');
const http = require('http');

const url = require('url');
// Blocking, Synchronous way
/*
const textIn =fs.readFileSync('./starter/txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `this is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;
fs.writeFileSync('./starter/txt/output.txt', textOut);
console.log('file written!');


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
*/

//server

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,'utf-8');
const data =fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8' );
const dataObj = JSON.parse(data);
    
/*const replaceTemplate = (temp, product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = temp.replace(/{%IMAGE%}/g, product.image);
    output = temp.replace(/{%PRICE%}/g, product.price);
    output = temp.replace(/{%FROM%}/g, product.from);
    output = temp.replace(/{%NUTNAME%}/g, product.nutrients);
    output = temp.replace(/{%QUANTITY%}/g, product.quantity);
    output = temp.replace(/{%DESCRIPTION%}/g, product.description);
    output = temp.replace(/{%ID%}/g, product.id);

    if (!product.organic)
    output = temp.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}*/

const replaceTemplate = (temp, product) => {
    return temp.replace(
        /{%PRODUCTNAME%}|{%IMAGE%}|{%PRICE%}|{%FROM%}|{%NUTNAME%}|{%QUANTITY%}|{%DESCRIPTION%}|{%ID%}|{%NOT_ORGANIC%}/g,
        (match) => {
            switch (match) {
                case '{%PRODUCTNAME%}':
                    return product.productName;
                case '{%IMAGE%}':
                    return product.image;
                case '{%PRICE%}':
                    return product.price;
                case '{%FROM%}':
                    return product.from;
                case '{%NUTNAME%}':
                    return product.nutrients;
                case '{%QUANTITY%}':
                    return product.quantity;
                case '{%DESCRIPTION%}':
                    return product.description;
                case '{%ID%}':
                    return product.id;
                case '{%NOT_ORGANIC%}':
                    if (!product.organic)
                    return 'not-organic';
                default:
                    return match;
            }
        }
    );
};

const server =http.createServer((req,res)=>{

    const pathName = req.url;

    if (pathName ==='/' || pathName === '/overview'){
        res.writeHead(200, {'Content-type' : 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);

        res.end(output);
        
    }
    else if (pathName === '/product'){
        res.end('this is the product');
    }
    else if (pathName === '/api'){
        res.writeHead(200, {'Content-type' : 'application/json'});
        res.end(data);
    }
    else {
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-own-header' : 'hello-world'
        });
        res.end('<h1>This Page Not Found!</h1>');
    }
    
});

server.listen(8000 , '127.0.0.1', ()=>{
console.log('Listning to request on port 8000');
});