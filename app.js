const express = require('express')
const path = require('path')

const app = express()

const CONTACTS = [{
  id:1,
  name: 'test',
  phone: '912929',
  marked: false 
}]

app.use(express.static(path.resolve(__dirname)))

app.get('/', (req,res) => {
  // console.log('req', req)
  // console.log('res', res)
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, ()=>console.log('Server has been started on port 3000...'))