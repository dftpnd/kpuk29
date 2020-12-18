const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const path = '/dev/cu.usbmodem00000000001A1';
const port = new SerialPort(path, { baudRate: 115200 })

const parser = new Readline()
port.pipe(parser)

// parser.on('data', line => console.log(`> ${line}`))


// Read the port data
port.on("open", (line) => {
  console.log('serial port open', line);
});


parser.on('data', data => {
  console.log('got word from arduino:', data);
  // port.write(`GO TO HEEEEL!!!!`);
  // port.write(`here u: ${data}`);
});

// port.write('ROBOT POWER ON')


///===============

let step = 0;

setInterval(() => {
  step = (step + 20) % 180;
  port.write(`fun1(${step});\n`);
}, 100);
