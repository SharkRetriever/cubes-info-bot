const ShowCommandBase = require('./showcommand-base.js');

class ShowPLLCommand extends ShowCommandBase {
    constructor(client) {
        super(client, 'showpll', ['pll', 'pllcase'], 'PLL', true,
              ["showpll M2 U M2 U2 M2 U M2", "PLL M2 U M2 U M' U2 M2 U2 M' U2"], '&stage=pll&view=plan');
    }
};

module.exports = ShowPLLCommand;
