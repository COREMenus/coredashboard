export default function({redirect, $auth, app}) {

    // * If First Name, Company Name, Country, And There is a subscription then they are onboarded

    const account = $auth.user

    if (!account) return

    if ($auth.user.role !== 'admin') return

    // * If no Name or Phone Number, redirect to step 1
    if (!account.first_name || !account.last_name) {
        return redirect(app.localePath('/onboarding'))
    } 

    // * If no company name or country, redirect to step 2
    else if (!account.company || !account.country) {
        return redirect(app.localePath('/onboarding?step=2'))
    }

    // * If no subsription at all
    // else if (subs.length < 1) {
    //     return redirect(app.localePath('/onboarding?step=3'))
    // }
}