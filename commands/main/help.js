module.exports = {
    name: "menu",
    alias: ["help","?"],
    desc: "List all command",
    type: "main",
    start: async(killua, m, { commands, args, prefix, text, toUpper }) => {
        const { pushName, sender } = m
        if (args[0]) {
            let data = []
            let name = args[0].toLowerCase()
            let cmd = commands.get(name) || Array.from(commands.values()).find((v) => v.alias.includes(name))
            if (!cmd || cmd.type == "hide") return m.reply("No Command Found")
            else data.push(`*Command :* ${cmd.name.replace(/^\w/, c => c.toUpperCase())}`)
            if (cmd.alias) data.push(`*Alias :* ${cmd.alias.join(", ")}`)
            if (cmd.use) data.push(`*Use:* ${cmd.use}`);
            if (cmd.desc) data.push(`*Description :* ${cmd.desc}\n`)
            if (cmd.example) data.push(`*Example :* ${cmd.example.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}`)
            return m.reply(`*Info Command ${cmd.name.replace(/^\w/, c => c.toUpperCase())}*\n\n${data.join("\n")}`)
        } else {
            let teks = `Hello, ${pushName === undefined ? sender.split("@")[0] : pushName}\nBerikut adalah Daftar Perintah\n\n`

            for (let type of commands.type) {
                teks += `┌─⫸ *${toUpper(type)} Menu*\n`
                teks += `│\n`
                teks += `${commands.list[type].filter(v => v.type !== "hide").map((cmd) => `│⭔ ${prefix + cmd.name} ${cmd.use ? " " + cmd.use : ""}`).join("\n")}\n`
                teks += `│\n`
                teks += `└───────⫸\n\n`
            }

            teks += `ketik ${prefix}help diikuti dengan nama perintah untuk mendapatkan rincian perintah, ex: ${prefix}help sticker`;
            
            let templateButtons = [
                {index: 1, urlButton: { displayText: "Owner", url: "https://t.me/JustRex" }},
                {index: 2, urlButton: { displayText: "Channel Support", url: "https://t.me/tirexgugel" }},
                {index: 3, quickReplyButton: {displayText: 'Ini adalah balasan, seperti tombol normal!', id: 'id-like-buttons-message'}},
            ]

            let templateMessage = {
                image: { url: 'https://graph.org/file/a385d0b59946065bf5ece.jpg' },
                caption: teks,
                footer: config.footer,
                templateButtons: templateButtons
            }

            killua.sendMessage(m.from, templateMessage, { quoted: m })
        }
    },
    noLimit: true,
}
