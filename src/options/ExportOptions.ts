import {Options} from "./Options";

export interface ExportOptions extends Options {
    channel?: string;
    token?: string;
    output?: string;
    format?: string;
}
