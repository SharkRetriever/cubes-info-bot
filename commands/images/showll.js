const ShowCommandBase = require('./showcommand-base.js');

class ShowLLCommand extends ShowCommandBase {
    constructor(client) {
        super(client, 'showll', ['ll', 'llcase'], 'LL', false,
              ["showll R U R' U' R U2 R'", "ll 5 U R U' L' U R' U' L"], '&stage=ll&view=plan');
    }
};

module.exports = ShowLLCommand;
