// ['APP_ENV'].forEach((appEnv) => {
//     if (!process.env[appEnv]) {
//         process.stdout.write('APP_ENV not defined \n');
//         process.exit(1);
//     }
//     process.stdout.write(`APP_ENV is defined as ${process.env[appEnv]} \n`);
// });
const express = require('express');
const path = require('path');

const env = process.env.APP_ENV;
console.log(process.env.NODE_ENV, '-0-0-')
const app = express();
console.log('---', path.resolve(`${__dirname}/build-${env}`))
app.use('/', express.static(path.resolve(`${__dirname}/build-dev`)));

app.listen(3000, () => {
    process.stdout.write('Front Server Started at port 3000');
});
