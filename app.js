import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { gradeRouter } from './routes/gradeRouter.js';
import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect("mongodb+srv://zirah352:Euro2016@clusterbootcamp.bbalc.mongodb.net/grades-api?retryWrites=true&w=majority", {
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

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'https://ramon-bank-api.herokuapp.com',
    // origin: 'http://localhost:3000',
    // origin: 'http://localhost:8080',
  })
);

app.use(gradeRouter);
app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(8081 || process.env.PORTEXTERNAL, () => {
  console.log("API iniciada!");
});
