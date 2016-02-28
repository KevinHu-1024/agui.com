exports.data = function(req, res){
  res.render('que', {newQs: [{'title': '问题1', 'content': '谈一下javascript中的闭包'}, {'title': '问题2', 'content': '数组常用的14种方法？'}, {'title': '问题3', 'content': '你有节操吗？'}, {'title': '问题4', 'content': '你有病啊'}]});
};