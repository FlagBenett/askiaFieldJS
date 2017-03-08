const http = require('http');
const fs=require('fs');
const askiafield=require('../../askiafield.js');
const fetch=require('isomorphic-fetch');	
const CCAURL = 'http://show.askia.com/ccawebapi/';
	  
askiafield.config(
				{CCAURL:CCAURL}
);
			
describe("Integration tests", ()=>{
	describe("Authentication", ()=>{	
		var value, flag;
		it("should login and return a pre-formatted result", function() {
		  runs(()=>{
			  flag = false;
			  value = 0;
			  askiafield.auth("----","----","----").then(
					function (json){
						//console.log(json);
						result = json;
						flag=true;
					}
				);
				/*setTimeout(function() {
					flag = true;
				}, 500);*/
			});
			waitsFor(()=> {
				  return flag;
			}, "error in query", 750);
			runs(()=> {
				//console.log(result);
				expect(result).not.toBe(null);
				expect(result.StatusCode).toBe(200);
				expect(result.Request.Url).toBe(CCAURL+'session');
				expect(result.Response.ResultCode).toBe(0);
			});
		});
	});
});


 
