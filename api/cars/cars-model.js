//Imports
const db = require("../../data/db-config");

const getAll = () => {
    //SELECT * from cars
    return db("cars");
}

const getById = async (id) => {
    const result = await db("cars").where("id", id).first();
    return result
}

const getByVin = (vin) => {
    return db("cars").where("vin", vin).first();
}

// Query the db, insert car, assign [id] (array of ids)
const create = async (car) => {
    const [id] = await db('cars').insert(car)
    return getById(id)
}

//Export the model
module.exports = { getAll, getById, getByVin, create,}
