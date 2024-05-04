const joinNs = (element, nsData) => {
  const nsEndpoint = element.getAttribute("ns");
  console.log(nsEndpoint);

  const clickNs = nsData.find((row) => row.endpoint === nsEndpoint);
  const rooms = clickNs.rooms;

  let roomList = document.querySelector(".room-list");
  roomList.innerHTML = "";

  let firstRoom;

  rooms.forEach((room, i) => {
    if (i === 0) {
      firstRoom = room.roomTitle;
    }

    roomList.innerHTML += `<li class="room" namespaceId=${
      room.namespaceId
    }><span class="fa-solid fa-${
      room.privateRoom ? "lock" : "globe"
    } "></span> ${room.roomTitle}</li>`;
  });

  joinRoom(firstRoom, clickNs.id);

  const roomNodes = document.querySelectorAll(".room");
  Array.from(roomNodes).forEach((element) => {
    element.addEventListener("click", (e) => {
      const namespaceId = e.target.getAttribute("namespaceId");
      joinRoom(e.target.innerText, namespaceId);
    });
  });

  localStorage.setItem("ns", nsEndpoint);
};
