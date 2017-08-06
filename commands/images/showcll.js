const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Constants = require('../../constants.json');

class ShowCLLCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'showcll',
            aliases: ['cll', 'cllcase', 'eg', 'egcase', 'll2'],
            group: 'images',
            memberName: 'showcll',
            description: `Takes in a set of turns and shows the CLL/EG case on the 2x2x2`,
            examples: ["ShowCLL R U R' U R U2 R'", "CLL F R U R' U' F'"],
            args: [
                {
                    key: 'moves',
                    prompt: 'What moves form the case?',
                    type: 'string'
                }
            ]
        });
    }

    
    getSize(moves, defaultSize) {
        let splitMoves = moves.split(' ');
        if (splitMoves.length >= 1) {
            const firstMoveNum = parseInt(splitMoves[0]);
            if (isNaN(firstMoveNum)) {
                return { size: defaultSize, newMoves: splitMoves.join('') };
            }
            else {
                splitMoves.shift();
                return { size: firstMoveNum, newMoves: splitMoves.join('') };
            }
        }
    }


    run(msg, args) {
        const { moves } = args;

        let { size: givenSize, newMoves: newMoves } = this.getSize(moves, Constants.DEFAULT_SIZE);

        if (typeof(givenSize) === 'number') {
            return msg.say("Error: This command can only be used on the 2x2x2. Do not specify the size. Please try again or use another command like CMLL instead.");
        }

        let url = `http://stachu.cubing.net/v/visualcube.php?fmt=png&size=300&pzl=2&case=${newMoves}&view=plan`;

        try {
            const embed = new RichEmbed().setImage(url);
            return msg.embed(embed);
        } 
        catch (err) {
            return msg.say("Error: Invalid input. Please try again");
        }
    }
};

module.exports = ShowCLLCommand;
