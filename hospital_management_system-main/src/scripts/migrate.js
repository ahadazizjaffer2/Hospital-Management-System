const { mainDbInstance } = require('../config');
const models = require('../models');

const syncOption = { force: true };

const mainDbMigrate = async () => {
    try {
        await mainDbInstance.authenticate();

        console.log('\n Synchronizing the main database...\n');

        await mainDbInstance.drop();
        await mainDbInstance.sync(syncOption);

        console.log('\nAll models in main database were synchronized successfully.\n');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

const migrate = () => {
    const message = 'Are you sure you want to force the migration?';
    process.stdout.write(`${message} (y/n): `);
    // if the user confirms the action, then we will proceed with the migration
    // otherwise we will exit the process
    process.stdin.once('data', async (data) => {
        const input = data.toString().trim();
        if (input === 'y' || input === 'yes') await Promise.all([mainDbMigrate()]);
        else console.log('Migration cancelled');
        process.exit(0);
    });
};

migrate();
