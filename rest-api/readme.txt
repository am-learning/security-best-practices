Express is an un-opinionated, lightweight framework. Therefore, we need additional middleware to achieve certain functionalities. Sails.js is more opinionated and bundles lots of things. 
-	https://expressjs.com/en/resources/middleware.html 
-	https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/ 

NOTE: IMPORTANT:
Middleware Order is very important!


Body Parser


Express Validator 
-	https://express-validator.github.io/docs/ 
 Used for validation of form input such as email, dates, address fields.



Express Session (https://www.npmjs.com/package/express-session)
Used to persist user's session using cookies
- A user session can be stored in two main ways with cookies: on the server or on the client.
- when using cookies: 
    - using httpOnly: true 
        - will hide the cookie from the clientside javascript (document.cookie)
    - using secure: true
        - works only with https protocol
        - so should be used only in production, on https enabled servers
        - If on http protocol, and secure = true, no cookie will be set
        - If in production, the Node Application is behind a proxy, you need to set "trust proxy" in express


Helmet 
-	https://github.com/helmetjs/helmet 
-	
Helps you secure your Express apps by setting various HTTP headersConfigures the Content Security Policy;
-	Removes the header X-Powered-By that informs the name and the version of a server;
-	Configures rules for HTTP Public Key Pinning;
-	Configures rules for HTTP Strict Transport Security;
-	Treats the header X-Download-Options for Internet Explorer 8+;
-	Disables the client-side caching;
-	Prevents sniffing attacks on the client Mime Type;
-	Prevents ClickJacking attacks;
-	Protects against XSS (Cross-Site Scripting) attacks.


CORS 



Mongoose            // for data storage in mongodb


connect-mongo       // for cookie session storage
