const ShowCommandBase = require('./showcommand-base.js');

class ShowWVCommand extends ShowCommandBase {
    constructor(client) {
        super(client, 'showwv', ['wv', 'wvcase'], 'WV', true,
              ["showwv U R U2 R'"], '&stage=wv&view=plan');
    }
};

module.exports = ShowWVCommand;
