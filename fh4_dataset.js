// Forza Horizon 4 - stream data bytes mapping diagram
module.exports = {

    IsRaceOn: 0, // 1 when race is on, 0 when in menus

    TimeStampMS: 4, // Can overflow to 0 eventually

    EngineMaxRpm: 8, // Engine Revolution per minute
    EngineIdleRpm: 12,
    CurrentEngineRpm: 16,

    AccelerationX: 20, // in the car's local space x = right y = up z = forward
    AccelerationY: 24,
    AccelerationZ: 28,

    VelocityX: 32, // In the car's local space x = right y = up z = forward
    VelocityY: 36,
    VelocityZ: 40,

    AngularVelocityX: 44, // In the car's local space x = pitch y = yaw z = roll
    AngularVelocityY: 48,
    AngularVelocityZ: 52,

    Yaw: 56,
    Pitch: 60,
    Roll: 64,

    NormalizedSuspensionTravelFrontLeft: 68, // suspension travel normalized: 0.0f = max stretch; 1.0 = max compression
    NormalizedSuspensionTravelFrontRight: 72,
    NormalizedSuspensionTravelRearLeft: 76,
    NormalizedSuspensionTravelRearRight: 80,

    TireSlipRatioFrontLeft: 84, // Tire normalized slip ratio; 0 means 100% grip > 1.0 means loss of grip
    TireSlipRatioFrontRight: 88,
    TireSlipRatioRearLeft: 92,
    TireSlipRatioRearRight: 96,

    WheelRotationSpeedFrontLeft: 100, // Wheel Rotation speed radian per second (covert 9.5493 RPM)
    WheelRotationSpeedFrontRight: 104,
    WheelRotationSpeedRearLeft: 108,
    WheelRotationSpeedRearRight: 112,

    WheelOnRumbleStripFrontLeft: 116, // 1 when wheel is on rumble strip, = 0 when off.
    WheelOnRumbleStripFrontRight: 120,
    WheelOnRumbleStripRearLeft: 124,
    WheelOnRumbleStripRearRight: 128,

    WheelInPuddleDepthFrontLeft: 132, // from 0 to 1, where 1 is the deepest puddle
    WheelInPuddleDepthFrontRight: 136,
    WheelInPuddleDepthRearLeft: 140,
    WheelInPuddleDepthRearRight: 144,

    SurfaceRumbleFrontLeft: 148,  // Non-dimensional surface rumble values passed to controller force feedback
    SurfaceRumbleFrontRight: 152,
    SurfaceRumbleRearLeft: 156,
    SurfaceRumbleRearRight: 160,

    TireSlipAngleFrontLeft: 164, // Tire normalized slip angle, = 0 means 100% grip and |angle| > 1.0 means loss of grip.
    TireSlipAngleFrontRight: 168,
    TireSlipAngleRearLeft: 172,
    TireSlipAngleRearRight: 176,

    TireCombinedSlipFrontLeft: 180, // Tire normalized combined slip, = 0 means 100% grip and |slip| > 1.0 means loss of grip.
    TireCombinedSlipFrontRight: 184,
    TireCombinedSlipRearLeft: 188,
    TireCombinedSlipRearRight: 192,

    SuspensionTravelMetersFrontLeft: 196, // Actual suspension travel in meters
    SuspensionTravelMetersFrontRight: 200,
    SuspensionTravelMetersRearLeft: 204,
    SuspensionTravelMetersRearRight: 208,

    CarOrdinal: 212,  //Unique ID of the car make/model
    CarClass: 216,  //Between 0 (D -- worst cars) and 7 (X class -- best cars) inclusive
    CarPerformanceIndex: 220,  //Between 100 (slowest car) and 999 (fastest car) inclusive
    DriveTrainType: 224, //Corresponds to EDrivetrainType; 0 = FWD, 1 = RWD, 2 = AWD
    NumCylinders: 228, //Number of cylinders in the engine

    CarTypeId: 232, // Car Id Information
    CarHitDebrisLeft: 236, // Car Hit something front
    CarHitDebrisRight: 240,

    PositionX: 244, // values are in meters
    PositionY: 248,
    PositionZ: 252,

    Speed: 256, // meters per second (* 2.236936 Miles Per Hour)
    Power: 260, // watts (* 0.00134102 Horse Power)
    Torque: 264, // newton meter (* 0.73756215 Per Pound)

    TireTempFrontLeft: 268,
    TireTempFrontRight: 272,
    TireTempRearLeft: 276,
    TireTempRearRight: 280,

    Boost: 284,
    Fuel: 288,
    DistanceTraveled: 292,
    BestLap: 296,
    LastLap: 300,
    CurrentLap: 304,
    CurrentRaceTime: 308,

    LapNumber: 312,
    RacePosition: 314,

    Accel: 315,
    Brake: 316,
    Clutch: 317,
    Handbrake: 318,
    Gear: 319,
    Steer: 320,

    NormalizedDrivingLine: 321,
    NormalizedAIBrakeDifference: 322
}