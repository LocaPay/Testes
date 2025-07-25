const express = require('express');
const auth = require('../middlewares/authMiddleware');
const webhookCtrl = require('../controllers/webhookAsaasController')

const router = express.Router();

// Dados bancários (autenticado)
router.post('/', auth, webhookCtrl.receberEvento);

module.exports = router;
