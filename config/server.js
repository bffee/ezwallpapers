const express = require('express');
const path = require('path');
const {PORT} = require('./config');
const homeRouter = require('../routes/home');
const searchRouter = require('../routes/search');
const apiRouter = require('../routes/api');
const exploreRouter = require('../routes/explore');
const preivewRouter = require('../routes/preivew');
const uploadRouter = require('../routes/upload')
const authRouter = require('../routes/auth')
const profileRouter = require('../routes/profile')
const adminRouter = require('../routes/admin');
const reportRouter = require('../routes/report');



const cookieParser = require('cookie-parser')
const {checkAuthentication} = require('../middlewares/authentication');

function startServer(){
    const app = express();

    app.set('view engine', 'ejs');

    app.use(express.static(path.join(__dirname, '../public//')))
    // app.use('/stylesheets', express.static(path.join(__dirname, '../public/stylesheets')));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser())

    app.use(checkAuthentication);
    
    app.use('/', homeRouter);
    app.use('/search', searchRouter);
    app.use('/api', apiRouter)
    app.use('/preview', preivewRouter); 
    app.use('/explore', exploreRouter);
    app.use('/profile', profileRouter)
    app.use('/upload', uploadRouter);
    app.use('/auth', authRouter);
    app.use('/preview', preivewRouter);
    app.use('/report', reportRouter);
    app.use('/admin', adminRouter);


    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = {startServer};