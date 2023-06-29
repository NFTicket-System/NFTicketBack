const router = require('express').Router()
const ticketsController = require('./../controllers/tickets.controller')

router.get('/all', ticketsController.getAllTickets)
router.get('/all/light', ticketsController.getAllLightTickets)
router.get('/all/collection/addresses', ticketsController.getAllCollectionAddresses)

module.exports = router
