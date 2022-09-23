const fs =  require('fs'); // request a module, return a object in which there are many functions that we can use
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplates')

///////////////////////////////////
// FILES

// // Blocking code execution
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("Completed");

// // Non-blocking code execution
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });
// console.log("Reading file...");

// // Non-blocking exercise 1
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });
// console.log("will read this...");

// // Non-blocking exercise 2
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err)
//         return console.log("ERROR! ❌");
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8', err => {
//                 console.log("Your file has been written. 😄");
//             });
//         })
//     });    
// });


///////////////////////////////////
// SERVER

// synchronous, only execute once at the beginning
const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    
    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'content-type' : 'text/html'});
        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);

    // Product Page
    } else if (pathname === '/product') {
        res.writeHead(200, {'content-type' : 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

    // API
    } else if (pathname === '/api') {
        res.writeHead(200, {'content-type' : 'application/json'});
        res.end(data);

    // Not Found
    } else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-header': 'good header'
        });
        res.end('<h1>Page not found</h1>');
    }
})

server.listen(8000, '127.0.0.1', () => {console.log("Listening to request on port 8000");
});

