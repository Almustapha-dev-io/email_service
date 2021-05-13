import Nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import config from 'config';

const transportOptions = {
    auth: {
        api_key: config.get('sendgridApiKey')
    }
};

export default Nodemailer.createTransport(sendgridTransport(transportOptions));