var bikelocJSON = '{"bikelocId":"86b92ad0-6271-11ea-af1c-431f81ca5bee","bikelocDate":"2020-03-10T01:50:31.933Z","lat":"40.7","long":"-82.3","reason":"downed tree"}';
console.log(bikelocJSON);

var bikelocObj = JSON.parse(bikelocJSON);
console.log('bikelocObj reason: ' + bikelocObj.reason);