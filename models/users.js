const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profilePicture: {
      type: String,
      required: true
    },
    fname: { 
      type: String, 
      required: true, 
    },
    lname: {
      type: String,
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    privilege: { 
      type: String, 
      // enum: ['user', 'moderator', 'admin', 'developer'], 
      enum: ['user', 'admin'], 
      default: 'user',
      required: true 
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    bio: {
      type: String
    },
    categories: {
      type: [String],
      default: []
    },
    state: {
      type: String,
      enum: ['active', 'suspended', 'deleted'],
      default: 'active',
      required: true
    },
    reports: {
      type: Number,
      default: 0,
    },
    upload: {
      type: Number,
      default: 0
    },
    download: {
      type: Number,
      default: 0
    },
    createdAt: { 
      type: Date, 
      default: Date.now
    }
    
    // collection: {
    //   type: Map,
    //   of: [String],
    //   default: {}
    // },
  });
  
  const Users = mongoose.model('Users', userSchema);
  
  module.exports = {Users};
  // subscriptionDetails: {
  //   plan: { type: String }, // e.g., 'monthly', 'yearly'
  //   startDate: { type: Date },
  //   expiryDate: { type: Date },
  // },