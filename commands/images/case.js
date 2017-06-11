const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

const MIN_SIZE = 2;
const MAX_SIZE = 7;

class CaseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'case',
            group: 'images',
            memberName: 'case',
            description: `Takes in a size of puzzle (${MIN_SIZE}-${MAX_SIZE}), followed by a set of turns and shows the case on the given size puzzle`,
            examples: ["case 3 f2l R U R' U'", "case 5 ll R U R' U R U2 R'"],
            args: [
                {
                    key: 'size',
                    prompt: 'What size of puzzle?',
                    type: 'integer',
                    validate: size => {
                        const intSize = parseInt(size);
                        if (!isNaN(intSize) && MIN_SIZE <= intSize && intSize <= MAX_SIZE) return true;
                        return `Invalid puzzle size (can only be ${MIN_SIZE} to ${MAX_SIZE})`;
                    }
                },
                {
                    key: 'stage',
                    prompt: 'What stage?',
                    type: 'string',
                    validate: stage => {
                        const stages = "fl | f2l | ll | cll | ell | oll | ocll | oell | coll | ocell | wv | vh | els | cls | cmll | cross | f2l_3 | f2l_2 | f2l_sm | f2l_1 | f2b | line | 2x2x2 | 2x2x3".split(" | ");
                        let valid = false;
                        stages.forEach(function (pstage) {
                            if (stage.startsWith(pstage))
                                valid = true;
                        });
                        if (valid) return true;
                        return "Invalid and/or missing stage mask. Did you forget to specify the view?";
                    }
                },
                {
                    key: 'moves',
                    prompt: 'What are the moves to apply?',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, args) {
        const { size, stage, moves } = args;

        const strippedCase = moves.split(' ').join('');
        let url = `http://stachu.cubing.net/v/visualcube.php?fmt=png&size=300&case=${strippedCase}&pzl=${size}`;

        if (!(stage === "all" || stage === "general")) {
            url += `&stage=${stage}`;
        }

        if (stage.indexOf('ll') !== -1) {
            url += '&view=plan';
        }

        try {
            const embed = new RichEmbed().setImage(url);
            return msg.embed(embed);
        } 
        catch (err) {
            return msg.say("Error: Invalid input. Please try again");
        }
    }
};

module.exports = CaseCommand;
