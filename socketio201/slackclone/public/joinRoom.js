const joinRoom = async (roomName, namespaceId) => {
  console.log(roomName, namespaceId, "roomName, namespaceId");
  const ackResp = await namespaceSocket[namespaceId].emitWithAck(
    "joinRoom",
    roomName
  );

  document.querySelector(
    ".curr-room-num-users"
  ).innerHTML = `${ackResp.numUsers}<span class="fa-solid fa-user"></span>`;

  document.querySelector(".curr-room-text").innerHTML = roomName;
};
