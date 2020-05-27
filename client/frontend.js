import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
  el: '#app',
  data() {
    return {
      form: {
        name: '',
        phone: ''
      },
      contacts: []
    }
  },
  computed: {
    canCreate() {
      return this.form.name.trim() && this.form.phone.trim()
    }
  },
  methods: {
    createContact() {
      const {...res} = this.form

      console.log(res);
      this.contacts.push({...res, id: Date.now(), marked: false})
      
      console.log(this.contacts);
      
      this.form.name = this.form.phone = ''
      
    },
    markContact(id) {
      console.log(`contact is marked ${id}`)
      this.contacts.forEach((el)=> {
        if (el.id === id) {
         el.marked = !el.marked  
        }
      })
    },
    deleteContact(id) {

      console.log(`contact is deleted ${id}`);
      this.contacts = this.contacts.filter((el)=> el.id !== id)
      console.log(this.contacts)
      
    }
  }
})