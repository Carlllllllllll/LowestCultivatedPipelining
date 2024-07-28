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
            emoji = ':broken_heart:'; // Broken heart
            gif = 'https://images-ext-1.discordapp.net/external/po76_eNYEFsJ9RWErghJnyR-o-nR1LT5kECUroBTlk0/%3Fitemid%3D9844035/https/media1.tenor.com/images/dd3f777e5c4e2feb8f2ae0fe3f542f87/tenor.gif'; // Gif for low percentage
            message = "Maybe this ship is not meant to sail... :broken_heart:";
        } else if (shipPercentage <= 50) {
            color = '#FFA500'; // Orange
            emoji = ':orange_heart:'; // Orange heart
            gif = 'https://images-ext-1.discordapp.net/external/mJf4nUU_R8QhX0FCbwqDkBIl1-HvwwgJqiIyxZKLOrg/https/media.tenor.com/wLkOwpo-ZUsAAAPo/hearts-laughing.mp4'; // Gif for medium-low percentage
            message = "There's some potential here... :orange_heart:";
        } else if (shipPercentage <= 75) {
            color = '#FFFF00'; // Yellow
            emoji = ':yellow_heart:'; // Yellow heart
            gif = 'https://images-ext-1.discordapp.net/external/Q8CoyBXAlUudBLQugDJlWR1jZ6CIm3HRuAMUOtbcMg8/https/media1.tenor.com/m/c5HaEnWzTIgAAAAC/peach-goma-peach.gif'; // Gif for medium-high percentage
            message = "Looking good! There's definitely a spark! :yellow_heart:";
        } else {
            color = '#00FF00'; // Green
            emoji = ':green_heart:'; // Green heart
            gif = 'https://media.giphy.com/media/26tknCqiJrBQG6bxC/giphy.gif'; // Gif for high percentage
            message = "It's a match made in heaven! :green_heart:";
        }

        const embed = new EmbedBuilder()
            .setTitle('Ship rate')
            .setDescription(`${user1.username} ❤ ${user2.username}`)
            .addFields(
                { name: 'Ship Percentage', value: `${shipPercentage}%` },
                { name: 'Message', value: message }
            )
            .setColor(color)
            .setImage(gif)
            .setFooter({ text: `This ship rate is just for fun 😃` });

        await interaction.reply({ 
            content: `The ship percentage between ${user1.username} and ${user2.username} is ${shipPercentage}%!`, 
            embeds: [embed] 
        });
    }
};
