'use strict';

var expect = chai.expect;

describe('AuthenticationTokensResource', function() {
  var $httpBackend, authenticationTokensResource;

  beforeEach(module('TokenAuth'));

  beforeEach(module(function($provide) {
    $provide.service('tokenAuthServer', function() {
      return function() {
        return '//foo';
      };
    });

    $provide.service('tokenAuthClientUuid', function() {
      return function() {
        return 'asdf1234';
      };
    });
  }));

  beforeEach(inject(function(_$httpBackend_, _authenticationTokensResource_) {
    $httpBackend = _$httpBackend_;
    authenticationTokensResource = _authenticationTokensResource_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#create', function() {
    it('provides credentials to the server', function() {
      var data = { data: { type: 'authenticationTokens', clientUuid: 'asdf1234' } };
      $httpBackend.expectPOST('//foo/api/authentication_tokens' +
                              '?configurationToken=my-token', data)
                  .respond();
      authenticationTokensResource.create('my-token');
      $httpBackend.flush();
    });

    it('resolves a promise with the token when successful', function() {
      var authToken;
      var mockAuthenticationToken = { data: { value: 'my-auth-token' } };

      $httpBackend.expectPOST('//foo/api/authentication_tokens' +
                              '?configurationToken=my-config-token')
                  .respond(mockAuthenticationToken);
      authenticationTokensResource.create('my-config-token').then(function(token) {
        authToken = token;
      });
      $httpBackend.flush();

      expect(authToken.data).to.deep.equal(mockAuthenticationToken.data);
    });

    it('rejects a promise when unsuccessful', function() {
      var success = true;

      $httpBackend.expectPOST('//foo/api/authentication_tokens' +
                              '?configurationToken=my-config-token')
                  .respond(400, '');
      authenticationTokensResource.create('my-config-token').catch(function() {
        success = false;
      });
      $httpBackend.flush();

      expect(success).to.be.false;
    });
  });
});
