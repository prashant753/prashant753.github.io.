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
const app = express();
app.use('/', express.static(path.resolve(`${__dirname}/build-dev`)));

app.listen(5000, () => {
    process.stdout.write('Front Server Started at port 5000');
});
