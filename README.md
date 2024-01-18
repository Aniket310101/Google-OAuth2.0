# **Google OAuth2.0**

Google OAuth 2.0 is an authentication and authorization protocol used by applications to access Google APIs (Application Programming Interfaces) on behalf of users. OAuth 2.0 is an open standard for access delegation and is widely used for secure, delegated access to resources on the web.

Here's a brief overview of how Google OAuth 2.0 works:

+ **Application Registration**:
    Developers need to register their applications with the Google Cloud Console to obtain client credentials (client ID and client secret). This involves creating a project and enabling the necessary APIs.
    
+ **User Authentication**:
    When a user wants to access a service provided by the application (e.g., signing in with their Google account), the application redirects the user to Google's authentication server.
    
+ **User Consent**:
    The user is prompted to grant or deny permissions to the application. This step is crucial for security and privacy, as it ensures that users are aware of the data and permissions they are granting to the application.
    
+ **Authorization Code Grant Flow**:
    Upon user consent, Google returns an authorization code to the application's redirect URI.
    
+ **Token Exchange**:
    The application then exchanges the authorization code for an access token and a refresh token. The access token is used to make requests to Google APIs on behalf of the user.
    Accessing Google APIs:
    The application includes the access token in API requests to authenticate itself and access the user's resources or perform actions on their behalf.
    
+ **Token Refresh**:
    Access tokens have a limited lifespan. When they expire, the application can use the refresh token to obtain a new access token without requiring user interaction.
    Google OAuth 2.0 provides a secure way for applications to access user data without exposing user credentials. It is commonly used in web and mobile applications that integrate with Google services such as Google Drive, Google Calendar, and YouTube, among others.
    
Developers can find detailed documentation and guides on implementing Google OAuth 2.0 in their applications in the [Google Identity Platform documentation](https://developers.google.com/identity/protocols/oauth2).


## **Steps to Setup and Run the Code**

1. Clone the Repository into your local machine.
2. Create a .env file in the root directory with the following contents:-
    <pre>
        ```
        CLIENT_ID = <Refer Below>
        CLIENT_SECRET = <Refer Below>
        REDIRECT_URL = 'http://localhost:3000/oauth2callback'
        SCOPE_BASE_URL = 'https://www.googleapis.com/auth'
        USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'
        ```
    </pre>
3. Run `npm i`
4. Run `npm start`


## **Steps to Get Client ID and Client Secret**

### 1. Go to the Google Cloud Console:
    Visit the Google Cloud Console.

### 2. Create a New Project:
    Click on the project dropdown at the top of the page.
    Click on "New Project."
    Enter a name for your project and click "Create."
    
### 3. Enable the Identity Platform API:
    In the left sidebar, navigate to "APIs & Services" > "Dashboard."
    Click on "+ ENABLE APIS AND SERVICES."
    Search for "Identity Platform API" and enable it.

### 4. Configure OAuth Consent Screen:
    In the left sidebar, navigate to "APIs & Services" > "OAuth consent screen."
    Choose "External" and click "Create."
    Fill in the required fields, including the "User support email" and "Developer contact information."
    Add the "Authorized domains" for your application.
    Scroll down and click "Save and Continue."
    Complete the remaining steps of the OAuth consent screen setup.
    
### 5. Create OAuth 2.0 Credentials:
    In the left sidebar, navigate to "APIs & Services" > "Credentials."
    Click on "Create Credentials" and select "OAuth client ID."
    Choose the application type (Web application or Other), enter a name for your client ID, and specify the authorized redirect URIs.
    For a web application, add the redirect URI(s) where Google should redirect the user after they grant/deny permission.
    For testing purposes, you can use http://localhost:PORT as a redirect URI.
    Click "Create."
    
### 6. Obtain Client ID and Client Secret:
    After creating the OAuth client ID, you will see a pop-up containing your Client ID and Client Secret.
    Copy these credentials to a secure location, as you'll need them in your application.
    
### 7. Configure API Scopes:
    While creating the OAuth client ID, you can specify the API scopes your application needs. For email and profile information, you typically include the "openid", "email", and "profile" scopes.
    
### 8. Implement OAuth in Your Application:
    Use the obtained Client ID and Client Secret in your application to initiate the OAuth flow.
    
**Note**:<br>
When users authenticate, request the appropriate scopes (e.g., "openid", "email", and "profile") to access email and profile information.
Remember to keep your Client Secret secure and never expose it in public repositories or client-side code. Integrate the OAuth flow in your application according to your programming language and framework. Consult the Google Identity Platform documentation for detailed implementation guidelines specific to your development environment.
