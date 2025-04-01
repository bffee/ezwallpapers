require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ezwallpapers',
  JWT_SECERET: process.env.JWT_SECERET || "2a5R1fj5r+YnTfIeI3ubwHgXKk0G7pXqsZYJBUeamOk/Wz6ce2QIJcHSxOh/dAZNTIEXWgEo3lfyo/BRpaFbw"
};