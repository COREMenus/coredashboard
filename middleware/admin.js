export default function({redirect, $auth, app}) {

    // * If First Name, Company Name, Country, And There is a subscription then they are onboarded

    if ($auth.user.role === 'admin') return
    return redirect(app.localePath({ name: 'orders' }))

}