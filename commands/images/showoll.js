const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Constants = require('../../constants.json');
const ShowCommandHelper = require('./showcommand-helper.js');

class ShowOLLCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'showoll',
            aliases: ['oll', 'ollcase'],
            group: 'images',
            memberName: 'showoll',
            description: `Takes in a set of turns and shows the OLL case on the 3x3x3`,
            examples: ["showoll R U R' U' R U2 R'", "OLL U R U' L' U R' U' L"],
            args: [
                {
                    key: 'moves',
                    prompt: 'What moves form the case?',
                    type: 'string'
                }
            ]
        });
    }


    run(msg, args) {
        const { moves } = args;

        let { size: givenSize, newMoves: newMoves } = ShowCommandHelper.getSize(moves, Constants.DEFAULT_SIZE);

        if (typeof(givenSize) === 'number') {
            return msg.say("Error: This command can only be used on the 3x3x3. Do not specify the size. Please try again or use the Show or LL commands instead.");
        }

        let url = `http://stachu.cubing.net/v/visualcube.php?fmt=png&size=${Constants.DISPLAY_SIZE}&pzl=${givenSize}&case=${newMoves}&stage=oll&view=plan`;

        try {
            const embed = new RichEmbed().setImage(url);
            return msg.embed(embed);
        }
        catch (err) {
            return msg.say("Error: Invalid input. Please try again");
        }
    }
};

module.exports = ShowOLLCommand;
