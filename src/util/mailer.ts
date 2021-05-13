import Nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

const transportOptions = {
    auth: {
        api_key: '<Your API KEY>'
    }
};

export default Nodemailer.createTransport(sendgridTransport(transportOptions));