import express, { request } from 'express';
import Note from '../model/notes.model.js';
const router = express.Router();
export default router;
// Create a new note
router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const note = new Note({ title, content, user: userId });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().populate('user', 'name');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single note
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('user', 'name');
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update a note
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  console.log(req.body);
  try {    
    const updatedFeilds = {};
    if (req.body.title) {
      updatedFeilds.title = title;
    }
    if (req.body.content) {
      updatedFeilds.content = content;
    }
    const note = await Note.findByIdAndUpdate(
      req.params.id,
       updatedFeilds,
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete all notes
router.delete('/', async (req, res) => {
  try {
    await Note.deleteMany();
    res.json({ message: 'All notes deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

