import { init } from './services/auto-mail';

function run() {
    console.log(`Email Service Started...`, '\n');
    init();
}

run();