const express = require("express")
const app2 = express()
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const pino = require("pino-http")({
    // customLogLevel: function (req, res) {
    //     if (res.statusCode >= 500) return "error"
    //     if (res.statusCode >= 400) return "warn"
    //     return "info"
    // }
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url
      }
    }
  }
})

//db content
const pool = require("./db")
const { getAllEvents, getSpecificEvent, addEvent, deleteEvent} = require("./event_service")


const fs = require("fs")
const yaml = require("js-yaml")
const spec = yaml.load(fs.readFileSync("./event-planner-spec.yaml", "utf8"))

app2.use(cors())
app2.use(express.json())
app2.use(pino)


// let events = []

app2.get("/", (req, res) => {
    res.json({
        status: "Zis is event planner server",
        timestamp: new Date().toISOString()
    })
})

app2.get("/events", async (req, res) => {

    // const location = req.query.locationx

    // empty array is okay because no events is an okay outcome "no events found"
    // if(events.length === 0)
    //     let myEvents = events
    // else{
    //     res.status(404).json({
    //         message: "No events found pal",
    //     })
    // }

    // if (location)
    //     myEvents = events.filter(theEvent => theEvent.location === location)
    const token = req.headers.authorization

    //401 "unauthorized"
    if (!token) {
        return res.status(401).json({
            message: "no token provided"
        })
    }

    const events = await getAllEvents()

    //200 "successful"
    res.status(200).json({
        message: "heres the events pal",
        data: events
    })
})

// req.params -> /path parameters
// req.query ->  ?query params
app2.get("/events/:eventId", async (req, res) => {
    const eventId = req.params.eventId

    // let myEvent = events.find(theEvent => theEvent.id === eventId)

    const event = await getSpecificEvent(eventId)

    // if(!event){
    //     return res.status(404).json({
    //         message: "Event not found pal!",
    //     })
    // }

    if (!event){
        req.log.warn({
            msg: "Event not found",
            eventId: req.params.eventId
        })
        return res.status(404).json({
            message: "Event not found pal!",
        })
    }

    res.status(200).json(event)
})

 // const location = req.query.location
    // res.send(`getting events in ${location}`)
    // if (location)
    //     myEvent = events.find(theEvent => theEvent.location === location)



app2.post("/events", async (req, res) => {

    const {title, date, location} = req.body

    if(!title || !date || !location){
        req.log.warn({
            msg: "insufficient event info provided, creation unsuccessful!",
        })
        return res.status(400).json({
            message: "Event not created, insufficient event info provided",
        })
    }

    const result = await addEvent(title, date, location)

    const rowsInserted = result.rowCount

    if(!rowsInserted){
        req.log.error({
            msg: "Event not found, creation unsuccessful!",
        })
        return res.status(500).json({
            message: "Event creation unsuccessful!",
        })
    }

    // events.push(newEvent)

    res.status(201).json({
        message: "new event created, thanks pal :)",
    })
})

app2.put("/events/:eventId", (req, res) => {

    // checks req.body (with keys flatted into array) is empty
    if(Object.keys(req.body).length === 0){
         return res.status(400).json({
            message: "No update executed, sufficient data not provided!",
        })
    }

    const {title, date, location, attendees} = req.body
    const eventId = req.params.eventId

    //array.findIndex returns the index of the specific element event
    const newEvent = {
        id: eventId, 
        title: title,
        date: date, 
        location: location,
        attendees: attendees
    }

    let index = events.findIndex(event => event.id === eventId)

    if(index === -1){
        return res.status(404).json({
            message: "Update failed, event not found!",
        })
    }

    events[index] = newEvent

    res.status(200).json({
        message: "event updated",
        data: newEvent
    })
})


app2.patch("/events/:eventId", (req, res) => {
    const {title, date, location} = req.body

    // checks req.body (with keys flatted into array) is empty
    if(Object.keys(req.body).length === 0){
         return res.status(400).json({
            message: "No update executed, sufficient data not provided!",
        })
    }

    const eventId = req.params.eventId

    let myEvent = events.find(event => event.id === eventId)

    if(!myEvent){
        return res.status(404).json({
            message: "No update executed, event not found!",
        })
    }

    for(let key in req.body){
        myEvent[key] = req.body[key]
    }

    res.status(200).json({
        message: "event updated, thanks pal :)",
        data: myEvent
    })
})


app2.delete("/events/:eventId", async (req, res) => {

    // const initialLength = events.length

    // events = events.filter(event => event.id !== eventId)

    //event not found, events array will still be same length as before.
    // if(events.length === initialLength){
    //     return res.status(404).json({
    //         message: "Deletion failed: event not found",
    //      })
    // }

    let eventId = req.params.eventId

    const myEvent = await deleteEvent(eventId)

    if(!myEvent){
        return res.status(404).json({
            message: "Event not found pal!",
        })
    }

    res.status(200).json({
        message: "event deleted, thanks pal :)",
    })
})


app2.post("/login", (req, res) => {
    const { username } =req.body

    if (!username){
         return res.status(400).json({
            message: "username required"
        })
    }

    res.json({
        token: "fake-token"
    })
})


app2.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec))


const PORT = process.env.PORT || 3000
app2.listen(PORT, () => console.log(`server is running on port ${PORT}`))
