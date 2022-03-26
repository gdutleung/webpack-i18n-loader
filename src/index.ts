import type { LoaderContext } from 'webpack'
import { DevCompiler } from './compilers'

function i18nLoader (this: LoaderContext<void>, content: string) {
  const devCompiler = new DevCompiler({
    i18nFn: 't',
    sourceCode: content,
    i18nPackage: '@byted/xx'
  })

  const result = devCompiler.startCompile()

  this.callback(null, result?.code || content)
}

export default i18nLoader
