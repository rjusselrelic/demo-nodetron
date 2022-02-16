'use strict'
var logger = require("./logger")


class randUser{
    constructor(){
        //this.name = ''
        //this.userName = ''
        //this.workerCategory = ''
        //this.IPaddress =''
    }
    setName(string){
        this.name.set(string)
    }
    setUserName(string){
        this.userName.set(string)
    }
    getAll(){
        this.setUserName('tom@petty.com')
        this.setName('Tom Petty')
        logger.info(JSON.stringify(this))
        return this
    }
}
module.exports = randUser