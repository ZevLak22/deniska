window.COURSE_TOPICS = window.COURSE_TOPICS || [];
COURSE_TOPICS.push({
  id: 'zabava', title: 'Zábava a volný čas', subtitle: 'Koníčky, sport, hudba a párty', emoji: '🎉',
  color: 'linear-gradient(135deg,#C084FC,#FF6FB5)',
  lessons: [
    {
      title: 'Koníčky',
      tip: 'Po **me gusta** může přijít i sloveso v základním tvaru: 💃\n\n**Me gusta bailar** = Ráda tancuju.\n**Me gusta leer** = Ráda čtu.',
      words: [['leer', 'číst'], ['bailar', 'tancovat'], ['cantar', 'zpívat'], ['dibujar', 'kreslit'], ['cocinar', 'vařit'], ['nadar', 'plavat'], ['el tiempo libre', 'volný čas'], ['el libro', 'kniha']],
      sentences: [['Me gusta bailar.', 'Ráda tancuju.'], ['Me gusta mucho leer.', 'Moc ráda čtu.'], ['¿Te gusta cantar?', 'Zpíváš ráda?'], ['En mi tiempo libre dibujo.', 'Ve volném čase kreslím.'], ['Mi madre cocina muy bien.', 'Moje máma vaří moc dobře.']],
    },
    {
      title: 'Sport',
      tip: '**jugar** = hrát (hru, sport). Pozor, je nepravidelné: 🎾\n\n**juego** – hraju\n**juegas** – hraješ\n**juega** – hraje\n\n**Juego al tenis** = Hraju tenis.',
      words: [['el fútbol', 'fotbal'], ['el tenis', 'tenis'], ['juego', 'hraju'], ['correr', 'běhat|běžet'], ['el equipo', 'tým'], ['el partido', 'zápas'], ['el gimnasio', 'posilovna|tělocvična'], ['ganar', 'vyhrát']],
      sentences: [['Juego al tenis.', 'Hraju tenis.'], ['Me gusta correr.', 'Ráda běhám.'], ['¿Vas al gimnasio?', 'Chodíš do posilovny?'], ['Mi equipo gana.', 'Můj tým vyhrává.'], ['El partido es hoy.', 'Zápas je dnes.']],
    },
    {
      title: 'Hudba a filmy',
      tip: '**ver** = vidět / dívat se. 🎬\n\n**veo** – dívám se, **ves** – díváš se\n\n**Veo una película** = Dívám se na film.',
      words: [['la música', 'hudba'], ['la canción', 'písnička|píseň'], ['la película', 'film'], ['el cine', 'kino'], ['la serie', 'seriál'], ['el concierto', 'koncert'], ['veo', 'dívám se|vidím'], ['la tele', 'televize|telka']],
      sentences: [['Veo una película.', 'Dívám se na film.'], ['Escucho una canción.', 'Poslouchám písničku.'], ['¿Te gusta esta serie?', 'Líbí se ti tenhle seriál?'], ['Vamos al cine.', 'Jdeme do kina.'], ['El concierto es el viernes.', 'Koncert je v pátek.']],
    },
    {
      title: 'Zbožňuju!',
      tip: '**Me encanta** = zbožňuju, strašně se mi líbí (silnější než me gusta). 😍\n\n**Mi película favorita** = můj oblíbený film\n**Prefiero…** = Radši mám… / Dávám přednost…',
      words: [['me encanta', 'zbožňuju'], ['odio', 'nesnáším'], ['prefiero', 'radši mám|dávám přednost'], ['favorito', 'oblíbený'], ['aburrido', 'nudný'], ['interesante', 'zajímavý'], ['genial', 'skvělý|super']],
      sentences: [['Me encanta esta canción.', 'Zbožňuju tuhle písničku.'], ['Odio el fútbol.', 'Nesnáším fotbal.'], ['Prefiero el té.', 'Radši mám čaj.'], ['La película es aburrida.', 'Ten film je nudný.'], ['Mi serie favorita es genial.', 'Můj oblíbený seriál je skvělý.']],
    },
    {
      title: 'Víkend',
      tip: '**el fin de semana** = víkend (doslova „konec týdne“). 😴\n\n**por la mañana** = ráno, dopoledne\n**por la tarde** = odpoledne\n**por la noche** = večer, v noci',
      words: [['el fin de semana', 'víkend'], ['descansar', 'odpočívat'], ['dormir', 'spát'], ['salir', 'jít ven|vyrazit'], ['por la tarde', 'odpoledne'], ['por la noche', 'večer|v noci'], ['con amigos', 's kamarády']],
      sentences: [['El fin de semana descanso.', 'O víkendu odpočívám.'], ['Me gusta dormir mucho.', 'Ráda hodně spím.'], ['Salgo con amigos.', 'Jdu ven s kamarády.'], ['Por la tarde leo un libro.', 'Odpoledne čtu knížku.'], ['¿Qué haces el sábado?', 'Co děláš v sobotu?']],
    },
    {
      title: 'Kam jdu',
      tip: 'Sloveso **ir** = jít, jet. Je úplně nepravidelné: 🚶‍♀️\n\n**voy** – jdu\n**vas** – jdeš\n**va** – jde\n**vamos** – jdeme / pojďme!\n\n**a + el = al**: Voy **al** parque.',
      words: [['voy', 'jdu|jedu'], ['vas', 'jdeš|jedeš'], ['va', 'jde|jede'], ['vamos', 'jdeme|pojďme'], ['la playa', 'pláž'], ['el parque', 'park'], ['¿adónde?', 'kam?']],
      sentences: [['Voy a la playa.', 'Jdu na pláž.'], ['¿Adónde vas?', 'Kam jdeš?'], ['Vamos al parque.', 'Jdeme do parku.'], ['Ella va al cine.', 'Ona jde do kina.'], ['¡Vamos!', 'Pojďme!']],
    },
    {
      title: 'Plány',
      tip: 'Budoucnost je snadná! **ir a** + sloveso: 🔮\n\n**Voy a bailar** = Budu tancovat / Jdu tancovat.\n**Vamos a ver** = Uvidíme.\n\n**esta noche** = dnes večer',
      words: [['voy a', 'budu|chystám se'], ['esta noche', 'dnes večer'], ['el plan', 'plán'], ['luego', 'potom|pak'], ['después', 'později|potom'], ['vamos a ver', 'uvidíme'], ['la semana', 'týden']],
      sentences: [['Voy a leer un libro.', 'Budu číst knížku.'], ['Esta noche vamos a bailar.', 'Dnes večer jdeme tancovat.'], ['¿Qué vas a hacer?', 'Co budeš dělat?'], ['Mañana voy a nadar.', 'Zítra jdu plavat.'], ['Luego vamos a cenar.', 'Potom jdeme na večeři.']],
    },
    {
      title: 'Pozvání',
      tip: '**vale** = dobře / ok – Španělé to říkají pořád! 👌\n**claro** = jasně\n**lo siento** = je mi líto / promiň\n**no puedo** = nemůžu',
      words: [['¿quieres…?', 'chceš…?'], ['¿vienes?', 'přijdeš?|jdeš taky?'], ['claro', 'jasně'], ['vale', 'dobře|ok'], ['no puedo', 'nemůžu'], ['lo siento', 'je mi líto|promiň'], ['¿a qué hora?', 'v kolik?']],
      sentences: [['¿Quieres ir al cine?', 'Chceš jít do kina?'], ['¡Claro que sí!', 'No jasně!'], ['Lo siento, no puedo.', 'Promiň, nemůžu.'], ['¿A qué hora?', 'V kolik?'], ['Vale, hasta mañana.', 'Dobře, tak zítra.']],
    },
    {
      title: 'Párty',
      tip: '**¡Feliz cumpleaños!** = Všechno nejlepší k narozeninám! 🎂\n**¡Salud!** = Na zdraví! (při přípitku i když někdo kýchne)',
      words: [['la fiesta', 'párty|oslava'], ['el regalo', 'dárek'], ['la tarta', 'dort'], ['¡feliz cumpleaños!', 'všechno nejlepší!'], ['celebrar', 'slavit|oslavit'], ['los invitados', 'hosté'], ['¡salud!', 'na zdraví!']],
      sentences: [['¡Feliz cumpleaños, hermana!', 'Všechno nejlepší, ségro!'], ['Un regalo para ti.', 'Dárek pro tebe.'], ['La tarta es de chocolate.', 'Dort je čokoládový.'], ['La fiesta es en mi casa.', 'Párty je u mě doma.'], ['Vamos a celebrar.', 'Budeme slavit.']],
    },
    {
      title: 'Mobil a sítě',
      tip: '**el móvil** = mobil 📱\n**Te escribo** = Napíšu ti.\n**Te llamo** = Zavolám ti.\n\n**te** = tobě / tě.',
      words: [['el móvil', 'mobil'], ['el mensaje', 'zpráva'], ['la foto', 'fotka'], ['llamar', 'volat|zavolat'], ['escribir', 'psát|napsat'], ['te llamo', 'zavolám ti'], ['te escribo', 'napíšu ti'], ['el vídeo', 'video']],
      sentences: [['Te escribo un mensaje.', 'Napíšu ti zprávu.'], ['Te llamo mañana.', 'Zavolám ti zítra.'], ['¡Qué foto tan bonita!', 'To je krásná fotka!'], ['Mi móvil no funciona.', 'Můj mobil nefunguje.'], ['Veo vídeos en el móvil.', 'Koukám na videa v mobilu.']],
    },
    {
      title: 'Výlet',
      tip: '**ir de excursión** = jet na výlet 🎒\n**caminar** = jít pěšky, chodit\n\n**Hay que…** = Je potřeba… / Musí se…',
      words: [['la excursión', 'výlet'], ['la montaña', 'hora|hory'], ['el río', 'řeka'], ['el lago', 'jezero'], ['el bosque', 'les'], ['caminar', 'chodit|jít pěšky'], ['la mochila', 'batoh']],
      sentences: [['Vamos de excursión.', 'Jedeme na výlet.'], ['Me gusta caminar por el bosque.', 'Ráda chodím lesem.'], ['El lago es muy bonito.', 'Jezero je moc hezké.'], ['Mi mochila es rosa.', 'Můj batoh je růžový.'], ['Vamos a la montaña.', 'Jedeme na hory.']],
    },
    { title: 'Zkouška: Zábava', exam: true },
  ],
});
