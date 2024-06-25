const NodeEnvironment = require('jest-environment-node');
const { sequelize } = require('../models');

class CustomEnvironment extends NodeEnvironment {
    async setup() {
        await super.setup();
    }

    async teardown() {
        await sequelize.close();
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = CustomEnvironment;


