const request = require('request')

var Dolar = function() {
    this.getData = function() {
        return new Promise((resolve,reject)=>{
            return request.get({url:'http://www.bancoprovincia.com.ar/Principal/Dolar','content-type': 'application/json',}, function (error, response, body) {
                if (error) reject(error) 
                resolve(JSON.parse(body))
            });
        })
    }
};


module.exports = Dolar