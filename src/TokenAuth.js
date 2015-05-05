(function() {
  'use strict';

  var VERSION = '0.0.3';

  function AuthenticationTokensResource($resource, server, clientUuid) {
    var RESOURCE_TYPE = 'authenticationTokens';
    var RESOURCE_PATH = '/api/authentication_tokens';

    this.create = function(configurationToken) {
      var Token = $resource(server() + RESOURCE_PATH);
      var token = new Token({
        data: {
          type: RESOURCE_TYPE,
          clientUuid: clientUuid()
        }
      });
      var params = { configurationToken: configurationToken };

      return token.$save(params);
    };
  }

  function AuthenticationTokensResourceFactory($resource, server, clientUuid) {
    return new AuthenticationTokensResource($resource, server, clientUuid);
  }

  angular.module('TokenAuth', ['ngResource'])
         .constant('VERSION', VERSION)
         .factory('authenticationTokensResource',
                  ['$resource', 'tokenAuthServer', 'tokenAuthClientUuid',
                  AuthenticationTokensResourceFactory]);
})();
