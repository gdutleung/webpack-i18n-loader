"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function i18nLoader(content) {
    console.log('=======', i18nLoader, '=======');
    const res = content += '; console.log("console.log from i18n loader")';
    this.callback(null, res);
}
exports.default = i18nLoader;
