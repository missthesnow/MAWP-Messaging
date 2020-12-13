# MAWP Messaging
* This is a web application that allows two people to comumnicate to each other over the internet. It consists of a login page, a conversations page, and a messaging page. 
 
# Development Environment
* [Glitch](https://www.glitch.com/)
    * HMTL
    * JavaScript
    * CSS
* [Firebase](https://firebase.google.com/)

# Firebase Setup
1. Create a Google account and log into Firebase.

2. Click on "Create a project" and follow the setup instructions. (Be sure to save the code it gives you, you will use it to access your firebase project.)

3. Once the project is made, open it up and go to "Authentication" → "Sign-in Method" and enable "Email/Password".


# Files
Files are organized based on their function to keep things clean and easy to understand. This is done by naming each files related to or dependent on each other feature similar naming conventions.


* ## login.html, login.css, login.js
    > This page permits a specific persion access to their messaging data.   
    >
    > ### <u>HTML:</u>
    > ![](login.JPG)   
    >   
    >   
    > ### <u>JavaScript Functions:</u>   
    > 1. getForm()   
    > { Retrevies and returns user email and password input. }
    >    
    > 2. login()   
    > { Submits user's email and password into a firebase login function to access users data. If successful, it will check to see if the 'remember me' checkmark is active and save the credentials accordingly. Otherwise this function will return an error message. }
    >
    > 3. signup()   
    > { Submits user's email and password to a firebase signup function to create a new user account. If successful, it will log the user in automatically. Otherwise this function will return an error message. }   
    >   
    > 4. checkForRememberMe()   
    > { Checks to see if local storage already contains something. }   
    >   
    > 5. forgotPassword()   
    > { Prompts the user for their email, then submits email to an authorization function. If successful, the user will recieve an email with a link that will allow them to change their password. Otherwise this function will return an error message. }

* ## conversations.html, conversations.css, conversations.js
    > This page lists all the conversations the user participates in.
    >   
    > ### <u>HTML:</u>   
    >![](conversations.JPG)
    >   
    > ### <u>JavaScript Functions</u>
    > 1. startConversation()   
    > { Prompts for a user email to send a message to and submits it to a firebase function. If successful a new conversation will be created. Otherwise this function will return an error message. }
    >   
    > 2. loadConversations()   
    > { Retrieves existing conversations from the database and displays them on the webpage. }
    >   
    > 3. back()   
    > { Sends user back to log in page. }

* ## messages.html, messages.css, messages.js
    > This page displays the content of a chosen conversation.
    >   
    > ### <u>HTML:</u>
    >![](messages.JPG)
    >   
    > ### <u>JavaScript Functions</u>
    > 1. loadMessages()   
    > { Constantly checks for content in the database to display on the webpage. }
    >   
    > 2. send()   
    > { retrieves the user's input value from text box and submits it to a to the database under the given users email. }

# Helpful Websites
* [w3schools HTML Tutorial](https://www.w3schools.com/html/default.asp)
* [w3schools JavaScript Tutorial](https://www.w3schools.com/js/default.asp)
* [Firebase Documentation](https://firebase.google.com/docs/)