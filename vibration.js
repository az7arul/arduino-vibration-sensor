var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var say = require('say');
var _ = require('lodash');

var _alert = function () {
	say.speak('Princess', 'Alert! Alert! Runfor! your life!!!');
	console.log('ALERT!!!!!');
	console.log("DON'T READ THIS RUN!!!!")
}

var alert = _.debounce(_alert, 5000, true);

var sp = new SerialPort("/dev/cu.usbmodem1411", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false);


sp.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');
    sp.on('data', function(data) {
       var number = parseInt(data.replace('data received: ', ''),10);
	
	   if (number > 500) {
		alert();
       }	
    });
  }
});


