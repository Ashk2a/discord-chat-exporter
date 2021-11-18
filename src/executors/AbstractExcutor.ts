import {Options} from "../options";

const fs = require("fs");
const {exec} = require("child_process");

export abstract class AbstractExecutor {
    protected readonly binary: string = process.env.DISCORD_CHAT_EXPORTER_CLI_BIN

    protected constructor(private command:string, public options: Options) {
        if (false === fs.existsSync(this.binary)) {
            throw this.binary + " isn't a valid binary file."
        }
    }

    public buildCommand(): string
    {
        let command = `dotnet ${this.binary} ${this.command}`;

        Object.keys(this.options).forEach((key) => {
            const prefix = key.length === 1 ? '-' : '--';

            command += ` ${prefix}${key} ${this.options[key]}`;
        })

        return command + ' -b';
    }

    public run(): void
    {
        exec(this.buildCommand(), (error, stdout, stderr) => {
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