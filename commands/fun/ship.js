const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

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

        // Determine color, emoji, gif, and message based on percentage
        let color, emoji, gif, message;
        if (shipPercentage <= 25) {
            color = '#FF0000'; // Red
            emoji = '💔'; // Broken heart
            gif = 'https://media.giphy.com/media/3o6MbdhGh7dB6P5CJW/giphy.gif'; // Gif for low percentage
            message = "Maybe this ship is not meant to sail... 💔";
        } else if (shipPercentage <= 50) {
            color = '#FFA500'; // Orange
            emoji = '🧡'; // Orange heart
            gif = 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif'; // Gif for medium-low percentage
            message = "There's some potential here... 🧡";
        } else if (shipPercentage <= 75) {
            color = '#FFFF00'; // Yellow
            emoji = '💛'; // Yellow heart
            gif = 'https://media.giphy.com/media/l4pTdcifTHxP2JNNu/giphy.gif'; // Gif for medium-high percentage
            message = "Looking good! There's definitely a spark! 💛";
        } else {
            color = '#00FF00'; // Green
            emoji = '💚'; // Green heart
            gif = 'https://media.giphy.com/media/26tknCqiJrBQG6bxC/giphy.gif'; // Gif for high percentage
            message = "It's a match made in heaven! 💚";
        }

        const embed = new EmbedBuilder()
            .setTitle('Ship Calculator')
            .setDescription(`${user1.username} ❤ ${user2.username}`)
            .addFields(
                { name: 'Ship Percentage', value: `${shipPercentage}%` },
                { name: 'Message', value: message }
            )
            .setColor(color)
            .setImage(gif)
            .setFooter({ text: `Fun command: ${emoji}` });

        await interaction.reply({ 
            content: `The ship percentage between ${user1.username} and ${user2.username} is ${shipPercentage}%!`, 
            embeds: [embed] 
        });
    }
};
