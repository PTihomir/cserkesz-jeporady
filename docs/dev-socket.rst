==========
Narrator
==========

Select which game to play (new game)::

    narrator ------ gameSelected -----> server
                    {
                        gameId
                        snapshotName
                    }

Select which snapshot to load (continue game)::

    narrator ------ snapshotSelected -----> server
                    {
                        snapshotId
                    }


Server updates narrator screen::

    narrator <----- update ----- server
                    {
                        game
                        teams
                    }

Send team changes to server screen::

    narrator ------ teamChanged -----> server
                    {
                        id
                        point
                        name
                        operation [update, add, remove]
                    }

    narrator ------ questionUpdated ----> server
                    {
                        id
                        answered
                    }

