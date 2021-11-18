import {Options} from "../options";
import {ExecException} from "child_process";

const fs = require("fs");
const {exec} = require("child_process");

export abstract class AbstractExecutor {
    protected readonly dotnetBinary: string = process.env.DOTNET_BIN ?? './node_modules/.bin/dotnet';
    protected readonly discordChatExporterBinary: string = process.env.DISCORD_CHAT_EXPORTER_CLI_BIN ?? 'cli/DiscordChatExporter.Cli.dll';

    protected constructor(private command:string, public options: Options) {
        const binaries = [this.dotnetBinary, this.discordChatExporterBinary];

        binaries.forEach((binary) => {
            if (false === fs.existsSync(binary)) {
                throw `${binary}  isn't a valid binary file.`
            }
        })
    }

    public buildCommand(): string
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