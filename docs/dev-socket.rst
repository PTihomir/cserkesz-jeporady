==========
Narrator
==========

Select which game to play (new game):

    narrator ------ gameSelected -----> server
                    {
                        gameId
                        snapshotName
                    }

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

