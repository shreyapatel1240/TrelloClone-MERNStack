const Status = require('../models/status')

const status = []

const status1 = new Status({
    status: 'ToDo'
})

const status2 = new Status({
    status: 'In Progress'
})

const status3 = new Status({
    status: 'Complete'
})

status.push(status1)
status.push(status2)
status.push(status3)

module.exports = status