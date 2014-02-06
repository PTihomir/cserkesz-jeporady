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

    narrator ------ gameSelected -----> server
                    {
                        gameId
                        snapshotName
                    }


Server updates narrator screen::

    narrator <----- update ----- server
                    {
                        game
                        teams
                    }

    narrator ------ teamChanged -----> server
                    {
                        id
                        point
                        name
                    }

    narrator ------ questionUpdated ----> server
                    {
                        id
                        answered
                    }

