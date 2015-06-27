# Token Authentication Client

A set of Angular services for requesting and using an authentication token for
secure communication with a server API.

## Overview

This client is meant to work in conjunction with the
[Token Auth Server](https://github.com/cbitstech/token_auth_server_rails).

## Installation

```
npm install --save cbitstech/token_auth_client_angular#0.0.3
```

Include `TokenAuth.js` in your HTML page.

## Usage

The services expect two existing services to be provided: `tokenAuthServer` and
`tokenAuthClientUuid`. Each should be a function. `tokenAuthServer()` should
return the base URL of the server (including the mount path of the Rails
Engine) and `tokenAuthClientUuid` should return the client's universally unique
identifier, however you choose to generate it, e.g.

```javascript
angular.module('myApp')
       .factory('tokenAuthServer', function() {
         return function() {
           return 'https://my-server/token_auth';
         }
       })
       .factory('tokenAuthClientUuid', function() {
         return function() {
           return 'so unique';
         }
       });
```

The first step is to request the authentication token by providing the agreed
upon configuration token as well as the client uuid:

```javascript
authenticationTokensResource
.create(configurationToken)
.then(function(response) {
  var authToken = response.data.value;

  save(authToken);
})
.catch(function() {
  showAlert("oops!");
});
```

Next, use the authentication token in subsequent requests:

```javascript
var Things = $resource('https://my-server/token_auth/api/things', {},
                       {
                         get: {
                           method: 'GET',
                           headers: {
                             'X-AUTH-TOKEN': authToken
                           }
                         }
                       });
var params = { clientUuid: settings.clientUuid };

Thinks.get(params).$promise.then(function(response) {
  // do something
});
```

## Development

Run unit tests

```
npm test
```

Lint

```
npm run lint
```
