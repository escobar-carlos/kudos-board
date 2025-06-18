const express = require('express');
const boards = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

boards.get('/', async (req, res) => {
  const boards = await prisma.board.findMany();
  res.send(boards);
});

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