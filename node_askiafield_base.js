const http = require('http');
const fs=require('fs');
const askiafield=require('./askiafield.js');
const fetch=require('isomorphic-fetch');

function init(){
		askiafield.config(
			{CCAURL:'http://show.askia.com:80/ccawebapi/'}
		);
	}
	
const server = http.createServer(function(req,res){
	init();
	askiafield.auth("----","----","----")
		.then(function(json){
			if (json.StatusCode !==200){throw json};
			let successMessage = "connected with token "+json.Response.Token;
			console.log(successMessage);
			res.writeHead(200,{"Content-Type": "text/html"});
			res.write(successMessage);
		})
		.catch(function(json){
			let errorMessage = json;
			console.log("error : "+errorMessage);
		});
		
		
});

server.listen(8081);