window.COURSE_TOPICS = window.COURSE_TOPICS || [];
COURSE_TOPICS.push({
  id: 'jidlo', title: 'Jídlo a restaurace', subtitle: 'Objednej si jako místní', emoji: '🍽️',
  color: 'linear-gradient(135deg,#FFA36F,#FF6F91)',
  lessons: [
    {
      title: 'Jídlo',
      tip: 'Španělé jedí hodně pozdě! Oběd kolem **14:00** a večeře klidně ve **21:00** nebo později. 🍽️\n\nU jídla se taky učíme rod: **el** pan, **la** carne.',
      words: [['el pan', 'chléb|chleba'], ['el queso', 'sýr'], ['el huevo', 'vejce'], ['la carne', 'maso'], ['el pescado', 'ryba'], ['el arroz', 'rýže'], ['la pasta', 'těstoviny'], ['la comida', 'jídlo']],
      sentences: [['El pan y el queso.', 'Chleba a sýr.'], ['La carne o el pescado.', 'Maso nebo ryba.'], ['Arroz con huevo.', 'Rýže s vejcem.'], ['La comida es muy buena.', 'Jídlo je moc dobré.'], ['Pasta con queso, por favor.', 'Těstoviny se sýrem, prosím.']],
    },
    {
      title: 'Pití',
      tip: '**con** = s, **sin** = bez.\n\n**café con leche** = káva s mlékem ☕\n**agua sin gas** = voda bez bublinek',
      words: [['el agua', 'voda'], ['el café', 'káva'], ['el té', 'čaj'], ['la leche', 'mléko'], ['el zumo', 'džus'], ['el vino', 'víno'], ['con', 's|se'], ['sin', 'bez']],
      sentences: [['Un café con leche.', 'Káva s mlékem.'], ['Agua sin gas, por favor.', 'Voda bez bublinek, prosím.'], ['Un té sin azúcar.', 'Čaj bez cukru.'], ['Zumo de naranja.', 'Pomerančový džus.'], ['Un vino tinto, por favor.', 'Červené víno, prosím.']],
    },
    {
      title: 'Ovoce a zelenina',
      tip: '**de** často znamená „z“ nebo dělá přídavné jméno:\n\n**zumo de manzana** = jablečný džus (džus z jablek) 🍎\n**ensalada de tomate** = rajčatový salát',
      words: [['la manzana', 'jablko'], ['el plátano', 'banán'], ['la naranja', 'pomeranč'], ['la fresa', 'jahoda'], ['el tomate', 'rajče'], ['la patata', 'brambora'], ['la ensalada', 'salát'], ['la fruta', 'ovoce']],
      sentences: [['Una manzana roja.', 'Červené jablko.'], ['Me gusta la fruta.', 'Mám ráda ovoce.'], ['Una ensalada de tomate.', 'Rajčatový salát.'], ['Fresas con chocolate.', 'Jahody s čokoládou.'], ['El plátano es amarillo.', 'Banán je žlutý.']],
    },
    {
      title: 'Jím a piju',
      tip: 'Slovesa na **-er** (comer = jíst, beber = pít):\n\nyo com**o** – jím\ntú com**es** – jíš\nél/ella com**e** – jí\nnosotros com**emos** – jíme',
      words: [['como', 'jím'], ['comes', 'jíš'], ['come', 'jí'], ['bebo', 'piju'], ['bebes', 'piješ'], ['siempre', 'vždycky|vždy'], ['nunca', 'nikdy'], ['mucho', 'hodně']],
      sentences: [['Como pan con queso.', 'Jím chleba se sýrem.'], ['¿Qué bebes?', 'Co piješ?'], ['Bebo mucha agua.', 'Piju hodně vody.'], ['Nunca como carne.', 'Nikdy nejím maso.'], ['Mi hermano siempre come pizza.', 'Můj bratr vždycky jí pizzu.']],
    },
    {
      title: 'Co mám ráda',
      tip: '**Me gusta** = líbí se mi / chutná mi / mám rád(a). 😍\n\nKdyž jde o víc věcí, je to **me gustan**: Me gusta**n** las fresas.\n\n**¿Te gusta?** = Líbí se ti? Chutná ti?',
      words: [['me gusta', 'mám ráda|líbí se mi|chutná mi'], ['no me gusta', 'nemám ráda|nechutná mi'], ['me gustan', 'mám ráda (víc věcí)'], ['¿te gusta?', 'chutná ti?|líbí se ti?'], ['el chocolate', 'čokoláda'], ['el helado', 'zmrzlina'], ['la pizza', 'pizza'], ['el dulce', 'sladkost']],
      sentences: [['Me gusta el chocolate.', 'Mám ráda čokoládu.'], ['No me gusta el pescado.', 'Nemám ráda ryby.'], ['Me gustan las fresas.', 'Mám ráda jahody.'], ['¿Te gusta el helado?', 'Máš ráda zmrzlinu?'], ['Me gusta mucho la pizza.', 'Pizzu mám moc ráda.']],
    },
    {
      title: 'V kavárně',
      tip: '**por favor** = prosím (když něco chceš) 🙏\n**¿Algo más?** = Ještě něco?\n**Nada más, gracias** = Nic dalšího, děkuji.',
      words: [['por favor', 'prosím'], ['el camarero', 'číšník'], ['la camarera', 'servírka'], ['el azúcar', 'cukr'], ['la tostada', 'topinka|toast'], ['¿algo más?', 'ještě něco?'], ['nada más', 'nic dalšího|nic víc'], ['la cafetería', 'kavárna']],
      sentences: [['Un café, por favor.', 'Kávu, prosím.'], ['¿Algo más?', 'Ještě něco?'], ['Nada más, gracias.', 'Nic dalšího, děkuji.'], ['Una tostada con tomate.', 'Topinka s rajčetem.'], ['El camarero es muy simpático.', 'Číšník je moc milý.']],
    },
    {
      title: 'Objednávka',
      tip: '**Quiero** = chci. Zdvořileji: **Quisiera** = chtěla bych. 💁‍♀️\n\n**Para mí…** = Pro mě…\n**La carta** = jídelní lístek.',
      words: [['quiero', 'chci'], ['quisiera', 'chtěla bych|chtěl bych'], ['para mí', 'pro mě'], ['la carta', 'jídelní lístek'], ['el menú del día', 'denní menu'], ['el plato', 'jídlo|talíř'], ['el postre', 'dezert'], ['de postre', 'jako dezert']],
      sentences: [['Quiero una pizza.', 'Chci pizzu.'], ['Quisiera la carta, por favor.', 'Chtěla bych jídelní lístek, prosím.'], ['Para mí, el pescado.', 'Pro mě rybu.'], ['De postre, un helado.', 'Jako dezert zmrzlinu.'], ['¿Qué quieres beber?', 'Co chceš pít?']],
    },
    {
      title: 'U stolu',
      tip: '**¡Buen provecho!** = Dobrou chuť! 😋\n**¡Qué rico!** = To je dobrota!\n\n**¡Qué…!** je super na vyjádření emocí: ¡Qué bonito! = To je krásné!',
      words: [['la mesa', 'stůl'], ['la silla', 'židle'], ['el tenedor', 'vidlička'], ['el cuchillo', 'nůž'], ['la cuchara', 'lžíce'], ['la servilleta', 'ubrousek'], ['¡qué rico!', 'to je dobrota!'], ['¡buen provecho!', 'dobrou chuť!']],
      sentences: [['Una mesa para dos, por favor.', 'Stůl pro dva, prosím.'], ['¡Buen provecho!', 'Dobrou chuť!'], ['¡Qué rico!', 'To je dobrota!'], ['No tengo tenedor.', 'Nemám vidličku.'], ['¿Una servilleta, por favor?', 'Ubrousek, prosím?']],
    },
    {
      title: 'Účet a placení',
      tip: '**La cuenta, por favor** = Účet, prosím. 🧾\n**¿Cuánto cuesta?** = Kolik to stojí?\n\nZaplatit můžeš **con tarjeta** (kartou) nebo **en efectivo** (hotově).',
      words: [['la cuenta', 'účet'], ['¿cuánto cuesta?', 'kolik to stojí?'], ['el euro', 'euro'], ['pagar', 'zaplatit|platit'], ['con tarjeta', 'kartou'], ['en efectivo', 'hotově'], ['la propina', 'spropitné']],
      sentences: [['La cuenta, por favor.', 'Účet, prosím.'], ['¿Cuánto cuesta el café?', 'Kolik stojí káva?'], ['Son diez euros.', 'Je to deset eur.'], ['¿Puedo pagar con tarjeta?', 'Můžu zaplatit kartou?'], ['Pago en efectivo.', 'Platím hotově.']],
    },
    {
      title: 'Snídaně, oběd, večeře',
      tip: 'Hlad a žízeň se ve španělštině **mají**: 🍳\n\n**Tengo hambre** = Mám hlad\n**Tengo sed** = Mám žízeň',
      words: [['el desayuno', 'snídaně'], ['el almuerzo', 'oběd'], ['la cena', 'večeře'], ['desayunar', 'snídat'], ['cenar', 'večeřet'], ['tengo hambre', 'mám hlad'], ['tengo sed', 'mám žízeň']],
      sentences: [['Tengo mucha hambre.', 'Mám velký hlad.'], ['¿Qué hay para cenar?', 'Co je k večeři?'], ['Desayuno a las ocho.', 'Snídám v osm.'], ['Tengo sed, quiero agua.', 'Mám žízeň, chci vodu.'], ['La cena es a las nueve.', 'Večeře je v devět.']],
    },
    {
      title: 'Na trhu',
      tip: '**barato** = levný, **caro** = drahý. 🛒\n\n**medio kilo** = půl kila\n**¿Me da…?** = Dáte mi…? (zdvořilá prosba v obchodě)',
      words: [['el mercado', 'trh'], ['el kilo', 'kilo'], ['medio', 'půl'], ['la botella', 'láhev|flaška'], ['la bolsa', 'taška|sáček'], ['barato', 'levný'], ['caro', 'drahý'], ['fresco', 'čerstvý']],
      sentences: [['Un kilo de tomates, por favor.', 'Kilo rajčat, prosím.'], ['¿Me da medio kilo de fresas?', 'Dáte mi půl kila jahod?'], ['Es muy barato.', 'Je to moc levné.'], ['El pescado está muy fresco.', 'Ryba je moc čerstvá.'], ['Una botella de agua.', 'Láhev vody.']],
    },
    { title: 'Zkouška: Jídlo', exam: true },
  ],
});
