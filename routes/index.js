
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '阿贵指数调查' });
};
