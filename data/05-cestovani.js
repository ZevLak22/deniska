window.COURSE_TOPICS = window.COURSE_TOPICS || [];
COURSE_TOPICS.push({
  id: 'cestovani', title: 'Cestování', subtitle: 'Letiště, hotel, město a pláž', emoji: '✈️',
  color: 'linear-gradient(135deg,#5EC8F2,#8B7CFF)',
  lessons: [
    {
      title: 'Doprava',
      tip: 'Dopravním prostředkem se jede **en**: **en tren** = vlakem, **en coche** = autem. 🚆\n\nAle pěšky je **a pie**.',
      words: [['el coche', 'auto'], ['el autobús', 'autobus'], ['el tren', 'vlak'], ['el avión', 'letadlo'], ['el metro', 'metro'], ['la bicicleta', 'kolo'], ['en coche', 'autem'], ['a pie', 'pěšky']],
      sentences: [['Voy en tren.', 'Jedu vlakem.'], ['Vamos en avión.', 'Letíme letadlem.'], ['Voy al trabajo a pie.', 'Chodím do práce pěšky.'], ['¿Dónde está el metro?', 'Kde je metro?'], ['El autobús es azul.', 'Autobus je modrý.']],
    },
    {
      title: 'Na letišti',
      tip: '**el billete** = jízdenka i letenka 🎫\n**la puerta** = dveře, ale na letišti i „gate“ (brána).\n**facturar la maleta** = odbavit kufr.',
      words: [['el aeropuerto', 'letiště'], ['el pasaporte', 'pas'], ['la maleta', 'kufr'], ['el vuelo', 'let'], ['la puerta', 'dveře|brána'], ['el billete', 'jízdenka|letenka'], ['facturar', 'odbavit']],
      sentences: [['Aquí está mi pasaporte.', 'Tady je můj pas.'], ['Mi maleta es rosa.', 'Můj kufr je růžový.'], ['¿Dónde está la puerta cinco?', 'Kde je brána pět?'], ['El vuelo es a las diez.', 'Let je v deset.'], ['Quiero facturar la maleta.', 'Chci odbavit kufr.']],
    },
    {
      title: 'V hotelu',
      tip: '**Tengo una reserva** = Mám rezervaci. 🏨\n**la habitación** = pokoj (pozor, ne „habitace“!)\n**¿A qué hora es el desayuno?** = V kolik je snídaně?',
      words: [['el hotel', 'hotel'], ['la habitación', 'pokoj'], ['la llave', 'klíč'], ['la reserva', 'rezervace'], ['la recepción', 'recepce'], ['el ascensor', 'výtah'], ['la ducha', 'sprcha']],
      sentences: [['Tengo una reserva.', 'Mám rezervaci.'], ['Una habitación para dos noches.', 'Pokoj na dvě noci.'], ['Aquí tiene la llave.', 'Tady máte klíč.'], ['¿Dónde está el ascensor?', 'Kde je výtah?'], ['La ducha no funciona.', 'Sprcha nefunguje.']],
    },
    {
      title: 'Kudy kam',
      tip: '**a la izquierda** = vlevo ⬅️\n**a la derecha** = vpravo ➡️\n**todo recto** = pořád rovně ⬆️\n\n**¿Está cerca?** = Je to blízko?',
      words: [['a la izquierda', 'vlevo|doleva'], ['a la derecha', 'vpravo|doprava'], ['todo recto', 'rovně'], ['cerca', 'blízko'], ['lejos', 'daleko'], ['la calle', 'ulice'], ['la esquina', 'roh']],
      sentences: [['¿Dónde está el hotel?', 'Kde je hotel?'], ['Está a la derecha.', 'Je to vpravo.'], ['Todo recto y a la izquierda.', 'Rovně a doleva.'], ['¿Está lejos?', 'Je to daleko?'], ['No, está muy cerca.', 'Ne, je to moc blízko.']],
    },
    {
      title: 'Ve městě',
      tip: 'Hodně slov poznáš: **el museo, el banco, el restaurante**. 🏙️\n\n**la plaza** = náměstí (každé španělské město má svou Plaza Mayor!)',
      words: [['la ciudad', 'město'], ['el centro', 'centrum'], ['la plaza', 'náměstí'], ['el museo', 'muzeum'], ['la iglesia', 'kostel'], ['el restaurante', 'restaurace'], ['el banco', 'banka|lavička'], ['la farmacia', 'lékárna']],
      sentences: [['Madrid es una ciudad grande.', 'Madrid je velké město.'], ['Vamos al centro.', 'Jdeme do centra.'], ['El museo está en la plaza.', 'Muzeum je na náměstí.'], ['La iglesia es muy bonita.', 'Kostel je moc hezký.'], ['¿Hay una farmacia cerca?', 'Je tu blízko lékárna?']],
    },
    {
      title: 'Je tu…?',
      tip: '**hay** = je / jsou (něco někde existuje). Čte se „aj“. 📍\n\n**¿Hay un baño aquí?** = Je tu záchod?\n**No hay** = Není / Nejsou.',
      words: [['hay', 'je tu|jsou tu'], ['¿hay…?', 'je tu…?'], ['no hay', 'není tu|nejsou'], ['el baño', 'záchod|koupelna'], ['el supermercado', 'supermarket'], ['la gente', 'lidé'], ['cerca de aquí', 'tady blízko']],
      sentences: [['¿Hay un baño aquí?', 'Je tu záchod?'], ['Hay mucha gente.', 'Je tu hodně lidí.'], ['No hay leche.', 'Není mléko.'], ['¿Hay un supermercado cerca de aquí?', 'Je tady blízko supermarket?'], ['En la plaza hay un café.', 'Na náměstí je kavárna.']],
    },
    {
      title: 'Mapa a místa',
      tip: 'Světové strany: **el norte** (sever), **el sur** (jih), **el este** (východ), **el oeste** (západ). 🧭\n\n**el país** = země, stát.',
      words: [['el mapa', 'mapa'], ['la estación', 'nádraží'], ['la parada', 'zastávka'], ['el país', 'země|stát'], ['la isla', 'ostrov'], ['el norte', 'sever'], ['el sur', 'jih']],
      sentences: [['¿Tienes un mapa?', 'Máš mapu?'], ['La estación está en el centro.', 'Nádraží je v centru.'], ['España es un país bonito.', 'Španělsko je krásná země.'], ['Vamos a una isla.', 'Jedeme na ostrov.'], ['Sevilla está en el sur.', 'Sevilla je na jihu.']],
    },
    {
      title: 'Jízdenky',
      tip: '**ida y vuelta** = zpáteční (tam i zpátky) 🎟️\n**solo ida** = jen tam\n**sale** = odjíždí, **llega** = přijíždí\n**el andén** = nástupiště',
      words: [['ida y vuelta', 'zpáteční|tam a zpět'], ['solo ida', 'jen tam|jednosměrná'], ['sale', 'odjíždí'], ['llega', 'přijíždí|přijede'], ['el andén', 'nástupiště'], ['el horario', 'jízdní řád'], ['tarde', 'pozdě|odpoledne'], ['temprano', 'brzy']],
      sentences: [['Un billete de ida y vuelta.', 'Zpáteční jízdenka.'], ['¿A qué hora sale el tren?', 'V kolik odjíždí vlak?'], ['El tren llega tarde.', 'Vlak má zpoždění.'], ['Sale del andén tres.', 'Odjíždí z nástupiště tři.'], ['Solo ida, por favor.', 'Jen tam, prosím.']],
    },
    {
      title: 'Problém na cestě',
      tip: 'Nejdůležitější věty, když se něco pokazí: 🆘\n\n**No entiendo** = Nerozumím\n**Más despacio, por favor** = Pomaleji, prosím\n**Estoy perdida** = Ztratila jsem se',
      words: [['no entiendo', 'nerozumím'], ['más despacio', 'pomaleji'], ['¿puede repetir?', 'můžete to zopakovat?'], ['estoy perdida', 'ztratila jsem se'], ['¡ayuda!', 'pomoc!'], ['la policía', 'policie'], ['no encuentro', 'nemůžu najít']],
      sentences: [['Perdón, no entiendo.', 'Promiňte, nerozumím.'], ['Más despacio, por favor.', 'Pomaleji, prosím.'], ['¿Puede repetir, por favor?', 'Můžete to zopakovat, prosím?'], ['Estoy perdida.', 'Ztratila jsem se.'], ['No encuentro mi pasaporte.', 'Nemůžu najít pas.']],
    },
    {
      title: 'Pláž a moře',
      tip: '**me baño** = koupu se 🏖️\n\n**hace sol** = svítí slunce\n**la crema solar** = opalovací krém – ve Španělsku ho budeš potřebovat! ☀️',
      words: [['el mar', 'moře'], ['la arena', 'písek'], ['el sol', 'slunce'], ['la toalla', 'ručník|osuška'], ['la crema solar', 'opalovací krém'], ['me baño', 'koupu se'], ['las gafas de sol', 'sluneční brýle'], ['la ola', 'vlna']],
      sentences: [['Me baño en el mar.', 'Koupu se v moři.'], ['El agua está fría.', 'Voda je studená.'], ['¿Dónde está mi toalla?', 'Kde je můj ručník?'], ['Necesito crema solar.', 'Potřebuju opalovací krém.'], ['Me encanta el mar.', 'Zbožňuju moře.']],
    },
    {
      title: 'Pozdrav domů',
      tip: 'Na konci zprávy nebo pohlednice Španělé píšou **Besos** (pusy) nebo **Un abrazo** (objímám). 💌\n\n**Te echo de menos** = Stýská se mi po tobě.',
      words: [['la postal', 'pohlednice'], ['querida', 'milá|drahá'], ['un beso', 'pusa'], ['un abrazo', 'objetí'], ['te echo de menos', 'stýská se mi po tobě'], ['saludos', 'pozdravy|zdravím'], ['¡hasta pronto!', 'brzy ahoj!|brzy na viděnou!']],
      sentences: [['Querida mamá:', 'Milá mami,'], ['Saludos desde España.', 'Pozdravy ze Španělska.'], ['Lo estoy pasando genial.', 'Skvěle si to užívám.'], ['Te echo de menos.', 'Stýská se mi po tobě.'], ['Un beso, ¡hasta pronto!', 'Pusa, brzy ahoj!']],
    },
    { title: 'Zkouška: Cestování', exam: true },
  ],
});
