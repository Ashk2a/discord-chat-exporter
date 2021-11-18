"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportExecutor = void 0;
const AbstractExcutor_1 = require("./AbstractExcutor");
const options_1 = require("../options");
class ExportExecutor extends AbstractExcutor_1.AbstractExecutor {
    constructor(options) {
        super("export", Object.assign(Object.assign({}, options_1.defaultExportOptions), { options }));
    }
}
exports.ExportExecutor = ExportExecutor;
//# sourceMappingURL=ExportExecutor.js.map