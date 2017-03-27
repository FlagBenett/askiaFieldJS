
/**
* @class askiafield
*/
(function (doc) {
    //INIT THE API
    let askiafield = {};
    let fetching = function(param1,param2){
	        //console.log('real fetch');
	        return fetch(param1,param2);
    };
    let actions;
    actions = [
        /**
         * askiafield.getSurveys() gets the list of surveys that are currently live on the CCA server
         * @memberof askiafield
         * @function getSurveys
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         */
        {name: "getSurveys", APICall: "SurveyTasks", method: "GET"},
        {name: "getSurveyById", APICall: "SurveyTasks/{surveyId}", method: "GET"},
        /** askiafield.getAgents() gets the list of agents that are currently live on the CCA server
         * @memberof askiafield
         * @function getAgents
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         */
        {name: "getAgents", APICall: "Agents", method: "GET"},
        /**
         * askiafield.getDefaultAgent() get the list of surveys that are currently live on the CCA server
         * @memberof askiafield
         * @function getDefaultAgent
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         *
         */
        {name: "getDefaultAgent", APICall: "Agents/0", method: "GET"},
        /**
         * @memberof askiafield
         * @function getLists
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         */
        {name: "getLists", APICall: "Lists", method: "GET"},
        {name: "getJobs", APICall: "Jobs", method: "GET"},
        {name: "getJobSchedules", APICall: "JobSchedules", method: "GET"},
        /**
         * @memberof askiafield
         * @function getSettings
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         */
        {name: "getSettings", APICall: "GeneralSettings", method: "GET"},
        /**
         * @memberof askiafield
         * @function getGroups
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         */
        {name: "getGroups", APICall: "Groups", method: "GET"},
        /**
         * @memberof askiafield
         * @function getOutbound
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         */
        {name: "getOutbound", APICall: "OutboundGroups", method: "GET"},
        /**
         * @memberof askiafield
         * @function getWebconnections
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         */
        {name: "getWebconnections", APICall: "WebConnections", method: "GET"},
        /**
         * @memberof askiafield
         * @function createAgent
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         */
        {name: "createAgent", APICall: "Agents", method: "POST"},
        /**
         * @memberof askiafield
         * @function createSurvey
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         */
        {name: "createSurvey", APICall: "SurveyTasks", method: "POST"},
        /**
         * askiafield.setSurveyOnline() puts one of the existing surveys on or offline on Webprod
         * @memberof askiafield
         * @function setSurveyOnline
         * @param {object}  params               - Parameters to execute the query
         * @param {object}  params.surveyId      -  ID of the survey to set on/offline
         * @param {string}  [params.webConnectionId]         - ID of the Webprod (default is 1)
         * @param {object}  params.body - extra parameters
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         */
        {
            name: "setSurveyOnline",
            APICall: "SurveyTasks/{surveyId}/WebConnections/{webConnectionId}",
            method: "PUT"
        },
        /**
         * @memberof askiafield
         * @function askiafield.updateSurvey
         * @description Check if the argument is a string (see: {@link askiafield})
         * @param {object}  params               - Parameters to execute the query
         * @param {object}  params.surveyId      -  ID of the survey to set on/offline
         * @param {string}  params.ignoreWarnings         - ID of the Webprod (default is 1)
         * @param {object}  params.body - extra parameters
         * @returns {Promise} promise - returns a promise
         * @returns {JSON} promise.json() - allows you to parse the return
         */
        {
            name: "updateSurvey",
            APICall: "SurveyTasks/{surveyId}/Content?ignoreWarnings={ignoreWarnings}",
            method: "PUT"
        },
        {name: "getServerState",APICall: "Server/State", method: "GET"},
        {name: "getServerConfig",APICall: "Server/Configuration", method: "GET"},
        {name: "getDefaultCapiGroup",APICall: "CapiGroups/0", method: "GET"},
        {name: "getCapiGroup",APICall: "CapiGroups/{groupId}", method: "GET"},
        {name: "getCapiGroups",APICall: "CapiGroups", method: "GET"},
        {name: "createCapiGroup",APICall: "CapiGroups", method: "POST"},
		{name: "updateCapiGroup",APICall: "CapiGroups/{capiGroupId}",method: "PUT"},
		{name: "getQuota",APICall: "SurveyTasks/{surveyId}/Quota", method: "GET"}
    ];
	/**
	 * @memberof askiafield
     * @function appendMethod
     * @private
     * @description Check if the argument is a string (see: {@link module:foobar~hello})
     * @param {String} string - The string
     * @returns {String} Returns true if string is valid, false otherwise
     */ 
	function appendMethod(action) {
	   askiafield[action.name] = function (params) {
		params.APICall=action.APICall;
		params.requiredParams=action.requiredParams;
		params.actionName=action.name;
		params.method=action.method;
		return executeRestQuery(params);
	   }
    }
	for (var i = 0; i < actions.length; i += 1) {
	   appendMethod(actions[i]);
    }
	askiafield["auth"]=auth;
	askiafield["config"]=config;
	askiafield["uploadSurvey"]=uploadSurvey;
    askiafield["fetching"]=fetching;
    askiafield["actions"]=actions;

	function config(params){
		if(!params){
			return {
				
			};
		}
		else{
			askiafield["CCAURL"]=params.CCAURL||askiafield.CCAURL;
			askiafield["token"]=params.token||askiafield.token;
			//console.log(askiafield);
		}
	}
	
	function extractParams(instr){
		let startIndex;
		let strlen = instr.length;
		let endIndex;
		let result=[];
		let processStr = instr;
		let counter = 0;
		
		while(processStr.search("{")!=-1 || counter ==4){
				console.log("loop");
				startIndex=processStr.search("{");
				endIndex=processStr.search("}");
				result.push(processStr.substring(startIndex+1,endIndex));
				processStr = processStr.substring(endIndex+1,strlen);
				counter += 1;
				console.log(processStr);
		}
		return result
	}
	
	function buildAPICall(instr,par,inpar){
		console.log(par);
		let startIndex = 0;
		let endIndex=0;
		let processStr = instr;
		let counter = 0;
		let result="";
		let strlen;
		
		if(processStr.search("{")==-1){
			return processStr
		}
		else{
			while(counter<par.length){
				strlen = instr.length;
				startIndex=processStr.search("{");
				endIndex=processStr.search("}")||strlen;
				result+=processStr.substring(0,processStr.search("{"))+inpar[par[counter]];
				processStr = processStr.substring(endIndex+1,strlen);
				console.log(processStr);
				counter++;
			}
			result+=processStr.substring(0,processStr.length);
		}
		
		return result
		
	}
	
	function executeRestQuery(params){
		let APICall = params.APICall;
		let body = params.body;
		let CCAURL = askiafield.CCAURL;
		let token = askiafield.token;
        let requiredParams = extractParams(APICall);
		let newAPICall;
		if(requiredParams){
			for(requiredParamItem of requiredParams){
				if (!params.hasOwnProperty(requiredParamItem)){
					throw('error : missing parameter '+requiredParamItem+' in ' +params.actionName);
				}
			}
			console.log(requiredParams);
			
			newAPICall = buildAPICall(APICall,requiredParams,params);
			//APICall+="/"+params[requiredParams[0].name]+"/WebConnections/"+params[requiredParams[1].name]
			//APICall+="/"+params[requiredParams[0].name]+"/"+requiredParams[1].syntax+params[requiredParams[1].name]
			
		}
		console.log("calling API "+newAPICall);
        let headers = {
			"Content-Type": params.contentType||"text/json",
			'Authorization': 'Basic ' + token
		};
		if(headers["Content-Type"]=="text/json"){
			body=JSON.stringify(body);
		}
		//console.log("REST API CALL BODY : "+newAPICall);
        let result = askiafield.fetching(CCAURL + newAPICall, {
			method:params.method,
			headers:headers,
			body: body
		});
		return result
	}
	
	function auth(user,pass,mod,onSuccess){
		let result;
        let body = {
			username:user,
			password:pass, 
			module:mod
		};
		return executeRestQuery({
			body:body,
			APICall:'session',
			method:'post'
		})
		.then(function(response){
			return response.json()
			.then(function(json){
				askiafield.config({token:json.Response.Token});
				return json;//onSuccess(json);
			});
		});
	}
	
	/**
	 * Helper to the createSurvey() action. This allows to upload a .qex file without needing to set up the multipart header of the HTTP request.
	 * @param {Object} jsonParams - list of parameters to set in CCA.
	 * @param {string=} jsonParams.toto - property toto
	 * @param {string} inputId - The ID of the HTML file input
	 * @param {function} onSuccess - Success callback function
	 * @param {function} onFailure - Failure callback function
	 * @namespace Helpers
	 */
	function uploadSurvey(jsonParams,inputId,onSuccess, onFailure,logInputId){
        let reader = new FileReader();
		reader.readAsDataURL(inputId.files[0]);
		reader.addEventListener("load", function () {
            let dataString = reader.result;
			//constructing the multipart body of the request : JSON header with all survey settings and base 64 encoded core from the .qex file
            let httpHeaderBoundary = 'gc0p4Jq0M2Yt08jU534c0p';
            let data = '--'+httpHeaderBoundary+'\r\n ' +
			'Content-type: application/json; charset=utf-8\r\n\r\n';
			data += JSON.stringify(jsonParams);
			data += '\r\n--'+httpHeaderBoundary+'\r\n' +
			'Content-Disposition: attachement; FileName="toto.qex"\r\n' +
			'Content-Transfer-Encoding: base64 \r\n\r\n';
			data += dataString;
			data += '\r\n--'+httpHeaderBoundary+'--\r\n';
			if(logInputId){
				document.getElementById(logInputId).innerHTML = "Sending data : "+data;
			}
			//sending this body to askiafield API
			return askiafield.createSurvey({
				body:data,
				contentType: 'multipart/mixed ; boundary="gc0p4Jq0M2Yt08jU534c0p"'
			})
			.then(function(resp){
				resp.json()
				.then(function(json){
					if (json.StatusCode!==200){
						throw json;
					}else {
						onSuccess(json);
					}
				});
			})
			.catch(function(resp){
				resp.json()
				.then(function(json){
					onFailure(json);
				})
			})
		}); 
	}
//PUBLISH THE API TO CURRENT WINDOW
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = askiafield;
  else
    window.askiafield = askiafield;
}())


