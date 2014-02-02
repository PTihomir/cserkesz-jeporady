Install next packages:

* npm install -g grunt-cli
* npm install -g karma

First time local node modules should be downloaded. Run:

    npm install


These are the used node-modules:

* karma-mocha
* mocha
* grunt-contrib-watch
* grunt-contrib-jshint
* grunt-simple-mocha
* grunt-karma
* grunt-contrib-nodeunit
* grunt-contrib-uglify
* should


Everybody should exclude from commit these modules. Go to .git/info/exclude file and add to the end

    node_modules/*
