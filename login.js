function getForm() {
  return {email: document.querySelector("#email").value, 
          password: document.querySelector("#psw").value}
}


function login() {
  backendLogin(getForm().email, getForm().password, function(success, error) {
    if (success) {
      if (document.getElementById("rememberMe").checked) {
        localStorage.setItem("email", getForm().email)
        localStorage.setItem("password", getForm().password)
        localStorage.setItem("isChecked", "true")
      }
      else {
        localStorage.removeItem("email")
        localStorage.removeItem("password")
        localStorage.removeItem("isChecked")
      }
      segueToConversations(auth.currentUser.uid, getForm().email)
    }
    else {
      //alert(error)
      document.getElementById("errorMessage").innerHTML = error;
    }
  })
}

function signup() {
  backendSignup(getForm().email, getForm().password, function(success, error) {
    if (success) {
      login()
    }
    else {
      //alert(error)
      document.getElementById("errorMessage").innerHTML = error;
    }
  })
}


function checkForRememberMe() {
  if (localStorage.getItem("email") !== null) {
    document.querySelector("#email").value = localStorage.getItem("email")
  }
  
  if (localStorage.getItem("password") !== null) {
    document.querySelector("#psw").value = localStorage.getItem("password")
    
  }
  if (localStorage.getItem("isChecked") == "true") {
    document.getElementById("rememberMe").checked = true
    
  }
  
}


function forgotPassword() {
  const usersEmail = prompt("Enter your email address:")
  auth.sendPasswordResetEmail(usersEmail).then(function() {
    alert("An email has been sent to " + usersEmail + " with a link to reset your password.")
  }).catch(function(error) {
    //alert(error)
    document.getElementById("errorMessage").innerHTML = error;
  });
}