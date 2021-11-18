import {AbstractExecutor} from "./AbstractExcutor";
import {defaultExportOptions, ExportOptions} from "../options";

export class ExportExecutor extends AbstractExecutor {
    constructor(options: ExportOptions) {
        super("export", {...defaultExportOptions, options});
    }
}