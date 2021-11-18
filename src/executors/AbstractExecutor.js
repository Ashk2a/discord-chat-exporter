"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractExecutor = void 0;
const fs = require("fs");
const { exec } = require("child_process");
class AbstractExecutor {
    constructor(command, options) {
        this.command = command;
        this.options = options;
        this.binary = process.env.DISCORD_CHAT_EXPORTER_CLI_BIN;
        if (false === fs.existsSync(this.binary)) {
            throw this.binary + " isn't a valid binary file.";
        }
    }
    buildCommand() {
        let command = `dotnet ${this.binary} ${this.command}`;
        Object.keys(this.options).forEach((key) => {
            const prefix = key.length === 1 ? '-' : '--';
            command += ` ${prefix}${key} ${this.options[key]}`;
        });
        return command + ' -b';
    }
    run() {
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
exports.AbstractExecutor = AbstractExecutor;
//# sourceMappingURL=AbstractExcutor.js.map