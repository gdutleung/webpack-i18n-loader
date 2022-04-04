"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./constant/index");
const compilers_1 = require("./compilers");
function i18nLoader(content) {
    const devCompiler = new compilers_1.DevCompiler({
        i18nFn: index_1.DEFAULT_I18N_CONFIG.i18nFn,
        sourceCode: content,
        i18nPackage: index_1.DEFAULT_I18N_CONFIG.i18nPackage
    });
    const { code, map } = devCompiler.startCompile() || {};
    this.callback(null, code || content);
}
exports.default = i18nLoader;
//# sourceMappingURL=index.js.map