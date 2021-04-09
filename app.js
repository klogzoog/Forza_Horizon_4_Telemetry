//webserver
const express = require('express');
const socketio = require('socket.io');
const fh4 = require('./fh4_dataset');
const path = require('path');

//udp4 stream data pocket
const dgram = require('dgram');
const udp4 = dgram.createSocket('udp4');

const PORT = process.env.PORT || 8080;
const UPD_PORT = 35553;
const HOST = '0.0.0.0';
const app = express();
const server = app.listen(PORT, ()=>console.log('Server running on port: ' + PORT));
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

let fh_data = {};

udp4.on('listening', ()=>{
    let address = udp4.address();
    console.log(`Listening on ${address.address} : ${address.port}`);
});

udp4.on('message', msg => {
    fh_data = {
        IsRaceOn: msg.readInt32LE(fh4.IsRaceOn), // 1 when race is on, 0 when in menus

        TimeStampMS: msg.readUInt32LE(fh4.TimeStampMS), // Can overflow to 0 eventually

        EngineMaxRpm: msg.readFloatLE(fh4.EngineMaxRpm), // Engine Revolution per minute
        EngineIdleRpm: msg.readFloatLE(fh4.EngineIdleRpm),
        CurrentEngineRpm: msg.readFloatLE(fh4.CurrentEngineRpm),

        AccelerationX: msg.readFloatLE(fh4.AccelerationX), // in the car's local space x = right y = up z = forward
        AccelerationY: msg.readFloatLE(fh4.AccelerationY),
        AccelerationZ: msg.readFloatLE(fh4.AccelerationZ),

        VelocityX: msg.readFloatLE(fh4.VelocityX), // In the car's local space x = right y = up z = forward
        VelocityY: msg.readFloatLE(fh4.VelocityY),
        VelocityZ: msg.readFloatLE(fh4.VelocityZ),

        AngularVelocityX: msg.readFloatLE(fh4.AngularVelocityX), // In the car's local space x = pitch y = yaw z = roll
        AngularVelocityY: msg.readFloatLE(fh4.AngularVelocityY),
        AngularVelocityZ: msg.readFloatLE(fh4.AngularVelocityZ),

        Yaw: msg.readFloatLE(fh4.Yaw),
        Pitch: msg.readFloatLE(fh4.Pitch),
        Roll: msg.readFloatLE(fh4.Roll),

        NormalizedSuspensionTravelFrontLeft: msg.readFloatLE(fh4.NormalizedSuspensionTravelFrontLeft), // suspension travel normalized: 0.0f = max stretch; 1.0 = max compression
        NormalizedSuspensionTravelFrontRight: msg.readFloatLE(fh4.NormalizedSuspensionTravelFrontRight),
        NormalizedSuspensionTravelRearLeft: msg.readFloatLE(fh4.NormalizedSuspensionTravelRearLeft),
        NormalizedSuspensionTravelRearRight: msg.readFloatLE(fh4.NormalizedSuspensionTravelRearRight),

        TireSlipRatioFrontLeft: msg.readFloatLE(fh4.TireSlipRatioFrontLeft), // Tire normalized slip ratio; 0 means 100% grip > 1.0 means loss of grip
        TireSlipRatioFrontRight: msg.readFloatLE(fh4.TireSlipRatioFrontRight),
        TireSlipRatioRearLeft: msg.readFloatLE(fh4.TireSlipRatioRearLeft),
        TireSlipRatioRearRight: msg.readFloatLE(fh4.TireSlipRatioRearRight),

        WheelRotationSpeedFrontLeft: Math.round(msg.readFloatLE(fh4.WheelRotationSpeedFrontRight)*.755),
        WheelRotationSpeedFrontRight: Math.round(msg.readFloatLE(fh4.WheelRotationSpeedFrontLeft)*.755),
        WheelRotationSpeedRearLeft: msg.readFloatLE(fh4.WheelRotationSpeedRearLeft),
        WheelRotationSpeedRearRight: msg.readFloatLE(fh4.WheelRotationSpeedRearRight),

        WheelOnRumbleStripFrontLeft: msg.readInt32LE(fh4.WheelOnRumbleStripFrontLeft), // 1 when wheel is on rumble strip, = 0 when off.
        WheelOnRumbleStripFrontRight: msg.readInt32LE(fh4.WheelOnRumbleStripFrontRight),
        WheelOnRumbleStripRearLeft: msg.readInt32LE(fh4.WheelOnRumbleStripRearLeft),
        WheelOnRumbleStripRearRight: msg.readInt32LE(fh4.WheelOnRumbleStripRearRight),

        WheelInPuddleDepthFrontLeft: msg.readFloatLE(fh4.WheelInPuddleDepthFrontLeft), // from 0 to 1, where 1 is the deepest puddle
        WheelInPuddleDepthFrontRight: msg.readFloatLE(fh4.WheelInPuddleDepthFrontRight),
        WheelInPuddleDepthRearLeft: msg.readFloatLE(fh4.WheelInPuddleDepthRearLeft),
        WheelInPuddleDepthRearRight: msg.readFloatLE(fh4.WheelInPuddleDepthRearRight),

        SurfaceRumbleFrontLeft: msg.readFloatLE(fh4.SurfaceRumbleFrontLeft),  // Non-dimensional surface rumble values passed to controller force feedback
        SurfaceRumbleFrontRight: msg.readFloatLE(fh4.SurfaceRumbleFrontRight),
        SurfaceRumbleRearLeft: msg.readFloatLE(fh4.SurfaceRumbleRearLeft),
        SurfaceRumbleRearRight: msg.readFloatLE(fh4.SurfaceRumbleRearRight),

        TireSlipAngleFrontLeft: msg.readFloatLE(fh4.TireSlipAngleFrontLeft), // Tire normalized slip angle, = 0 means 100% grip and |angle| > 1.0 means loss of grip.
        TireSlipAngleFrontRight: msg.readFloatLE(fh4.TireSlipAngleFrontRight),
        TireSlipAngleRearLeft: msg.readFloatLE(fh4.TireSlipAngleRearLeft),
        TireSlipAngleRearRight: msg.readFloatLE(fh4.TireSlipAngleRearRight),

        TireCombinedSlipFrontLeft: msg.readFloatLE(fh4.TireCombinedSlipFrontLeft), // Tire normalized combined slip, = 0 means 100% grip and |slip| > 1.0 means loss of grip.
        TireCombinedSlipFrontRight: msg.readFloatLE(fh4.TireCombinedSlipFrontRight),
        TireCombinedSlipRearLeft: msg.readFloatLE(fh4.TireCombinedSlipRearLeft),
        TireCombinedSlipRearRight: msg.readFloatLE(fh4.TireCombinedSlipRearRight),

        SuspensionTravelMetersFrontLeft: msg.readFloatLE(fh4.SuspensionTravelMetersFrontLeft), // Actual suspension travel in meters
        SuspensionTravelMetersFrontRight: msg.readFloatLE(fh4.SuspensionTravelMetersFrontRight),
        SuspensionTravelMetersRearLeft: msg.readFloatLE(fh4.SuspensionTravelMetersRearLeft),
        SuspensionTravelMetersRearRight: msg.readFloatLE(fh4.SuspensionTravelMetersRearRight),

        CarOrdinal: msg.readInt32LE(fh4.CarOrdinal),  //Unique ID of the car make/model
        CarClass: msg.readInt32LE(fh4.CarClass),  //Between 0 (D -- worst cars) and 7 (X class -- best cars) inclusive
        CarPerformanceIndex: msg.readInt32LE(fh4.CarPerformanceIndex),  //Between 100 (slowest car) and 999 (fastest car) inclusive
        DriveTrainType: msg.readInt32LE(fh4.DriveTrainType), //Corresponds to EDrivetrainType; 0 = FWD, 1 = RWD, 2 = AWD
        NumCylinders: msg.readInt32LE(fh4.NumCylinders), //Number of cylinders in the engine

        CarTypeId: msg.readInt32LE(fh4.CarTypeId), // Car Id Information
        CarHitDebrisLeft: msg.readFloatLE(fh4.CarHitDebrisLeft), // Car Hit something front
        CarHitDebrisRight: msg.readFloatLE(fh4.CarHitDebrisRight),

        PositionX: msg.readFloatLE(fh4.PositionX), // values are in meters
        PositionY: msg.readFloatLE(fh4.PositionY),
        PositionZ: msg.readFloatLE(fh4.PositionZ),

        Speed: msg.readFloatLE(fh4.Speed), // meters per second (* 2.236936 Miles Per Hour)
        Power: msg.readFloatLE(fh4.Power), // watts (* 0.00134102 Horse Power)
        Torque: msg.readFloatLE(fh4.Torque), // newton meter (* 0.73756215 Per Pound)

        TireTempFrontLeft: msg.readFloatLE(fh4.TireTempFrontLeft),
        TireTempFrontRight: msg.readFloatLE(fh4.TireTempFrontRight),
        TireTempRearLeft: msg.readFloatLE(fh4.TireTempRearLeft),
        TireTempRearRight: msg.readFloatLE(fh4.TireTempRearRight),

        Boost: msg.readFloatLE(fh4.Boost),
        Fuel: msg.readFloatLE(fh4.Fuel),
        DistanceTraveled: msg.readFloatLE(fh4.DistanceTraveled),
        BestLap: msg.readFloatLE(fh4.BestLap),
        LastLap: msg.readFloatLE(fh4.LastLap),
        CurrentLap: msg.readFloatLE(fh4.CurrentLap),
        CurrentRaceTime: msg.readFloatLE(fh4.CurrentRaceTime),

        LapNumber: msg.readUInt16LE(fh4.LapNumber),
        RacePosition: msg.readUInt8(fh4.RacePosition),

        Accel: msg.readUInt8(fh4.Accel),
        Brake: msg.readUInt8(fh4.Brake),
        Clutch: msg.readUInt8(fh4.Clutch),
        Handbrake: msg.readUInt8(fh4.Handbrake),
        Gear: msg.readUInt8(fh4.Gear),
        Steer: msg.readInt8(fh4.Steer),

        NormalizedDrivingLine: msg.readInt8(fh4.NormalizedDrivingLine),
        NormalizedAIBrakeDifference: msg.readInt8(fh4.NormalizedAIBrakeDifference)
    }
});

// socket io connection
io.on('connection', socket=>{

    console.log(`> ${socket.id} is connected`);

    // every 60 per seconds
    setInterval(()=>{
        socket.emit('message', fh_data);
    },16.7); // 16.7 is equal to 60 data pocket per second

    socket.on("disconnecting", (reason) => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                socket.to(room).emit("user has left", socket.id);
                console.log(`user has left`, socket.id);
            }
        }
    });
});


udp4.bind(UPD_PORT, HOST);



