const mix = require('laravel-mix');

mix
    .js('resources/js/app.tsx', 'public/js/scripts.min.js')
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
        }
    })
    .react()
    .sourceMaps(true, "source-map")
    .version();

mix
    .sass("resources/scss/styles.scss", "public/css/custom.min.css")
    .version();

mix.copyDirectory("resources/css", "public/css");
