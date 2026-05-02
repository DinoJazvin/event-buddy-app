const express = require("express")
const app = express()

app.use(express.json())

let tasks = []

app.get("/", (req, res) => {
    res.json({
        status: "jeskdek",
        timestamp: new Date().toISOString()
    })
})

app.get("/status", (req, res) => {
    res.json({
        status: "running",
        timestamp: new Date().toISOString()
    })
})

app.get('/users/:userId/tasks}', (req, res) => {
    const id = req.params.userId
    res.send(`User id is ${id}`)
})

app.get('/users/:userId/tasks:tasksId}', (req, res) => {
    const userId = req.params.userId
    const taskId = req.params.tasksId
    res.send(`User id is ${userId}} and task is ${taskId}`)
})

app.post('/users/:usersId/tasks', (req, res) => {
    const newTask = req.body
    tasks.push(newTask)

    res.status(201).json({
        message: "new task created, thanks pal :)",
        data: newTask
    })
})

//this is to change some fields in our task
app.patch('users/:userId/tasks/:taskId', (req, res) => {
    const taskId = req.params.tasksId
    const {name, description} = req.body

    //find task in array
    const task = tasks.find(ele => ele.id === taskId)

    //we're just gonna assume it exists and tasks have viable
    //values already, just editing name and description 
    task.name = name
    task.description = description
    
})

//how would we write the 'mark complete' endpoint, do we add 'status'
//variable inside of previous endpoint?

app.delete("users/:userId/tasks/:taskId", (req, res) => {
    const {taskId} = req.params

    //find task in array, nvm we dont need this
    // const task = tasks.find(ele => ele.id === taskId)

    //not sure best way to delete from what im assuming is an array, 
    //guess it shoudl probably be hashmap or json since we need to 
    //refer to tasks by id in O(1) time prefereably, so maybe assum
    //objet

 
    //we can maybe use filter method
    tasks = tasks.filter(task => task.id !== taskId)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))