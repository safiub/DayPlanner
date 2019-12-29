var allplansam = [];
var allplanspm = [];
function time(){
  var d = new Date();
  var h = d.getHours();
	var m = d.getMinutes();
	var session = "AM";
    if(h == 0){
        h = 12;
    }
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    var time = h + ":" + m + " " + session;
		document.getElementById("time").innerText = time;
    document.getElementById("time").textContent = time;
		setTimeout(time,1000);
}
function setplans(){
	clear();
	var state = document.getElementById("upcoming");
	var list = document.createElement("select");
	list.setAttribute("id","selectt");
	for(var i=1;i<13;i++){
		var opt = document.createElement("option");
		opt.setAttribute("value",i+":"+"00");
		opt.setAttribute("id",i+":"+"00");
		var txt = document.createTextNode(i+":"+"00");
		opt.appendChild(txt);
		list.appendChild(opt);
	}
	state.appendChild(list);
	var list2 = document.createElement("select");
	list2.setAttribute("id","selectt2");
	state.appendChild(list2);
	var opt = document.createElement("option");
	opt.setAttribute("id","PM");
	opt.setAttribute("value","PM");
	var txt = document.createTextNode("PM");
	opt.appendChild(txt);
	list2.appendChild(opt);
	var opt = document.createElement("option");
	opt.setAttribute("id","AM");
	opt.setAttribute("value","AM");
	var txt = document.createTextNode("AM");
	opt.appendChild(txt);
	list2.appendChild(opt);
	var txtbox = document.createElement("textarea");
	// var br = document.createElement("br");
	// state.appendChild(br);
	txtbox.setAttribute("id","text");
	txtbox.setAttribute("placeholder","Set a plan");
	state.appendChild(txtbox);
	var bt = document.createElement("button");
	bt.setAttribute("id","sub");
	bt.innerHTML = "Submit";
	bt.onclick = set;
	state.appendChild(bt);
}
function clearplans(){
	var state = document.getElementById("plans");
	state.innerHTML = "You have no plans for today";
	allplansam = [];
  allplanspm = [];
}
function viewplans(x){
	clear();
	var main = document.getElementById('upcoming');
	var mytable = document.createElement("TABLE");
	mytable.setAttribute("id","table");
	main.appendChild(mytable);
	for (var i = 1; i < 13; i++) {
		var tr = document.createElement("TR");
		tr.setAttribute("id","i");
		for (var j = 1; j < 3; j++) {
			var td = document.createElement("TD");
			if(j<2){
				td.innerHTML = i+":"+"00";
				td.setAttribute("class","tdd");
				tr.appendChild(td);
			} else{
				td.setAttribute("id",i+":"+"00");
			tr.appendChild(td);
		}
	}
		mytable.appendChild(tr);
	}
if (allplansam.length > 0 || allplanspm.length >0) {
	if(x==11){
		if(allplansam.length!==0){
		for (var i = 0; i < allplansam.length; i++) {
			var che = allplansam[i][0];
			var bhu = document.getElementById(che);
			bhu.innerHTML = allplansam[i][1];
		}
	}
} else{
	if(allplanspm.length!==0){
	for (var i = 0; i < allplanspm.length; i++) {
		var che = allplanspm[i][0];
		var bhu = document.getElementById(che);
		bhu.innerHTML = allplanspm[i][1];
	}
}
}
} else{
  alert("noplansinpm");
	var state = document.getElementById("plans");
	state.innerHTML = "You have no plans for today";
}
}
function clear() {
	var state = document.getElementById("upcoming");
	state.innerHTML = "";
}
function set(){
	var tl = document.getElementById("selectt");
	var timeval = tl.options[tl.selectedIndex].text;
	var tl2 = document.getElementById("selectt2");
	var timeval2 = tl2.options[tl2.selectedIndex].text;
	var planval = document.getElementById("text").value;
	if(timeval2=="AM"){
	var inp = [timeval,planval];
	allplansam.push(inp);
} else{
	var inp = [timeval,planval];
	allplanspm.push(inp);
}
}
function save() {
  localStorage.setItem("plansam", allplansam);
  localStorage.setItem("planspm", allplanspm);
}
function load() {
  xx = localStorage.getItem("plansam");
  amplanslist = xx.split(",");
  yy = localStorage.getItem("planspm");
  pmplanslist = yy.split(",");
if (amplanslist.length >0) {
  for (var i = 0; i < amplanslist.length; i+=2) {
    var pair = [amplanslist[i],amplanslist[i+1]]
    allplansam.push(pair);
  }
}else{
    alert("No plans found");
  }
if(pmplanslist.length >0){
  for (var i = 0; i < pmplanslist.length; i+=2) {
     var pair = [pmplanslist[i],pmplanslist[i+1]]
     allplanspm.push(pair);
  }
}else {
  alert("No plans found");
}
}
