const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

const MIN_SIZE = 2;
const MAX_SIZE = 7;

class ScrambleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'scramble',
            group: 'images',
            memberName: 'scramble',
            description: `Takes in a size of puzzle (${MIN_SIZE}-${MAX_SIZE}), followed by a mandatory set of turns and applies them to a solved puzzle of the given size`,
            examples: ["scramble 3 R U R' U'", "scramble 5 2R U 2R' 2U'"],
            args: [
                {
                    key: 'size',
                    prompt: 'What size of puzzle?',
                    type: 'integer',
                    validate: size => {
                        let intSize = parseInt(size);
                        if (!isNaN(intSize) && MIN_SIZE <= intSize && intSize <= MAX_SIZE) return true;
                        return `Invalid puzzle size (can only be ${MIN_SIZE} to ${MAX_SIZE})`;
                    }
                },
                {
                    key: 'scramble',
                    prompt: 'What are the moves to apply?',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, args) {
        const { size, scramble } = args;

        const stripped_scramble = scramble.split(' ').join('');
        const url = `http://stachu.cubing.net/v/visualcube.php?fmt=png&size=300&alg=${stripped_scramble}&pzl=${size}`

        const embed = new RichEmbed().setImage(url);
        return msg.embed(embed);
    }
};

module.exports = ScrambleCommand;
