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
    res.status(404).send('Card not found');
  }
});

cards.post('/', async (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const {message, gif} = req.body;
  if (!message || !gif) {
    return res.status(400).send('Message and Gif are required.');
  }

  const newCard = await prisma.card.create({
    data: {
      board_id: boardId,
      ...req.body
    }
  });

  res.status(201).json(newCard);
});

cards.patch('/:id/upvote', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await prisma.card.update({
      where: {id},
      data: {
        upvotes: {
          increment: 1
        }
      }
    });
    res.status(200).send(updated);
  } catch (error) {
    console.error(error);
    res.status(404).send('Card not found')
  }
});

module.exports = cards;