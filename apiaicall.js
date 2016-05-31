var apiai = require('apiai');
var app = apiai('c49ef0a619cf4e27ad5c1548ad25de1d');

var apicall = require('./apicall1.js');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('ramsaybot> ');
rl.prompt();
var emailreq=false;


rl.on('line', function(line) {
    if (line === "right") rl.close();
	if(emailreq==true)
	{
		//****************** apicall to retrieve employee details from emailid************//
		emailreq=false;
		var post_data = '{"employeeSearch" : "'+line+'"}';
		apicall.PostCode("http://localhost:8080/hcm/employee/employeeinfo",post_data,function(obj){
			console.log("The object was :");
			console.log(obj);
			
			//call other apis
	// Todo : api calls to get leave balance and last leaves

	// Todo : api calls to apply leave
			
			
		});
	}
	//console.log(line + ' hello');
	
	var request = app.textRequest(line);

request.on('response', function(response) {
    //console.log(response);
	response=JSON.stringify(response);
	//console.log("RESP:"+response);
	response=JSON.parse(response);
	console.log(response.result.fulfillment.speech);
	if (response.result.fulfillment.speech === "Ok..let me check your leave status !!") {
	//rl.close();
	console.log('ramsaybot> Could you please enter your email id? \r\n');
	emailreq=true;
	
	
	}
});

request.on('error', function(error) {
    console.log(error);
});

request.end()
    rl.prompt();

}).on('close',function(){
    process.exit(0);
});

//console.log("in");
