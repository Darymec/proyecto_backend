const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './carts.json';

// Crear un nuevo carrito
router.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
  const newCart = {
    id: `${Date.now()}`,
    products: []
  };
  data.push(newCart);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  res.status(201).json(newCart);
});

// Obtener los productos de un carrito por ID
router.get('/:cid', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
  const cart = data.find(c => c.id === req.params.cid);
  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(cart.products);
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
  const cartsData = JSON.parse(fs.readFileSync(path, 'utf-8'));
  const productsData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));

  const cart = cartsData.find(c => c.id === req.params.cid);
  const product = productsData.find(p => p.id === req.params.pid);

  if (!cart || !product) return res.status(404).json({ error: 'Carrito o producto no encontrado' });

  const productInCart = cart.products.find(p => p.product === req.params.pid);
  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    cart.products.push({ product: req.params.pid, quantity: 1 });
  }

  fs.writeFileSync(path, JSON.stringify(cartsData, null, 2));
  res.status(200).json(cart);
});

module.exports = router;
