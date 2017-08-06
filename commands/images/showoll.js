const ShowCommandBase = require('./showcommand-base.js');

class ShowOLLCommand extends ShowCommandBase {
    constructor(client) {
        super(client, 'showoll', ['oll', 'ollcase'], 'OLL', true,
              ["showoll R U R' U' R U2 R'", "oll 5 U R U' L' U R' U' L"], '&stage=oll&view=plan');
    }
};

module.exports = ShowOLLCommand;
