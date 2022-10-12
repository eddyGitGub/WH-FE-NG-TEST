//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-01.js
 * 
 * Using fs-extra write the following json (data) into a file (data.json)
 * Through the fastify server and with help from fs-extra read the json saved in "data.json" 
 * and print out the data.user in the html response as a list of names each being as <p>{name}</p>m ex : <p>John Doe</p><p>Lucita Esau</p>
 */

import fs from "fs-extra";
import { fastify } from "fastify";

const data = { error: false, users: ["John Doe", "Lucita Esau", "Thomas Friedman", "Norma Helms", "Amy Manning"] };

// write the json saving code here


const app = fastify({
    ignoreTrailingSlash: true,
    keepAliveTimeout: 65 * 1000
});

app.get('/', (request, reply) => {
    const file = "../data.json";
    let displaydata = {};
    fs.outputJSON(file, data)
        .then(() => console.log("File created and object written successfully"))
        .catch((e) => console.log(e));
    reply.header('Content-Type', 'text/html; charset=utf-8');
    // read the json here and insert the list names into the html
    fs.readJson(file, { throws: false })
        .then(obj => {
            displaydata = obj;
        })
        .catch(err => {
            console.error(err)
        })

    const listItems = data.users.map((item) =>
        `<p>${item}</p>`
    );
    const page =
        `<html>
            <head>
                <title>Wallethub Test</title>
            </head>
            <body>
            ${listItems}
            </body>
        </html>`;

    reply.send(page);


});

// server start
app.listen(8080, "0.0.0.0").then((address) => {
    console.log(`Server started at ${address}`);
});