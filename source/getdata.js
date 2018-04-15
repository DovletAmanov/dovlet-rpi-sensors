//Importing Dependencies
const gpio = require('rpi-gpio');
const EventEmitter = require('events').EventEmitter;
const omapper = require('o-mapper');

//Defining SCHEMA

const OPTIONS_SCHEMA = {
    pinNumber: {
        required: true
    },
    loopInterval: {
        default: 1000
    }
}

//Sensor Class
class Sensor extends EventEmitter{
    
    constructor(options,pinNumber,loopInterval,detection,lastDetectionTime,interval){

        super();
        this.options = omapper(options, OPTIONS_SCHEMA);
        this.pinNumber = options.pinNumber;
        this.loopInterval = options.loopInterval;
        this.detection = false;
        this.lastDetectionTime = undefined;
        this.interval = undefined;
       
        
        
        //Sensor:Read Sensor through GPIO
         this.readSensor = () => {
            gpio.read(this.pinNumber, (err,val) => {
        
                if( val === this.detection ){
                    return;
                }
        
                this.detection = val;
        
                if( this.detection ){
                    this.lastDetectionTime = new Date();
                    this.emit('detection');
                }
        
            });
        };


        //Sensor: Callback function for Start Detection
        this.startSensorDetection = () => {
           
            this.interval = setInterval(this.readSensor, this.loopInterval);
    
            return this.interval

        }

        //Sensor: Start Detection
         this.startDetection = () => {
            gpio.setMode(gpio.MODE_BCM);
            gpio.setup(this.pinNumber, gpio.DIR_IN, this.startSensorDetection);
        };


        //Sensor: Stop Detection
         this.stopDetection = () => {
            if( !this.interval ){
                return false;
            }
        
            clearInterval(this.interval);
            this.interval = undefined;
        
            return true;
        };
        
        //Sensor: Set HIGH => GPIO
        this.setHighPin = () => {
            gpio.setMode(gpio.MODE_BCM);
            gpio.setup(this.pinNumber, gpio.DIR_HIGH, this.setHighGpio);
        }

        //Sensor: Callback function for setHighPin
        this.setHighGpio = () => {
            gpio.write(this.pinNumber, true, err => {
                if( err ) throw err;
            });
        }

        //Sensor: Set LOW => GPIO
        this.setLowPin = () => {
            gpio.setMode(gpio.MODE_BCM);
            gpio.setup(this.pinNumber, gpio.DIR_LOW, this.setLowGpio);
        }

        //Sensor: Callback function for setLowPin
        this.setLowGpio = () => {
            gpio.write(this.pinNumber, true, err => {
                if( err ) throw err;
            });
        }
    }    
}

module.exports = Sensor;