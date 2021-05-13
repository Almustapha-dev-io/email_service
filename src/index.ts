import { init } from './services/auto-mail';
import verifyConfig from './util/config';

function run() {    
    verifyConfig();
    init();
}

run();