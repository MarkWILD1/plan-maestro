const express = require('express');
const router = express.Router();
const { 
    createCliente,
    getClientes,
    getClienteById,
    updateClienteById,
    deleteClienteById,
    addConsulta,
    updateConsulta
} = require('../controllers/clienteControllers');

router.post('/', createCliente);
router.get('/getClient', getClientes);
router.get('/:id', getClienteById);
router.put('/:id', updateClienteById);
router.delete('/:id', deleteClienteById);

// Rutas para manejar consultas
router.post('/:id/consultas', addConsulta);
router.put('/:idCliente/consultas/:idConsulta', updateConsulta);

module.exports = router;