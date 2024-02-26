const Cliente = require('../models/clienteModel');
const bcrypt = require('bcrypt');

const extractFirstWords = (text, numWords) => text.split(' ').slice(0, numWords).join(' ');

const clienteControllers = {};

// Crear un nuevo cliente
clienteControllers.createCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    res.status(201).send({cliente: nuevoCliente});
  } catch (err) {
    res.status(400).send(err);
  }
};

// Obtener todos los clientes
clienteControllers.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).send(clientes);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Obtener un cliente por su ID
clienteControllers.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).send();
    res.status(200).send(cliente);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Actualizar un cliente por su ID
clienteControllers.updateClienteById = async (req, res) => {
  try {
    // Opcion {new: true} es para que devuelva el objeto actualizado
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if (!cliente) return res.status(404).send();
    res.status(200).send(cliente);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Borrar un cliente por su ID
clienteControllers.deleteClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).send();
    res.status(200).send(cliente);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Agregar una consulta a un cliente
clienteControllers.addConsulta = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).send();
    let consultaTexto = req.body.texto;
    let resumenConsulta = extractFirstWords(consultaTexto, 5);
    cliente.consultas.push({ texto: resumenConsulta });
    await cliente.save();
    res.status(201).send(cliente);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Actualizar una consulta de un cliente
clienteControllers.updateConsulta = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.idCliente);
    if (!cliente) return res.status(404).send();
    let consulta = cliente.consultas.id(req.params.idConsulta);
    if (!consulta) return res.status(404).send();
    consulta.texto = req.body.texto || consulta.texto;
    await cliente.save();
    res.status(200).send(cliente);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = clienteControllers;