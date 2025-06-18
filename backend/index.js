const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3000;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const routes = require('./routes/boards');

app.use(cors());
app.use(express.json());

app.use('/boards', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});


module.exports = app;