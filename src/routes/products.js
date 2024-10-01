const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './products.json';

// Obtener todos los productos
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
  res.json(data);
});

// Obtener un producto por ID
router.get('/:pid', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
  const product = data.find(p => p.id === req.params.pid);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
  const newProduct = {
    id: `${Date.now()}`,
    ...req.body,
    thumbnails: req.body.thumbnails || [],
    status: req.body.status || true
  };
  data.push(newProduct);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  res.status(201).json(newProduct);
});

// Actualizar un producto por ID
router.put('/:pid', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
  const index = data.findIndex(p => p.id === req.params.pid);
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

  const updatedProduct = { ...data[index], ...req.body };
  data[index] = updatedProduct;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  res.json(updatedProduct);
});

// Eliminar un producto por ID
router.delete('/:pid', (req, res) => {
  let data = JSON.parse(fs.readFileSync(path, 'utf-8'));
  data = data.filter(p => p.id !== req.params.pid);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  res.status(204).send();
});

module.exports = router;
