function segueToConversations(id, senderEmail) {
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("body").innerHTML =
      this.responseText;
      loadConversations(id, senderEmail)
    }
  };
  xhttp.open("GET", "conversations.html", true);
  xhttp.send();
}

function segueToMessages(conversationId, recieverId, senderEmail, recieverEmail) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("body").innerHTML =
      this.responseText;
      loadMessages(conversationId, recieverId, senderEmail, recieverEmail)
    }
  };
  xhttp.open("GET", "messages-template.html", true);
  xhttp.send();
}


function segueToLogin() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("body").innerHTML =
      this.responseText;
      checkForRememberMe()
    }
  };
  xhttp.open("GET", "login.html", true);
  xhttp.send();
}