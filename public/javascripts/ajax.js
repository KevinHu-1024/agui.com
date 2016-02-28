var btnHome = document.getElementById('btnHome');
var btnQues = document.getElementById('btnQues');
var btnAbout = document.getElementById('btnAbout');
var leftBar = document.getElementById('left-bar');
var rightContent = document.getElementById('right-content');


leftBar.onclick = function (e) {
	if (e.target.id === "btnHome") {
		console.log("home");
        rightContent.innerHTML = "正在向服务器获取数据...";
		//handle
		var x1 = new XMLHttpRequest();
		x1.onreadystatechange=function() {
		  if (x1.readyState==4 && x1.status==200)
		    {
		    	console.dir(x1);
			    rightContent.innerHTML = x1.responseText;
		    }
		 }
		x1.open("GET","/main",true);
		x1.send();
	}
	if (e.target.id === "btnQues") {
		console.log("ques");
        rightContent.innerHTML = "正在向服务器获取数据...";
		//handle
		var x2 = new XMLHttpRequest();
		x2.onreadystatechange=function() {
		  if (x2.readyState==4 && x2.status==200)
		    {
		    rightContent.innerHTML = x2.responseText;
		    }
		 }
		x2.open("GET","/que",true);
		x2.send();
	}
	if (e.target.id === "btnAbout") {
		console.log("about");
		//handle
		var x3 = new XMLHttpRequest();
		x3.onreadystatechange=function() {
		  if (x3.readyState==4 && x3.status==200)
		    {
		    rightContent.innerHTML = x3.responseText;
		    }
		 }
		x3.open("GET","about.html",true);
		x3.send();
	}
}


