import type { LoaderContext } from 'webpack'

function i18nLoader(this: LoaderContext<void>, content: string) {
  console.log('=======', i18nLoader, '=======')
  const res = content += '; console.log("console.log from i18n loader")'
  this.callback(null, res)
}

export default i18nLoader
