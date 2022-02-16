'use strict'
var logger = require("./logger")


class randUser{
    constructor(){
        this.name = 'Ryan Jussel'
        this.userName = 'ryan@googlemail.com'
        this.workerCategory = 'Maintenance'
        //this.IPaddress =''
    }
    setName(val){
        this.name.set(val)
    }
    setUserName(val){
        this.userName.set(val)
    }
    getAll(){
        this.setUserName('tom@petty.com')
        this.setName('Tom Petty')
        logger.info(JSON.stringify(this))
        return this
    }
}
module.exports = randUser