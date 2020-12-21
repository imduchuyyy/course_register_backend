const express = require('express')
const app = express()
const http = require('http').createServer(app)

const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const compression = require('compression')
const UserRoute = require('./routes/user')
const SubjectRoute = require('./routes/subject')
const CourseRoute = require('./routes/course')

const { PORT } = require('./environments')
const { connection } = require('./helper')

// reduce size file
app.use(compression())
app.use(cors())

app.use(
	express.urlencoded({
		extended: true
	})
)

app.use(express.json())

app.use('/api', UserRoute)
app.use('/api', SubjectRoute)
app.use('/api', CourseRoute)

// connected mysql database
connection.connect((err) => {
	if (err) {
		console.log('❌  error occurred from the mysql database')
	} else {
		console.log('🌨  Connected successfully to mysql database')
	}
})

http.listen(PORT, () => {
	console.log(
		'Express server listen on port ',
		PORT,
		`in ${app.settings.env} mode`
	)
})
