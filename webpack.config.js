const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключили плагин для html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин для удаления содержимого папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключите к проекту mini-css-extract-plugin

module.exports = {
  entry: { main: './src/pages/index.js'}, // Указываем точку входа
  output: {
    path: path.resolve(__dirname, 'dist'), // Папка для собранного кода
    filename: 'main.js', // Имя выходного файла
    publicPath: '', 
  },
  mode: 'development', // добавили режим разработки
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true, // сайт будет открываться сам при запуске npm run dev
    hot: false, //  ОТКЛЮЧАЕМ HMR
    liveReload: false 
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: /node_modules/
      },
      // добавили правило для обработки файлов
  {
    // регулярное выражение, которое ищет все файлы с такими расширениями
    test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource',
    generator: {
      filename: 'images/[name][ext]', // все изображения попадут в dist/images/
    }
  },
  {
    // применять это правило только к CSS-файлам
    test: /\.css$/,
    // при обработке этих файлов нужно использовать
    // MiniCssExtractPlugin.loader и css-loader
    use: [MiniCssExtractPlugin.loader, {
      loader: 'css-loader',
      options: { importLoaders: 1 }
    },
    'postcss-loader']
    } 
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // использовали плагин
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов 
      ]
};

