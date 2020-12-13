

function startConversation() {
  const recieverEmail = prompt("Email: ")
  backendCreateConversation(auth.currentUser.uid, recieverEmail, function(success) {
    if (success == false) {
      alert("Email does not exist.")
    }
    else {
      segueToConversations(auth.currentUser.uid)
    }
    
  })
}

function loadConversations(id, senderEmail) {
   backendLoadConversations(id, function(result, query) {
      // let conversation = document.createElement("Button")
      unsubscribe = query
      // conversation.innerHTML = result.email
      // document.querySelector("#list").appendChild(conversation)
      // document.querySelector("#list").appendChild(document.createElement("br"))
     
     let mainDiv = document.createElement("DIV")
     mainDiv.className = "d-flex bd-highlight"
     
     let secondDiv = document.createElement("DIV")
     secondDiv.className = "img_cont"
     
     let image = document.createElement("IMG")
     image.src = "https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"
     image.className = "rounded-circle user_img"
     
     let span1 = document.createElement("SPAN")
     span1.className = "online_icon"
     
     let userInfoDiv = document.createElement("DIV")
     userInfoDiv.className = "user_info"
     
     let span2 = document.createElement("SPAN")
     span2.innerHTML = result.email
     
     let p = document.createElement("P")
     if (result.isRead == auth.currentUser.uid) {
       p.innerHTML = "New Message!!!"
     }
     
     
     
     
     let startOfListing = document.createElement("LI")
     let link = document.createElement("A")
     
     userInfoDiv.appendChild(span2)
     userInfoDiv.appendChild(p)
     
     secondDiv.appendChild(image)
     secondDiv.appendChild(span1)
     
     mainDiv.appendChild(secondDiv)
     mainDiv.appendChild(userInfoDiv)
     
     link.appendChild(mainDiv)
     startOfListing.appendChild(link)
     
     
     startOfListing.addEventListener("click", function(){
       unsubscribe()
        segueToMessages(result.conversationId, result.recieverId, senderEmail, result.email)
     })
     
     document.querySelector("#list").appendChild(startOfListing)
     
    })
}


function back() {
  unsubscribe()
  segueToLogin()
}


function reload() {
  
}