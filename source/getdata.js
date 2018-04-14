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
    
    constructor(options){
        super(options);
        options = omapper(options, OPTIONS_SCHEMA);
        this.pinNumber = options.pinNumber;
        this.loopInterval = options.loopInterval;
        this.detection = false;
        this.lastDetectionTime = undefined;
        this.interval = undefined;
       

        
        //Sensor:Read Sensor through GPIO
        const readSensor = () => {
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


        //Sensor: Start Detection
        const startDetection = callback => {
            startSensorDetection = err => {
                console.log(err) 
                ? 
                err 
                : 
                this.interval = setInterval(this.readSensor, this.loopInterval);
        
                if( callback ){
                     callback(err)
                }
        
                return this.interval
            }
        
            gpio.setMode(gpio.MODE_BCM);
            gpio.setup(this.pinNumber, gpio.DIR_IN, startSensorDetection());
        };


        //Sensor: Stop Detection
        const stopDetection = () => {
            if( !this.interval ){
                return false;
            }
        
            clearInterval(this.interval);
            this.interval = undefined;
        
            return true;
        };      
    }
}

module.exports = Sensor;