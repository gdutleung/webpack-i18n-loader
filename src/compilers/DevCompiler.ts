import * as Parser from '@babel/parser'
import traverse from '@babel/traverse'
import generator, { GeneratorResult } from '@babel/generator'
import * as t from '@babel/types'
import { DEFAULT_I18N_CONFIG, DEFAULT_PARSER_OPTIONS } from '../constant'
import template from '@babel/template'
import { getRCNodePathFromJSXPath, isI18nDisabledComment } from '../helper'

export interface DevCompilerOptions {
  i18nFn?: string;
  sourceCode: string;
  i18nPackage?: string;
  parserOptions?: Parser.ParserOptions;
}

class DevCompiler {
  i18nFn: string

  i18nPackage: string

  private sourceCode: string

  private ast?: ReturnType<typeof Parser['parse']>

  private parserOptions: Parser.ParserOptions

  private result: GeneratorResult | null = null

  constructor(options: DevCompilerOptions) {
    const { sourceCode, i18nFn, i18nPackage, parserOptions } = options

    this.sourceCode = sourceCode
    this.i18nFn = i18nFn || DEFAULT_I18N_CONFIG.i18nFn
    this.i18nPackage = i18nPackage || DEFAULT_I18N_CONFIG.i18nPackage
    this.parserOptions = Object.assign(
      {},
      DEFAULT_PARSER_OPTIONS,
      parserOptions
    )
  }

  parseCode(sourceCode = this.sourceCode, parserOptions = this.parserOptions) {
    const ast = Parser.parse(sourceCode, parserOptions)
    this.ast = ast
  }

  traverseNode(ast = this.ast) {
    const self = this
    let localSpecifierName = ''
    let insertImportStatement = () => {}

    // resolve Import Declaration
    traverse(ast, {
      ImportDeclaration(path) {
        const packageName = path.node.source.value

        if (packageName === self.i18nPackage) {
          localSpecifierName = path.node.specifiers[0].local.name
        }
        insertImportStatement = () => {
          if (!localSpecifierName) {
            localSpecifierName = path.scope.generateUid(self.i18nFn)
            const importStatement = `import { ${self.i18nFn} as ${localSpecifierName}} from "${self.i18nPackage}"`
            const importAST = template.ast(importStatement)

            if (t.isProgram(path.parent) && t.isStatement(importAST)) {
              path.parent.body.unshift(importAST)
            }
          }
        }
      }
    })

    insertImportStatement()

    // resolve JSX
    traverse(ast, {
      JSXText(path) {
        // resolve i18n disabled
        const preSibling = path.getPrevSibling()
        const isI18nDisabled = isI18nDisabledComment(preSibling.node)

        const text = path.node.value
        // TODO: use RegExp
        if (text.includes('((') && !isI18nDisabled) {
          const ancestorPath = getRCNodePathFromJSXPath(path)
          let isUseTranslateCalled = false

          if (
            ancestorPath.isArrowFunctionExpression() ||
            ancestorPath.isFunctionExpression()
          ) {
            if (t.isBlockStatement(ancestorPath.node.body)) {
              // have `const { t } = useTranslate()`
              ancestorPath.node.body.body.forEach((node) => {
                if (t.isVariableDeclaration(node)) {
                  node.declarations.forEach((d) => {
                    if (
                      t.isVariableDeclarator(d) &&
                      t.isCallExpression(d.init) &&
                      t.isIdentifier(d.init.callee)
                    ) {
                      const calleeName = d.init.callee.name
                      if (calleeName === self.i18nFn) {
                        isUseTranslateCalled = true
                      }
                    }
                  })
                }
              })
            }
          }

          const key = text
            .replace(/\s/g, '')
            .replace(/\(/g, '')
            .replace(/\)/g, '')
          const replaceExpression = template.expression(
            `${localSpecifierName}('${key}')`
          )()
          const replaceExpressionWithContainer =
            t.jsxExpressionContainer(replaceExpression)

          path.replaceWith(replaceExpressionWithContainer)
          path.skip()
        }
      }
    })
  }

  generateCode(ast = this.ast) {
    if (ast) {
      this.result = generator(ast)
    }
  }

  startCompile() {
    this.parseCode()
    this.traverseNode()
    this.generateCode()

    return this.result
  }
}

export default DevCompiler
