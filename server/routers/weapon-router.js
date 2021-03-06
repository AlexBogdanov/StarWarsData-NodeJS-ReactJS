const router = require('express').Router();
const passport = require('passport');
const auth = require('./../middlewares/auth-middleware');

const { weaponController } = require('./../controllers');

router
    .get('/all', weaponController.getAll)
    .get('/weapon/:id', passport.authenticate('jwt'), weaponController.getById)
    .post('/create', passport.authenticate('jwt'), weaponController.create)
    .put('/edit', passport.authenticate('jwt'), weaponController.edit)
    .delete('/delete/:id', passport.authenticate('jwt'), weaponController.delete)
    .get('/userWeapons', passport.authenticate('jwt'), weaponController.getUserWeapons);

module.exports = router;
