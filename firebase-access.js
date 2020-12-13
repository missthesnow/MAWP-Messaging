//Functions that Communicate with Firebase

/*
                Table of Contents
    0. Functions that are in progress
    1. backendCreateConversation
    2. backendLogin
    3. backendSignup
    4. calculateConversationId
    5. doesConversationExist
    6. getIdFrom 
    7. getEmailFrom
    8. isUserSignedIn
    9. setUpConversation
    
    

*/


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
let db = firebase.firestore();

//--------------------------------------------------------------------------------
//In progress
function backendSendMessage(senderId, recieverId, conversationId, text) {
  db.collection("conversations").doc(conversationId).collection("messages").add({
    timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    senderId: senderId,
    receiverId: recieverId,
    text: text
  }) 
  db.collection("conversations").doc(conversationId).update({
    timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    needsToRead: recieverId
  })
}



function backendGetMessages(conversationId, callbackFunc) {
  db.collection("conversations").doc(conversationId).collection("messages").orderBy("timestamp").get().then(function(results){
    let messageList = []
    results.forEach(function(doc) {
      let message = {
        text: doc.data().text,
        time: doc.data().timestamp.toDate(),
        senderId: doc.data().senderId,
        recieverId: doc.data().receiverId
      }
      messageList.push(message)
      
    })
    callbackFunc(messageList)
  })
}

function backendGetLastMessage(conversationId, callbackFunc) {
  db.collection("conversations").doc(conversationId).collection("messages").orderBy("timestamp", "desc").limit(1).get().then(function(results){
    let messageList = []
    results.forEach(function(doc) {
      let message = {
        text: doc.data().text,
        time: doc.data().timestamp.toDate(),
        senderId: doc.data().senderId,
        recieverId: doc.data().receiverId
      }
      messageList.push(message)
      
    })
    callbackFunc(messageList)
  })
}

//This will call the callbackFunc for each conversation 
function backendLoadConversations(id, callbackFunc) {
  console.log("BackendLoadConversations")//.get()
  var query = db.collection("conversations").orderBy("timestamp", "desc").where("userIds", "array-contains-any" , [id]).onSnapshot(function(results){
    document.querySelector("#list").innerHTML = ""
    results.forEach(function(conversation) {
      let otherId
      if (id == conversation.data().userIds[0]) {
        otherId = conversation.data().userIds[1]
      }
      else {
        otherId = conversation.data().userIds[0]
      }
      
      getEmailFrom(otherId, function(email) {
        callbackFunc({email: email, conversationId: conversation.data().id, recieverId: otherId, isRead: conversation.data().needsToRead}, query)
        
      })
      
      
    })
    
    
  })
}

//------------------------------------------------------------------------------------


function backendCreateConversation(senderId, recieverEmail, callbackFunc) {
  //returns true or false via callback
  getIdFrom(recieverEmail, function(recieverId) {
    calculateConversationId(senderId, recieverId, function(conversationId) {
      doesConversationExist(conversationId, function(conversationExists) {
        if (!conversationExists && recieverId != false) {
          setUpConversation(senderId, recieverId, conversationId)
          callbackFunc(true)
        }
        else {
          callbackFunc(false)
        }
      })
    })
  })
}


function backendLogin(email, password, callbackFunc) {
  console.log("backend login")
  //Calback return bool and string
  auth.signInWithEmailAndPassword(email, password)
    .then(function(user) {
      callbackFunc(true, "No Error")
    })
    .catch(function(error){
      callbackFunc(false, error.code + "\n" + error.message)
    })
}


function backendSignup(email, password, callbackFunc) {
  //Callback return bool and error message 
  auth.createUserWithEmailAndPassword(email, password)
  .then(function(){
    backendLogin(email, password, function() {
      const uid = auth.currentUser.uid
      db.collection("users").doc(uid).set({
        id: uid,
        email: email,
        conversation_refs: []
      })
      callbackFunc(true, "No Error")
    })
    
  })
  .catch(function(error) {
    callbackFunc(false, error.code + "\n" + error.message)
  });
  
}


function calculateConversationId(senderId, recieverId, callbackFunc) {
  //calls the callback with the conversation id
  let conversationId = ""
  if (senderId < recieverId) {
    conversationId = senderId + recieverId
  }
  else {
    conversationId = recieverId + senderId 
  }
  callbackFunc(conversationId)
}


function doesConversationExist(conversationId, callbackFunc) {
  //returns via callback. True if exists, false if it doesn't 
  db.collection("conversations").doc(conversationId).get().then(function(doc){
    if (doc.exists) {
      callbackFunc(true)
    }
    else {
      callbackFunc(false)
    }
  })
}

function getIdFrom(email, callbackFunc) {
  //callback returns id if found, false if not found 
  var query = db.collection("users").where("email", "==", email)
  .get()
  .then(function (queryResults) {
    let empty = true
    queryResults.forEach(function(doc) {
      callbackFunc(doc.data().id)
      empty = false
    })
    if (empty == true) {
      callbackFunc(false)
    }
  })
}


function getEmailFrom(id, callbackFunc) {
  var query = db.collection("users").where("id", "==", id)
  .get()
  .then(function(queryResults) {
    let empty = true
    queryResults.forEach(function(doc) {
      callbackFunc(doc.data().email)
      empty = false
    })
    if (empty == true) {
      callbackFunc(false)
    }
  })
}


function isUserSignedIn() {
  return !!auth.currentUser;
}

function setUpConversation(senderId, recieverId, conversationId) {
  db.collection("conversations").doc(conversationId).set({
        id: conversationId,
        userIds: [senderId, recieverId],
        isRead: true,
  })
  db.collection("conversations").doc(conversationId).update({
    timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  })
}




 





