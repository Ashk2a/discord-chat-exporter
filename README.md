# Discord chat exporter

This javascript library is a wrapper for [Tyrrz/DiscordChatExporter](https://github.com/Tyrrrz/DiscordChatExporter) tool.\
For more information read the wiki section [Using CLI](https://github.com/Tyrrrz/DiscordChatExporter/wiki/GUI%2C-CLI-and-Formats-explained#using-the-cli) of the tool.

## Installation

### Using npm
```sh-session
npm install discord-chat-exporter
```

### Using yarn
```sh-session
yarn add discord-chat-exporter
```

## Environment variables


|**Variable name** |**Description**|**Required**|**Default value**|
|---|---|---|---|
|DISCORD_BOT_TOKEN|Your private discord bot token |✓||
|DOTNET_BIN|Path to the `dotnet` binary. Default binary provided by [dotnet-3.1 dependency](https://www.npmjs.com/package/dotnet-3.1)|✕|dotnet|
|DISCORD_CHAT_EXPORTER_CLI_BIN|Path to discord chat exporter dll binary|✕|node_modules/discord-chat-exporter/cli/DiscordChatExporter.Cli.dll|
|DISCORD_CHAT_EXPORTER_OUTPUT_DIR|Directory where export process will output their files|✕|output|
|DISCORD_CHAT_EXPORTER_FORMAT|Directory where export process will output their files|✕|HtmlDark|

## Usage

This library use a notion of `Executor`. An executor is there to ease the interaction with the discord chat exporter binary.

Each executor map a specific command. You can retrieve the [command list on the wiki](https://github.com/Tyrrrz/DiscordChatExporter/wiki/GUI%2C-CLI-and-Formats-explained#dcecli-commands) of original tool.

### Executor

For each executor except the `RawExecutor` we inject automatically some option like your `Discord bot token`, `format` and `ouput`.

#### RawExecutor

This executor give you the possibility to build the command yourself.

```ts
const executor = new RawExecutor('export -c CHANNEL_ID -t BOT_TOKEN -b')
```

Read the original wiki to know how to compose your command.

***You need to inject yourself each option in the command.***

#### ExportExecutor

Wrapper for [export](https://github.com/Tyrrrz/DiscordChatExporter/wiki/GUI%2C-CLI-and-Formats-explained#export) command.

```ts
const executor = new ExportExecutor({channel: 'CHANNEL_ID'})
```

For more details about available options see [ExportOptions](https://github.com/Ashk2a/discord-chat-exporter/blob/main/src/options/ExportOptions.ts).