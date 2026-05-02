const { Pool } = require("pg")

const pool = new Pool({
    user: "dinojazvin",
    host: "localhost",
    database: "event_planner",
    password: "", 
    port: 5432
})

module.exports = pool