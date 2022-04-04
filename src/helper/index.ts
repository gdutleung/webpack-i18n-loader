import { DEFAULT_I18N_CONFIG, REACT_FC_HOOKS } from './../constant/index'
import { Node, NodePath } from '@babel/traverse'
import * as t from '@babel/types'

export const isI18nDisabledComment = (node: Node) => {
  if (node && t.isJSXExpressionContainer(node)) {
    // TODO: USE RegExp
    return Boolean(
      node.expression.innerComments?.find(
        (c) => c.value.indexOf(DEFAULT_I18N_CONFIG.i18nDisabledComment) > -1
      )
    )
  }
  return false
}

export const isReactFCComponent = (nodePath: NodePath<t.Node>) => {
  const isInReactHooks =
    t.isCallExpression(nodePath.parent) &&
    t.isIdentifier(nodePath.parent.callee) &&
    REACT_FC_HOOKS.includes(nodePath.parent.callee.name)
  const isFunction =
    t.isArrowFunctionExpression(nodePath) || t.isFunctionDeclaration(nodePath)

  return !isInReactHooks && isFunction
}

export const getRCNodePathFromJSXPath = (path: NodePath<t.JSXText>) => {
  let RCNodePath = path.parentPath
  while (!isReactFCComponent(RCNodePath)) {
    if (RCNodePath.parentPath) {
      RCNodePath = RCNodePath.parentPath
    }
  }
  return RCNodePath
}
