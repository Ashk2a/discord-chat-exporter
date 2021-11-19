export default {
    dotnet: {
        binary: process.env.DOTNET_BIN ?? 'dotnet'
    },
    discord: {
        botToken: process.env.DISCORD_BOT_TOKEN,
        chatExporter: {
            binary: process.env.DISCORD_CHAT_EXPORTER_CLI_BIN ?? __dirname + '/../cli/DiscordChatExporter.Cli.dll',
            defaultOptions: {
                output: process.env.DISCORD_CHAT_EXPORTER_OUTPUT_DIR ?? 'output',
                format: process.env.DISCORD_CHAT_EXPORTER_FORMAT ?? 'HtmlDark'
            }
        }
    },
}