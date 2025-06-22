const express = require('express');
const cards = express.Router({ mergeParams: true });

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// Get ALL of the cards, and order accordingly
cards.get('/', async (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const cards = await prisma.card.findMany({
    where: {board_id: boardId},
    orderBy: [
      { pinned: 'desc' },
      { pin_date: 'desc' },
      { id: 'desc'}
    ]
  })
  res.json(cards);
});

// Delete a specific card
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

// Add a new card
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

// Increment upvote column by 1 of a specific card 
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

// Toggle pinned state of a specific card 
cards.patch('/:id/pin', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const prev_card = await prisma.card.findUnique({
      where: {id}
    });

    const updated = await prisma.card.update({
      where: {id},
      data: {pin_date: prev_card.pinned ? null : new Date(), pinned: !prev_card.pinned}
    });

    res.status(200).send(updated);
  } catch (error) {
    console.error(error);
    res.status(404).send('Card not found')
  }
});

module.exports = cards;