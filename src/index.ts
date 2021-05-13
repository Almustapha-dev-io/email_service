import db from './util/db';
import { getAllMails } from './util/queries';

db.execute(getAllMails).then(([r]) => {
    const results = Object.values(r);
    console.log(results[0]);
});
