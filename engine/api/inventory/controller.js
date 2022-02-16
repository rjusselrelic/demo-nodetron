'use strict'
const logger = require("../../lib/logger")
const baseController = require("../baseController")
const tronResponse = require("../../lib/tronResponse")
const behaviorsController = require('../../api/behaviors/controller')
//const randUser = require("../../lib/randUsers")

exports.getInventories = (repo) => async (req, res, next) => {
     //set username
     var newUser =  {
        email: 'tom@petty.com',
        name: 'Tom Petty',
        workerCategory: 'Logistics'
      }
    try {

        //const user = new randUser()
        //console.log(`Random User:`,user.getAll())
        newrelic.addCustomAttributes(newUser)
        baseController.ensureAppIsStarted()
        logger.info('/inventory', 'get')

        await behaviorsController.handlePreFunc(req, res)

        const data = await repo.findAll()
        const tron = new tronResponse()
        tron.setupDownStreamHeaders(req)
        await tron.executeDownstream(`/api/inventory`)

        await behaviorsController.handlePostFunc(req, res)

        tron.buildJsonResponse(res, data)
    }
    catch (err) {
        next(err)
    }
}

exports.getInventory = (repo) => async (req, res, next) => {
    try {
        baseController.ensureAppIsStarted()
        const id = req.params.id
        logger.info('/inventory', `/${id}`, 'get')

        await behaviorsController.handlePreFunc(req, res)

        const data = await repo.findOrNull(id)
        const tron = new tronResponse()
        tron.setupDownStreamHeaders(req)
        await tron.executeDownstream(`/api/inventory/${id}`)

        await behaviorsController.handlePostFunc(req, res)

        tron.buildJsonResponse(res, data)
    }
    catch (err) {
        next(err)
    }
}
