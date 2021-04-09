const socket = io();

socket.on('message', msg => {
    document.getElementById('speed').innerText = msg.Speed;
    document.getElementById('gear').innerText = msg.Gear;
    document.getElementById('rpm').innerText = msg.Torque;
});