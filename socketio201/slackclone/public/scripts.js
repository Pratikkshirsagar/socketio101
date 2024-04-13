// const userName = prompt("What is yor username?");
// const password = prompt("What is yor password?");

const userName = "Pratik";
const password = "1234";

const socket = io("http://localhost:9000");

socket.on("connect", () => {
  console.log("Connected");
  socket.emit("clientConnect");
});

socket.on("nsList", (nsData) => {
  const nameSpacesDiv = document.querySelector(".namespaces");
  nsData.forEach((ns) => {
    // update the HTML with the namespace data
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.name}"><img src="${ns.image}"></div>`;
  });
});
