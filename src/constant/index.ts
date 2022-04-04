import * as Parser from '@babel/parser'

export const DEFAULT_PARSER_OPTIONS: Parser.ParserOptions = {
  plugins: [
    'jsx',
    'typescript'
  ],
  sourceType: 'module'
}

export const DEFAULT_I18N_CONFIG = {
  i18nFn: 'useTranslate',
  i18nPackage: '@common/hooks/useTranslate',
  matchRegExp: /^\(\(\s[a-zA-Z_]+\)\)/,
  i18nDisabledComment: 'i18n-disabled'
}

export const REACT_FC_HOOKS = ['useState', 'useCallback', 'useMemo', 'useReducer']
