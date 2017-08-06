const ShowCommandBase = require('./showcommand-base.js');

class ShowAllCommand extends ShowCommandBase {
    constructor(client) {
        super(client, 'showall', ['show', 'showgeneral', 'case'], '',
              ["showall R U R' U'", "showall 5 R U2 R'"], '');
    }
};

module.exports = ShowAllCommand;
