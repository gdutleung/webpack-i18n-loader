import { DEFAULT_I18N_CONFIG } from './constant/index'
import type { LoaderContext } from 'webpack'
import { DevCompiler } from './compilers'

function i18nLoader (this: LoaderContext<void>, content: string) {
  const devCompiler = new DevCompiler({
    i18nFn: DEFAULT_I18N_CONFIG.i18nFn,
    sourceCode: content,
    i18nPackage: DEFAULT_I18N_CONFIG.i18nPackage
  })

  const { code, map } = devCompiler.startCompile() || {}

  this.callback(null, code || content)
}

export default i18nLoader
