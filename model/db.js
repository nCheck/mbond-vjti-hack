var mongoose = require('mongoose'),
	database	 = 'mongodb://sanes4:sanes4ever@ds145474.mlab.com:45474/mbond-hack'
	
mongoose.connect(database , { useNewUrlParser: true });
mongoose.connection.on('connected' , () =>{
	console.log('connected')
});

require('./pass');
require('./problem');
require('./record');
require('./notice');
require('./track')
// require('./patient');
// require('./record');

