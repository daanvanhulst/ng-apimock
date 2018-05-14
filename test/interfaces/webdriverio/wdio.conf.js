const path = require('path');

exports.config = {
    default_directory: '/tmp',
    specs: [
        path.join(__dirname, '..', '*.feature')
    ],
    capabilities: [
        {
            browserName: 'chrome',
            chromeOptions: {
                args: ['--no-sandbox', '--test-type=browser'],
                prefs: {
                    'download': {
                        'prompt_for_download': false,
                        'directory_upgrade': true,
                        'default_directory': '/tmp'
                    }
                }
            }
        }
    ],
    sync: false,
    baseUrl: 'http://localhost:9900/',
    framework: 'cucumber',
    cucumberOpts: {
        require: [path.join(__dirname, 'step_definitions/*.steps.js')],
        format: ['summary']
    },
    onPrepare: () => {
        const child_process = require('child_process');
        server = child_process.spawn('node',
            [path.join(process.cwd(), 'test/apps/angular/serve.js')],
            {cwd: process.cwd(), stdio: 'inherit'});

        process.on('exit', () => server.kill());
    },
    before: async () => {
        const chai = require('chai');
        chai.use(require('chai-as-promised'));
        global.chai = chai;
        global.expect = chai.expect;
        global.client = await require(path.join(process.cwd(), 'dist', 'interfaces', 'interfaces')).webdriverio;
    },
    onComplete: () => {
        server.kill();
    }
};