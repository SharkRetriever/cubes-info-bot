const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Constants = require('../../constants.json');

// do not directly instantiate
// should be used only by other command classes in this directory
class ShowCommandBase extends Command {
    constructor(client, commandName, commandAliases, caseName, isValidForRegularSizeOnly, givenExamples, urlExtension) {
        super(client, {
            name: String(commandName),
            aliases: (commandAliases == null) ? [] : Array.from(commandAliases),
            group: 'images',
            memberName: String(commandName),
            description: isValidForRegularSizeOnly ? `Takes in a set of turns and shows the ${caseName} case on the 3x3x3` : `Takes in an optional size of puzzle (${Constants.MIN_SIZE}-${Constants.MAX_SIZE}, default ${Constants.DEFAULT_SIZE}), followed by a set of turns, and shows the ${caseName} case on the given size puzzle`,
            examples: (givenExamples == null) ? [] : Array.from(givenExamples),
            args: [
                {
                    key: 'moves',
                    prompt: 'What moves form the case?' + (isValidForRegularSizeOnly ? '' : ' If a number is specified as the first "move" it represents the size of the puzzle.'),
                    type: 'string'
                }
            ]
        });

        this.urlExtension = urlExtension;
        this.isValidForRegularSizeOnly = isValidForRegularSizeOnly;
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

        if (typeof(givenSize) === 'number' && this.isValidForRegularSizeOnly) {
            return msg.say("Error: This command can only be used on the 3x3x3. Do not specify the size. Please try again or use the Show or LL commands instead.");
        }

        if (typeof(givenSize) === 'number' && (!(Constants.MIN_SIZE <= givenSize && givenSize <= Constants.MAX_SIZE) || this.isValidForRegularSizeOnly && givenSize !== 3)) {
           return msg.say("Error: Invalid size. Please try again."); 
        }

        let url = `http://stachu.cubing.net/v/visualcube.php?fmt=png&size=300&pzl=${givenSize}&case=${newMoves}${this.urlExtension}`;

        try {
            const embed = new RichEmbed().setImage(url);
            return msg.embed(embed);
        } 
        catch (err) {
            return msg.say("Error: Invalid input. Please try again");
        }
    }
};

module.exports = ShowCommandBase;
