const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO

var  btnNumberDay = 0;
var btnNumber = 0
var raiseEvent  = true;
var captureB1 = true;
var captureB2 = true;

const  incrementBy = 3;

const LED = new Gpio(4,{mode: Gpio.OUTPUT}); //use GPIO pin 4 as output

LED.digitalWrite(0);

const pushButton1 = new Gpio(17
,{mode: Gpio.INPUT
,pullupdon: Gpio.PUD_OFF
,edge:Gpio.RISING_EDGE
,alert:false
,timeout:10
}); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

pushButton1.on('interrupt', (value)=> { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if(value === 1 && captureB1 ){
    btnNumber = btnNumber + 1;
    captureB1 = false;
    if(raiseEvent){
      raiseEvent = false;
      setTimeout(RaiseButtonPress, 1000);
    }
  }
});

const pushButton2 = new Gpio(27
,{mode: Gpio.INPUT
,pullupdon: Gpio.PUD_OFF
,edge:Gpio.RISING_EDGE
,alert:false
,timeout:10 
}); //use GPIO pin 27 as input, and 'both' button presses, and releases should be handled

pushButton2.on('interrupt', (value)=> { //Watch for hardware interrupts on pushButton1 GPIO, specify callback function
  if(value === 1 && captureB2){
    btnNumber = btnNumber + 2;
    captureB2 = false;
    if(raiseEvent){
      raiseEvent = false;
      setTimeout(RaiseButtonPress, 1000);
    }
  }
});

function RaiseButtonPress() {
  if(btnNumber != 0 ){
  var btnRaised =  btnNumber + btnNumberDay;
//    console.clear();
    console.log('Button '+ btnRaised  + ' Pressed' );
    resetStatuses();
  }
}

const pushButton3 = new Gpio(22
,{mode: Gpio.INPUT
,pullupdon: Gpio.PUD_OFF
,edge:Gpio.RISING_EDGE
,alert:false
,timeout:10 
}); //use GPIO pin 22 as input, and 'both' button presses, and releases should be handled

var captureB3 = true;

pushButton3.on('interrupt', (value)=> { //Watch for hardware interrupts on pushButton1 GPIO, specify callback function
  if(value === 1 && captureB3){    
    captureB3 = false;
    if(raiseEvent){
      raiseEvent = false;
      setTimeout(previous, 1000);
    }
  }
});

const pushButton4 = new Gpio(23
,{mode: Gpio.INPUT
,pullupdon: Gpio.PUD_OFF
,edge:Gpio.RISING_EDGE
,alert:false
,timeout:10 
}); //use GPIO pin 23 as input, and 'both' button presses, and releases should be handled

var captureB4 = true;

pushButton4.on('interrupt', (value)=> { //Watch for hardware interrupts on pushButton1 GPIO, specify callback function
  if(value === 1 && captureB4){    
    captureB4 = false;
    if(raiseEvent){
      raiseEvent = false;
      setTimeout(next, 1000);
    }
  }
});

function previous() {
  btnNumberDay-=incrementBy;
  if(btnNumberDay < 0)
    btnNumberDay = 0;
  resetStatuses();
}

function next() {
  btnNumberDay+=incrementBy;
   resetStatuses();
}

function resetStatuses(){
  btnNumber = 0;
  raiseEvent = true;
  captureB1 = true;
  captureB2 = true;
  captureB3 = true;
  captureB4 = true;
}


function shutdown() {
   LED.digitalWrite(0);
   console.clear();
   console.log('\nThank you for using the Product Bye....................' );
   setTimeout(function (){
       process.exit(0);
    }, 1000);
}

process.on('SIGHUP', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGCONT', shutdown);

LED.digitalWrite(1);
