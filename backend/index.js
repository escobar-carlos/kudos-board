const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3000;

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

const boards = require('./routes/boards');
const cards = require('./routes/cards');

app.use(cors());
app.use(express.json());

app.use('/boards', boards);
app.use('/boards/:boardId/cards', cards);

app.listen(PORT, () => {
  console.log(`Server is running!`)
});

module.exports = app;