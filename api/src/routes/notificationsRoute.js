const {Router} = require('express');
const {getNotification, notifyUser, readNotification, getUserNotifications} =require('../services/notificationsService.js');

const router =Router();

router.post('/notify/:id', notifyUser);
router.get('/read/:id', readNotification);
router.get('/user-notifications/:id', getUserNotifications);
router.get('/:id', getNotification);

module.exports = router;