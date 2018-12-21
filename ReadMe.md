The Goal
========

- Security Best Practices in a Web Application
----------------------------------------------

-   <https://www.owasp.org/index.php/Authentication_Cheat_Sheet>
-   <https://stackoverflow.com/questions/549/the-definitive-guide-to-form-based-website-authentication>
-   <https://blog.risingstack.com/node-js-security-checklist/>
-   <https://github.com/delight-im/PHP-Auth>
-   <https://github.com/nodesecurity/nsp>

Vulnerabilities and Threats
===========================

Cross Site Scripting (XSS)
----------------------------

-  <https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet>

-   What is it?
    -   XSS attacks occur when an outside entity is able to execute code
        within your website or app.
-   What Vulnerability does it exploit?
    -   The most common attack vector here is if your website allows
        inputs that are not properly sanitized.
-   What is at Risk?
    -   XSS attacks are ...
-   How to Protect?
    -   Sanitize your input fields!

Cross Site Request Forgery (CSRF)
-----------------------------------

-   <https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)>
-   <https://medium.com/node-security/cross-site-request-forgery-mitigation-for-express-js-apps-made-easy-using-the-same-site-cookie-flag-e19ee7d5b513>
-   <https://security.stackexchange.com/questions/170388/do-i-need-csrf-token-if-im-using-bearer-jwt>
-   <https://security.stackexchange.com/questions/166724/should-i-use-csrf-protection-on-rest-api-endpoints/166798#166798>
-   <https://security.stackexchange.com/questions/23371/csrf-protection-with-custom-headers-and-without-validating-token>
-   What is it?
    -   This is an attack that forces an end user to execute unwanted
        actions/requests on a web application in which they\'re
        **currently authenticated**. 
    -   In my words: CSRF happens when someone executes a script on a
        server where you are currently logged in, from your web client
        -   So any persistent cookies, tokens or Remember me scenarios
            are susceptible to CSRF attacks
        -   The longer the cookies/tokens/sessions last, the higher the
            risk
        -   Both GET and POST requests are vulnerable
-   What Vulnerability does it exploit?
    -   HTTP/Basic Authentication and authentication Cookies (or other
        authentication methods that the browser can do automatically)
        are the primary attack vector for CSRF attacks
-   What is at risk?
    -   CSRF attacks are state-changing **requests**, not theft of data,
        since the attacker has no way to see the response to the
        forged **request**
    -   For example: adding a new user, deleting users, changing
        passwords, changing delivery addresses and then buying and
        delivering stuff (shopping carts), transferring money (banks)
        etc.
-   CSRF can happen just by opening a malicious website!!!
    -   The user doesn't even have to click on anything. Script can be
        executed in the \<body onload="maliciousScript()"\> or as the
        src value of an embedded image.
        -   **So do avoid opening suspicious emails and websites**
        -   Simply not clicking on any links, images in websites is not
            enough any more
    -   Most users are normally logged in to their Email, Bank site,
        Amazon or any other shopping site (with their credit card
        information)
    -   If this user now opens another browser tab where a malicious
        script can be executed
    -   This malicious code could randomly send requests to various
        known servers (Gmail, all the banks etc.)
    -   If by chance, one of those requests was to a server where the
        user is currently logged in, in another browser tab,
    -   The malicious script could request to let's say delete emails,
        or change user's password in the email server (that is why,
        asking for existing password to change password is important),
        or change the email and phone number, or make a transaction on
        the bank server.
    -   And since the user is logged in, the request from the malicious
        code will be considered a request from the authenticated user,
        since its coming from the same browser.
-   How to Protect?
    -   There are two methods:
        -   For HTML Form (POST/GET) submits
            -   The server, upon establishing a session with a client
                will generate a unique token
            -   For subsequent POST/GET requests to the server, a hidden
                input field in each html form will contain this token
                and the server will check to make sure the tokens
                match. 
        -   For XHR (Ajax, Axios) based requests
            -   **No cookies = No CSRF**
            -   If you only use authentication via Bearer tokens and not
                via cookies, then there is no concern of CSRF
                vulnerability, and no extra steps are required for
                security.
            -   Verify, server-side, that your application isn\'t
                silently falling back to cookie validation if the Bearer
                token is absent (because the cookie will always be
                present, it could be considered default).
            -   As long as authentication happens in the header (and not
                via cookies), you don\'t have to worry about CSRF
                protection.

SQL Injection
---------------

-   SQL injection consists of injection of a partial or complete SQL
    query via user input. It can read sensitive information or be
    destructive as well.
-   For example:
    -   **select** title, author **from** books **where**
        **id**=\$**id**
    -   In this example \$id is coming from the user - what if the user
        enters 2 or 1=1? The query becomes the following:
    -   **select** title, author **from** books **where** **id**=2
        **or** 1=1
-   How to Protect?
    -   The easiest way to defend against these kind of attacks is to
        use parameterized queries or prepared statements.

Man in the Middle Attacks
---------------------------
(to be written)

Session Hijacking, Sniffing
-----------------------------
(to be written)

Client Side
===========

Considerations
----------------

-   How to log in
-   How to log out
-   How to remain logged in (session management)
-   \"Remember me\" checkbox
-   Managing cookies (including recommended settings)
-   Require re-authentication for sensitive actions even if 'remember
    me' is on
-   SSL/HTTPS end-to-end encryption
-   How to store passwords
-   Forgotten username/password functionality
-   Use of 'nonces' to prevent cross-site request forgeries (CSRF)
-   OpenID
-   Ask for acceptance of Cookies (compliance with EU's DGPR data
    protection laws)
-   Browser auto-completion of usernames and passwords
-   Show/Hide password
-   Secret URLs (public URL protected by digest)
-   Using secret questions
-   Checking password strength
-   E-mail validation

Input Forms
-------------

-   <https://codex.wordpress.org/Data_Validation#Input_Validation>
-   **Rule: Filter on input, escape on output**

### - Validation

### - Sanitization

### - Escaping

-   <https://lukeplant.me.uk/blog/posts/why-escape-on-input-is-a-bad-idea/>

### ** - Need for Sanitization and Escaping**

#### **** - User Data in SQL Statements****

#### **** - User Data in HTML Document****

#### - User Data in URL

#### - User Data in \<script\>

#### - User Data in CSS

Login Process
---------------

-   provide generic/local strategy as well as Social Media login
-   Form Design (<https://uxdesign.cc/design-better-forms-96fadca0f49c>)
    -   Use CSRF token field
    -   Use terms \'Login\' vs \'Sign In\'
    -   Ability to Show/Hide Password
-   Form Input Validation

<https://github.com/monterail/vuelidate>

<https://baianat.github.io/vee-validate/guide/>

-   -   SQL Injection protection
    -   XSS protection
    -   CSRF protection
        (<https://www.acunetix.com/websitesecurity/csrf-attacks/>)

User Registration Process
---------------------------

-   Using emails as username
-   Password strength control
-   Form Design
    -   Use CSRF token field
    -   Use terms \'Register\' vs \'Sign up\'
    -   Ask the absolute minimum amount of information at Registration
        -   Make them fill out the details later
-   Form Input Validation
    -   SQL Injection protection
    -   XSS protection
    -   Responsive Notifications when some input field is missed or
        wrong format, for example
        -   telephone numbers
        -   emails
        -   dates
        -   dollar amounts
-   Form Input Validation using Vuelidate:
    <https://medium.com/js-dojo/simple-vue-js-form-validation-with-vuelidate-722331e5ab0d>

Remember Me Process
---------------------

-   <https://paragonie.com/blog/2015/04/secure-authentication-php-with-long-term-persistence>
-   <https://stackoverflow.com/questions/1354999/keep-me-logged-in-the-best-approach>
-   <https://fishbowl.pastiche.org/2004/01/19/persistent_login_cookie_best_practice>

### Security issues with Remember-Me

-   It creates a large window in which an attacker can \"ride\" on the
    session.
-   This gives an attacker a very long time (Months?) in which he can
    deliver a CSRF attack.
-   Even if you have CSRF protection an attacker can still ride on a
    session with XSS and XmlHttpRequest (HttpOnly Cookies will prevent a
    full hijack).
-   \"Remember Me\" makes other threats like XSS, CSRF, sniffing more
    serious.
-   As long as these vulnerabilities have been addressed, then you
    shouldn\'t have a problem with real world hackers.

### Generic Process:

**Improved Persistent Login Cookie Best Practice**

1.  When the user successfully logs in with Remember Me checked,
    a **login cookie is issued** in addition to the standard session
    management cookie.
2.  The login cookie contains **a series identifier and a token
    (**UserId and a RememberMeToken). The series and token
    are **unguessable random numbers** from a suitably large space. Both
    are stored together in a database table, **the token is
    hashed** (sha256 is fine).

-   The login token is Password Equivalent, so if an attacker got their
    hands on your database, they could use the tokens to log in to any
    account, just as if they were clear text login-password
    combinations.

1.  When a non-logged-in user visits the site and presents a login
    cookie, the series identifier is **looked up in the database**.
    1.  If the **series identifier** is present and the hash of
        the **token** matches the hash for that series identifier, the
        user is considered **authenticated**. A **new token** is
        generated, a new hash for the token is stored over the old
        record, and a new login cookie is issued to the user (it\'s okay
        to re-use the **series identifier**).
    2.  If the series is present but the token does not match,
        a **theft** is assumed. The user receives a strongly worded
        warning and all of the user\'s remembered sessions are deleted.
    3.  If the username and series are not present, the login cookie
        is **ignored**.
2.  When a logged-in user returns, look them up by the RememberMe token
    and make sure the UserId matches.

This approach provides defense-in-depth. If someone manages to leak the
database table, it does not give an attacker an open door for
impersonating users.

### Implementation details

-   store the userId and rememberme token in a separate table in the
    database
-   How to have two cookies in one session?

Password Recovery Process
---------------------------
(to be written)

Client Side Session Management
--------------------------------

-   **cookies**
-   HTML5 Web Storage
    -   **session storage**:
        -   window.sessionStorage
        -   stores data for one session
        -   data is lost when the browser is closed
    -   **local storage**:
        -   window.localStorage
        -   stores data with no expiration date
    -   Before HTML5, application data had to be stored in cookies,
        included in every server request. Web storage is more secure,
        and large amounts of data can be stored locally, without
        affecting website performance.
    -   Unlike cookies, the storage limit is far larger (at least 5MB)
        and information is never transferred to the server.
    -   Web storage is per origin (per domain and protocol). All pages,
        from one origin, can store and access the same data.

Client Side Security
----------------------

### Considerations

-   Do we salty hash the password on the client side??
    -   <https://stackoverflow.com/questions/3715920/is-it-worth-hashing-passwords-on-the-client-side>
    -   <https://security.stackexchange.com/questions/53594/why-is-client-side-hashing-of-a-password-so-uncommon>
-   So from the above links, **basically use TLS/SSL**
    -   HTTPS is HTTP over SSL/TSL
    -   TLS is the SSL v3.1
-   So using https in production is enough then?! seems like it
-   We as programmers DO NOT have to code anything special to achieve
    HTTPS.
    -   It's just a server side step, to buy and install an SSL
        certificate

Authentication vs Authorization
===============================

-   <https://medium.com/tech-tajawal/microservice-authentication-and-authorization-solutions-e0e5e74b248a>
-   <https://blog.bitsrc.io/understanding-json-web-token-authentication-a1febf0e15>
-   <https://blog.sqreen.io/authentication-best-practices-vue/>
-   <https://blog.jscrambler.com/vue-js-authentication-system-with-node-js-backend/?utm_medium=referral&utm_source=reddit.com>
-   <https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide>

There are two concepts to remember:

-   **User Authentication**
    -   A user needs to login and authenticated.
        -   This can be done in a vanilla fashion (find username in
            database, then compare passwords).
        -   Passport.js can be used to accomplish this
        -   We need bcrypt to create/compare password hashes.
    -   User login/authentication could be:
        -   token-based (in which case we need the JWT package too) (Can
            it? I think tokens should be used for authorization and not
            authentication. Am I right?)
        -   session based
-   **Resource Authorization**
    -   API endpoints need to be secured.
        -   Essentially, each time an endpoint is requested, the user is
            checked to be authenticated.
    -   This can be done using passport too!

Authentication Types
----------------------

![Cookie vs Token-Based
Authentication](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA7YAAAIcCAIAAABNaKXzAAB+jElEQVR42uy9AZBdW1mmfavMr1GumIFYXMc4EyEj+SFiZIIGjU4o2iIF+ZngZJxciRKlrZuReIkYmIANRMiVIBECBiqUzXCFUPQMGUndCRokELGBAJFpJGDQoMGJEiU6UcMQMWL/D/3K57r7dHc6SafT6X6e6uraZ5+1115nn+9717vXXnufO0ZFRERERKThDg+BiIiIiIgWWUREREREiywiIiIiokUWEREREdEii4iIiIhokUVEREREtMgiIiIiIlpkEREREREtsoiIiIiIFllERERERIssIiIiIqJFFhERERHRIouIiIiIaJFFRERERLTIIiIiIiJaZBERERERLbKIiIiIiBZZRERERESLLCIiIiKiRRYRERERES2yiIiIiIgWWUREREREiywiIiIiokUWEREREdEii4iIiIhokUVEREREtMgiIiIiIlpkEREREREtsoiIiIiIFllERERERIssIiIiIqJFFhERERHRIouIiIiIaJFFRGRcjh8/vmvXrpGREQ+FiIgWWUREvgL++I477rj//vs9FCIiWmQREfkKjiKLiGiRRURERES0yCIiIiIiWmQRERERES2yiIiIiIgWWUREREREiywiItOLT7QQEdEii4jIg/C5yCIiWmQREXkQjiKLiGiRRURERES0yCIiIiIiWmQRERERES2yiIiIiIgWWUREREREiyy3lvPnzx8/fpz/eXlijEnKj4yMUH5m2pZ9Xb58+ZYcmdOnT7P3ixcvjvsub01+oG4Xzp49O8nHvHl7rJCTm4FPtJjzIIx8y7fLV4xazljHMc8/+Lw91FrkedfJTcJ0eZr777+/fX7q0jEmKb927VrKz8wRyL5wVJOUOXfu3MGDBw8cODA0NMTyNO59y5Yt7H0ireGtyQ/U5B1by6lTp25hmOUBuleV1DNnzkzX6YqP7J2xr9WDfMu90STyNTw8fCPnitTMV4xIzswwyiRMRRZQy5npOHpbe+HChVsYBlP84ETLyZMnZ3KPokW+zQ/cpEzXaWLHIu8Yo97tHTPes2cP3nE2WOQrV65s27ZtwYIFdUxY3rp1K+tnwCLzbnugrrVj67BkyRKM/my2yKtXr6bYdTQyPVb7JereZuYE21HkW0ucykQWFj+U3L/uRJgxi5w+YhIm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ydUvxN8XKFh1HOl3OpXXtVCKtQchvzY1rkWODo/7FOp8EXmgBzY9/WAdls5Ei/wSQt7tzGnRImuR5wu5KaH3xL3uUWg5deoUyYBniryOjIxQrB3RZE0VYD3vlhCfGKOtLYVrsmlq6xgm1qTCzmU+2tbZNTvKCHetoWa2Rf1TjHerAb0t7wWJwXilhnEtaRU4evRoZ1ZGScz9Y4zb+Hr0fapiTaYDtu2s48AuUlX7G4EdcsBbqKfdSx2oNDtTL7LrVk8n/+AZyR73S6mPzOYXx+h8zPbjT/QbgRyE9qvphFwnLKmcfdW7GThv+/4ckylO5ha5TUWbNW3YRww7j3okW8kUsmncuU8Uzrt1X2/njkykILLA/1YueoW9Nw0n6lB6DdxEP8KXAeDsvfO5eo9GNKTtC9KPQPvwuGuVixzVFnbUq/xX7SVpcBrD+t7NaVW+iMOHD3dEkkqivXRtbJj2X9NhzLvViVBJesk8vCgfsFVsYibvpp29h7r3GIoWWURknuITLUREtMgiIvIgvLQqIqJFFhGRB+EosoiIFllERERERIssIiIiIqJFFhERERHRIouIiIiIaJFFRERERLTIIiIyvfhECxERLbKIiDwIn4ssIqJFFhGRB+EosoiIFllERERERIssIiIiIqJFFhERERHRIouIiIiIaJFFRERERLTIIiIyvfhECxERLbKIiDwIn4ssIqJFFhGRB+EosoiIFllERERERIssIiIiIqJFFhERERHRIouIiIiIaJFFRERERLTIIiIyvfhECxERLbKIiDwIn4ssIqJFFhGRB+EosoiIFllERERERIssIiIiIqJFFhERERHRIouIiIiIaJFFRERERLTIIiIyvfhECxERLfIt4x9HR//ib790I3+X/u4fjA+Zh1y49Pc3kjh/88UrHsPJ8bnI4R++/I83qNJf/PsvG04y3/jyP375Y386fK1/n//C5zx0WuSKodGR/33pRv4+99dfMj5kHnLqT79wI4nz2b+87DGcHEeRw99d+fINqjSnc4aTzDeufPnvf+UDL77Wv0987sMeOi2yFllEiyxaZBEtshZZi6xFFtEiixZZRIusRb6NLPK+ffvOnj07A59kcHCwltnjsfe+T4ssty/333//zFyIb2fEXrhw4dChQ1rk+cauXbsuXrx40/v1K1faYCO8f3fk97TIcvtyq+zNbx17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)

### **Session/Cookie-based Authentication** 

-   The Server does all the heavy lifting server-side.
-   **It is state-full.**
    -   Uses are tracked and this information is stored:
        -   On the serverside in the session (in memory, or in some type
            of store, or a database)
        -   On the clientside in a cookie
-   Broadly speaking a client authenticates with its credentials and
    receives a session id (which can be stored in a cookie) and attaches
    this to every subsequent outgoing request.
-   So this could be considered a \"token\" as it is the equivalent of a
    set of credentials.
-   There is however nothing fancy about this session id-String.
-   It is just an identifier and the server does everything else.
-   It associates the identifier with a user account (e.g. in memory or
    in a database).
-   It can restrict or limit this session to certain operations or a
    certain time period and can invalidate it if there are security
    concern and more importantly it can do and change all of this on the
    fly.
-   Furthermore it can log the users every move on the website(s).
-   Possible disadvantages are bad scale-ability (especially over more
    than one server farm) and extensive memory usage.

### **Token-based Authentication** 

-   No session is persisted server-side (**stateless**).
    -   The server does not keep a record of which users are logged in
        or which JWTs have been issued. 
    -   How does the server know the token can be trusted?
        -   Since the token is signed by the server, in the subsequent
            requests, the server can verify that the token indeed was
            granted by it
    -   How does the server know if the client has not stolen the token?
        -   Don't know ....
-   The initial steps are the same.
-   Credentials are exchanged against a token which is then attached to
    every subsequent request (It can also be stored in a cookie).
-   However for the purpose of decreasing memory usage, easy
    scale-ability and total flexibility (tokens can be exchanged with
    another client) a string with all the necessary information is
    issued (the token) which is checked after each request made by the
    client to the server.

#### Generic Token Based Authentication process:

-   User Requests Access with Username / Password
-   Application validates credentials
-   Application provides a signed token to the client
-   Client stores that token and sends it along with every request
    -   The token is generally sent as an addition Authorization header
        in the form of Bearer {JWT},
    -   but can additionally be sent in the body of a POST request
    -   or even as a query parameter
-   Server verifies token and responds with data
-   Once a user logs out, the token is destroyed client-side, no
    interaction with the server is necessary.

#### Advantages of Token-Based Authentication

-   Stateless: Conforms to REST API standards
-   Scalability:
    -   Doesn't take up storage on the server, doesn't need
        session/database lookup on every request
    -   The server\'s only job is to sign tokens on a successful login
        request and verify that incoming tokens are valid.
    -   In fact, the server does not even need to sign tokens. Third
        party services such as Auth0 can handle the issuing of tokens
        and then the server only needs to verify the validity of the
        token.
-   Store Data in the JWT
    -   Depending on your use case you may choose to make the minimal
        amount of claims such as the user id and expiration of the
        token,
    -   Or you may decide to include additional claims such as the
        user\'s email address, who issued the token, scopes or
        permissions for the user, and more.
        -   How is this secure?
-   Performance:
    -   Since additional data can be stored inside the JWT, such as the
        user\'s permission level, it saves additional lookup calls to
        get and process the requested data.
    -   For example, say you had an API resource /api/orders that
        retrieves the latest orders placed via your app, but only users
        with the role of **admin** have access to view this data.
        -   In a cookie based approach, once the request is made, you\'d
            have one call to the database to verify that the session is
            valid, another to get the user data and verify that the user
            has the role of **admin**, and finally a third call to get
            the data.
        -   On the other hand, with a JWT approach, you can store the
            user role in the JWT, so once the request is made and the
            JWT verified, you can make a single call to the database to
            retrieve the orders.
-   Decoupled: Can be used with browsers, Mobile Apps, Microservices, or
    Rest APIs
-   Cross Domain and CORS
    -   Cookies work well with singular domains and sub-domains, but
        when it comes to managing cookies across different domains, it
        can get hairy.
    -   In contrast, a token-based approach with CORS enabled makes it
        trivial to expose APIs to different services and domains.
    -   Since the JWT is required and checked with each and every call
        to the back-end, as long as there is a valid token, requests can
        be processed. 

#### Concerns with Token-Based Authentication

-   Size of Token:
    -   Cookies are tiny. There is a limit of 4 KB
    -   Tokens can store any amount of data and, hence, could become
        very big.
-   Where to Store Token on Client Side:
    -   In Cookie: but cookie has a size limit
    -   In Local Storage: private to the domain. Secure, but same token
        cannot be shared even by subdomains.
    -   In session Storage: expires when the browser is closed
-   Security of Token:
    -   Tokens Are Signed, Not Encrypted
    -   Can be easily decoded
    -   Sensitive data, such as passwords, should never be stored in the
        payload
    -   Should use JSON Web Encryption (JOSE is a nodejs library for
        this)
-   XSS vulnerability:
    -   Cross Site Scripting attacks happen when a malicious user can
        execute script on your site. Main cause is un-sanitized input
        fields (such as comments, reviews etc)
    -   If script can be executed, the Tokens (and non HTTPOnly cookies)
        can be accessed
-   CSRF vulnerability:
    -   Cross Site Request Forgery
    -   CSRF attacks are not an issue if you are using JWT with local
        storage.
    -   If the Token is stored in a cookie, it is vulnerable to CSRF
        attack

#### Recommendations

-   Keep the life of tokens short
-   In the event of a severe breach: change the signing algorithm, which
    would invalidate all active tokens and require all of your users to
    log in again.

Client Side Issues
--------------------

-   To use JWT tokens in the browser you have to store it in either
    cookie, LocalStorage or SessionStorage, which can lead to XSS
    attacks.

#### Links

-   <https://blog.sqreen.io/authentication-best-practices-vue/>
-   <https://blog.jscrambler.com/vue-js-authentication-system-with-node-js-backend/?utm_medium=referral&utm_source=reddit.com>

Server Side Issues
--------------------

-   For supporting web application only, either cookies or tokens are
    fine
    -   In case of cookies: Think about CSRF attacks
    -   In case of JWT tokens: Take care of XSS attacks
-   For supporting both a web application and a mobile client,
    -   Go with an API that supports token-based authentication.
-   For APIs that communicate with each other, go with request signing.

#### Links

-   <https://stackoverflow.com/questions/549/the-definitive-guide-to-form-based-website-authentication>
-   <https://blog.bitsrc.io/understanding-json-web-token-authentication-a1febf0e15>
-   <https://hackernoon.com/your-node-js-authentication-tutorial-is-wrong-f1a3bf831a46>
-   <https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/>
-   <https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359>
-   <https://www.codementor.io/kgasta/nodejs-authentication-methods-e0c0i6k40>
-   <https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication>

Server Side
===========

Considerations
----------------

-   Authentication
    -   Passwords
        -   Hashing
        -   Salting
    -   Brute Force Protection
-   Server side Session Management
    -   <https://www.owasp.org/index.php/Top_10_2013-A2-Broken_Authentication_and_Session_Management>
    -   Guest Sessions (not logged in)
    -   User Sessions (logged in)
-   Tokens
-   Access permissions/User Roles
-   endpoint Authorization/Protection
-   re-authenticating users for sensitive actions such as changing
    passwords etc
    -   To avoid CSRF attacks which would attempt to change a user's
        password on a server where the user is logged in.

Express Middleware
--------------------

Express is an un-opinionated, lightweight framework. Therefore, we need
additional middleware to achieve certain functionalities. Sails.js is
more opinionated and bundles lots of things.

-   <https://expressjs.com/en/resources/middleware.html>
-   <https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/>

Important: the order of Middleware in the app.js/server.js is
important!!

#### Body Parser

-   <https://expressjs.com/en/resources/middleware/body-parser.html>
-   <https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90>

TLDR: It returns a function that acts as middleware. The function
listens for req.on('data') and constructs req.body from the chunks of
data it gets.

-   This module is needed to read HTTP POST requests in Express.js v4
    and above.
-   body-parser is an express middleware that reads a form\'s input and
    stores it as a JavaScript object accessible through \'req.body\'.
-   That is, You need to use bodyParser() if you want the form data to
    be available in req.body.
    -   body-parser doesn't handle multipart bodies.
    -   We would need busboy, Multer or multiparty libraries for this
-   Use of bodyParser.urlencoded({extended: true})
    -   The \"extended\" syntax allows for rich/nested objects and
        arrays to be encoded into the URL-encoded format, allowing for a
        JSON-like experience with URL-encoded

#### Express Validator

-   <https://express-validator.github.io/docs/>

Used for validation of form input such as email, dates, address fields.

#### Express Session

Used to persist user\'s session

\- A user session can be stored in two main ways with cookies: on the
server or on the client. (see express-session vs cookie-session
comparison above)

#### Helmet

-   <https://github.com/helmetjs/helmet>

Helps you secure your Express apps by setting various HTTP headers
Configures the Content Security Policy;

-   Removes the header X-Powered-By that informs the name and the
    version of a server;
-   Configures rules for HTTP Public Key Pinning;
-   Configures rules for HTTP Strict Transport Security;
-   Treats the header X-Download-Options for Internet Explorer 8+;
-   Disables the client-side caching;
-   Prevents sniffing attacks on the client Mime Type;
-   Prevents ClickJacking attacks;
-   Protects against XSS (Cross-Site Scripting) attacks.

#### CORS

-   <https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS>
-   <https://expressjs.com/en/resources/middleware/cors.html>
-   <https://www.html5rocks.com/en/tutorials/cors/>
-   <https://www.moesif.com/blog/technical/cors/Authoritative-Guide-to-CORS-Cross-Origin-Resource-Sharing-for-REST-APIs/>
-   Cross-Origin Resource Sharing (CORS) is a mechanism that uses
    additional HTTP headers
    -   to tell a browser to let a web application running at one origin
        (domain) have permission
    -   to access selected resources from a server at a different
        origin.
-   For security reasons, browsers restrict cross-origin HTTP requests
    initiated from within scripts.
-   CORS allow AJAX requests to skip the Same-origin policy and access
    resources from remote hosts
    -   either by using the default options
    -   or allowing specific origins only
    -   The default configuration is the equivalent of:

```javascript
{

\"origin\": \"\*\",

\"methods\": \"GET,HEAD,PUT,PATCH,POST,DELETE\",

\"preflightContinue\": false,

\"optionsSuccessStatus\": 204

}
```

-   Since our vue/react clients are running on a different URL than the
    API server,
-   If we do not use CORS, the ajax request from the client will meet an
    access control error,
-   If we use CORS without any options, the default configurations as
    shown above will be applied.
    -   This is not good for security, since anyone can request
        resources and could crash the server
    -   Or a XSS attack could happen
-   If we setup CORS correctly, only certain origins will be white
    listed.
    -   Cross Site Scripting (XSS) attacks can be prevented that way
    -   since the malicious code won't have an origin which is allowed
        by the server
-   CORS must enable cross-origin requests while still protecting the
    browser\'s same-origin policy
-   CORS requires a preflight/pre-request handshake before the actual
    HTTP request
    -   In the preflight request, the client asks for a type of
        connection and the server responds that it\'ll allow it
    -   this pre-flight request is permitted via the
        Access-Control-Expose-Headers
    -   Once the client knows it is allowed a certain header,
        -   then it uses that header in the actual request
        -   this is permitted via the Access-Control-Allow-Headers
-   Access-Control-Expose-Headers
    -   This header lets a server whitelist headers that browsers are
        allowed to access.
    -   By default, only the following headers are exposed
        -   Cache-Control
        -   Content-Language
        -   Content-Type
        -   Expires
        -   Last-Modified
        -   Pragma
-   Access-Control-Allow-Headers
    -   Used in response to a preflight request to indicate which HTTP
        headers can be used when making the actual request.
    -   to check the headers, open the Network tab in the Chrome
        DevTools, and review the \'XHR\' details
        -   Do I need to set both the \'Authorization\' and
            \'Credentials\' headers for the Session management to work?
            -   Authorization header is needed to send the token in the
                request
            -   Credentials header is needed to send a cookie with the
                request
            -   the Credentials header has to be set on both server (in
                the CORS options) and client (in the Ajax/Axios/XHR
                requests) for it to work
                -   But the question is: do I need it?

Middleware Comparison
-----------------------

### express-session vs cookie-session

-   express-session is more abstract, it supports different session
    stores (like files, DB, cache and whatnot).
    -   it should be used for larger and sensitive payloads
-   cookie-session is a simple / lightweight cookie-based session
    implementation, where cookie is the only Storage engine supported.
    -   That is, all the session info is stored on the client, in a
        cookie.
    -   It should only be used for small amount of data, and when
        session data isn\'t sensitive.
    -   In case of cookie-session, the server is entirely stateless
    -   It is helpful in applications where no database is used in the
        back-end.
    -   Cases where database is used, it can still be useful, for
        example,
        -   To act like a cache to stop frequent database lookups which
            is expensive.
-   Both middleware make use of client-side cookies to maintain a
    user\'s context i.e. Session.
-   The difference lies in:
    -   What gets stored in the cookies, and
    -   Whether server-side store is needed

The table below compares cookie-session middleware and express- session
middleware with respect to Sessions:

**Client-side Store (cookie)**

**Server-side Store (in memory, db etc)**

**Middleware**

***Used?***

***What is stored?***

***Used?***

***What is stored?***

**cookie-session**

Yes

All session data

No

N/A

**Express-session**

Yes

Only Session Id

Yes

All Session data

### express-session vs passport

-   <https://www.airpair.com/express/posts/expressjs-and-passportjs-sessions-deep-dive>
-   <https://www.npmjs.com/package/express-session>
-   express-session creates a session to store user data in
    -   if 'cookie' is specified in the options,
        -   then the cookie is stored in express session
    -   if 'store' is specified in the options
        -   then we need a persistent store such as a database
        -   there is a list of supported stores on the npm link above
        -   if connect-mongodb-session is used for store,
            -   the session is stored in the mongodb in the 'sessions'
                document
    -   option saveUninitialized = false 
        -   Is useful for implementing login sessions, reducing server
            storage usage, or complying with laws that require
            permission before setting a cookie.
        -   Choosing false will also help with race conditions where a
            client makes multiple parallel requests without a session.
-   If a client has never visited the site before
    -   That means there is no session and cookie on the server
    -   The client **request** has no cookie header
        -   But the response has some problem (no data) in my case !!
    -   The server **response** has a 'set-cookie' header
-   If page is refreshed while a cookie is active, then there is a
    cookie in **request** only
    -   If the cookie is not modified on the server, the response will
        not have a cookie (VERIFY)
-   the session from mongodb is deleted after the time specified in the
    cookie's maxAge property
    -   if a client then access the site again after their existing
        cookie has expired
        -   their **request** will have the header 'cookie' with the
            value of the expired cookie
        -   a new cookie is created on the server for them
        -   the **response** of that request has header 'set-cookie'
            with a fresh cookie
    -   while a cookie is active, the **response** has the header
        'cookie'
-   express session works even when no authentication/user login is in
    place
-   express-session makes the following objects available to the 'req'
    -   req.session.cookie
    -   req.session.user
    -   req.session.passport.user (if passport is used)
-   passport is needed to implement some type of authentication
    -   req.user is made available from the passport session
    -   passport\'s serialize and deserialize functions receives the
        req.session.passport.user
    -   and the deserialize function creates the req.user from it
-   what is req.cookie? is it the cookie sent from the client?
-   do we need to store the user in the express session?
-   how much of user should we store in the express session?
-   do we save the whole user in the session or just some token?

### jsonwebtoken vs passport-jwt

jsonwebtoken:

-   An implementation of JSON Web Tokens.
-   This was developed against draft-ietf-oauth-json-web-token-08. It
    makes use of node-jws
-   This needs \'jws\' (jws or jwt?)

passport-jwt:

-   A Passport strategy for authenticating with a JSON Web Token.
-   This module lets you authenticate endpoints using a JSON web token.
-   It is intended to be used to secure RESTful endpoints without
    sessions.
-   the passport-jwt uses \'jsonwebtoken\' as a dependency

### bcrypt vs bcryptjs

JWT

<http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/>

**- Routes**
------------

Every route file must have lines 1, 2 and 3

1\. const express = require(\'express\')

2\. const router = express.Router()

// bunch of routes

3\. module.exports = router

In case of fetch route in a client-side code. If you do not
specify credentials: \'include\' in fetch options, cookies are neither
sent to server nor saved by a browser, although the server response sets
cookies.

Security
----------

### Links

-   <https://expressjs.com/en/advanced/best-practice-security.html>
-   <https://blog.risingstack.com/node-js-security-checklist/>

### In production

-   The first step in securing any web application is using SSL.
    -   That keeps your cookie confidential, prevents replay attacks,
        ensures the user is talking to the right server, prevents MitM,
        and prevents attackers from changing the data on the network
-   Set the secure flag on the cookie, so it\'s only sent over SSL
    (HTTPS).
-   Set the http-only flag, to prevent JavaScript from reading it.

To test production setup on localhost, generate a self-signed SSL
certificate
<https://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/>

### Considerations

-   Do we need CORS (whitelist origins) when using Tokens for
    authentication?
-   Is token enough for authentication or
    -   Is it just an identified for user information stored on the
        server in a session?
-   tokens can be used to allow a third-party access to one\'s own data
    -   e.g when we allow an app to access our Facebook
    -   this will further need user roles so only selective data is
        allowed to third parties

### TODOs

-   I should do different APIs with different scenarios for token
    expiration
    -   e.g a bank\'s API should allow only short lived sessions/tokens
    -   and email or social media is a long term session/token
-   I should learn to force a session/token to expire pre-maturely
    -   e.g in response to a suspicion of un-authorized activity

Server Side Session Management (using express-session)
--------------------------------------------------------

-   If you want two separate session objects, one for regular usage and
    one for admin usage with no overlap between them,
    -   then you have to do two separate app.use(\'/path1\',
        session(\...)) and app.use(\'/path2\', session(\...)) statements
        so you have two separate session managers for different paths
        and make sure each has a different cookie name (using
        the name parameter to the session() options).
    -   And, then you have to design your URLs to be sub-paths of those
        so they get the right path.
-   Usually, people only use one session and then just keep a flag in
    the session whether it\'s admin login or not and you can check that
    flag when needed.
-   It's common practice to associate a session with an anonymous user,
    one who hasn't authenticated with your application. However, when a
    user does successfully authenticate with your application, **it is
    absolutely paramount that the authenticated user doesn't continue to
    use the same session ID.**

<https://dzone.com/articles/securing-nodejs-managing-sessions-in-expressjs>

### Cookies

Cookies are simply key/value pairs that let us get around HTTP being a
stateless protocol. When an application wants some data to last for more
than one connection they can use cookies to store that data on the
client side. 

-   Cookies can be used to store non-sensitive data such as preferences
    for themes, and other personalization.
-   Cookies are used to store user session data too. This information is
    sensitive and must be secured. But cookies are inherently unsecure
    and hence must never be used to store passwords or other sensitive
    information.

#### 4 ways to steal your cookies

1.  By intercepting it over an unsecure line (packet sniffing / session
    hijacking)
2.  By an XSS hack (or similar client-side exploit)
3.  By directly accessing the user\'s browser (via either malware or
    physical access to the box)
4.  By reading it from the server database (probably SQL Injection, but
    could be anything)

#### 2 ways to use cookies securely

1.  To avoid 1 from above (Man in the Middle, Sniffing, Hijacking),
    1.  Use HTTPs on the server
    2.  Use the 'secure' (only possible on https) flag when the cookie
        is created
    3.  Remember: the cookie will not be set and sent to the client if
        'secure: true' and the protocol is not HTTPS
2.  To avoid 2 from above (XSS attacks),
    1.  Properly sanitize your data/input
    2.  Use only a token or session id in the cookie on the client-side
        and store the actual sensitive user data on the server side
        only. These cookies are called session cookies.
    3.  Use HTTPOnly flag in the cookie
        -   Since the session ID is of no use to the client, there is
            absolutely no reason that the front-end application should
            ever have access to the session ID in the cookie. 
        -   Now, only the agent (i.e., browser) will have access to the
            cookie in order to resubmit it on the next request to the
            same domain. This will directly help mitigate cross-site
            scripting threats that could have otherwise accessed the
            contents of our session cookie.

Some very complicated article about cookies:
<https://lcamtuf.blogspot.com/2010/10/http-cookies-or-how-not-to-design.html>

#### Secured Cookies

-   <https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies>
-   Don't use the default session cookie name

app.use(session({

secret: \'s3Cur3\', // this should be coming from the .env file

name: \'sessionId\' // this should be random name, and coming from the
.env file

}))

-   Set the following cookie options to enhance security:
    -   **secure** - Ensures the browser only sends the cookie over
        HTTPS.
    -   **httpOnly** - Ensures the cookie is sent only over HTTP(S), not
        client JavaScript,
        -   Helping to protect against cross-site scripting (XSS)
            attacks.
        -   This way they won\'t show up in document.cookies
        -   To prevent cross-site scripting
            ([XSS](https://developer.mozilla.org/en-US/docs/Glossary/XSS))
            attacks, HttpOnly cookies are inaccessible to
            JavaScript\'s [Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie%22%20\o%20%22Get%20and%20set%20the%20cookies%20associated%20with%20the%20current%20document.%20For%20a%20general%20library%20see%20this%20simple%20cookie%20framework.) API;
            they are only sent to the server. For example, cookies that
            persist server-side sessions don\'t need to be available to
            JavaScript, and the HttpOnly flag should be set.
    -   **domain** - indicates the domain of the cookie;
        -   Use it to compare against the domain of the server in which
            the URL is being requested. If they match, then check the
            path attribute next.
    -   **path** - indicates the path of the cookie;
        -   Use it to compare against the request path.
        -   If this and domain match, then send the cookie in the
            request.
    -   **expires** - use to set expiration date for persistent cookies.

#### Setting multiple cookies

<http://www.connecto.io/blog/nodejs-express-how-to-set-multiple-cookies-in-the-same-response-object/>

REVIEW this

*\*\*\*\*\*\*\*\*\*\* this is someone\'s secured cookies not working due
to reverse-proxy settings on the server*

*https://github.com/expressjs/session/issues/281\#issuecomment-191283280*

*const expressSession = require(\'cookie-session\')*

*var expiryDate = new Date(Date.now() + 7 \* 24 \* 60 \* 60 \* 1000); //
7 days*

*const session = expressSession({*

*secret: sessionSecret,*

*resave: false,*

*saveUninitialized: true,*

*cookie: {*

*secureProxy: true,*

*httpOnly: true,*

*domain: \'beintoo.net\',*

*expires: expiryDate*

*}*

*})*

*app.use(session)*

*I just changed require(\'express-session\') to
require(\'cookie-session\') and added secureProxy: true, everything
worked out of the box.*

*Note also that both packages are maintained by expressjs so probably in
my use case, I was lucky finding out that cookie-session fits my needs.*

*\*\*\*\*\*\* Someone\'s Answer: Note that this was caused by a
misconfigured reverse proxy in front of express*

*(X-Forwarded-Proto was missing). Secure cookies are fully supported by
express-session as well*

*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\**

UI Frameworks
=============

Vue
---

-   Vuetify (<https://vuetifyjs.com/en/>)
-   Vue Material (<https://vuematerial.io/>)
-   Bootstrap Vue (<https://bootstrap-vue.js.org/>)
-   MD Bootstrap (<https://mdbootstrap.com/vue/>)
-   Bulma (<https://bulma.io/>)

<https://dev.to/rhymes/what-vuejs-framework-should-i-use-4nk1>

React
-----
