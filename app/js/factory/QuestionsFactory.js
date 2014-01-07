'use strict';

jeporadyModule.factory('gamesession', function($http, $log) {
        var gamesession = [{
            displayName: 'Állatos mesék',
            questions: [
                {
                    "id": 10001,
                    "question": "Lajhár, mamut, kardfogú tigris, motkány",
                    "answer": "Jégkorszak",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10002,
                    "question": "Tyúk, béka, kacsa, kutya, róka, liba",
                    "answer": "Vuk",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10003,
                    "question": "Kígyó, daru, majom, szöcske, panda",
                    "answer": "Kung Fu Panda",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10003,
                    "question": "Szamár, kutya, macska, kakas",
                    "answer": "Bérmai muzsikusok",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10003,
                    "question": "Medve, farkas, tigris, fekete párduc",
                    "answer": "A dzsungel könyve",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10003,
                    "question": "Darázs, kakas",
                    "answer": "Kiskakas és a gyémánt félkrajcár",
                    "comment": "",
                    "answered": false
                }

            ]
        },{
            displayName: 'Csomók',
            questions: [
                {
                    "id": 10001,
                    "question": "Egyszerű kettős",
                    "answer": "",
                    "image": "img/allohurok.png",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10002,
                    "question": "Svábhurok",
                    "image": "img/svabhurok.jpg",
                    "answer": "",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10003,
                    "question": "Ívelt kettős",
                    "image": "img/ivelt_kettos.png",
                    "answer": "",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10004,
                    "question": "Szorító nyolcas",
                    "image": "img/szorito_nyolcas.jpg",
                    "answer": "",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10005,
                    "question": "Állóhurok (Sárkányhurok)",
                    "image": "img/allohurok.png",
                    "answer": "",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10006,
                    "question": "Sátorfeszítő",
                    "image": "img/satorfeszito.jpg",
                    "answer": "",
                    "comment": "",
                    "answered": false
                }

            ]
        },{
            displayName: 'Fővárosok',
            questions: [
                {
                    "id": 10001,
                    "question": "Belgrád magyar neve?",
                    "answer": "Nándorfehérvár",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10002,
                    "question": "Budapest kerületeink a száma?",
                    "answer": "23",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10003,
                    "question": "New York közkedvelt megnevezése.",
                    "answer": "Bigg Apple / Nagy Alma",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10004,
                    "question": "Párizs lakossága.",
                    "answer": "2.243.833 / 2-3 millió",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10005,
                    "question": "Ebben a fővárosban hunyt el Wolfgang Amadeus Mozart.",
                    "answer": "Bécs",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10006,
                    "question": "Canberra melyik ország fővárosa?",
                    "answer": "Ausztrália",
                    "comment": "",
                    "answered": false
                }

            ]
        },{
            displayName: 'Találd ki',
            questions: [
                {
                    "id": 10001,
                    "question": "Ugrik - pedig lába nincsen, röpül - pedig szárnya sincsen, mindig pufók, kerek arca piros, sárga, kék, vagy tarka. Mi az?",
                    "answer": "Labda",
                    "comment": "",
                },{
                    "id": 10002,
                    "question": "Ha feldobom fehér, ha leesik sárga. Mi az? ",
                    "answer": "Tojás",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10003,
                    "question": "Híd, de sosem építették, hét színe van, egy se festék. Földbõl nyúlik mindkét vége, mégis felvezet az égbe. Senki nem szed rajta vámot, széles útját mégse járod, mert a hídfõt nem találod. Mi az? ",
                    "answer": "Szivárvány",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10004,
                    "question": "Három szép nyulat lõtt két fiú és két apa, mégis egy egészet vitt mindegyik haza. Hogy lehet ez? ",
                    "answer": "Hárman voltak: nagyapa, apa, fia.",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10005,
                    "question": "Milyen kavicsból van a legtöbb a patakban?",
                    "answer": "Vizesből",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10006,
                    "question": "Uralkodik mindenhol, veszekedik akárhol. Falun ébresztõóra, városban jó vacsora. Mi az? ",
                    "answer": "Kakas",
                    "comment": "",
                    "answered": false
                }

            ]
        },{
            displayName: 'Idősebb',
            questions: [
                {
                    "id": 10001,
                    "question": "Vonat vagy autó",
                    "answer": "Vonat",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10002,
                    "question": "T-Rex vagy Steganosaurus",
                    "answer": "Steganosaurus",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10003,
                    "question": "Mátrix első része vagy Gyűrűk ura első része",
                    "answer": "Mátrix (1999)",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10004,
                    "question": "Árpád vezér vagy Géza fejedelem",
                    "answer": "Árpád vezér",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10005,
                    "question": "Keresztény vagy iszlám",
                    "answer": "Keresztény",
                    "comment": "",
                    "answered": false
                },{
                    "id": 10006,
                    "question": "Mobiltelefon vagy internet",
                    "answer": "Mobiltelefon",
                    "comment": "",
                    "answered": false
                }

            ]
        }];
        return gamesession;
    });
