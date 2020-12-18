PrimaryI2C.setup({sda: SDA, scl: SCL, bitrate: 400000});
var mServo = require('@amperka/multiservo').connect(PrimaryI2C);


let step = 0;

setInterval(() => {
  
  
  if(step === 180){
    step = 0;
    console.log('step', step);

    mServo.connect(0).write(step);
  }else{
    step += 45;
    
    console.log('step', step);


    mServo.connect(0).write(step);
  }
}, 1000);




