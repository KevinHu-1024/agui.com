
/*
 * GET users listing.
 */

exports.wel = function(req, res){
  res.render('main', {str:'欢迎', name: 'kevin!'});;
};

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };