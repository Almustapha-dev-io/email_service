
import Moment from 'moment';
import config from 'config';

import db from '../util/db';
import mailTransporter from '../util/mailer';
import { getAllPendingMails, sendMail, archiveMail } from '../util/queries';
import { IMail } from '../models/mail-model';

const interval = 1000 * 60 * 5; //  Every 5 minutes

function getDateTime(): string {
    return Moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
}


const dispatchMails = async () => {
    try {
        let [rows] = await db.execute(getAllPendingMails);
        let mails: IMail[] = Object.values(rows);

        if (mails.length === 0) return;

        for (let mail of mails) {
            let mailId = mail.mail_id;
            let sentDate = getDateTime();
            
            try {
                await mailTransporter.sendMail({
                    to: mail.recipient_email,
                    from: config.get('dispatchEmail'),
                    subject: mail.subject,
                    html: `<p>${mail.mail_content}</p>`
                });
            } catch (err) {
                console.error(err);
                continue;
            }            

            await db.execute(sendMail, [sentDate, mailId]);
            await db.execute(archiveMail, [mailId]);

            console.log(`Email sent to ====> ${mail.recipient_email}`);
            console.log(`Mail archived!!`, '\n');
        }
    } catch (err) {
        console.error(err);
    }
};

export const init = () => {
    dispatchMails();
    setInterval(() => {
        dispatchMails();
    }, interval);
};