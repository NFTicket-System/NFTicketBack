const router = require('express').Router()
const eventController = require('./../controllers/events.controller')

router.get('/all', eventController.getAllEvents)
router.get('/single/:id', eventController.getSingleEventFromId)
router.get('/all/byCat/:id', eventController.getAllEventsFromCat)
router.get('/all/byCity/:id', eventController.getAllEventsFromCity)

module.exports = router