module.exports = {
    apps: [

        {
            name: 'blogend',
            // script: 'npm run  ',
            env: {
                COMMON_VARIABLE: 'true'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },
    ],

    deploy: {
        production: {
           // SSH key path, default to $HOME/.ssh
           key: '~/.ssh/id_rsa',
           // SSH options with no command-line flag, see 'man ssh'
           // can be either a single string or an array of strings
            ssh_options: "StrictHostKeyChecking=no",
            user: 'Garen',
            host: 'www.garener.com',
            ref: 'origin/master',
            repo: 'git@github.com:AbsenceSliet/blog-node.git',
            path: '/www/blog_node/production',
            "pre-setup" : "echo 'commands or local script path to be run on the host before the setup process starts'",
            'post-deploy': 'rm -rf node_modules &&  yarn && yarn build:pro  && pm2 reload ecosystem.config.js --env production'
        },
    }
};