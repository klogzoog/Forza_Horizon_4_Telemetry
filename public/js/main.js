const socket = io();

let redLight = 0;

socket.on('message', msg => {
    document.getElementById('speed').innerText = msg.Speed;
    document.getElementById('gear').innerText = msg.Gear;
    document.getElementById('rpm').innerText = msg.Torque;
    gauge4.setValue(msg.CurrentEngineRpm);
    gauge4.setMaxValue(msg.EngineMaxRpm);

    redLight = msg.EngineMaxRpm / 5;
});

let gauge4 = Gauge(
    document.getElementById("gauge4"),
    {
        max: 1000,
        dialStartAngle: 180,
        dialEndAngle: -90,
        viewBox: "0 0 60 60",
        value: 1000,
        color: v=>{
            if (v < redLight * 2) {
                return "#5ee432";
            } else if (v < redLight * 3) {
                return  "#fffa50";
            } else if (v < redLight * 4) {
                return "#f7aa38";
            } else {
                return "#ef4655";
            }
        }
    }
);




