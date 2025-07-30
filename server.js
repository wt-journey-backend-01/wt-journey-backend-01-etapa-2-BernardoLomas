const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

//Importação das rotas
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');

//Preparação do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./docs/swagger.json");

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Middlewares globais
app.use(cors());
app.use(express.json());

//Uso das rotas
app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

//Documentação
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});