const express = require('express');
const boards = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// Get ALL of the boards
boards.get('/', async (req, res) => {
  const boards = await prisma.board.findMany();
  res.send(boards);
});

// Add a new board
boards.post('/', async (req, res) => {
  const {title, category} = req.body;
  if (!title || !category) {
    return res.status(400).send('Title and Category are required.');
  }

  const newBoard = await prisma.board.create({
    data: req.body
  });

  res.status(201).json(newBoard);
});

// Delete a specific board
boards.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.board.delete({ where: {id} });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(404).send('Board not found');
  }
});

module.exports = boards;