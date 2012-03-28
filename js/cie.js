function login() {
	console.log("Coming to get Json Details function");
	var params;
	//var a=document.getElementById('username').value;
	var a=document.getElementById('textfield').value;
	//var b=document.getElementById('password').value;
	var b=document.getElementById('textfield2').value;
	if(a == "" || b == "")
	{
		document.getElementById('nomatch').innerHTML = "<p>Please enter all the fields</p>";
		return;
	}
	params = 'username='+a+'&password='+b;
	console.log(params);
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log(xmlhttp.responseText);
			if(xmlhttp.responseText == "Y")
			{
				window.location = "http://localhost/CIE/home.html";
			}
			else
			{
				document.getElementById('nomatch').innerHTML = "<p>Name/Password incorrect<p>";
			}
		}
	}
	xmlhttp.open("POST","http://localhost/CIE/php/login.php?",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(params);
}

/** getDetails is a function which will get the information about the current teacher who is logged in and the subjects they handle
 *  This function is called immediately after the teacher logs in from his/her system. This function decides the first page
 *  that should appear on the browser after the teacher logs in by sending the obtained JSONObject to the function constructHomeUi
**/
function getDetails(){
	//adminLogin();
	//return;
	console.log("Coming from home page");
	var temp;
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log("Response is coming from the getDetails.php");
			var JSONObject = xmlhttp.responseText;
			temp = eval ("(" + JSONObject + ")");
			constructUi(temp);
		}
	}
	xmlhttp.open("POST","http://localhost/CIE/php/getdetails.php",true);
	xmlhttp.send();
}


/**
 * constructHomeUi() is a function which takes as input a valid evaluated JSON object
 * and constructs the home page after the teacher has logged in. 
 * This function is called from the function getDetails. No return values
**/
function constructUi(home)
{
	console.log(home);
	var name =  home["name"];
	//Retrieving Each subject a teacher is handling
	var subjects = "";
	var tests = new Array();
	var labs = new Array();
	for(var i = 0; i<home["subject"].length ; i++)
	{
		if(i==0) {
			subjects += '<li class="headerMenu selected" id="sub'+i+'li"><a id="sub'+i+'">'+home["subject"][i]["name"]+'</a></li>';
		}
		else
		{
			subjects += '<li class="headerMenu" id="sub'+i+'li"><a id="sub'+i+'">'+home["subject"][i]["name"]+'</a></li>';
		}
		if(home["subject"][i]["lab"]==0) {
			tests[i] = '<li class="headerMenu" id="test1li"><a id="test1">Test1</a></li><li class="headerMenu" id="test2li"><a id="test2">Test2</a></li><li class="headerMenu" id="finalli"><a id="final">Final</a></li>';
			labs[i] = 0;
		}
		else {
			tests[i] = '<li class="headerMenu" id="test1li"><a id="test1">Test1</a></li><li class="headerMenu" id="test2li"><a id="test2">Test2</a></li><li class="headerMenu" id="labli"><a id="lab">Lab</a></li><li class="headerMenu" id="finalli"><a id="final">Final</a></li>';
			labs[i] = 1;
		}
	}
	//flag will be pointing to the subject currently being used
	var flag =0;
	var tableBody="";
	var students = "";
	var tableupdate = "";
	$("#main").html('<div id="header"> <div id="logo"> <div id="logo_text"><h1><a href="index.html">CIE<span class="logo_colour">Marks</span></a></h1> <h2>Information Science Department Marks Automation</h2> <h2><b><i>Welcome '+name+'</i></b><h2> </div> </div> <div id="menubar"> <ul id="menu">'+subjects+'<li class="headerMenu"><a id="signoutLink" onClick="signout()">Sign Out</a></li></ul> </div> </div><div id="innerbody"><div id="menubar"> <ul id="menu">'+tests[0]+'</ul> </div> <div id="site_content"><form id="updateForm"> <table id="updateTable">'+tableBody+'</table> </form><div id="content">'+students+'</div><input type="button" id="saveButton" value="SAVE"/></div></div><div id="content_footer"></div> <div id="footer"> Copyright &copy; CIE | INFORMATION SCIENCE | PESIT </div>');
	initialize();
	function initialize() {
		tableupdate=home["subject"][0]["course"];
		console.log("hello"+tableupdate);
		var subtab = 0;
		console.log("Coming inside sub1");
		flag=0;
		//$("#main").html('<div id="header"> <div id="logo"> <div id="logo_text"><h1><a href="index.html">CIE<span class="logo_colour">Marks</span></a></h1> <h2>Information Science Department Marks Automation</h2> <h2><b><i>Welcome '+name+'</i></b><h2> </div> </div> <div id="menubar"> <ul id="menu">'+subjects+'<li class="headerMenu"><a id="signoutLink" onClick="signout()">Sign Out</a></li></ul> </div> </div><div id="menubar"> <ul id="menu">'+tests[0]+'</ul> </div> <div id="site_content"><form id="updateForm"> <table id="updateTable">'+tableBody+'</table> </form><div id="content">'+students+'</div><input type="button" id="saveButton" value="SAVE"/> </div> <div id="content_footer"></div> <div id="footer"> Copyright &copy; CIE | INFORMATION SCIENCE | PESIT </div>');
		$("#innerbody").html('<div id="menubar"> <ul id="menu">'+tests[0]+'</ul> </div> <div id="site_content"><form id="updateForm"> <table id="updateTable">'+tableBody+'</table> </form><div id="content">'+students+'</div><input type="button" id="saveButton" value="SAVE"/> </div>');
		clearSubStyles();
		$('#sub0li').addClass("selected");
		test1sub0();
		function test1sub0() {
			subtab = 1;
			console.log("Test 1 clicked in "+flag+" subject");
			tableBody = '<thead id="updateTableHead"> <th>USN</th> <th>T1 Score(Out Of 50)</th> <th>T1 Attendance(%)</th> <th>T1 Score(Out Of 20)</th> </thead><tbody>';
			for(var i=0;i<home["subject"][flag]["student"].length;i++) {
				tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Test_1"]+'"/></td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Attendance%_t1"]+'" /></td> <td>'+(home["subject"][flag]["student"][i]["Test_1"]/2.5)+'</td></tr>';
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#test1li').addClass("selected");
		}
		$('#test1').click(function() {
			test1sub0();
		});
		$('#test2').click(function() {
			subtab = 2;
			console.log("Entering sub1 local test2");
			tableBody = '<thead id="updateTableHead"> <th>USN</th> <th>T2 Score(Out Of 50)</th> <th>T2 Attendance(%)</th> <th>T2 Score(Out Of 20)</th> </thead>';
			for(var i=0;i<home["subject"][flag]["student"].length;i++) {
						tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Test_2"]+'"/></td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Attendance%_t2"]+'"/></td> <td>'+(home["subject"][flag]["student"][i]["Test_2"]/2.5)+'</td> </tr></tbody>';
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#test2li').addClass("selected");
		});
		$('#lab').click(function() {
			subtab = 3;
			console.log("Entering sub1 local lab");
			tableBody = '<thead id="updateTableHead"><th>USN</th><th>Lab Internal</th><th>Lab Internal Total</th><th>Total</th> </thead>';
			for(var i=0;i<home["subject"][flag]["student"].length;i++) {
					tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Lab_Internal"]+'"/></td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Lab_attendance"]+'"/></td> <td>'+(home["subject"][flag]["student"][i]["Lab_Internal_total"])+'</td> </tr></tbody>';
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#labli').addClass("selected");
		});
		$('#final').click(function() {
			subtab = 4;
			console.log("Entering sub1 local final");
			if(labs[0]==0) {
				tableBody = '<thead id="updateTableHead"><th>USN</th><th>Theory Total</th><th>Theory Attendance</th><th>TOTAL</th></thead></tbody>';
				for(var i=0;i<home["subject"][flag]["student"].length;i++) {
					tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td>'+home["subject"][flag]["student"][i]["Internal"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Attendance"]+'"/></td><td>'+home["subject"][flag]["student"][i]["Final_CIE"]+'</td></tr>';
				}
			}
			else {
				tableBody = '<thead id="updateTableHead"><th>USN</th><th>Theory Total</th><th>Theory Attendance</th><th>Lab Total</th><th>TOTAL</th></thead><tbody>';
				for(var i=0;i<home["subject"][flag]["student"].length;i++) {
					tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td>'+home["subject"][flag]["student"][i]["Ty_Internal_total"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Ty_Attendance"]+'"/></td> <td>'+(home["subject"][flag]["student"][i]["Lab_Internal_total"])+'</td><td>'+home["subject"][flag]["student"][i]["Final_CIE"]+'</td></tr>';
				}
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#finalli').addClass("selected");
		});
		$('#saveButton').click(function(){
			if (!confirm("Are you sure you want to save the changes") )
			{
				getDetails();
				return;
			}
			console.log($('#updateTable tr td').html());
			/**new stuff*/
				var i=0;
				var myjson = "[";
				var jsonStr = "";
				$('#updateTable tr').each(function() 
				{
					jsonStr = '{'
						+ '"usn" :'
						+ '"' +$(this).find("td").eq(0).html()+'"'
						+ ", "
						+ '"col2" : '
						+ '"'+ $(this).find("td").eq(1).find('input').val()+ '"'
						+ ","
						+ '"col3" : '
						+ '"'+ $(this).find("td").eq(2).find('input').val() + '"'
						+ ","
						+ '"col4" : '
						+ '"'+ $(this).find("td").eq(3).html()+ '"'
						+ '}';
						if(i==0) {
							myjson += "";
						}
						else if(i == $('#updateTable tr').length-1) {
							myjson += jsonStr;
						}
						else {
							myjson += jsonStr+',';
						}
						i++;
				});
				myjson += "]";
				var params = 'table='+tableupdate+'&subtab='+subtab+'&'+'jsonMarks='+myjson;
				console.log(params);
				var xmlhttp1;
				if (window.XMLHttpRequest)
				{
					xmlhttp1=new XMLHttpRequest();
				}
				else
				{
					xmlhttp1=new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp1.onreadystatechange=function()
				{
					if (xmlhttp1.readyState==4 && xmlhttp1.status==200)
					{
						console.log("SUCCESS");
						//alert("updated Successfully");
					}
				}
				console.log("coming here");
				xmlhttp1.open("POST","http://localhost/CIE/php/updatemarks.php?",true);
				xmlhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp1.send(params);
			/**End of new stuff*/
			getDetails();
		});
	}
	$('#sub0').click(function() {
		initialize(); 
	});
	$('#sub1').click(function() {
		tableupdate = home["subject"][1]["course"];
		console.log("Coming inside sub2");
		flag=1;
		var subtab = 0;
		//$("#main").html('<div id="header"> <div id="logo"> <div id="logo_text"><h1><a href="index.html">CIE<span class="logo_colour">Marks</span></a></h1> <h2>Information Science Department Marks Automation</h2> <h2><b><i>Welcome '+name+'</i></b><h2> </div> </div> <div id="menubar"> <ul id="menu">'+subjects+'<li class="headerMenu"><a id="signoutLink" onClick="signout()">Sign Out</a></li></ul> </div> </div><div id="menubar"> <ul id="menu">'+tests[1]+'</ul> </div> <div id="site_content"><form id="updateForm"> <table id="updateTable">'+tableBody+'</table> </form><div id="content">'+students+'</div><input type="button" id="saveButton" value="SAVE"/> </div> <div id="content_footer"></div> <div id="footer"> Copyright &copy; CIE | INFORMATION SCIENCE | PESIT </div>');
		$("#innerbody").html('<div id="menubar"> <ul id="menu">'+tests[1]+'</ul> </div> <div id="site_content"><form id="updateForm"> <table id="updateTable">'+tableBody+'</table> </form><div id="content">'+students+'</div><input type="button" id="saveButton" value="SAVE"/> </div>');
		//$("#main").html('<input type="button" id="test1" value="CLICK ME!!!" />');
		clearSubStyles();
		$('#sub1li').addClass("selected");
		test1sub1();
		function test1sub1() {
			subtab = 1;
			console.log("Test 1 clicked in "+flag+" subject");
			tableBody = '<thead id="updateTableHead"> <th>USN</th> <th>T1 Score(Out Of 50)</th> <th>T1 Attendance(%)</th> <th>T1 Score(Out Of 20)</th> </thead>';
			for(var i=0;i<home["subject"][flag]["student"].length;i++) {
				tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Test_1"]+'"/></td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Attendance%_t1"]+'" /></td> <td>'+(home["subject"][flag]["student"][i]["Test_1"]/2.5)+'</td></tr>';
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#test1li').addClass("selected");
		}
		$('#test1').click(function() {
			test1sub1();
		});
		$('#test2').click(function() {
			subtab = 2;
			tableBody = '<thead id="updateTableHead"> <th>USN</th> <th>T2 Score(Out Of 50)</th> <th>T2 Attendance(%)</th> <th>T2 Score(Out Of 20)</th> </thead>';
			for(var i=0;i<home["subject"][flag]["student"].length;i++) {
					tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Test_2"]+'"/></td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Attendance%_t2"]+'"/></td> <td>'+(home["subject"][flag]["student"][i]["Test_2"]/2.5)+'</td> </tr></tbody>';
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#test2li').addClass("selected");
		});
		$('#lab').click(function() {
			subtab = 3;
			tableBody = '<thead id="updateTableHead"><th>USN</th><th>Lab Internal</th><th>Lab Internal Total</th><th>Total</th> </thead>';
			for(var i=0;i<home["subject"][flag]["student"].length;i++) {
					tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Lab_Internal"]+'"/></td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Lab_attendance"]+'"/></td> <td>'+(home["subject"][flag]["student"][i]["Lab_Internal_total"])+'</td> </tr></tbody>';
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#labli').addClass("selected");
		});
		$('#final').click(function() {
			subtab = 4;
			/*tableBody = '<thead id="updateTableHead"><th>USN</th><th>Test - 1</th><th>Test - 2</th><th>Lab</th><th>TOTAL</th></thead>';
			for(var i=0;i<home["subject"][flag]["student"].length;i++) {
				tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td>'+home["subject"][flag]["student"][i]["Lab_Internal"]+'</td> <td>'+home["subject"][flag]["student"][i]["Lab_attendance"]+'</td> <td>'+(home["subject"][flag]["student"][i]["Lab_Internal_total"])+'</td> </tr></tbody>';
			}*/
			if(labs[1]==0) {
				tableBody = '<thead id="updateTableHead"><th>USN</th><th>Theory Total</th><th>Theory Attendance</th><th>TOTAL</th></thead></tbody>';
				for(var i=0;i<home["subject"][flag]["student"].length;i++) {
					tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td>'+home["subject"][flag]["student"][i]["Internal"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Attendance"]+'"/></td><td>'+home["subject"][flag]["student"][i]["Final_CIE"]+'</td></tr>';
				}
			}
			else {
				tableBody = '<thead id="updateTableHead"><th>USN</th><th>Theory Total</th><th>Theory Attendance</th><th>Lab Total</th><th>TOTAL</th></thead><tbody>';
				for(var i=0;i<home["subject"][flag]["student"].length;i++) {
					console.log(home["subject"][flag]["student"][i]["Ty_Internal_total"]);
					tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td>'+home["subject"][flag]["student"][i]["Ty_Internal_total"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Ty_Attendance"]+'"/></td> <td>'+(home["subject"][flag]["student"][i]["Lab_Internal_total"])+'</td><td>'+home["subject"][flag]["student"][i]["Final_CIE"]+'</td></tr>';
				}
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#finalli').addClass("selected");
		});
		$('#saveButton').click(function(){
			if (!confirm("Are you sure you want to save the changes") )
			{
				getDetails();
				return;
			}
			console.log($('#updateTable tr td').html());
			/**new stuff*/
				var i=0;
				var myjson = "[";
				var jsonStr = "";
				$('#updateTable tr').each(function() 
				{
					jsonStr = '{'
						+ '"usn" :'
						+ '"' +$(this).find("td").eq(0).html()+'"'
						+ ", "
						+ '"col2" : '
						+ '"'+ $(this).find("td").eq(1).find('input').val()+ '"'
						+ ","
						+ '"col3" : '
						+ '"'+ $(this).find("td").eq(2).find('input').val() + '"'
						+ ","
						+ '"col4" : '
						+ '"'+ $(this).find("td").eq(3).html()+ '"'
						+ '}';
						if(i==0) {
							myjson += "";
						}
						else if(i == $('#updateTable tr').length-1) {
							myjson += jsonStr;
						}
						else {
							myjson += jsonStr+',';
						}
						i++;
				});
				myjson += "]";
				var params = 'table='+tableupdate+'&subtab='+subtab+'&'+'jsonMarks='+myjson;
				console.log(params);
				var xmlhttp1;
				if (window.XMLHttpRequest)
				{
					xmlhttp1=new XMLHttpRequest();
				}
				else
				{
					xmlhttp1=new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp1.onreadystatechange=function()
				{
					if (xmlhttp1.readyState==4 && xmlhttp1.status==200)
					{
						console.log("SUCCESS");
						//alert("updated Successfully");
						//console.log(xmlhttp1.responseText);
					}
				}
				console.log("coming here");
				xmlhttp1.open("POST","http://localhost/CIE/php/updatemarks.php?",true);
				xmlhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp1.send(params);
			/**End of new stuff*/
			//alert('Updated Data to the database Successfully...');
			getDetails();
		});
	});
	$('#sub2').click(function() {
		tableupdate= home["subject"][2]["course"];
		console.log("Coming inside sub3");
		flag=2;
		//$("#main").html('<div id="header"> <div id="logo"> <div id="logo_text"><h1><a href="index.html">CIE<span class="logo_colour">Marks</span></a></h1> <h2>Information Science Department Marks Automation</h2> <h2><b><i>Welcome '+name+'</i></b><h2> </div> </div> <div id="menubar"> <ul id="menu">'+subjects+'<li class="headerMenu"><a id="signoutLink" onClick="signout()">Sign Out</a></li></ul> </div> </div><div id="menubar"> <ul id="menu">'+tests[1]+'</ul> </div> <div id="site_content"><form id="updateForm"> <table id="updateTable">'+tableBody+'</table> </form><div id="content">'+students+'</div><input type="button" id="saveButton" value="SAVE"/> </div> <div id="content_footer"></div> <div id="footer"> Copyright &copy; CIE | INFORMATION SCIENCE | PESIT </div>');
		$("#innerbody").html('<div id="menubar"> <ul id="menu">'+tests[1]+'</ul> </div> <div id="site_content"><form id="updateForm"> <table id="updateTable">'+tableBody+'</table> </form><div id="content">'+students+'</div><input type="button" id="saveButton" value="SAVE"/> </div>');
		//$("#main").html('<input type="button" id="test1" value="CLICK ME!!!" />');
		clearSubStyles();
		$('#sub1li').addClass("selected");
		$('#test1').click(function() {
			console.log("Test 1 clicked in "+flag+" subject");
			tableBody = '<thead id="updateTableHead"> <th>USN</th> <th>T1 Score(Out Of 50)</th> <th>T1 Attendance(%)</th> <th>T1 Score(Out Of 20)</th> </thead>';
			for(var i=0;i<home["subject"][flag]["student"].length;i++) {
				tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Test_1"]+'"/></td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Attendance%_t1"]+'" /></td> <td>'+(home["subject"][flag]["student"][i]["Test_1"]/2.5)+'</td></tr>';
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#test1li').addClass("selected");
		});
		$('#test2').click(function() {
			tableBody = '<thead id="updateTableHead"> <th>USN</th> <th>T2 Score(Out Of 50)</th> <th>T2 Attendance(%)</th> <th>T2 Score(Out Of 20)</th> </thead>';
			for(var i=0;i<home["subject"][flag]["student"].length;i++) {
					tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Test_2"]+'"/></td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Attendance%_t2"]+'"/></td> <td>'+(home["subject"][flag]["student"][i]["Test_2"]/2.5)+'</td> </tr></tbody>';
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#test2li').addClass("selected");
		});
		$('#lab').click(function() {
			tableBody = '<thead id="updateTableHead"><th>USN</th><th>Lab Internal</th><th>Lab Internal Total</th><th>Total</th> </thead>';
			for(var i=0;i<home["subject"][flag]["student"].length;i++) {
					tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Lab_Internal"]+'"/></td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Lab_attendance"]+'"/></td> <td>'+(home["subject"][flag]["student"][i]["Lab_Internal_total"])+'</td> </tr></tbody>';
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#labli').addClass("selected");
		});
		$('#final').click(function() {
			/*tableBody = '<thead id="updateTableHead"><th>USN</th><th>Test - 1</th><th>Test - 2</th><th>Lab</th><th>TOTAL</th></thead>';
			for(var i=0;i<home["subject"][flag]["student"].length;i++) {
				tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td>'+home["subject"][flag]["student"][i]["Lab_Internal"]+'</td> <td>'+home["subject"][flag]["student"][i]["Lab_attendance"]+'</td> <td>'+(home["subject"][flag]["student"][i]["Lab_Internal_total"])+'</td> </tr></tbody>';
			}*/
			if(labs[2]==0) {
				tableBody = '<thead id="updateTableHead"><th>USN</th><th>Theory Total</th><th>Theory Attendance</th><th>TOTAL</th></thead></tbody>';
				for(var i=0;i<home["subject"][flag]["student"].length;i++) {
					tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td>'+home["subject"][flag]["student"][i]["Internal"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Attendance"]+'"/></td><td>'+home["subject"][flag]["student"][i]["Final_CIE"]+'</td></tr>';
				}
			}
			else {
				tableBody = '<thead id="updateTableHead"><th>USN</th><th>Theory Total</th><th>Theory Attendance</th><th>Lab Total</th><th>TOTAL</th></thead><tbody>';
				for(var i=0;i<home["subject"][flag]["student"].length;i++) {
					console.log(home["subject"][flag]["student"][i]["Ty_Internal_total"]);
					tableBody += '<tr><td>'+home["subject"][flag]["student"][i]["USN"]+'</td> <td>'+home["subject"][flag]["student"][i]["Ty_Internal_total"]+'</td> <td><input type="text" name="text" value="'+home["subject"][flag]["student"][i]["Ty_Attendance"]+'"/></td> <td>'+(home["subject"][flag]["student"][i]["Lab_Internal_total"])+'</td><td>'+home["subject"][flag]["student"][i]["Final_CIE"]+'</td></tr>';
				}
			}
			tableBody += '</tbody>';
			$('#updateTable').html(tableBody);
			clearStyles();
			$('#finalli').addClass("selected");
		});
		$('#saveButton').click(function(){
			if (!confirm("Are you sure you want to save the changes") )
			{
				getDetails();
				return;
			}
			console.log($('#updateTable tr td').html());
			/**new stuff*/
				var i=0;
				var myjson = "[";
				var jsonStr = "";
				$('#updateTable tr').each(function() 
				{
					jsonStr = '{'
						+ '"usn" :'
						+ '"' +$(this).find("td").eq(0).html()+'"'
						+ ", "
						+ '"col2" : '
						+ '"'+ $(this).find("td").eq(1).find('input').val()+ '"'
						+ ","
						+ '"col3" : '
						+ '"'+ $(this).find("td").eq(2).find('input').val() + '"'
						+ ","
						+ '"col4" : '
						+ '"'+ $(this).find("td").eq(3).html()+ '"'
						+ '}';
						if(i==0) {
							myjson += "";
						}
						else if(i == $('#updateTable tr').length-1) {
							myjson += jsonStr;
						}
						else {
							myjson += jsonStr+',';
						}
						i++;
				});
				myjson += "]";
				var params = 'table='+tableupdate+'&subtab='+subtab+'&'+'jsonMarks='+myjson;
				console.log(params);
				var xmlhttp1;
				if (window.XMLHttpRequest)
				{
					xmlhttp1=new XMLHttpRequest();
				}
				else
				{
					xmlhttp1=new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp1.onreadystatechange=function()
				{
					if (xmlhttp1.readyState==4 && xmlhttp1.status==200)
					{
						console.log("SUCCESS");
						//alert("updated Successfully");
						//console.log(xmlhttp1.responseText);
					}
				}
				console.log("coming here");
				xmlhttp1.open("POST","http://localhost/CIE/php/updatemarks.php?",true);
				xmlhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp1.send(params);
			/**End of new stuff*/
			//alert('Updated Data to the database Successfully...');
			getDetails();
		});
	});
function clearSubStyles(){
		$('#sub0li').removeClass("selected");
		$('#sub1li').removeClass("selected");
		//$('#sub3li').removeClass("selected");
	}
function clearStyles() {
		$('#test1li').removeClass("selected");
		$('#test2li').removeClass("selected");
		$('#labli').removeClass("selected");
		$('#finalli').removeClass("selected");
	}
}

function adminLogin() {
	console.log("Coming to admin login functi");
	var mainMenu = "";
	var subMenu = "";
	mainMenu += '<li class="headerMenu selected" id="studentli"><a id="student">Student</a></li>';
	mainMenu += '<li  id="teacherli"><a id="teacher">Teacher</a></li>';
	mainMenu += '<li  id="subjectli"><a id="subject">Subject</a></li>';
	mainMenu += '<li  id="enrollli"><a id="enroll">Enroll</a></li>';
	$("#main").html('<div id="header"> <div id="logo"> <div id="logo_text"><h1><a href="index.html">CIE<span class="logo_colour">Marks</span></a></h1> <h2>Information Science Department Marks Automation</h2> <h2><b><i>Welcome Administrator</i></b><h2> </div> </div> <div id="menubar"> <ul id="menu">'+mainMenu+'<li class="headerMenu"><a id="signoutLink" onClick="signout()">Sign Out</a></li></ul> </div> </div><div id="innerbody"><div id="menubar"> <ul id="menu">'+subMenu+'</ul> </div> <div id="site_content"><form id="updateForm"> <table id="updateTable"></table> </form><div id="content"></div><input type="button" id="saveButton" value="SAVE"/></div></div><div id="content_footer"></div> <div id="footer"> Copyright &copy; CIE | INFORMATION SCIENCE | PESIT </div>');
}
function signout() {
	window.location="http://localhost/CIE/php/signout.php";
}