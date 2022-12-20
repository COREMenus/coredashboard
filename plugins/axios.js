export default function ({ $axios, redirect, $loading }) {
    $axios.onRequest(config => {
        // console.log('Making request to ' + config.url)
    })

    // $axios.onError(error => {
    //     // const code = parseInt(error.response && error.response.status)
    //     // if (code === 404) {
    //     //     redirect('/404')
    //     // }
    // })
}