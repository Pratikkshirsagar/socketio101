// const userName = prompt("What is yor username?");
// const password = prompt("What is yor password?");

const userName = "Pratik";
const password = "1234";

const socket = io("http://localhost:9000");

const namespaceSocket = [];
socket.on("connect", () => {
  console.log("Connected");
  socket.emit("clientConnect");
});

socket.on("nsList", (nsData) => {
  console.log(nsData);
  const nameSpacesDiv = document.querySelector(".namespaces");
  nameSpacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    // update the HTML with the namespace data
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;

    if (!namespaceSocket[ns.id]) {
      namespaceSocket[ns.id] = io(`http://localhost:9000${ns.endpoint}`);
    }
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(
    (element) => {
      console.log(element);
      element.addEventListener("click", (e) => {
        joinNs(element, nsData);
      });
    }
  );
});
