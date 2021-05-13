// Go into mail DB and fetch pending mails
// Loop through result and send mail
// on success, UPDATE mails table and INSERT sent mail to sent_mail_archived
import Moment from 'moment';
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
        let [rows] = await db.execute(getAllPendingMails);  // Fetch All Pending Mails    
        let mails: IMail[] = Object.values(rows);   //  Get rows and store in memory

        if (mails.length === 0) return; // No pending mails return and wait for next cycle

        // Loop through mails
        for (let mail of mails) {
            let mailId = mail.mail_id;
            let sentDate = getDateTime();
            console.log(mail.mail_id);
            
            // SEND MAIL
            try {
                await mailTransporter.sendMail({
                    to: mail.recipient_email,
                    from: 'almustaphamuha98@gmail.com',
                    subject: mail.subject,
                    html: `<p>${mail.mail_content}</p>`
                });
            } catch (err) {
                console.error(err);
                continue;
            }            

            // UPDATE TABLE
            await db.execute(sendMail, [sentDate, mailId]);

            // ARCHIVE MAIL
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
    }, 1000 * 10);
};