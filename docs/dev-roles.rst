==========
Roles
==========

Mobile client
==========

Opens a simple page with the team name, team color, points. Can be used as a trigger.

Features:

* tap for determining who is faster

* synchronize points, team information

Access:

    localhost:3000/mobile

Main screen
==========

This page is only for following the questions and team points. The page should
not have any interaction, only displaying the current game stats. In the
background it should synchronize with the game.

Features:

* synchronize points, team information, questions

* show the current question

* displays the answer

Access:

    localhost:3000/main

Narrator screen
===============

Used by game narrator to display questions, add points to teams, etc.

Features:

* synchronize points, team information, questions

* show the current question with answer for narrator

* interaction with the game, almost as an admin

Access:

    localhost:3000/narrator



Game editor screen
==================

Page for preparing and editing games.

Features:

* add, delete, modify categories and questions

* assembly and export games

* import and modify games

* overview of the questions and categories

