/* ============================================================
   ArabicWhales — Visual system
   - Modern line-icon sprite (replaces emoji everywhere)
   - Topic-accurate concept illustrations per lesson (replaces
     generic/mismatched stock video & photos)
   ============================================================ */

const ICON_SPRITE = `<svg style="position:absolute;width:0;height:0;overflow:hidden;" aria-hidden="true">
  <symbol id="ic-whale" viewBox="0 0 24 24"><path d="M3 13c1-4 5-7 10-7 5 0 8.5 3 9.5 6.5.3 1-.4 2-1.4 2H14l-2 3-1.5-3H6c-1.7 0-3.3-.8-3-1.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="16.5" cy="9.5" r="0.9" fill="currentColor"/><path d="M9 15.5c-1 1-2.5 1.5-4 1" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></symbol>
  <symbol id="ic-lock" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="15" r="1.4" fill="currentColor"/></symbol>
  <symbol id="ic-unlock" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 11V8a4 4 0 0 1 7.5-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="15" r="1.4" fill="currentColor"/></symbol>
  <symbol id="ic-check" viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="ic-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="ic-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 12h17M12 3.5c2.5 2.4 3.8 5.3 3.8 8.5s-1.3 6.1-3.8 8.5c-2.5-2.4-3.8-5.3-3.8-8.5S9.5 5.9 12 3.5z" fill="none" stroke="currentColor" stroke-width="1.4"/></symbol>
  <symbol id="ic-chat" viewBox="0 0 24 24"><path d="M4 5.5h16a1 1 0 011 1V15a1 1 0 01-1 1H9l-4.5 4V16H4a1 1 0 01-1-1V6.5a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></symbol>
  <symbol id="ic-pencil" viewBox="0 0 24 24"><path d="M4 20l1-4.2L15.5 5.3a1.5 1.5 0 0 1 2.1 0l1.1 1.1a1.5 1.5 0 0 1 0 2.1L8.2 19 4 20z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M13.8 6.8l3.4 3.4" stroke="currentColor" stroke-width="1.4"/></symbol>
  <symbol id="ic-award" viewBox="0 0 24 24"><circle cx="12" cy="9" r="5.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 13.5L7.5 21l4.5-2.5 4.5 2.5L15 13.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
  <symbol id="ic-menu-book" viewBox="0 0 24 24"><path d="M4 5.5c2.5-1 5-1 7 0v13c-2-1-4.5-1-7 0zM20 5.5c-2.5-1-5-1-7 0v13c2-1 4.5-1 7 0z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
  <symbol id="ic-coin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.5v9M9.5 9.7c0-1.2 1.1-2.2 2.5-2.2s2.5.8 2.5 1.8c0 2.4-5 1.4-5 3.8 0 1 1.1 1.8 2.5 1.8s2.5-1 2.5-2.2" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>
  <symbol id="ic-wallet2" viewBox="0 0 24 24"><rect x="3.5" y="6.5" width="17" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 9.5h17" stroke="currentColor" stroke-width="1.4"/><circle cx="16.5" cy="14" r="1.2" fill="currentColor"/></symbol>
  <symbol id="ic-chart2" viewBox="0 0 24 24"><path d="M4 20V9M9.5 20V4M15 20v-7M20 20V11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="ic-chain2" viewBox="0 0 24 24"><rect x="3" y="8" width="7" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="14" y="8" width="7" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10 11.5h4" stroke="currentColor" stroke-width="1.6"/></symbol>
  <symbol id="ic-contract2" viewBox="0 0 24 24"><path d="M6 3.5h9l4 4V20a1 1 0 01-1 1H6a1 1 0 01-1-1V4.5a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 11h8M8 14.5h8M8 18h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>
  <symbol id="ic-network2" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5M10.5 13l-4 2.5M13.5 13l4 2.5" stroke="currentColor" stroke-width="1.4"/></symbol>
  <symbol id="ic-bank2" viewBox="0 0 24 24"><path d="M4 10l8-5 8 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3.5 20h17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
  <symbol id="ic-stable2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 12h7M12 8.5v7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></symbol>
  <symbol id="ic-shield2" viewBox="0 0 24 24"><path d="M12 3.5l7 2.6v5.4c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6.1z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4.3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="ic-exchange2" viewBox="0 0 24 24"><path d="M4 8h13M14 4.5L17.5 8 14 11.5M20 16H7M10 12.5L6.5 16 10 19.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="ic-radio" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M8.5 8.5a5 5 0 000 7M15.5 8.5a5 5 0 010 7M5.5 5.5a9 9 0 000 13M18.5 5.5a9 9 0 010 13" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></symbol>
  <symbol id="ic-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="8" r="1.1" fill="currentColor"/><path d="M12 11.5v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
  <symbol id="ic-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M15.5 6a3 3 0 010 6M15 14.2c2.6.4 4.5 2.3 4.5 4.8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
  <symbol id="ic-warning" viewBox="0 0 24 24"><path d="M12 3.5l9.5 16.5H2.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 10v4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="17.3" r="1" fill="currentColor"/></symbol>
</svg>`;

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('ic-whale')) {
      document.body.insertAdjacentHTML('afterbegin', ICON_SPRITE);
    }
  });
  // Also inject immediately in case DOMContentLoaded already fired (script at end of body)
  if (document.body && !document.getElementById('ic-whale')) {
    document.body.insertAdjacentHTML('afterbegin', ICON_SPRITE);
  }
}

function icon(name, size) {
  size = size || '1em';
  return `<svg class="ic" style="width:${size};height:${size};vertical-align:-0.15em;"><use href="#ic-${name}"/></svg>`;
}

const TRACK_ICON = {
  'digital-currencies': 'coin',
  'crypto-bitcoin': 'coin',
  'wallets': 'wallet2',
  'trading': 'chart2',
  'blockchain': 'chain2',
  'ethereum': 'contract2',
  'web3': 'network2',
  'defi': 'bank2',
  'stablecoins': 'stable2',
  'security': 'shield2',
  'networks': 'radio',
  'dex-cex': 'exchange2',
};
function trackIcon(trackId, size) {
  return icon(TRACK_ICON[trackId] || 'menu-book', size);
}

/* ---- Topic-accurate concept illustrations (replace mismatched stock media) ---- */
const ILLUSTRATIONS = {
  coin: `<svg viewBox="0 0 200 120"><circle cx="100" cy="60" r="42" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="100" cy="60" r="30" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><path d="M100 42v36M86 51c0-5 6-9 14-9s14 4 14 7c0 9-28 5-28 15 0 4 6 8 14 8s14-4 14-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  wallet: `<svg viewBox="0 0 200 120"><rect x="40" y="35" width="120" height="55" rx="8" fill="none" stroke="currentColor" stroke-width="3"/><path d="M40 52h120" stroke="currentColor" stroke-width="2.5"/><circle cx="138" cy="70" r="6" fill="currentColor"/><path d="M60 35V25a10 10 0 0 1 10-10h40" fill="none" stroke="currentColor" stroke-width="2" opacity="0.6" stroke-linecap="round"/></svg>`,
  chart: `<svg viewBox="0 0 200 120"><path d="M20 100h160" stroke="currentColor" stroke-width="2" opacity="0.4"/><path d="M20 20v80" stroke="currentColor" stroke-width="2" opacity="0.4"/><path d="M35 80l25-20 20 15 30-35 25 10 25-25" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="140" cy="35" r="4" fill="currentColor"/></svg>`,
  chain: `<svg viewBox="0 0 200 120"><rect x="25" y="40" width="45" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="3"/><rect x="80" y="40" width="45" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="3"/><rect x="135" y="40" width="45" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="3"/><path d="M70 60h10M125 60h10" stroke="currentColor" stroke-width="3"/></svg>`,
  contract: `<svg viewBox="0 0 200 120"><path d="M60 15h55l25 25v65a6 6 0 0 1-6 6H60a6 6 0 0 1-6-6V21a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M75 55h50M75 70h50M75 85h30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  network: `<svg viewBox="0 0 200 120"><circle cx="100" cy="25" r="9" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="40" cy="90" r="9" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="160" cy="90" r="9" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="100" cy="90" r="9" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M100 34v47M49 85l42-3M151 85l-42-3" stroke="currentColor" stroke-width="2"/></svg>`,
  bank: `<svg viewBox="0 0 200 120"><path d="M30 45l70-30 70 30" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M35 45v45M65 45v45M100 45v45M135 45v45M165 45v45M22 90h156" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  stable: `<svg viewBox="0 0 200 120"><circle cx="100" cy="60" r="42" fill="none" stroke="currentColor" stroke-width="3"/><path d="M78 60h44M100 38v44" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M60 60a40 40 0 0 1 80 0" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4" stroke-dasharray="4 4"/></svg>`,
  shield: `<svg viewBox="0 0 200 120"><path d="M100 12l45 16v30c0 30-20 48-45 52-25-4-45-22-45-52V28z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M80 60l14 14 26-28" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  exchange: `<svg viewBox="0 0 200 120"><path d="M25 45h110M118 25l27 20-27 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M175 75H65M82 55L55 75l27 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  mining: `<svg viewBox="0 0 200 120"><rect x="30" y="55" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.5"/><rect x="85" y="40" width="30" height="45" fill="none" stroke="currentColor" stroke-width="2.5"/><rect x="140" y="25" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M30 55l15-15M85 40l15-20" stroke="currentColor" stroke-width="2" opacity="0.5"/></svg>`,
  privacy: `<svg viewBox="0 0 200 120"><path d="M100 12l45 16v30c0 30-20 48-45 52-25-4-45-22-45-52V28z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><circle cx="100" cy="55" r="10" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M92 65v10a8 8 0 0 0 16 0V65" fill="none" stroke="currentColor" stroke-width="0" /><rect x="88" y="60" width="24" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>`,
  nft: `<svg viewBox="0 0 200 120"><rect x="60" y="20" width="80" height="80" rx="8" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="85" cy="48" r="8" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M60 85l25-25 20 15 15-12 20 22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  community: `<svg viewBox="0 0 200 120"><circle cx="75" cy="50" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="130" cy="50" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M40 100c2-20 16-32 35-32s33 12 35 32M95 100c2-20 16-32 35-32s33 12 35 32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
};

/* Per-lesson visual theme mapping (105 lessons) — each keyed to the most
   topically fitting illustration above, replacing the earlier mismatch. */
const LESSON_THEME = {
  // digital-currencies: beginner
  b1:'coin', b2:'exchange', b3:'coin', b4:'privacy', b5:'coin', b6:'coin', b7:'network', b8:'coin', b9:'exchange', b10:'coin',
  // intermediate
  i1:'privacy', i2:'coin', i3:'bank', i4:'network', i5:'community', i6:'bank', i7:'chain', i8:'chain', i9:'community', i10:'network', i11:'nft', i12:'exchange', i13:'exchange',
  // advanced
  a1:'chain', a2:'chain', a3:'network', a4:'contract', a5:'chart', a6:'chart', a7:'chart', a8:'chart', a9:'chart', a10:'exchange', a11:'shield', a12:'bank',
  // crypto-bitcoin
  cb1:'coin', cb2:'coin', cb3:'chain', cb4:'privacy', cb5:'mining', cb6:'network', cb7:'privacy', cb8:'shield',
  // wallets
  w1:'wallet', w2:'wallet', w3:'wallet', w4:'wallet', w5:'wallet', w6:'privacy', w7:'privacy', w8:'shield',
  // trading
  tr1:'chart', tr2:'chart', tr3:'chart', tr4:'exchange', tr5:'exchange', tr6:'community', tr7:'shield', tr8:'shield',
  // blockchain
  bc1:'chain', bc2:'chain', bc3:'chain', bc4:'network', bc5:'community', bc6:'privacy', bc7:'shield',
  // ethereum
  eth1:'contract', eth2:'contract', eth3:'chart', eth4:'community', eth5:'contract', eth6:'contract', eth7:'network', eth8:'community', eth9:'privacy', eth10:'shield',
  // web3
  w3_1:'network', w3_2:'nft', w3_3:'community', w3_4:'contract', w3_5:'network',
  // defi
  defi1:'bank', defi2:'bank', defi3:'shield', defi4:'contract', defi5:'exchange',
  // stablecoins
  sc1:'stable', sc2:'stable', sc3:'exchange', sc4:'stable',
  // security
  sec1:'shield', sec2:'wallet', sec3:'shield', sec4:'shield',
  // networks
  net1:'network', net2:'network', net3:'chart', net4:'shield', net5:'network',
  // dex-cex
  dc1:'exchange', dc2:'exchange', dc3:'bank', dc4:'exchange', dc5:'exchange', dc6:'wallet',
};

function renderConceptVisual(lesson, lessonId){
  const theme = LESSON_THEME[lessonId] || 'coin';
  const svg = ILLUSTRATIONS[theme] || ILLUSTRATIONS.coin;
  return `<div class="concept-visual">
    <div class="concept-visual-art">${svg}</div>
    <div class="concept-visual-watermark">${icon('whale','0.85em')} ArabicWhales</div>
  </div>`;
}
