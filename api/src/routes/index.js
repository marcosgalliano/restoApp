const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pedidosRouter = require("./pedidos/pedidosrouter");
const platosRouter = require("./platos/platosRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pedidos", pedidosRouter);
router.use("/platos", platosRouter);

module.exports = router;
