const ShowCommandBase = require('./showcommand-base.js');

class ShowCMLLCommand extends ShowCommandBase {
    constructor(client) {
        super(client, 'showcmll', ['cmll', 'cmllcase'], 'CMLL', true,
              ["showcmll R U R' U' R U2 R'", "cmll U R U' L' U R' U' L"], '&stage=cmll&view=plan');
    }
};

module.exports = ShowCMLLCommand;
