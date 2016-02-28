
/*
 * GET users listing.
 */

exports.wel = function(req, res){
  res.render('main', {data1:'动态数据1', data2: '动态数据2'});;
};

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };