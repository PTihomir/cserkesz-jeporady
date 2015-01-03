==========
Jeporady
==========

Overview
==========

This web application is developed for creating a tool to play jeporady game with scouts.

Features::

* Something


How to run
==========

In the project a simple node-js server is included.

On Linux run::

    ./scripts/run-server.sh

or::

    node ./bin/web-server.js [PORT] [Number of teams]



On Windows run::

    node ./bin/web-server.js

For the manager run::

    ./scripts/run-manager.sh


How to play the game
====================

One server should run on an accessible computer. Clients are connected to this
server. There are couple of different clients.

Narrator: preferably used on tablet and is opened by the person who manages the
game.

Main screen: this is the main game page, which should be visible for all players.
Open on the computer which screen is projected to the wall.

Mobile screen: WORK IN PROGRESS. It will be used on mobile phones and will
be used to trigger the answering.


Jeporady manager
================

There are couple of entities in the application.

Database: this consist all the possible categories and questions. For now it is
placed in the file::

    ./database/database.json

Games: in these files are saved the constructed games. They are placed in::

    ./database/games/<filename>.json

Snapshots: in these files are the already running games. They are used mostly to preserv the actual games. These files are placed in:

    ./database/snapshots/<filename>.json


How to contribute
=================

Please fork the project and if you want to add something, then just send a pull request.
