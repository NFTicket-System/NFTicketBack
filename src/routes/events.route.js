const router = require('express').Router()
const eventController = require('./../controllers/events.controller')

router.get('/all', eventController.getAllEvents)
router.get('/all/light', eventController.getAllLightEvents)
router.get('/all/light/byCat/:libelle', eventController.getAllLightEventsFromCat)
router.get('/all/light/byCity/:id', eventController.getAllLightEventsFromCity)
router.get('/all/light/trendemous', eventController.getAllTrendemousLightEvents)
router.get('/single/:id', eventController.getSingleEventFromId)
router.get('/single/location/:id', eventController.getSingleEventLocationFromLibelle)
router.get('/all/categoty/event/:id', eventController.getAllCategoriesEvent)
router.get('/all/category', eventController.getAllCategories)

router.post('/', eventController.addEvent)
router.post('/ticket', eventController.addTicket)
router.post('/categories', eventController.addCategoriesToEvent)

module.exports = router