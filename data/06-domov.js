window.COURSE_TOPICS = window.COURSE_TOPICS || [];
COURSE_TOPICS.push({
  id: 'domov', title: 'Domov a den', subtitle: 'Byt, rutina, škola a práce', emoji: '🏠',
  color: 'linear-gradient(135deg,#FFB65C,#FF7E9F)',
  lessons: [
    {
      title: 'Byt a pokoje',
      tip: '**la casa** = dům, ale i domov. **en casa** = doma. 🏡\n**el piso** = byt (ve Španělsku).\n\n**Mi casa es tu casa** = Můj dům je tvůj dům – klasika!',
      words: [['la casa', 'dům|domov'], ['el piso', 'byt'], ['la cocina', 'kuchyně'], ['el dormitorio', 'ložnice|pokoj'], ['el salón', 'obývák'], ['el jardín', 'zahrada'], ['la ventana', 'okno'], ['la terraza', 'terasa']],
      sentences: [['Mi casa es tu casa.', 'Můj dům je tvůj dům.'], ['El piso tiene tres dormitorios.', 'Byt má tři ložnice.'], ['Estoy en la cocina.', 'Jsem v kuchyni.'], ['El salón es muy grande.', 'Obývák je moc velký.'], ['Abre la ventana, por favor.', 'Otevři okno, prosím.']],
    },
    {
      title: 'Nábytek',
      tip: 'Pozor na falešné kamarády! 🪤\n\n**la carpeta** = složka, ne koberec. Koberec je **la alfombra**.\n**la nevera** = lednice.',
      words: [['la cama', 'postel'], ['el sofá', 'gauč|pohovka'], ['el armario', 'skříň'], ['la lámpara', 'lampa'], ['el espejo', 'zrcadlo'], ['la nevera', 'lednice'], ['la alfombra', 'koberec'], ['la estantería', 'police|knihovna']],
      sentences: [['Mi cama es muy cómoda.', 'Moje postel je moc pohodlná.'], ['El gato está en el sofá.', 'Kočka je na gauči.'], ['La leche está en la nevera.', 'Mléko je v lednici.'], ['Hay un espejo grande.', 'Je tam velké zrcadlo.'], ['Los libros están en la estantería.', 'Knihy jsou v knihovně.']],
    },
    {
      title: 'Moje ráno',
      tip: 'Hodně ranních činností má **me** – „se“: ⏰\n\n**me levanto** = vstávám (zvedám se)\n**me ducho** = sprchuju se\n**me visto** = oblékám se\n\n**primero… luego…** = nejdřív… potom…',
      words: [['me levanto', 'vstávám'], ['me ducho', 'sprchuju se'], ['me visto', 'oblékám se'], ['me acuesto', 'jdu spát|lehám si'], ['primero', 'nejdřív|nejprve'], ['todos los días', 'každý den'], ['a las siete', 'v sedm']],
      sentences: [['Me levanto a las siete.', 'Vstávám v sedm.'], ['Primero me ducho.', 'Nejdřív se osprchuju.'], ['Luego desayuno.', 'Potom snídám.'], ['Me visto y voy a clase.', 'Obléknu se a jdu do školy.'], ['Me acuesto a las once.', 'Chodím spát v jedenáct.']],
    },
    {
      title: 'Myju se a češu',
      tip: 'Zvratná slovesa mají zájmeno podle osoby: 🪥\n\n**me** lavo – myju se\n**te** lavas – myješ se\n**se** lava – myje se\n\nČásti těla mají člen, ne „můj“: Me lavo **los** dientes = Čistím si zuby.',
      words: [['me lavo', 'myju se'], ['los dientes', 'zuby'], ['el pelo', 'vlasy'], ['me peino', 'češu se'], ['me maquillo', 'líčím se'], ['me despierto', 'probouzím se|budím se'], ['las manos', 'ruce']],
      sentences: [['Me lavo los dientes.', 'Čistím si zuby.'], ['Me lavo las manos.', 'Myju si ruce.'], ['Me peino el pelo.', 'Češu si vlasy.'], ['¿A qué hora te despiertas?', 'V kolik se probouzíš?'], ['Mi hermana se maquilla.', 'Moje sestra se líčí.']],
    },
    {
      title: 'Domácí práce',
      tip: '**hacer** = dělat, ale i ustlat: **hacer la cama** = ustlat postel. 🧹\n\n**fregar los platos** = mýt nádobí\n**sacar la basura** = vynést odpadky',
      words: [['limpiar', 'uklízet|čistit'], ['lavar la ropa', 'prát prádlo'], ['fregar los platos', 'mýt nádobí'], ['hacer la cama', 'ustlat postel'], ['sacar la basura', 'vynést odpadky'], ['ayudar', 'pomáhat|pomoct'], ['la aspiradora', 'vysavač']],
      sentences: [['Hoy limpio la casa.', 'Dnes uklízím dům.'], ['¿Me ayudas, por favor?', 'Pomůžeš mi, prosím?'], ['Mi hermano friega los platos.', 'Můj bratr myje nádobí.'], ['Hago la cama todos los días.', 'Každý den stelu postel.'], ['¿Quién saca la basura?', 'Kdo vynese odpadky?']],
    },
    {
      title: 'Musím',
      tip: '**tener que** + sloveso = muset 😤\n\n**Tengo que estudiar** = Musím se učit.\n**Tienes que descansar** = Musíš si odpočinout.\n\n**Hay que** = Musí se (obecně).',
      words: [['tengo que', 'musím'], ['tienes que', 'musíš'], ['tiene que', 'musí'], ['hay que', 'musí se|je třeba'], ['ahora', 'teď|nyní'], ['ya', 'už'], ['todavía', 'ještě|pořád']],
      sentences: [['Tengo que estudiar.', 'Musím se učit.'], ['Tienes que descansar.', 'Musíš si odpočinout.'], ['Ahora tengo que trabajar.', 'Teď musím pracovat.'], ['Hay que comer fruta.', 'Musí se jíst ovoce.'], ['Todavía tengo hambre.', 'Pořád mám hlad.']],
    },
    {
      title: 'Škola a práce',
      tip: '**la clase** = vyučovací hodina i třída 📚\n**el examen** = zkouška, test\n\n**¿En qué trabajas?** = Co děláš (za práci)?',
      words: [['la escuela', 'škola'], ['la universidad', 'univerzita|vysoká škola'], ['la clase', 'hodina|třída'], ['la profesora', 'učitelka'], ['el profesor', 'učitel'], ['el examen', 'zkouška|test'], ['el trabajo', 'práce'], ['la oficina', 'kancelář']],
      sentences: [['Mañana tengo un examen.', 'Zítra mám zkoušku.'], ['La profesora es muy simpática.', 'Učitelka je moc milá.'], ['¿En qué trabajas?', 'Co děláš za práci?'], ['Trabajo en una oficina.', 'Pracuju v kanceláři.'], ['La clase empieza a las nueve.', 'Hodina začíná v devět.']],
    },
    {
      title: 'Jak často',
      tip: 'Jak často něco děláš: 📆\n\n**siempre** – vždycky\n**normalmente** – obvykle\n**a veces** – někdy\n**nunca** – nikdy\n\n**los lunes** = každé pondělí (v pondělky)',
      words: [['a veces', 'někdy'], ['normalmente', 'obvykle|normálně'], ['cada día', 'každý den'], ['una vez', 'jednou'], ['dos veces', 'dvakrát'], ['por semana', 'týdně|za týden'], ['los lunes', 'v pondělí (každé)']],
      sentences: [['A veces voy al cine.', 'Někdy chodím do kina.'], ['Normalmente desayuno a las ocho.', 'Obvykle snídám v osm.'], ['Voy al gimnasio dos veces por semana.', 'Chodím do posilovny dvakrát týdně.'], ['Los lunes tengo clase.', 'V pondělí mám školu.'], ['Estudio español cada día.', 'Učím se španělsky každý den.']],
    },
    {
      title: 'Dělám, dávám, vím',
      tip: 'Pár častých sloves má nepravidelné „já“: 🤓\n\n**hago** – dělám (hacer)\n**pongo** – dávám, pokládám (poner)\n**salgo** – odcházím, jdu ven (salir)\n**sé** – vím (saber)\n**digo** – říkám (decir)',
      words: [['hago', 'dělám'], ['pongo', 'dávám|pokládám'], ['salgo', 'odcházím|jdu ven'], ['sé', 'vím|umím'], ['digo', 'říkám'], ['vengo', 'přicházím|přijdu'], ['no sé', 'nevím']],
      sentences: [['¿Qué haces?', 'Co děláš?'], ['Hago los deberes.', 'Dělám úkoly.'], ['Pongo la mesa.', 'Prostírám stůl.'], ['Salgo de casa a las ocho.', 'Odcházím z domu v osm.'], ['No sé, lo siento.', 'Nevím, promiň.']],
    },
    {
      title: 'Kde to je',
      tip: 'Kde co leží: 📦\n\n**encima de** – na / nad\n**debajo de** – pod\n**al lado de** – vedle\n**dentro de** – uvnitř\n**delante de / detrás de** – před / za\n\n**de + el = del**: al lado **del** sofá.',
      words: [['encima de', 'na|nad'], ['debajo de', 'pod'], ['al lado de', 'vedle'], ['dentro de', 'uvnitř|v'], ['delante de', 'před'], ['detrás de', 'za'], ['entre', 'mezi']],
      sentences: [['El gato está debajo de la cama.', 'Kočka je pod postelí.'], ['El móvil está encima de la mesa.', 'Mobil je na stole.'], ['La lámpara está al lado del sofá.', 'Lampa je vedle gauče.'], ['El parque está detrás de la escuela.', 'Park je za školou.'], ['Estoy entre mamá y papá.', 'Jsem mezi mámou a tátou.']],
    },
    {
      title: 'Vaření doma',
      tip: 'V receptech se často používá rozkaz: **corta** (nakrájej), **mezcla** (zamíchej), **añade** (přidej). 👩‍🍳\n\n**la sartén** = pánev, **el horno** = trouba.',
      words: [['la receta', 'recept'], ['cortar', 'krájet|nakrájet'], ['mezclar', 'míchat|smíchat'], ['el horno', 'trouba'], ['la sartén', 'pánev'], ['la sal', 'sůl'], ['el aceite', 'olej'], ['la cebolla', 'cibule']],
      sentences: [['Corta la cebolla.', 'Nakrájej cibuli.'], ['Pon aceite en la sartén.', 'Dej olej na pánev.'], ['Mezcla los huevos.', 'Rozmíchej vajíčka.'], ['La pizza está en el horno.', 'Pizza je v troubě.'], ['Es la receta de mi abuela.', 'Je to babiččin recept.']],
    },
    { title: 'Zkouška: Domov', exam: true },
  ],
});
