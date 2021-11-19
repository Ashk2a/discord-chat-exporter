import {Options} from "../options";
import {ExecException} from "child_process";
import Config from "../Config";

const fs = require("fs");
const {exec} = require("child_process");

export abstract class AbstractExecutor {
    protected constructor(protected command: string, public options: Options) {
        this.options = {...this.defaultOptions(), ...options}

        if (false === fs.existsSync(Config.discord.chatExporter.binary)) {
            throw `${Config.discord.chatExporter.binary}  isn't a valid binary file. Check your environment variable DISCORD_CHAT_EXPORTER_CLI_BIN`
        }
    }

    protected defaultOptions(): any {
        return {
            token: Config.discord.botToken,
            output: Config.discord.chatExporter.defaultOptions.output,
            format: Config.discord.chatExporter.defaultOptions.format
        }
    }

    protected buildCommandBase(): string {
        return `${Config.dotnet.binary} ${Config.discord.chatExporter.binary} ${this.command}`;
    }

    protected buildCommandArgs(): string {
        let args: string[] = [];

        Object.keys(this.options).forEach((key: string) => {
            const prefix = key.length === 1 ? '-' : '--';
            args.push(`${prefix}${key} ${this.options[key]}`);
        })

        args.push('-b');

        return args.join(' ');
    }

    protected buildCommand(): string {
        return `${this.buildCommandBase()} ${this.buildCommandArgs()}`;
    }

    public run(): void {
        exec(this.buildCommand(), (error?: ExecException, stdout?: string, stderr?: string) => {
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