import * as Parser from '@babel/parser'
import traverse, { TraverseOptions } from '@babel/traverse'
import generator, { GeneratorResult } from '@babel/generator'
import * as t from '@babel/types'
import { DEFAULT_I18N_CONFIG, DEFAULT_PARSER_OPTIONS } from '../constant'

export interface DevCompilerOptions {
  i18nFn?: string;
  sourceCode: string;
  i18nPackage?: string;
  parserOptions?: Parser.ParserOptions;
}

class DevCompiler {
  private sourceCode: string

  i18nFn: string

  i18nPackage: string

  private ast?: ReturnType<typeof Parser['parse']>

  private parserOptions: Parser.ParserOptions

  private result: GeneratorResult | null = null

  private isImported: boolean = false

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

    const visitor: TraverseOptions<t.Node> = {
      ImportDeclaration(path) {
        const sourcePackage = path.node.source.value

        if (sourcePackage === self.i18nPackage) {
          self.isImported = true
        }
      }

    }
    traverse(ast, visitor)

    // if (!self.isImported) {
    //   ast.
    // }
  }

  private generateCode(ast = this.ast) {
    if (ast) {
      return generator(ast)
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
