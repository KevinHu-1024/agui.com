module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.render('index');
    });
    app.get('/quiz', function (req, res, next) {
        res.render('quiz', {date: '2016.02.29'});
    });
    app.get('/about', function (req, res, next) {
        res.render('about', {lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'});
    });
    app.get('/stock', function (req, res, next) {
        res.render('stock', {stock: '实时行情'});
    });
};
