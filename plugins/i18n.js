import moment from "moment"

export default function ({ app, $auth, $vuetify }) {
    
  const localeCookie = app.i18n.getLocaleCookie()
  const localeBrowser = app.i18n.getBrowserLocale()

  if (localeCookie) {
    $vuetify.lang.current = localeCookie
  } else {
    $vuetify.lang.current = localeBrowser
  }

  app.i18n.onLanguageSwitched = (ـ, newLocale) => {
    moment.locale(newLocale)
    $vuetify.lang.current = newLocale
    app.i18n.setLocaleCookie(newLocale)
    if (newLocale === 'ar') {
      $vuetify.rtl = true
    } else {
      $vuetify.rtl = false
    }
  }
}
