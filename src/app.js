const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json()); // Permite trabajar con JSON en las peticiones

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Puerto de escucha
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
