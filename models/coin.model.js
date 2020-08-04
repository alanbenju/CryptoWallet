let Dolar = require("./dolar.strategy")
let Peso = require("./peso.strategy")
let Real = require("./real.strategy")

var Coin = function(){
}

Coin.prototype = {
    setStrategy: function(coinName) {        
        console.log(coinName)
        this.coinStrategy = coins[coinName];
        console.log(this.coinStrategy)
    },
 
    getData: function() {
        return this.coinStrategy.getData();
    }
};

var coins = {
    "dolar":new Dolar(),
    "pesos":new Peso(),
    "real":new Real()
}

/**
 * In javascript you can "simulate" the strategy pattern with something like this obj, instead of what i did:
 * var obj = {
 *      dolar:functionToRetrieveDolarInfo(),
 *      peso:functionNotImplemented(),
 *      ...
 * }
 * I've done it that way because i though that you wanted to see it the closest to OOP
 */

module.exports = Coin