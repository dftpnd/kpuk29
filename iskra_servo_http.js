// Настраиваем соединение с Ethernet Shield по протоколу SPI.
SPI2.setup({baud: 3200000, mosi: B15, miso: B14, sck: B13});
var eth = require('WIZnet').connect(SPI2, P10)
//
PrimaryI2C.setup({sda: SDA, scl: SCL, bitrate: 400000});
var mServo = require('@amperka/multiservo').connect(PrimaryI2C);




// Подключаем модуль http.
// var http = require('http');
 
// Получаем и выводим IP-адрес от DHCP-сервера
eth.setIP();
print(eth.getIP());



var net = require('net');

net.connect({host: '10.0.1.53', port: 1337}, function(socket) {
  console.log('connect 10.0.1.53');
  
  // каждые 3000 миллисекунд посылаем запрос на обновление состояний дверей
  /* setInterval(function() {
    socket.write('Get');
    console.log('setInterval write')
  }, 3000);
  */
 
  // обрабатываем получение данных от сервера
  
  socket.on('data', function(recieved) {
    // разворачиваем принятые данные в javascript объект
    var data = JSON.parse(recieved);
    if (data === undefined) {
      return;
    }
    
    mServo.connect(0).write(data.servo1);

    console.log('!!!data', data);
  });
  
  
  // обрабатываем отключение от сервера
  socket.on('close', function() {
    print('WARNING: connection closed');
  });
});



