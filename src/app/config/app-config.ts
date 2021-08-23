export default {

    oidc: {
        clientId: '0oa1ihttl8WmglhRN5d7',  //Public Identifier of client App
        issuer: 'https://dev-84638157.okta.com/oauth2/default',  //URL for authentication with OKTA Auth server
        redirectUri: 'https://localhost:4200/login/callback', //App redirect to mentioned URL after Authentication
        scopes: ['openid','profile', 'email']   //Provides access to info of user
    }
}
