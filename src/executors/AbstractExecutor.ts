import {Options} from "../options";
import {ExecException} from "child_process";

const fs = require("fs");
const {exec} = require("child_process");

export abstract class AbstractExecutor {
    protected readonly dotnetBinary: string = process.env.DOTNET_BIN ?? 'dotnet';
    protected readonly discordChatExporterBinary: string = process.env.DISCORD_CHAT_EXPORTER_CLI_BIN ?? __dirname + '/../../cli/DiscordChatExporter.Cli.dll';

    protected constructor(protected command:string, public options: Options) {
        this.options = {...this.defaultOptions(), ...options}

        if (false === fs.existsSync(this.discordChatExporterBinary)) {
            throw `${this.discordChatExporterBinary}  isn't a valid binary file.`
        }
    }

    protected defaultOptions(): any
    {
        return {
            token: process.env.DISCORD_BOT_TOKEN,
            output: process.env.DISCORD_CHAT_EXPORTER_OUTPUT_DIR ?? 'output',
            format: process.env.DISCORD_CHAT_EXPORTER_FORMAT ?? 'HtmlDark'
        }
    }

    protected buildCommand(): string
    {
        let command = `${this.dotnetBinary} ${this.discordChatExporterBinary} ${this.command}`;

        Object.keys(this.options).forEach((key: string) => {
            const prefix = key.length === 1 ? '-' : '--';

            command += ` ${prefix}${key} ${this.options[key]}`;
        })

        return command + ' -b';
    }

    public run(): void
    {
        exec(this.buildCommand(), (error?: ExecException, stdout?:string, stderr?:string) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }

            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            console.log(`stdout: ${stdout}`);
        });
    }
}