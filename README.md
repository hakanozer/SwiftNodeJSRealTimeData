# Swift NodeJS Real-Time Data
This iOS Application (swift 3) uses Node JS and MYSQL to provide real-time data streaming.

![](https://github.com/hakanozer/SwiftNodeJSRealTimeData/blob/master/Screen/swift_nodejs_mysql.png)

## Installation

Node.js [Download and Install Node.js](https://nodejs.org/en/download/)
```
Dependencies -> npm install mysql
- socket.io
- mysql
- body-parser
- cookie-parser
- debug"
- express
- jade
- morgan
- serve-favicon
```

MYSQL Server And Editor [Download and Install XAMPP](https://www.apachefriends.org/tr/download.html)
```
Create DB and Sample Table
DROP TABLE IF EXISTS `kisiler`;
CREATE TABLE `kisiler` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adi` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `soyadi` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tarih` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
```

Node.JS Run
```
- npm install
- node app.js
```

#### Final Project 
![](https://github.com/hakanozer/SwiftNodeJSRealTimeData/blob/master/Screen/RealTimeVideo.gif)
