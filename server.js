['APP_ENV'].forEach((appEnv) => {
    if (!process.env[appEnv]) {
        process.stdout.write('APP_ENV not defined \n');
        process.exit(1);
    }
    process.stdout.write(`APP_ENV is defined as ${process.env[appEnv]} \n`);
});
const express = require('express');
const path = require('path');

const env = process.env.APP_ENV;
const app = express();
if (process.env.APP_ENV === 'local') {
    /**
     * Get the development configuration from webpack.config.
     */
    const config = require('../webpack.config.local.js');

    /**
     * Create a webpack compiler which will output our bundle.js based on the application's code
     */
    const compiler = webpack(config);

    /**
     * Use webpack-dev-middleware, which facilitates creating a bundle.js in memory and updating it automatically
     * based on changed files
     */
    app.use(require('webpack-dev-middleware')(compiler, {
        /**
         * @noInfo Only display warnings and errors to the concsole
         */
        noInfo: true,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    }));

    /**
     * Hot middleware allows the page to reload automatically while we are working on it.
     * Can be used instead of react-hot-middleware if Redux is being used to manage app state
     */
    app.use(require('webpack-hot-middleware')(compiler));
} else {
    /**
     * If the process is production, just serve the file from the dist folder
     * Build should have been run beforehand
     */
    app.use(express.static(path.resolve(__dirname, '../dist')));
}

app.use('/', express.static(path.resolve(`${__dirname}/build-dev`)));

app.listen(5000, () => {
    process.stdout.write('Front Server Started at port 5000');
});
