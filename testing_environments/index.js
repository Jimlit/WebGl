const express = require('express')
const app = express()
const port = 8080

app.use(express.static('pages'))

app.get('/', (req, res) => res.sendFile('./pages/index.html', {root: __dirname}))
app.get('/poc1', (req, res) => res.sendFile('./pages/poc/poc1.html', {root: __dirname}))
app.get('/editor', (req, res) => res.sendFile('./pages/editor/editor.html', {root: __dirname}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))