dovlet-rpi-sensors
=========

A small library providing utility methods to `check status` of `Raspberry Pi` sensors and `write HIGH` or `write LOW` to certain pin. Works successfully with these sensors below: 

`Light sensor`
`Raindrop sensor`
`PIR motion sensor`
`MQ2 smoke sensor`
`Sound sensor`

## Installation

  ### `npm i dovlet-rpi-sensors --save`

## Usage
```
const Sensor = require('dovlet-rpi-sensors');

//You can create multiple instances of Sensor object.Example:Light Sensor

const lightSensor = new Sensor({

    //Data-output pin number of sensor (mode.BCM)
    pinNumber: 18,
    
    //Interval for checking sensor status.Default: 1 second
    loopInterval: 1000
});


 
// Listens for change on specified pinNumber 

lightSensor.on('detection', () => {
    console.log("Light Detected"); 
});


// Starts the detection 

lightSensor.startDetection();

//...

// Stops the detection
lightSensor.stopDetection();
```
## Methods

* `startDetection()` - Starts the detection of changes on specified pin.

* `stopDetection()` - Stops the detection of changes on specified pin.

* `setHighPin()` - Writes `HIGH` to specified pin. (this feature will be updated soon)

* `setLowPin()` - Writes `LOW` to specified pin. (this feature will be updated soon)
