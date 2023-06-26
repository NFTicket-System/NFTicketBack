const router = require('express').Router()
const ticketsController = require('./../controllers/tickets.controller')

router.get('/all', ticketsController.getAllTickets)
router.get('/all/light', ticketsController.getAllLightTickets)

module.exports = router
