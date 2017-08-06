const ShowCommandBase = require('./showcommand-base.js');

class ShowF2LCommand extends ShowCommandBase {
    constructor(client) {
        super(client, 'showf2l', ['f2l', 'f2lcase'], 'F2L', true,
              ["showf2l U R U2 R'"], '&stage=f2l');
    }
};

module.exports = ShowF2LCommand;
