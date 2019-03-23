const { characterData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const characterProperties = [
    'name',
    'race',
    'sex',
    'affilations',
    'shortStory',
    'birhtday',
    'height',
    'weight',
    'weapons',
    'vehicles',
    'images'
];

const characterController = {
    getAll: (req, res) => {
        characterData.getAll()
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.fail({ msg: err.message });
          });
    },

    getById: (req, res) => {
        characterData.getById(req.params.id)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.fail({ msg: err.message });
          });
    },

    create: (req, res) => {
        const character = cloneOnly(req.body, characterProperties);
        
        characterData.create(character)
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.fail({ msg: err.message });
          });
    },

    edit: (req, res) => {
        const character = cloneOnly(req.body, characterProperties);

        characterData.edit(req.body.characterId, character)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.fail({ msg: err.message });
          });
    },

    delete: (req, res) => {
        characterData.delete(req.params.id)
          .then(msg => res.success({ msg }))
          .catch(err => {
            console.log(err);
            res.fail({ msg: err.message });
          });
    }
};

module.exports = characterController;
