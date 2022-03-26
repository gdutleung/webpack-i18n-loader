import * as Parser from '@babel/parser'

export const DEFAULT_PARSER_OPTIONS: Parser.ParserOptions = {
  plugins: [
    'jsx',
    'typescript'
  ],
  sourceType: 'module'
}

export const DEFAULT_I18N_CONFIG = {
  i18nFn: 't',
  i18nPackage: '@byted/starling'
}
