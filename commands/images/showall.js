const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Constants = require('../../constants.json');
const ShowCommandHelper = require('./showcommand-helper.js');

class ShowAllCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'showall',
            aliases: ['show', 'showgeneral', 'case'],
            group: 'images',
            memberName: 'showall',
            description: `Takes in an optional size of puzzle (${Constants.MIN_SIZE}-${Constants.MAX_SIZE}, default ${Constants.DEFAULT_SIZE}), followed by a set of turns, and shows the case on the given size puzzle`,
            examples: ["showall R U R' U'", "Show 5 R U2 R'"],
            args: [
                {
                    key: 'moves',
                    prompt: 'What moves form the case? If a number is specified as the first "move" it represents the size of the puzzle.',
                    type: 'string'
                }
            ]
        });
    }


    run(msg, args) {
        const { moves } = args;

        let { size: givenSize, newMoves: newMoves } = ShowCommandHelper.getSize(moves, Constants.DEFAULT_SIZE);

        if (typeof(givenSize) === 'number' && !(Constants.MIN_SIZE <= givenSize && givenSize <= Constants.MAX_SIZE)) {
           return msg.say("Error: Invalid size. Please try again.");
        }

        let url = `http://stachu.cubing.net/v/visualcube.php?fmt=png&size=${Constants.DISPLAY_SIZE}&pzl=${givenSize}&case=${newMoves}`;

        try {
            const embed = new RichEmbed().setImage(url);
            return msg.embed(embed);
        }
        catch (err) {
            return msg.say("Error: Invalid input. Please try again");
        }
    }
};

module.exports = ShowAllCommand;
