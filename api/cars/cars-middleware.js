//Imports
const Car = require("./cars-model");
const db = require("../../data/db-config")
const vinValidation = require("vin-validator")

//Define function to validate id
const checkCarId = async (req, res, next) => {
    try{
        const car = await Car.getById(req.params.id)
        if(!car) {next ({status:404,  message: `car with id ${req.params.id} is not found`})}
        else {
            req.car = car
            next()
        }
    }catch (err) {
        next(err)
    }
}

const checkCarPayload = (req, res, next) => {
    const {vin,make,model,mileage} = req.body
    if(vin === undefined){ return next({ status: 400, message: "vin is missing"})}
    else if(make === undefined){return next({ status: 400, message: "make is missing"})}
    else if(model === undefined){return next({ status: 400, message: "model is missing"})}
    else if(mileage === undefined){return next({ status: 400, message: "mileage is missing"})}
    else{next();}
}

const checkVinNumberValid = async (req, res, next) => {
    if (vinValidation.validate(req.body.vin)) { next() }
    else { next({status: 400, message: `vin ${req.body.vin} is invalid`}) }
}

const checkVinNumberUnique = async (req, res, next) => {
    try{
        const existingVin = await db("cars")
            .where("vin", req.body.vin).first()
        if(existingVin){ next({status: 400, message: `vin ${req.body.vin} already exists`}) }
        else{next()}
    }
    catch (err){next(err)
    }
}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }



