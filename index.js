const express = require('express');
const app = express();

// set static folder
<<<<<<< HEAD
<<<<<<< HEAD
app.use(express.static(__dirname + '/Home_guest.html'));
=======
app.use(express.static(__dirname + '/userHomepage.html'));
>>>>>>> 10b524f45547e5992758c8c86a15198a7f417f29
=======
app.use(express.static(__dirname + '/'));
>>>>>>> 122d013c213b4df25fff953b58de0ec6d6eec015

// start server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`server is listening on port ${app.get('port')}`);
});
