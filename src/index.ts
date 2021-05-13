import { init } from './services/auto-mail';
import verifyConfig from './util/config';

function run() {
    
    verifyConfig();

    console.log(`Email Service Started...`, '\n');
    init();
}

run();