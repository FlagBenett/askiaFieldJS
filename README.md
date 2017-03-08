# askiaFieldJS
JS wrapper for askiaField webAPI

# General considerations
Welcome to the askiaFieldJS wiki!
This wrapper is promise-based, so it has compatibility limitations in IE and Safari. It is currently based on the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and should always return Promise objects.

# Setup
1. Edit config.js with relevant connection details
1. You can use askiafield.js as an external file on client-side HTML pages (see example in the [/Examples folder](https://github.com/StephenPadawan/askiaFieldJS/tree/master/Examples))
1. You can use askiafield.js as module in server-side with Node.js (see example [node_askiafield_base.js](https://github.com/StephenPadawan/askiaFieldJS/blob/master/node_askiafield_base.js))

# Unit-testing / Integration testing
Unit and integration testing are done in the /spec directory, using [jasmine-node](https://github.com/mhevery/jasmine-node)
Run the following command in node to test the wrapper
`npm install`
`jasmine-node /spec --verbose`

#Extend the Wrapper
This wrapper is wrapping [the following API](http://demo.myforce.be/CcaWebApi/). It can be extended by adding objects inside the "Actions" array in askiafield.js
