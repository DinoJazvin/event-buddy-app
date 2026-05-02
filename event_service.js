const pool = require("./db")

async function getAllEvents() {
    const result = await pool.query("SELECT * FROM events")
    // console.log("get all events result is this -->", result)
    return result.rows
}

async function getSpecificEvent(eventId) {
    const result = await pool.query(
        "SELECT * FROM events WHERE id = $1",
        [eventId]
    )

    // console.log("get single event result is this -->", result)
    return result.rows[0]
}

async function addEvent(title, date, location) {
    const result = await pool.query(
        "INSERT INTO events (id, title, date, location, attendees) VALUES ($1, $2, $3, $4, $5)",
        [Date.now().toString(), title, date, location, []]
    )

    // console.log("Post result is this -->", result)
    return result
}

async function deleteEvent(eventId) {
     const result = await pool.query(
        "DELETE FROM events WHERE id = $1",
        [eventId]
    )

    // console.log("Delete event result is this: ", result)
    return result.rowCount
}

module.exports = {
    getAllEvents,
    getSpecificEvent,
    addEvent,
    deleteEvent
}