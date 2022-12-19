export default function ({ app, $auth }) {
    $auth.onRedirect((to, from) => {
        // Redirect to Orders for Panel users instead of home directory
        const isPanelStrategy = $auth.strategy.name === 'localUser'
        // We only want to redirect when logged in
        const isLoggedIn = $auth.loggedIn 
        if (isPanelStrategy && isLoggedIn) return app.localePath('/orders')
        return app.localePath(to)
    })
}