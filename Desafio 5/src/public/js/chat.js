const socket = io();
const chatBox = document.getElementById("chatBox");
const btnSend = document.getElementById("btnSendMessage");
//const messageLogs = document.getElementById("messageLogs");
let user = "";

Swal.fire({
  title: "Welcome to Chat!",
  text: "Please enter your name:",
  input: "text",
  inputValidator: (value) => {
    return !value && "Error! You need to write something!";
  },
}).then((data) => {
  user = data.value;
  socket.emit("newChatUser", user);
});

sendMessageToSocket = () => {
  if (chatBox.value.trim().length > 0) {
    socket.emit("newMessage", { user: user, message: chatBox.value.trim() });
    chatBox.value = "";
  }
};

chatBox.addEventListener("keyup", (e) => {
  e.key === "Enter" && sendMessageToSocket();
});

btnSend.addEventListener("click", () => {
  sendMessageToSocket();
});

//eventos socket escuchados
socket.on("newChatUser", (data) => {
  Swal.fire({
    position: "top-end",
    title: data,
    showConfirmButton: false,
    timer: 1000,
  });
});

socket.on("messages", (data) => {
  let html = ``;

  data.forEach((item) => {
    html += `<div class="row mb-3">
        <div class="col-md-11"><b>${item.user}:</b><span class="fw-light"> ${item.message}</span></div>
        </div>`;
  });

  messageLogs.innerHTML = html;
});
