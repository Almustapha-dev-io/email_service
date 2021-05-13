import Nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

const transportOptions = {
    auth: {
        api_key: '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'
    }
};

export default Nodemailer.createTransport(sendgridTransport(transportOptions));