import {Options} from "./Options";

export interface ExportOptions extends Options {
    channel?: string;
    token?: string;
    output?: string;
    format?: string;
}

export let defaultExportOptions = {
    output: process.env.DISCORD_CHAT_EXPORTER_OUTPUT_DIR ?? 'output',
    format: process.env.DISCORD_CHAT_EXPORTER_OUTPUT_DIR ?? 'HtmlDark'
}