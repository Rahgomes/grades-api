import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { gradeRouter } from './routes/gradeRouter.js';
import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao mongodb com sucesso");
  } catch (error) {
    console.log("Erro ao conectar ao mongodb: " + error);
    process.exit();
  }
})();

const app = express();

// define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.LOCAL_CORS || process.env.HOST_CORS || process.env.HOST_FRONT_CORS
  })
);

app.use(gradeRouter);
app.get('/', (req, res) => {
  res.send('API em execucao');
});

const PORT = process.env.PORT || process.env.PORT_LOCAL || process.env.PORT_EXTERNAL;

app.listen(PORT, () => {
  console.log(`API iniciada na porta ${PORT}!!!`);
});
