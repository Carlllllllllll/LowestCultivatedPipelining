const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Calculate the ship percentage between two users.')
        .addUserOption(option => 
            option.setName('user1')
                .setDescription('First user to ship')
                .setRequired(true))
        .addUserOption(option => 
            option.setName('user2')
                .setDescription('Second user to ship')
                .setRequired(true)),
    async execute(interaction) {
        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');

        const shipPercentage = Math.floor(Math.random() * 101); // Generate a random percentage between 0 and 100

        // Determine color based on percentage
        let color;
        if (shipPercentage <= 25) {
            color = '#FF0000'; // Red
        } else if (shipPercentage <= 50) {
            color = '#FFA500'; // Orange
        } else if (shipPercentage <= 75) {
            color = '#FFFF00'; // Yellow
        } else {
            color = '#00FF00'; // Green
        }

        // Determine emoji based on percentage
        let emoji;
        if (shipPercentage <= 25) {
            emoji = '💔'; // Broken heart
        } else if (shipPercentage <= 50) {
            emoji = '🧡'; // Orange heart
        } else if (shipPercentage <= 75) {
            emoji = '💛'; // Yellow heart
        } else {
            emoji = '💚'; // Green heart
        }

        const embed = new MessageEmbed()
            .setTitle('Ship Calculator')
            .setDescription(`${user1.username} ❤ ${user2.username}`)
            .addField('Ship Percentage', `${shipPercentage}%`)
            .setColor(color)
            .setFooter({ text: `Fun command: ${emoji}` });

        await interaction.reply({ embeds: [embed] });
    }
};
