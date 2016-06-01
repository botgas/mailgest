var apiai = require('apiai');
var app = apiai('269bcb999daa44e2b0cf806bcf2a591f');

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
		//PostCode(host,port,path,method,post_data,callb) 
		apicall.PostCode("localhost","8080","/hcm/employee/employeeinfo","POST",post_data,function(obj){
			//console.log("The object was :");
		obj=JSON.stringify(obj);
		obj=JSON.parse(obj); 
		console.log(obj.employeeId);
		
		post_data = '{"employeeId" : "'+obj.employeeId+'"}';
		apicall.PostCode("localhost","8080","/hcm/leave/leavebalance","POST",post_data,function(obj1){
			
	console.log(obj1);

	// Todo : api calls to apply leave
			
			
		});
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
	//console.log(response);
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
