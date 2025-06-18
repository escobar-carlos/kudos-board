const express = require('express');
const cards = express.Router({ mergeParams: true });

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// cards.get('/', async (req, res) => {
//   const cards = await prisma.card.findMany();
//   res.send(cards);
// });

cards.get('/', async (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const cards = await prisma.card.findMany({
    where: {board_id: boardId}
  })
  res.json(cards);
});

cards.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.card.delete({ where: {id} });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(404).send('Board not found');
  }
});

// cards.put('/:id/:card_id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const card_id = parseInt(req.params.card_id);
//     const updated = await prisma.card.update({ where: {card_id} });
//     res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     res.status(404).send('Board not found')
//   }
// });

module.exports = cards;