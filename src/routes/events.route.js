const router = require('express').Router()
const eventController = require('./../controllers/events.controller')

router.get('/all', eventController.getAllEvents)
router.get('/all/light', eventController.getAllLightEvents)
router.get('/all/light/byCat/:libelle', eventController.getAllLightEventsFromCat)
router.get('/all/light/byCity/:id', eventController.getAllLightEventsFromCity)
router.get('/all/light/trendemous', eventController.getAllTrendemousLightEvents)
router.get('/single/:id', eventController.getSingleEventFromId)
router.get('/single/location/:libelle', eventController.getSingleEventLocationFromLibelle)
router.get('/all/categoty/event/:id', eventController.getAllCategoriesEvent)
router.get('/all/category', eventController.getAllCategories)
router.get('/single/category/:libelle', eventController.getSingleCategoryFromLibelle)

router.post('/', eventController.addEvent)
router.post('/ticket', eventController.addTicket)
router.post('/categories', eventController.addCategoriesToEvent)

router.put('/isUsed', eventController.getEventIsUsed)

module.exports = router