import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

Vue.component('loader', {
  template: `
  <div >
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  `
})

new Vue({
  el: '#app',
  data() {
    return {
      form: {
        name: '',
        phone: ''
      },
      contacts: [],
      loading: false,
    }
  },
  computed: {
    canCreate() {
      return this.form.name.trim() && this.form.phone.trim()
    }
  },
  methods: {
    async createContact() {
      const {...res} = this.form

      console.log(res);
      const contact = await request('/api/contacts', 'POST', res)
      this.contacts.push(contact)
      // this.contacts.push({...res, id: Date.now(), marked: false})
      
      
      // console.log(this.contacts);
      
      this.form.name = this.form.phone = ''
      
    },
    async markContact(id) {

      await request(`/api/contacts/${id}`, 'POST', {id})
      console.log(`contact is marked ${id}`)
      this.contacts.forEach((el)=> {
        if (el.id === id) {
         el.marked = !el.marked  
        }
      })
    },
    async deleteContact(id) {
      await request(`/api/contacts/${id}`, 'DELETE')
      // await console.log(`contact is deleted ${id}`)
      this.contacts = this.contacts.filter((el)=> el.id !== id)
      console.log(this.contacts)
      
    }
  },
  mounted() {
    this.loading = true
    request('/api/contacts').then(res=>this.contacts = res)
    // console.log('this.contacts:', this.contacts)
    // await console.log(console.log('data:', data))
    this.loading = false
  }
})

function request (url, method='GET', data=null) {
  const headers = {}
  let body

  if (data) {
    headers["Content-Type"] = 'application/json'
    body = JSON.stringify(data)
  }

  try {
    return fetch(url, {
      method,
      headers,
      body,
    }).then((res, rej)=> { return res.json() }).then((res)=> {
      console.log('res:', res)
      console.log(`Response is received:`, res)
      return res
      
    })
      
      
    
  }
  catch(e)
  {
    console.warn(`Error is appeared: ${e.message}`)
    return false
  }

}