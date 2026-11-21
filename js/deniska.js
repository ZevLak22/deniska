/* Deniska – růžové prasátko, maskot appky */
(function () {
  const STAGES = [
    { at: 0,   name: 'Malé selátko',     scale: 0.62 },
    { at: 10,  name: 'Zvědavé prasátko', scale: 0.72 },
    { at: 30,  name: 'Prasátko s mašlí', scale: 0.80 },
    { at: 60,  name: 'Velká Deniska',    scale: 0.88 },
    { at: 90,  name: 'Chytrá Deniska',   scale: 0.95 },
    { at: 116, name: 'Deniska královna', scale: 1.00 },
  ];

  // Doplňky – jeden za každou zlatou koblihu (zkoušku tématu)
  const ACCESSORIES = [
    { id: 'kyticka',   e: '🌸', name: 'Kytička',        slot: 'ear'  },
    { id: 'dortik',    e: '🧁', name: 'Dortík',         slot: 'side' },
    { id: 'sluchatka', e: '🎧', name: 'Sluchátka',      slot: 'top'  },
    { id: 'kabelka',   e: '👜', name: 'Kabelka',        slot: 'side' },
    { id: 'bryle',     e: '🕶️', name: 'Sluneční brýle', slot: 'eyes' },
    { id: 'sala',      e: '🧣', name: 'Šála',           slot: 'neck' },
    { id: 'masle',     e: '🎀', name: 'Velká mašle',    slot: 'ear'  },
    { id: 'destnik',   e: '☂️', name: 'Deštník',        slot: 'side' },
    { id: 'mic',       e: '⚽', name: 'Míč',            slot: 'side' },
    { id: 'klobouk',   e: '👒', name: 'Klobouček',      slot: 'top'  },
  ];

  const SLOTS = {
    top:  { x: 100, y: 34,  s: 46, r: 0 },
    ear:  { x: 62,  y: 40,  s: 30, r: -18 },
    eyes: { x: 100, y: 79,  s: 58, r: 0 },
    neck: { x: 100, y: 130, s: 40, r: 0 },
    side: { x: 160, y: 158, s: 38, r: 8 },
  };

  function stageIndex(eaten) {
    let idx = 0;
    STAGES.forEach((s, i) => { if (eaten >= s.at) idx = i; });
    return idx;
  }

  let uid = 0;
  function svg(opts) {
    opts = opts || {};
    const stage = opts.stage == null ? 0 : opts.stage;
    const mood = opts.mood || 'happy';
    const wear = opts.wear || [];
    const scale = opts.fixedScale || STAGES[stage].scale;
    const id = 'p' + (++uid);
    const worn = {};
    wear.forEach(aid => {
      const a = ACCESSORIES.find(x => x.id === aid);
      if (a) worn[a.slot] = a;
    });

    let extras = '';
    // Mašle od 3. stupně (pokud na uchu nemá jiný doplněk)
    if (stage >= 2 && !worn.ear) {
      extras += `<g transform="translate(136 34) rotate(18)">
        <path d="M0 0 L-16 -10 L-16 10 Z" fill="#E2508A" stroke="#E2508A" stroke-width="4" stroke-linejoin="round"/>
        <path d="M0 0 L16 -10 L16 10 Z" fill="#E2508A" stroke="#E2508A" stroke-width="4" stroke-linejoin="round"/>
        <circle r="5.5" fill="#C93D74"/></g>`;
    }
    // Brýle od 5. stupně
    if (stage >= 4 && !worn.eyes) {
      extras += `<g fill="rgba(255,255,255,.25)" stroke="#5B2E45" stroke-width="3">
        <circle cx="83" cy="78" r="12"/><circle cx="117" cy="78" r="12"/>
        <path d="M95 77 Q100 73 105 77" fill="none"/></g>`;
    }
    // Korunka pro královnu
    if (stage >= 5 && !worn.top) {
      extras += `<text x="100" y="32" font-size="44" text-anchor="middle" dominant-baseline="central">👑</text>`;
    }
    Object.keys(worn).forEach(slot => {
      const p = SLOTS[slot];
      extras += `<text x="${p.x}" y="${p.y}" font-size="${p.s}" text-anchor="middle" dominant-baseline="central" transform="rotate(${p.r} ${p.x} ${p.y})">${worn[slot].e}</text>`;
    });

    return `<svg class="pig ${opts.cls || ''}" data-mood="${mood}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Deniska">
  <defs>
    <radialGradient id="${id}b" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#FFD3E2"/><stop offset="1" stop-color="#FFA4C3"/></radialGradient>
    <radialGradient id="${id}h" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#FFDCE8"/><stop offset="1" stop-color="#FFAFCB"/></radialGradient>
  </defs>
  <ellipse cx="100" cy="190" rx="${56 * scale}" ry="${7 * scale}" fill="rgba(226,80,138,.16)"/>
  <g transform="translate(100 190) scale(${scale}) translate(-100 -190)">
   <g class="pig-body-anim">
    <path class="tail" d="M152 134 C166 132 170 118 160 116 C152 115 152 126 162 126" fill="none" stroke="#FF8FB4" stroke-width="5" stroke-linecap="round"/>
    <rect x="80" y="160" width="14" height="24" rx="6" fill="#FF97BA"/>
    <rect x="108" y="160" width="14" height="24" rx="6" fill="#FF97BA"/>
    <rect x="64" y="162" width="16" height="26" rx="7" fill="#FFA6C4"/>
    <rect x="120" y="162" width="16" height="26" rx="7" fill="#FFA6C4"/>
    <ellipse cx="100" cy="142" rx="58" ry="40" fill="url(#${id}b)"/>
    <ellipse cx="100" cy="154" rx="32" ry="20" fill="#FFD9E6" opacity=".8"/>
    <path d="M62 56 L52 22 L88 40 Z" fill="#FFA0C0" stroke="#FFA0C0" stroke-width="8" stroke-linejoin="round"/>
    <path d="M64 48 L59 31 L78 41 Z" fill="#FF80AA" stroke="#FF80AA" stroke-width="4" stroke-linejoin="round"/>
    <path d="M138 56 L148 22 L112 40 Z" fill="#FFA0C0" stroke="#FFA0C0" stroke-width="8" stroke-linejoin="round"/>
    <path d="M136 48 L141 31 L122 41 Z" fill="#FF80AA" stroke="#FF80AA" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="100" cy="84" r="47" fill="url(#${id}h)"/>
    <ellipse cx="70" cy="99" rx="10" ry="6.5" fill="#FF7FA9" opacity=".45"/>
    <ellipse cx="130" cy="99" rx="10" ry="6.5" fill="#FF7FA9" opacity=".45"/>
    <g class="eyes">
      <circle cx="83" cy="78" r="7" fill="#3B2431"/><circle cx="85.5" cy="75.5" r="2.4" fill="#fff"/>
      <circle cx="117" cy="78" r="7" fill="#3B2431"/><circle cx="119.5" cy="75.5" r="2.4" fill="#fff"/>
    </g>
    <g class="brows" stroke="#7A3555" stroke-width="3" stroke-linecap="round">
      <path d="M74 68 L89 63"/><path d="M126 68 L111 63"/>
    </g>
    <ellipse cx="100" cy="100" rx="21" ry="14.5" fill="#FF8FB4"/>
    <ellipse cx="100" cy="97" rx="15" ry="6" fill="#FFA8C6" opacity=".6"/>
    <ellipse cx="93" cy="101" rx="3.4" ry="4.8" fill="#C94C7C"/>
    <ellipse cx="107" cy="101" rx="3.4" ry="4.8" fill="#C94C7C"/>
    <path class="m-happy" d="M90 119 Q100 128 110 119" fill="none" stroke="#C94C7C" stroke-width="3.2" stroke-linecap="round"/>
    <g class="m-open"><ellipse cx="100" cy="121" rx="10" ry="8.5" fill="#8E2F57"/><ellipse cx="100" cy="125" rx="6" ry="3.5" fill="#FF7FA9"/></g>
    <ellipse class="m-chew" cx="100" cy="120" rx="8" ry="4.5" fill="#8E2F57"/>
    <path class="m-sad" d="M90 125 Q100 116 110 125" fill="none" stroke="#C94C7C" stroke-width="3.2" stroke-linecap="round"/>
    ${extras}
   </g>
  </g>
</svg>`;
  }

  window.Deniska = { STAGES, ACCESSORIES, stageIndex, svg };
})();
