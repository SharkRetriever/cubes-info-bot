const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Constants = require('../../constants.json');
const ShowCommandHelper = require('./showcommand-helper.js');

class ScrambleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'scramble',
            group: 'images',
            memberName: 'scramble',
            description: `Takes in an optional size of puzzle (${Constants.MIN_SIZE}-${Constants.MAX_SIZE}, default ${Constants.DEFAULT_SIZE}), followed by a set of turns, and applies them to a solved puzzle of the given size`,
            examples: ["scramble R U R' U'", "scramble 5 2R U 2R' 2U'"],
            args: [
                {
                    key: 'scramble',
                    prompt: 'What moves form the scramble? If a number is specified as the first "move" it represents the size of the puzzle.',
                    type: 'string'
                }
            ]
        });
    }


    run(msg, args) {
        const { size, scramble } = args;

        let { size: givenSize, newMoves: newMoves } = ShowCommandHelper.getSize(scramble, Constants.DEFAULT_SIZE);

        if (typeof(givenSize) === 'number' && !(Constants.MIN_SIZE <= givenSize && givenSize <= Constants.MAX_SIZE)) {
           return msg.say("Error: Invalid size. Please try again.");
        }

        const url = `http://stachu.cubing.net/v/visualcube.php?fmt=png&size=${Constants.DISPLAY_SIZE}&alg=${newMoves}&pzl=${givenSize}`

        const embed = new RichEmbed().setImage(url);
        return msg.embed(embed);
    }
};

module.exports = ScrambleCommand;
