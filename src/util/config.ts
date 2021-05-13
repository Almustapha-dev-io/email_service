import config from 'config';

const verifyConfig = () => {
    if (!config.get('sendgridApiKey')) {
        console.error('FATAL ERROR: sendgrid API key undefined');
        process.exit(1);
    }

    if (!config.get('dispatchEmail')) {
        console.error('FATAL ERROR: dispatch email undefined');
        process.exit(1);
    }
};

export default verifyConfig;