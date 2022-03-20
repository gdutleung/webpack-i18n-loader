import { LoaderContext } from 'webpack'

function i18nLoader(this: LoaderContext<any>, content: any) {
  console.log('=======', i18nLoader, '=======')
  this.callback(content)
}

export default i18nLoader
