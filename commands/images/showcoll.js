const ShowCommandBase = require('./showcommand-base.js');

class ShowCOLLCommand extends ShowCommandBase {
    constructor(client) {
        super(client, 'showcoll', ['coll', 'collcase'], 'COLL', true,
              ["showcoll R U R' U' R U2 R'", "COLL U R U' L' U R' U' L"], '&stage=coll&view=plan');
    }
};

module.exports = ShowCOLLCommand;
