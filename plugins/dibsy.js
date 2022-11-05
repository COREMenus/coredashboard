export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
      headers: {
        Authorization: 'bearer sk_test_83058597bf8e07f8532e3f9c5446484cd5cb'
      }
    })
  
    // Set baseURL to something different
    api.setBaseURL('https://api.dibsy.one/v2')
  
    // Inject to context as $api
    inject('dibsy', api)
  }