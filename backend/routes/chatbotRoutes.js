const express = require('express');
const { sendMessage, getChatHistory, getChatSessions } = require('../controllers/chatbotController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/message', sendMessage);
router.get('/history', getChatHistory);
router.get('/sessions', getChatSessions);

module.exports = router;
