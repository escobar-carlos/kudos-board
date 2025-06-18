const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const boards = await prisma.board.findMany();
  res.send(boards);
});

router.post('/', async (req, res) => {
  const {title, category, author} = req.body;
  if (!title || !category) {
    return res.status(400).send('Title and Category are required.');
  }

  const newBoard = await prisma.board.create({
    data: {
      title,
      category,
      author
    }
  });

  res.status(201).json(newBoard);
});

router.get('/:id', async (req, res) => {
  // fetch cards
  const id = parseInt(req.params.id);
  const cards = await prisma.card.findMany({
    where: {board_id: id}
  })
  res.json(cards);
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.board.delete({ where: {id} });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(404).send('Board not found');
  }
});

module.exports = router;