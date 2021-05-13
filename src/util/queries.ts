
export const getAllMails: string = `SELECT * FROM mails`;

export const getAllPendingMails: string = `
    SELECT *
    FROM mails
    WHERE status = 'pending';
`;

export const sendMail: string = `
    UPDATE mails
    SET 
        status = 'sent',
        sent_date = ?
    WHERE
        mail_id = ?
`;

export const archiveMail: string = `
    INSERT INTO sent_mails_archived
    VALUES (
        SELECT 
            mail_id,
            email_ref,
            subject,
            mail_content,
            recipient_email,
            status,
            sent_date
        FROM mails
        WHERE mail_id = ?
    );
`;