/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realizar login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT
 */

routes.post("/login", authController.login)

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar produtos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */

routes.get("/products", authMiddleware, productController.list)

/**
 * @swagger
 * /purchase:
 *   post:
 *     summary: Realizar compra
 *     tags: [Payments]
 */

routes.post("/purchase", authMiddleware, paymentController.purchase)

router.get("/clients/:id",auth,getClientDetails)

router.get("/transactions",auth,listTransactions)

router.get("/transactions/:id",auth,getTransaction)

router.post("/transactions/:id/refund",auth,refund)

router.patch("/gateways/:id/activate",auth,toggleGateway)

router.patch("/gateways/:id/priority",auth,updatePriority)

router.post("/products",role(['ADMIN','MANAGER']),createProduct)

router.post("/users",role(['ADMIN','MANAGER']),createUser)

router.post("/transactions/:id/refund",role(['ADMIN','FINANCE']),refund)