export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
      headers: {
        Authorization: 'bearer pk_test_70429bc2a200f62c944386224c8e375e8ad2'
      }
    })
  
    // Set baseURL to something different
    api.setBaseURL('https://vault.dibsy.one')
  
    // Inject to context as $api
    inject('vault', api)
  }