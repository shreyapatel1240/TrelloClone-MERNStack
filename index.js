const mongoose = require('mongoose')
const app = require('./api/server')
const { PORT, MONGODB_URI } = require('./api/utils/constants')

mongoose.connect(MONGODB_URI, () => console.log(`DB connected at ${MONGODB_URI}`))

app.listen(PORT, () => console.log(`App Listening On ${PORT}`))
