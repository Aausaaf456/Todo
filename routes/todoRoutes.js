const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');


router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});


router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    const saved = await newTodo.save();
    res.json(saved);
});
router.put('/:id', async (req, res) => {
    try {
        const { task } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { task },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});


router.delete('/:id', async (req, res) => {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    res.json(deleted);
});

module.exports = router;
