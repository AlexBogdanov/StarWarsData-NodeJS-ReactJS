const userRouter = require('./user-router');
const characterRouter = require('./character-router');
const spaceshipRouter = require('./spaceship-router');
const weaponRouter = require('./weapon-router');
const planetRouter = require('./planet-router');
const movieRouter = require('./movie-router');
const storyRouter = require('./story-router');

const { userController }= require('./../controllers');

module.exports = (app, passport) => {
    app.post('/user/login', passport.authenticate('local'), userController.login);

    app
        // .use('/user', userRouter)
        .use('/character', characterRouter)
        .use('/spaceship', spaceshipRouter)
        .use('/weapon', weaponRouter)
        .use('/planet', planetRouter)
        .use('/movie', movieRouter)
        .use('/story', storyRouter);
};