const Planet = require('./../models/Planet');
const notifMsgs = require('./../constants/notification-messages');
const userRoles = require('./../constants/user-roles');

const planetData = {
    getAll: async () => {
        try {
            const planets = await Planet.find({});
            return { planets, msg: notifMsgs.success.SUCCESS };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_GET_PLANETS);
        }
    },

    getById: async (id) => {
        try {
            const planet = await Planet.findById(id)
                .populate('natives', '_id name');
            return { planet, msg: notifMsgs.success.SUCCESS };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.PLANET_DOES_NOT_EXIST);
        }
    },

    create: async (planetInput) => {
        try {
            const planet = await Planet.create(planetInput);
            return { planetId: planet._id, msg: notifMsgs.success.PLANET_CREATED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.UNABLE_TO_CREATE_PLANET);
        }
    },

    edit: async (id, newPlanetInput, currUserId, userRole) => {
        try {
            const planet = await Planet.findById(id);

            if (planet.creator.toString() !== currUserId.toString() && userRole !== userRoles.ADMIN) {
                throw new Error(notifMsgs.errors.UNAUTHORIZED_EDIT);
            }

            Object.keys(newPlanetInput).forEach(newProp => {
                planet[newProp] = newPlanetInput[newProp];
            });

            await planet.save();
            return { msg: notifMsgs.success.PLANET_EDITED };
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_EDIT_PLANET);
        }
    },

    delete: async (id, currUserId, userRole) => {
        try {
            const planet = await Planet.findById(id);

            if (planet.creator.toString() !== currUserId.toString() && userRole !== userRoles.ADMIN) {
                throw new Error(notifMsgs.errors.UNAUTHORIZED_DELETE);
            }

            await Planet.findByIdAndDelete(id);
            return notifMsgs.success.PLANET_DELETED;
        } catch(err) {
            console.log(err);
            throw new Error(notifMsgs.errors.FAILED_TO_DELETE_PLANET);
        }
    },

    getAllPlanetsByUserId: (userId) => new Promise((res, rej) => {
        Planet.find({ creator: userId }, (err, planets) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_PLANETS));
            }

            res(planets);
        });
    }),

    searchPlanets: (search) => new Promise((res, rej) => {
        Planet.find({ name: { $regex: "^" + search } })
        .select('_id name natives')
        .exec((err, planets) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_PLANETS));
            }
            
            res(planets);
        });
    })
};

module.exports = planetData;
