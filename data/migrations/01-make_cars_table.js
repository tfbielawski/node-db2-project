//Define up and down functions
exports.up = function (knex) {
    //Create the cars table
    return knex.schema.createTable("cars", tbl =>{
        //Define the primary key
        tbl.increments("id")
        //Define the vin column with name and length
        tbl.string("vin", 17)
            //Required (cannot be null) //Cannot be duplicated
            .notNullable()
            .unique()
        //Define the make model column, pass in name and length
        tbl.string("make", 128).notNullable()
        //Define the make model column, pass in name and length
        tbl.string("model", 128).notNullable()
        tbl.string("title", 128)
        tbl.string("transmission", 128)
        tbl.double("mileage").notNullable()
    })
};

exports.down = function (knex) {
    //If table "cars" exists, drop
    return knex.schema.dropTableIfExists("cars")
};
