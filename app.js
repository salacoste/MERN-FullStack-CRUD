const express = require('express')
const path = require('path')
const {v4} = require('uuid')

const app = express()

let CONTACTS = [{
  id: v4(),
  name: 'test',
  phone: '912929',
  marked: false
}]

app.use(express.static(path.resolve(__dirname)))

app.use(express.json())

app.post('/api/contacts',(req,res)=>{
  const contact = {id:v4(), ...req.body, marked:false}
  CONTACTS.push(contact)
  res.status(201).json(contact)
})

app.delete('/api/contacts/:id', (req, res)=>{
  CONTACTS = CONTACTS.filter(el=> el.id !== req.params.id)
  res.status(200).json({message: "Contact is deleted", contacts: CONTACTS})
})

app.post('/api/contacts/:id', (req,res)=> {
  console.log('req:', req)
  const contact = CONTACTS.find(el=> el.id === req.body.id)
  contact.marked = !contact.marked
  res.status(200).json({message:`It's done`})
})

app.get('/api/contacts', (req, res) => {
  res.status(200).json(CONTACTS)
})


app.get('/', (req,res) => {
  // console.log('req', req)
  // console.log('res', res)
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, ()=>console.log('Server has been started on port 3000...'))