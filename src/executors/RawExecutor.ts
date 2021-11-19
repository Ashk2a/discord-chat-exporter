import {AbstractExecutor} from "./AbstractExecutor";

export class RawExecutor extends AbstractExecutor {
    constructor(command: string) {
        super(command, {});
    }

    protected buildCommand(): string {
        return this.buildCommandBase();
    }
}