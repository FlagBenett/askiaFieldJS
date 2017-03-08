let askiafield = require('../../askiafield.js');
const CCAURL = 'http://show.askia.com/ccawebapi/';
const fakeTokenValue= 'tokentokentokentokentoken';
	  
askiafield.config(
    {
        CCAURL:CCAURL,
        token:null
    }
);

function testGetter(actionName, APICall){
    describe(actionName+" test", function() {
        beforeEach(function() {
            askiafield[actionName]({});
        });
        it("tracks that fetch was called", function () {
            expect(askiafield.fetching).toHaveBeenCalled();
        });
        it("tracks that fetch was called once", function () {
            expect(askiafield.fetching.calls.length).toEqual(1);
        });
        it("tracks all the arguments of "+ actionName+" call", function () {
            expect(askiafield.fetching).toHaveBeenCalledWith(
                CCAURL + APICall ,
                jasmine.objectContaining({
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/json',
                        'Authorization': 'Basic ' + fakeTokenValue
                    }
                })
            );
        });
    });
}

function testSetter(actionName, APICall){
    describe(actionName+" test", function() {
        beforeEach(function() {
            askiafield[actionName]({});
        });
        it("tracks that fetch was called", function () {
            expect(askiafield.fetching).toHaveBeenCalled();
        });
        it("tracks that fetch was called once", function () {
            expect(askiafield.fetching.calls.length).toEqual(1);
        });
        it("tracks all the arguments of "+ actionName+" call", function () {
            expect(askiafield.fetching).toHaveBeenCalledWith(
                CCAURL + APICall ,
                jasmine.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/json',
                        'Authorization': 'Basic ' + fakeTokenValue
                    }
                })
            );
        });
    });
}


describe("askiaField faker", function() {
	let fakeResult;
	beforeEach(function() {
		spyOn(askiafield,'fetching')
		.andCallFake(()=>{
			console.log('fake fetching');
			return 1;
		});
        spyOn(askiafield,'auth')
        .andCallFake(()=>{
           askiafield.config({token:fakeTokenValue})
        });
		askiafield.auth();
    });

	for(actionToTest of askiafield.actions){
	    if (actionToTest.method == "GET"){
            testGetter(actionToTest.name, actionToTest.APICall);
        };
        if (actionToTest.method == "POST"){
            testSetter(actionToTest.name, actionToTest.APICall);
        }
    }

});


/*it("tracks that getSurveys was called", function() {
 expect(askiafield.getSurveys).toHaveBeenCalled();
 });*/



/*it("checks that the result is correct", function() {
 expect(fakeResult).toEqual(123);
 });*/



/*it("tracks its number of calls", function() {
 expect(askiafield.getSurveys.calls.length).toEqual(1);
 });

 /*it("tracks all the arguments of its calls", function() {
 expect(askiafield.getSurveys).toHaveBeenCalledWith("toto");
 });

 it("checks that the result is correct", function() {
 expect(fakeResult).toEqual(123);
 });

 /*
 it("allows access to the most recent call", function() {
 expect(askiafield.getAgents.mostRecentCall.args[0]).toEqual(456);
 });

 it("allows access to other calls", function() {
 expect(askiafield.getSurveys.calls[0].args[0]).toEqual(123);
 });

 it("stops all execution on a function", function() {
 expect(fakeResult).toBeNull();
 });*/