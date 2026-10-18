const Discord = require("discord.js");

module.exports = {
    name: "nuke",
    aliases: ["purgue"],
    
    async execute(client, message, args) {
        let permisos = message.member.permissions.has("MANAGE_CHANNELS");
        if (!permisos) return message.reply({ content: "Non hai i permessi di MANAGE_CHANNELS!" });
        
        var pocision = message.channel.position;
        message.channel.clone().then(canal => {
            message.channel.delete();
            
            canal.setPosition(pocision);
            
            const embed = new EmbedBuilder()
                .setTitle("☢️ | Canale Nuked")
                .setDescription(`Canale nuked da: ${message.author}`)
                .setColor("Random");
            
            canal.send({ embeds: [embed] });
        });
    }
};