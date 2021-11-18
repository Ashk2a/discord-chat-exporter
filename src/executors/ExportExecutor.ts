import {AbstractExecutor} from "./AbstractExecutor";
import {ExportOptions} from "../options";

export class ExportExecutor extends AbstractExecutor {
    constructor(options: ExportOptions) {
        super("export", options);
    }
}