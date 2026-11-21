window.COURSE_TOPICS = window.COURSE_TOPICS || [];
COURSE_TOPICS.push({
  id: 'nakupovani', title: 'Nakupování', subtitle: 'Oblečení, ceny a dárky', emoji: '🛍️',
  color: 'linear-gradient(135deg,#FF6F91,#FF9671)',
  lessons: [
    {
      title: 'Oblečení',
      tip: 'Některé věci jsou ve španělštině v množném čísle, stejně jako u nás: **los pantalones** = kalhoty. 👗\n\n**llevo** = mám na sobě / nosím.',
      words: [['la ropa', 'oblečení'], ['la camiseta', 'tričko'], ['los pantalones', 'kalhoty'], ['el vestido', 'šaty'], ['la falda', 'sukně'], ['los zapatos', 'boty'], ['la chaqueta', 'bunda|sako'], ['el jersey', 'svetr']],
      sentences: [['Llevo una camiseta rosa.', 'Mám na sobě růžové tričko.'], ['Me gusta este vestido.', 'Líbí se mi tyhle šaty.'], ['Los zapatos son nuevos.', 'Boty jsou nové.'], ['Una falda y un jersey.', 'Sukně a svetr.'], ['Necesito ropa nueva.', 'Potřebuju nové oblečení.']],
    },
    {
      title: 'Velikost a střih',
      tip: '**la talla** = velikost (oblečení) 📏\n**¿Qué talla usas?** = Jakou nosíš velikost?\n\n**cómodo** = pohodlný – nejdůležitější slovo při nakupování bot! 👟',
      words: [['la talla', 'velikost'], ['¿qué talla usas?', 'jakou nosíš velikost?'], ['corto', 'krátký'], ['largo', 'dlouhý'], ['ancho', 'široký|volný'], ['estrecho', 'úzký|těsný'], ['cómodo', 'pohodlný'], ['mediano', 'střední']],
      sentences: [['Uso la talla mediana.', 'Nosím střední velikost.'], ['La falda es muy corta.', 'Sukně je moc krátká.'], ['Los pantalones son largos.', 'Kalhoty jsou dlouhé.'], ['Estos zapatos son cómodos.', 'Tyhle boty jsou pohodlné.'], ['¿Qué talla usas?', 'Jakou nosíš velikost?']],
    },
    {
      title: 'Ceny',
      tip: 'Velká čísla: **cien** (100), **doscientos** (200), **quinientos** (500), **mil** (1000). 💶\n\n**cuesta** = stojí (jedna věc)\n**cuestan** = stojí (víc věcí)',
      words: [['el precio', 'cena'], ['cuesta', 'stojí'], ['cuestan', 'stojí (víc věcí)'], ['doscientos', 'dvě stě'], ['quinientos', 'pět set'], ['mil', 'tisíc'], ['la oferta', 'akce|nabídka'], ['las rebajas', 'výprodej|slevy']],
      sentences: [['¿Cuánto cuesta la camiseta?', 'Kolik stojí to tričko?'], ['Cuesta veinte euros.', 'Stojí dvacet eur.'], ['¿Cuánto cuestan los zapatos?', 'Kolik stojí ty boty?'], ['Hay rebajas en enero.', 'V lednu jsou slevy.'], ['Es una buena oferta.', 'Je to dobrá nabídka.']],
    },
    {
      title: 'Tohle a tamto',
      tip: '**este / esta** = tento / tato (blízko mě) 👇\n**ese / esa** = ten / ta (dál od mě) 👉\n**estos / estas** = tihle / tyhle\n\n**Me llevo este** = Vezmu si tenhle.',
      words: [['este', 'tento|tenhle'], ['esta', 'tato|tahle'], ['ese', 'ten|tamten'], ['esa', 'ta|tamta'], ['estos', 'tyhle|tihle'], ['¿cuál?', 'který?|která?'], ['me llevo', 'vezmu si']],
      sentences: [['¿Cuál te gusta?', 'Který se ti líbí?'], ['Me gusta esta falda.', 'Líbí se mi tahle sukně.'], ['Ese vestido es caro.', 'Tamty šaty jsou drahé.'], ['Me llevo estos zapatos.', 'Vezmu si tyhle boty.'], ['¿Cuánto cuesta esa chaqueta?', 'Kolik stojí tamta bunda?']],
    },
    {
      title: 'V obchodě',
      tip: 'Když tě prodavačka osloví a ty se jen díváš, řekni: **Solo estoy mirando, gracias.** 👀\n\n**abierto** = otevřeno, **cerrado** = zavřeno.',
      words: [['la tienda', 'obchod'], ['la dependienta', 'prodavačka'], ['el dependiente', 'prodavač'], ['¿te puedo ayudar?', 'můžu ti pomoct?'], ['solo estoy mirando', 'jen se dívám'], ['abierto', 'otevřený|otevřeno'], ['cerrado', 'zavřený|zavřeno'], ['el centro comercial', 'nákupní centrum']],
      sentences: [['¿Te puedo ayudar?', 'Můžu ti pomoct?'], ['Solo estoy mirando, gracias.', 'Jen se dívám, děkuji.'], ['La tienda está cerrada.', 'Obchod je zavřený.'], ['¿Está abierto el domingo?', 'Je otevřeno v neděli?'], ['Vamos al centro comercial.', 'Jdeme do nákupního centra.']],
    },
    {
      title: 'Zkoušení',
      tip: '**Me queda bien** = Sedí mi / padne mi. 🪞\n**Me queda grande** = Je mi to velké.\n**Me queda pequeño** = Je mi to malé.\n\n**el probador** = zkušební kabinka.',
      words: [['el probador', 'kabinka|zkušební kabinka'], ['¿puedo probarlo?', 'můžu si to vyzkoušet?'], ['me queda bien', 'sedí mi|padne mi'], ['me queda grande', 'je mi to velké'], ['otro', 'jiný|další'], ['más grande', 'větší'], ['más pequeño', 'menší']],
      sentences: [['¿Dónde está el probador?', 'Kde je zkušební kabinka?'], ['Me queda muy bien.', 'Sedí mi moc dobře.'], ['Me queda grande.', 'Je mi to velké.'], ['¿Tiene una talla más pequeña?', 'Máte menší velikost?'], ['Quiero otro color.', 'Chci jinou barvu.']],
    },
    {
      title: 'Srovnávání',
      tip: 'Porovnávání: ⚖️\n\n**más … que** = víc … než → más caro que = dražší než\n**menos … que** = méně … než\n\nNepravidelné: **mejor** = lepší, **peor** = horší.',
      words: [['más', 'víc|více'], ['menos', 'méně|míň'], ['que', 'než'], ['mejor', 'lepší'], ['peor', 'horší'], ['igual', 'stejný|stejně'], ['el más caro', 'nejdražší']],
      sentences: [['Este es más caro que ese.', 'Tenhle je dražší než tamten.'], ['La falda es más bonita.', 'Sukně je hezčí.'], ['Este color es mejor.', 'Tahle barva je lepší.'], ['Es menos caro.', 'Je to levnější.'], ['Son iguales.', 'Jsou stejné.']],
    },
    {
      title: 'Dárky',
      tip: '**para ti** = pro tebe 🎁\n**para mi madre** = pro moji mámu\n\n**¿Me lo envuelve para regalo?** = Zabalíte mi to jako dárek?',
      words: [['el collar', 'náhrdelník'], ['los pendientes', 'náušnice'], ['el anillo', 'prsten'], ['el perfume', 'parfém'], ['el bolso', 'kabelka'], ['para ti', 'pro tebe'], ['para regalo', 'jako dárek']],
      sentences: [['Este collar es para ti.', 'Tenhle náhrdelník je pro tebe.'], ['Busco un regalo para mi madre.', 'Hledám dárek pro mámu.'], ['¿Me lo envuelve para regalo?', 'Zabalíte mi to jako dárek?'], ['Me encantan los pendientes.', 'Zbožňuju ty náušnice.'], ['El bolso es muy bonito.', 'Kabelka je moc hezká.']],
    },
    {
      title: 'Vrácení a výměna',
      tip: '**devolver** = vrátit (zboží) 🔄\n**cambiar** = vyměnit\n**el ticket** = účtenka\n\n**Quiero devolver esto** = Chci tohle vrátit.',
      words: [['devolver', 'vrátit'], ['cambiar', 'vyměnit'], ['el ticket', 'účtenka'], ['roto', 'rozbitý|roztržený'], ['no funciona', 'nefunguje'], ['el dinero', 'peníze'], ['esto', 'tohle|toto']],
      sentences: [['Quiero devolver esto.', 'Chci tohle vrátit.'], ['¿Puedo cambiar la talla?', 'Můžu vyměnit velikost?'], ['Aquí está el ticket.', 'Tady je účtenka.'], ['La chaqueta está rota.', 'Bunda je roztržená.'], ['No funciona.', 'Nefunguje to.']],
    },
    { title: 'Zkouška: Nakupování', exam: true },
  ],
});
