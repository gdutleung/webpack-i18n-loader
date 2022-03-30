import * as Parser from '@babel/parser'
import traverse from '@babel/traverse'
import generator, { GeneratorResult } from '@babel/generator'
import * as t from '@babel/types'
import { DEFAULT_I18N_CONFIG, DEFAULT_PARSER_OPTIONS } from '../constant'
import template from '@babel/template'

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

  constructor (options: DevCompilerOptions) {
    const { sourceCode, i18nFn, i18nPackage, parserOptions } = options

    this.sourceCode = sourceCode
    this.i18nFn = i18nFn || DEFAULT_I18N_CONFIG.i18nFn
    this.i18nPackage = i18nPackage || DEFAULT_I18N_CONFIG.i18nPackage
    this.parserOptions = Object.assign({}, DEFAULT_PARSER_OPTIONS, parserOptions)
  }

  private parseCode(sourceCode = this.sourceCode, parserOptions = this.parserOptions) {
    const ast = Parser.parse(sourceCode, parserOptions)
    this.ast = ast
  }

  private traverseNode(ast = this.ast) {
    const self = this

    traverse(ast, {
      Program(path, state) {
        let imported = false

        path.traverse({
          ImportDeclaration(path) {
            const packageName = path.node.source.value

            if (packageName === self.i18nPackage) {
              imported = true
            }
          }
        })

        if (!imported) {
          const uid = path.scope.generateUid(self.i18nFn)
          const importStatement = `import { ${self.i18nFn} as ${uid}} from "${self.i18nPackage}"`
          const importAST = template.ast(importStatement)

          path.node.body.unshift(importAST as t.Statement)
        }
      }
    })

  }

  private generateCode(ast = this.ast) {
    if (ast) {
      this.result = generator(ast)
    }
  }

  startCompile () {
    this.parseCode()
    this.traverseNode()
    this.generateCode()

    return this.result
  }
}

export default DevCompiler
