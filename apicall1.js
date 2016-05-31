// We need this to build our post string
const zlib = require('zlib');
var querystring = require('querystring');
var http = require('http');
var request=require('request');

function callback(body,callb)
{
  body=JSON.parse(body);
  callb(body);
  return body;
}

function PostCode(url,post_data,callb) {
  // An object of options to indicate where to post to
  var tempvar;
  var post_options = {
      host: 'localhost',
      port: '8080',
      path: '/hcm/employee/employeeinfo',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
		  'encoding': null,
		  'Accept': 'application/json'
      }
  };
  
  // Set up the request
  var post_req = request(url,post_options, function(err, res, body){
    if(res.headers['content-encoding'] == 'gzip')
	{
        zlib.gunzip(body, function(err, dezipped) {
            tempvar=callback(dezipped.toString());
        });
    } else {
        tempvar=callback(body,callb);
    }
	  var str = '';
	  
      res.on('data', function (chunk) {
		  str += chunk;
      });
	  
	   res.on('end', function () {
			 callb(tempvar);
        });
  });
  
  // post the data
  post_req.on('error', (e) => {
	console.log(e);
});
var err=function(){
	console.log(`problem with request: ${e.message}`);
};
  post_req.write(post_data);
  post_req.end();

}

//var post_data = '{"employeeSearch" : "bidhu@nepal.com"}';
//PostCode("http://localhost:8080/hcm/employee/employeeinfo",post_data,callme);

module.exports.PostCode = PostCode;


