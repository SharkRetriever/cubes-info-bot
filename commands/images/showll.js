const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Constants = require('../../constants.json');
const ShowCommandHelper = require('./showcommand-helper.js');

class ShowLLCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'showll',
            aliases: ['ll', 'llcase'],
            group: 'images',
            memberName: 'showll',
            description: `Takes in an optional size of puzzle (${Constants.MIN_SIZE}-${Constants.MAX_SIZE}, default ${Constants.DEFAULT_SIZE}), followed by a set of turns, and shows the LL case on the given size puzzle`,
            examples: ["showll R U R' U' R U2 R'", "LL 5 U R U' L' U R' U' L"],
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

        let url = `http://stachu.cubing.net/v/visualcube.php?fmt=png&size=${Constants.DISPLAY_SIZE}&pzl=${givenSize}&case=${newMoves}&view=plan&stage=ll`;

        try {
            const embed = new RichEmbed().setImage(url);
            return msg.embed(embed);
        }
        catch (err) {
            return msg.say("Error: Invalid input. Please try again");
        }
    }
};

module.exports = ShowLLCommand;
