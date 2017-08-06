const ShowCommandBase = require('./showcommand-base.js');

class ShowPLLCommand extends ShowCommandBase {
    constructor(client) {
        super(client, 'showpll', ['pll', 'pllcase'], 'PLL', true,
              ["showpll M2 U M2 U2 M2 U M2", "pll 4 R2 r2 U2 R2 r2 u2 R2 r2 U2 u2"], '&stage=pll&view=plan');
    }
};

module.exports = ShowPLLCommand;
