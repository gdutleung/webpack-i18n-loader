"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compilers_1 = require("./compilers");
function i18nLoader(content) {
    const devCompiler = new compilers_1.DevCompiler({
        i18nFn: 't',
        sourceCode: content,
        i18nPackage: '@byted/xx'
    });
    const { code, map } = devCompiler.startCompile() || {};
    this.callback(null, code || content);
}
exports.default = i18nLoader;
//# sourceMappingURL=index.js.map