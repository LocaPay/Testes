const express = require('express');
const auth = require('../middleware/authMiddleware');
const locadorCtrl = require('../controllers/locadorController');

const router = express.Router();

// Registro e login
router.post('/locadores', locadorCtrl.registrar);
router.post('/login', locadorCtrl.login);
router.get('/info', auth, locadorCtrl.buscarDadosGerais);
router.post('/buscar-id-por-cus', locadorCtrl.buscarIdPorCustomerId);
router.get('/buscar-info-subconta/:locadorId', locadorCtrl.buscarinfosubConta);
router.get('/locador/por-inquilino/:inquilino_id', locadorCtrl.buscarLocadorPorInquilino );
router.get('/buscar-saldo', auth, locadorCtrl.buscarSaldoLocador);
router.get('/buscar-registro-transacoes', auth, locadorCtrl.buscarRegistroTransacoes);
router.get('/assinatura', auth, locadorCtrl.buscarDadosAssinatura)
router.get('/buscar-registro-saques', auth, locadorCtrl.buscarRegistroSaques);
router.post('/realizar-saque', auth, locadorCtrl.realizarSaque)

module.exports = router;
