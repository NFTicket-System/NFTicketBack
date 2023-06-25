const router = require('express').Router()
const eventController = require('./../controllers/events.controller')

router.get('/all', eventController.getAllEvents)
router.get('/all/light', eventController.getAllLightEvents)
router.get('/all/light/byCat/:libelle', eventController.getAllLightEventsFromCat)
router.get('/all/light/byCity/:id', eventController.getAllLightEventsFromCity)
router.get('/all/light/trendemous', eventController.getAllTrendemousLightEvents)
router.get('/single/:id', eventController.getSingleEventFromId)
router.get('/all/categoty/event/:id', eventController.getAllCategoriesEvent)

module.exports = router