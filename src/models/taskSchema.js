import mongoose from 'mongoose';

const Task = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: Boolean,
});

export default mongoose.model('Tasks', Task);
