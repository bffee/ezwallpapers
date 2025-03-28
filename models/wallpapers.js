const mongoose = require('mongoose');
const { Schema } = mongoose;

const wallpaperSchema = new Schema({
    title: {
      type: String,
    },
    source: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true
    },
    aspect_ratio: {
      type: String,
      require: true,
    },
    downloads: {
      type: Number,
      require: true,
    },
    size: {
      type: Number,
      required: true,
    },
    // category: {
      //   type: String,
      //   enum: ['cars', 'anime', 'nature', 'animal', 'christmas', 'dark', 'god', 'motivational', 'nature', 'space', 'superhero', 'gaming'], // You can restrict the categories here
      // },
      keywords: {
        type: [String],
        default: [],
      },
      state: {
        type: String,
        enum: ['public', 'hidden', 'deleted'],
        default: 'public',
        required: true,
      },
      reports: {
        type: [String],
        default: [],
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    });
    
  const Wallpapers = mongoose.model('Wallpapers', wallpaperSchema);

  module.exports = {Wallpapers};
