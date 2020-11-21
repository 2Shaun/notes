# [Microsoft identity platform and OpenID Connect protocol](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)

- OAuth is only for authorization (gatekeeping) but it does not authenticate (prove identity)
- OpenID extends OAuth to do identity verification, with _ID tokens_
  - openID allows you to perform AUTHENTICATION on the AUTHORIZATION server
  - you may also obtain user profile information via get requests

## Metadata document

- path: `{authority URL}/.well-known/openid-configuration`

## JWTs (JSON web tokens)

- are NOT encrypted, but signed
  - ANYONE CAN READ
- applications must first check that the ID token is authentic
- then applications must perform some common claim validations
- you sign with private keys (YOU DON'T WANT JUST ANYONE TO SIGN IT, THAT DEFEATS AUTHENTICATION) and don't care who reads it, because your public key can unsign it
- with encryption you encrypt with public key but decrypt with private key (YOU DON'T WANT JUST ANYONE TO READ IT, THAT DEFEATS AUTHORIZATION)
  - in both, it is important that you can not derive the private keys with the hashed value and public key. there are scenarios of people producing data that, when encrypted, will be able to deduce the private key
- APIs make sure the id token was signed by you by using your public key
- tokens contain claims (keys of the JSON)
- Access tokens that are used to grant scope
- Refresh tokens are used to acquire new ID/Access tokens
  - recall the `exp` claim
  - the only way for your application to know if a refresh token is valid is to attempt to redeem it from Azure AD B2C by making a token request
    - you then receive a new refresh token that must be cached

## OAuth 2.0 implicit grant flow

- allows the app to get Azure AD B2C tokens without doing a BE credential exchange

### Refreshing access tokens

- tokens are delivered in the URL
- no refresh tokens (more scope than access tokens)
- "However, a JavaScript application has another mechanism at its disposal for renewing access tokens without repeatedly prompting the user for credentials. The application can use a hidden iframe to perform new token requests against the authorization endpoint of Azure AD: as long as the browser still has an active session (read: has a session cookie) against the Azure AD domain, the authentication request can successfully occur without any need for user interaction."
- since cookies only work for the domain that they were issued for, this presents a problem when JS requests are made to multiple domains
  - access tokens are applied to each request, giving necessary scope
- refresh tokens are not a part of this flow
