const path = require('path');
const dotenv = require('dotenv');
const {
    DefinePlugin,
    ProvidePlugin,
    HotModuleReplacementPlugin,
} = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');

const {
    NODE_ENV,
    NODE_PATH: NODE_PATH_CLI = './',
} = process.env;

const NODE_PATH = path.resolve(NODE_PATH_CLI);
const IS_DEVELOPMENT = NODE_ENV === 'development';
const APP_NAME = process.env.APP_NAME || 'Title';
const BUILD_PATH = path.join(NODE_PATH, 'build');
const STATIC_PATH = path.join(NODE_PATH, 'static');

const config = {
    mode: NODE_ENV,
    entry: path.join(NODE_PATH, 'src', 'index.tsx'),
    output: {
        path: BUILD_PATH,
        filename: IS_DEVELOPMENT
            ? 'js/bundle.[fullhash].chunk.js'
            : 'js/bundle.[chunkhash].bundle.js',
        chunkFilename: 'js/bundle.[chunkhash].chunk.js',
        publicPath: '/',
        hashDigestLength: 5,
    },
    devtool: IS_DEVELOPMENT && 'source-map',
    target: IS_DEVELOPMENT ? 'web' : 'browserslist',
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js',
            '.jsx',
        ],
        alias: {
            src: path.join(NODE_PATH, 'src'),
        },
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: true,
        }),
        new DefinePlugin({
            'process.env': JSON.stringify(
                process.env.NODE_ENV === 'development'
                    ? dotenv.config({ path: '.env.development' }).parsed
                    : dotenv.config({ path: '.env.production' }).parsed,
            ),
        }),
        new HtmlWebpackPlugin({
            template: path.join(NODE_PATH, 'src', 'index.html'),
            title: APP_NAME,
        }),
        new ProvidePlugin({
            React: 'react',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: STATIC_PATH,
                    to: BUILD_PATH,
                },
            ],
        }),

        IS_DEVELOPMENT && new HotModuleReplacementPlugin(),
        IS_DEVELOPMENT && new FriendlyErrorsWebpackPlugin(),

        !IS_DEVELOPMENT && new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:5].[id].css',
            chunkFilename: 'css/[name].[contenthash:5].[id].css',
        }),
        !IS_DEVELOPMENT && new CleanWebpackPlugin({
            verbose: true,
        }),
        !IS_DEVELOPMENT && new LodashWebpackPlugin({
            collections: true,
            shorthands: true,
        }),
        !IS_DEVELOPMENT && new WebpackBar(),
        !IS_DEVELOPMENT && new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            openAnalyzer: false,
            generateStatsFile: true,
        }),
        !IS_DEVELOPMENT && new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            navigateFallback: '/index.html',
            mode: 'production',
        }),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /src/,
                exclude: /node_modules/,
                use: {
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'tsx',
                        target: 'es2015',
                    },
                },
            },
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    IS_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]__[hash:base64:5]',
                            },
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    IS_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
                exclude: /\.module\.s[ac]ss$/i,
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[hash:5].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        // Disable optimizations
                        options: IS_DEVELOPMENT
                            ? {
                                bypassOnDebug: true,
                                disable: true,
                                publicPath: './src',
                            }
                            : {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65,
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // Do not enable webp options
                                // https://github.com/tcoopman/image-webpack-loader/issues/208
                            },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    IS_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]',
                            },
                            sourceMap: true,
                        },
                    },
                    { loader: 'postcss-loader' },
                ],
                exclude: /\.module\.css$/,
            },
        ],
    },
};

if (IS_DEVELOPMENT) {
    config.devServer = {
        contentBase: path.join(NODE_PATH, 'build'),
        open: false,
        port: 3000,
        hot: true,
        historyApiFallback: true,
        overlay: true,
        quiet: true,
        clientLogLevel: 'none',
        noInfo: true,
    };
} else {
    config.optimization = {
        nodeEnv: 'production',

        // dependency graph → компиляция
        // module graph → output
        // chunk graph → output

        // production: минификация JavaScript.
        minimize: true,
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],

        // production: останавливает эмит сборки при возникновении ошибки во время компиляции.
        emitOnErrors: false,

        // ✓ Не добавляет в сборку пустые чанки — это уменьшает нагрузку на систему, что ускоряет ребилд.
        removeEmptyChunks: true,
        // ✓ Объединяет эквивалентные чанки.
        mergeDuplicateChunks: true,
        // ✓ Удаляет модуль из чанка, если этот модуль присутствует в родительском чанке (то есть уже доступен).
        removeAvailableModules: true,

        // production: анализирует module graph и пытается найти модули, которые можно смержить в один единый модуль.
        // ? эта настройка зависит от providedExports и usedExports.
        concatenateModules: true, // module concatenation, scope hoisting

        // ✓ определяет экспорированные сущности для каждого модуля.
        // Эта информация помогает остальным продвинутым оптимизациям вебпак.
        providedExports: true,
        // production: определяет использованные экспортированные сущности для каждого модуля.
        // Эта информация помогает остальным продвинутым оптимизациям вебпак.
        // Пример: минификаторы и DCE (dead code elimination) могут удалять неиспользованные экспорты из финальной сборки.
        // ? эта настройка зависит от providedExports
        usedExports: true,
        // production: собирает зависимость более эффективно, если в package.json зависимости стоит этот флаг.
        // ? эта настройка зависит от providedExports и usedExports
        sideEffects: true,

        // development: вместо числовых идентификаторов даёт модулям более понятные имена.
        moduleIds: IS_DEVELOPMENT ? 'named' : 'size',

        // development: вместо числовых идентификаторов даёт чанкам более понятные имена.
        chunkIds: IS_DEVELOPMENT ? 'named' : 'size',

        // initial chunk (vedors — react, react-dom)
        // async chunk (on demond)

        // Эта опция включена всегда. Когфигурируется в SplitChunksPlugin.
        splitChunks: {
            // Режим разделения кода. По-умолчанию — async.
            chunks: 'all', // initial, all (async + initial)
            // Минимальный размер нового чанка для отделения.
            minSize: 30000, // bytes
            // Минимальное количество чанков, которые зависят от модуля
            // перед отделением этого модуля в отдельный чанк.
            minChunks: 1,
            // Максимальное количество одновременных параллельных запросов чанков для асинхронного сплит-поинта (динамический импорт).
            // Всегда предпочитаются чанки большего размера.
            maxAsyncRequests: 5,
            // Максимальное количество одновременных параллельных запросов чанков на один entrypoint.
            // Всегда предпочитаются чанки большего размера.
            maxInitialRequests: 3,
            // Символ-разделитель имени сплит-чанка (напр. vendors~main.js).
            automaticNameDelimiter: '~',
            // Мо-умолчанию cacheGroups наследует от остальных опций splitChunks ↑.
            // Уникальные для cacheGroups только test, priority и reuseExistingChunk.
            // Ключ каждой кеш-группы определяет её имя.
            // По-умолчанию вебпак устанавливает две кеш-группы:
            cacheGroups: {
                // Дефолтная кеш-группа. Выносит все зависимости из node_nodules в чанк vendors.
                defaultVendors: {
                    // Выбирает модули, внесённые в данную кеш-группу. Если не указать будут выбраны все модули.
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    // Дефолтная кеш-группа. Выносит любой модуль-зависимость в отдельный чанк default
                    // при условии дублирования модуля-зависимости хотя-бы в двух чанках.
                    minChunks: 2,
                    // Приоритет кеш-группы. Если модуль попадает сразу в несколько кеш-групп, то выбирется
                    // кеш-группа с более высоким priority, или которая составляет чанк большего размера.
                    // У дефолтных кеш-групп отрицательный приоритет,
                    // поэтому кастомные кеш-группы приоритетнее (их priority 0 по-умолчанию).
                    priority: -20,
                    // Если чанк содержит уже существующий отделённый чанк,
                    // то используется этот уже существующий отделённый чанк вместо создания нового
                    reuseExistingChunk: true,
                },
            },
        },
        // Выносит webpack runtime каждого entrypoint в отдельный чанк. false по-умолчанию.
        runtimeChunk: true,
    };
}

module.exports = config;
