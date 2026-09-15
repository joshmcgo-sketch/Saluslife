// Fabricated but plausible mock catalog for the investor demo.
// Every product here carries the mark (binary pass). `findings` align 1:1 with
// the 5 rubric items of the product's track (see data/standards.js).
// `reference` is the Oasis-style independent lab profile shown side-by-side.

export const PRODUCTS = [
  // ───────────────────────── EQUIPMENT (flagship) ─────────────────────────
  {
    id: 'aurora-infrared-sauna',
    name: 'Aurora Infrared Sauna',
    brand: 'Cedar & Stone Co.',
    track: 'equipment',
    category: 'Infrared Sauna',
    icon: 'sauna',
    score: 94,
    testDate: 'Aug 2026',
    blurb: 'Full-spectrum infrared cabin in solid Western red cedar with third-party low-EMF verification.',
    whyPassed:
      'Cedar & Stone disclosed every material in the cabin down to the glue line — and there is no glue in the heating zone, which is where most infrared cabins quietly fail. Independent EMF readings at the bench measured below 1 mG, and an accredited lab ran off-gassing at operating temperature rather than at room temperature, which is the test that actually matters. Manufacturing is a named facility in Ontario, not a "designed in" fiction. It clears the bar on the strength of its documentation as much as its build.',
    findings: [
      'Solid Western red cedar throughout; heater guards are medical-grade stainless. No adhesives anywhere in the heated interior.',
      'Independent EMF test on file: <1 mG at the bench seat. Off-gassing tested at 65°C operating temp, VOCs below reporting limit.',
      'Manufactured at a named, audited facility in Ontario, Canada. Country and plant both disclosed on request.',
      'Emitter output independently verified against the stated full-spectrum claim. 7-year cabin warranty, well above category norm.',
      'Full verdict published, including the raw EMF and off-gassing figures and the one deduction we made for door-seal longevity.',
    ],
    reference: {
      score: 91,
      items: [
        { label: 'EMF at seat (mG)', value: '0.8', status: 'pass' },
        { label: 'VOC off-gassing @65°C', value: '<LOR', status: 'pass' },
        { label: 'Formaldehyde', value: '0.01 ppm', status: 'pass' },
        { label: 'Adhesive in heat zone', value: 'None', status: 'pass' },
        { label: 'Surface temp uniformity', value: '±3°C', status: 'watch' },
      ],
    },
  },
  {
    id: 'halcyon-barrel-sauna',
    name: 'Halcyon Barrel Sauna',
    brand: 'Nordhaus',
    track: 'equipment',
    category: 'Traditional Sauna',
    icon: 'barrel',
    score: 90,
    testDate: 'Jul 2026',
    blurb: 'Thermally-modified spruce barrel sauna with a UL-listed electric heater.',
    whyPassed:
      'A traditional barrel is a simpler object than an infrared cabin, and Nordhaus did not overcomplicate the disclosure. The wood is thermally modified rather than chemically treated, the heater carries a genuine UL listing we confirmed against the file number, and the facility is named. The one place it gives up points is durability documentation on the steel bands, which is a finish concern, not a safety one.',
    findings: [
      'Thermally-modified European spruce, no chemical treatment. Stainless bands and food-grade gaskets at every water contact point.',
      'Heater is UL-listed (file number confirmed). Off-gassing negligible given no synthetic finishes on the interior.',
      'Manufactured in Estonia at a disclosed facility; importer and plant both named in the file.',
      'Independently load- and heat-cycled to the stated 90°C working temperature. 5-year structural warranty on the barrel.',
      'Verdict published in full, including a noted deduction for thinner documentation on the steel band corrosion rating.',
    ],
    reference: {
      score: 88,
      items: [
        { label: 'Heater UL listing', value: 'Confirmed', status: 'pass' },
        { label: 'Wood treatment', value: 'Thermal only', status: 'pass' },
        { label: 'VOC off-gassing', value: '<LOR', status: 'pass' },
        { label: 'Band corrosion rating', value: 'Partial', status: 'watch' },
        { label: 'Working temp hold', value: '90°C', status: 'pass' },
      ],
    },
  },
  {
    id: 'meridian-cold-plunge-xl',
    name: 'Meridian Cold Plunge XL',
    brand: 'Boreal',
    track: 'equipment',
    category: 'Cold Plunge',
    icon: 'plunge',
    score: 91,
    testDate: 'Aug 2026',
    blurb: 'Insulated 320L plunge with an integrated 1/2 HP chiller and food-grade liner.',
    whyPassed:
      'The claim on a plunge is temperature, and Boreal’s holds. Under an independent 24-hour test in a warm room, the Meridian kept 3.2°C against a 3°C setpoint — inside tolerance. The shell that touches water and skin is a named food-grade material, not "aircraft aluminum" marketing. The chiller is UL-listed. Nothing here is exotic; it is simply all disclosed and all tested.',
    findings: [
      'Water-contact shell is food-grade cross-linked polyethylene (grade named). Exterior cabinet is powder-coated, disclosed.',
      'Integrated chiller is UL-listed; independent leakage-current test passed. No off-gassing concern (unheated).',
      'Assembled in Vietnam at a disclosed facility; compressor sourced from a named supplier, also disclosed.',
      'Independently temp-tested: held 3.2°C vs 3°C setpoint over 24h at 26°C ambient. 3-year chiller warranty.',
      'Full verdict and the 24-hour temperature log published alongside the mark.',
    ],
    reference: {
      score: 89,
      items: [
        { label: 'Temp hold vs setpoint', value: '+0.2°C', status: 'pass' },
        { label: 'Liner material grade', value: 'Food-grade', status: 'pass' },
        { label: 'Chiller UL listing', value: 'Confirmed', status: 'pass' },
        { label: 'Leakage current', value: 'Pass', status: 'pass' },
        { label: 'Noise @1m', value: '58 dB', status: 'watch' },
      ],
    },
  },
  {
    id: 'tundra-chiller',
    name: 'Tundra 1/2 HP Chiller',
    brand: 'Boreal',
    track: 'equipment',
    category: 'Cold Plunge',
    icon: 'recovery',
    score: 86,
    testDate: 'Jun 2026',
    blurb: 'Standalone inline water chiller for retrofitting an existing tub or stock tank.',
    whyPassed:
      'A standalone chiller lives or dies on whether it holds temperature against a real thermal load, and the Tundra does, if narrowly. It cleared the bar with the smallest margin in the equipment set: temperature performance is solid and the unit is UL-listed, but the ozone sanitation add-on shipped with thinner documentation than we would like, which is why the reference profile flags it for watch rather than pass.',
    findings: [
      'Wetted path is food-grade PVC and titanium coil (both named). Housing materials fully disclosed.',
      'UL-listed unit; independent leakage-current test passed. Ozone add-on documentation was thinner and is noted.',
      'Manufactured in China at a disclosed facility; the titanium coil supplier is separately named.',
      'Independently tested to hold 4°C against a 300L load at 24°C ambient. 2-year warranty — at, not above, category norm.',
      'Verdict published, including an explicit note that the ozone module was reviewed with less supporting data.',
    ],
    reference: {
      score: 82,
      items: [
        { label: 'Temp hold @300L', value: '4.1°C', status: 'pass' },
        { label: 'Coil material', value: 'Titanium', status: 'pass' },
        { label: 'UL listing', value: 'Confirmed', status: 'pass' },
        { label: 'Ozone module data', value: 'Limited', status: 'watch' },
        { label: 'Warranty vs norm', value: 'At norm', status: 'watch' },
      ],
    },
  },
  {
    id: 'pulse-percussive-massager',
    name: 'Pulse Percussive Massager',
    brand: 'Kinetic Labs',
    track: 'equipment',
    category: 'Recovery Tech',
    icon: 'recovery',
    score: 88,
    testDate: 'Jul 2026',
    blurb: 'Brushless percussive therapy device with a sealed, serviceable battery.',
    whyPassed:
      'Handheld recovery devices are usually a disclosure black box, so Kinetic Labs stood out simply by answering the questions. The battery chemistry and cell supplier are named, the amplitude and stall force are independently measured against the marketing claim, and the charger is UL-listed. It loses a little on skin-contact attachment materials, where one accessory head is a disclosed but unremarkable TPE rather than a medical grade.',
    findings: [
      'Skin-contact heads are disclosed TPE; primary head is medical-grade silicone. Housing materials named.',
      'UL-listed charger; independent EMF around the motor within limits. Sealed battery, no off-gassing concern in use.',
      'Assembled in China at a disclosed facility; Li-ion cells from a named supplier with cell chemistry stated.',
      'Independently measured 12mm amplitude and 40lb stall force, matching the stated claim. 2-year warranty.',
      'Full verdict published, including the deduction for the standard-TPE secondary attachment head.',
    ],
    reference: {
      score: 85,
      items: [
        { label: 'Amplitude vs claim', value: 'Matched', status: 'pass' },
        { label: 'Stall force', value: '40 lb', status: 'pass' },
        { label: 'Charger UL listing', value: 'Confirmed', status: 'pass' },
        { label: 'Motor EMF', value: 'In limits', status: 'pass' },
        { label: 'Secondary head grade', value: 'Std TPE', status: 'watch' },
      ],
    },
  },
  {
    id: 'aero-compression-boots',
    name: 'Aero Compression Boots',
    brand: 'Kinetic Labs',
    track: 'equipment',
    category: 'Recovery Tech',
    icon: 'boots',
    score: 83,
    testDate: 'May 2026',
    blurb: 'Sequential pneumatic compression boots with a disclosed medical-grade liner.',
    whyPassed:
      'This is the lowest passing score in the equipment set, and it earned every point honestly. The pressure claim checks out under independent measurement, the liner in contact with skin is a named medical-grade fabric, and the pump is UL-listed. What holds it down is documentation depth on the pump’s duty cycle and a shorter warranty than the category leaders — both disclosed, both explained in the published verdict.',
    findings: [
      'Skin-contact liner is a named medical-grade fabric; bladder material fully disclosed.',
      'UL-listed pump; leakage-current test passed. Duty-cycle documentation was thinner than ideal and is flagged.',
      'Manufactured in China at a disclosed facility; pump and fabric suppliers separately named.',
      'Independently verified to reach the stated 200 mmHg peak in sequential mode. 1-year warranty — below category leaders.',
      'Verdict published, including explicit deductions for warranty length and duty-cycle data.',
    ],
    reference: {
      score: 79,
      items: [
        { label: 'Peak pressure', value: '200 mmHg', status: 'pass' },
        { label: 'Liner grade', value: 'Medical', status: 'pass' },
        { label: 'Pump UL listing', value: 'Confirmed', status: 'pass' },
        { label: 'Duty-cycle data', value: 'Limited', status: 'watch' },
        { label: 'Warranty vs leaders', value: 'Below', status: 'fail' },
      ],
    },
  },

  // ───────────────────────── INGESTIBLES ─────────────────────────
  {
    id: 'northfield-grass-fed-whey',
    name: 'Single-Origin Grass-Fed Whey',
    brand: 'Northfield Dairy',
    track: 'ingestibles',
    category: 'Protein',
    icon: 'capsule',
    score: 92,
    testDate: 'Aug 2026',
    blurb: 'Unflavored whey concentrate from a single named dairy co-op, cold-processed.',
    whyPassed:
      'Most protein powders trace back to an anonymous global whey pool. Northfield’s traces to one co-op in Vermont, named on the label and verified against milk-collection records. There is a single ingredient — whey — with no proprietary blend to hide behind, and current heavy-metal panels came in comfortably under limits. It clears both halves of the threshold: a strong independent lab score and a sourcing story that holds up.',
    findings: [
      'Traceable to a single named dairy co-op in Vermont; milk-collection records reviewed. Grass-fed claim verified seasonally.',
      'One ingredient: whey protein concentrate. No proprietary blend, no additives, no flavor masking.',
      'Current lab panel: lead, arsenic, cadmium, mercury all well under limits. Pesticide residue non-detect.',
      'Cold-processed at a disclosed facility; the co-op and the processor are both named in the file.',
      'Clears a top independent lab score AND Salus Life’s sourcing review — neither carried it alone.',
    ],
    reference: {
      score: 90,
      items: [
        { label: 'Lead', value: '0.004 ppm', status: 'pass' },
        { label: 'Cadmium', value: '0.002 ppm', status: 'pass' },
        { label: 'Arsenic', value: '<LOD', status: 'pass' },
        { label: 'Pesticide residue', value: 'None', status: 'pass' },
        { label: 'Added fillers', value: 'None', status: 'pass' },
      ],
    },
  },
  {
    id: 'loch-ard-spring-water',
    name: 'Highland Spring Mineral Water',
    brand: 'Loch Ard',
    track: 'ingestibles',
    category: 'Bottled Water',
    icon: 'bottle',
    score: 95,
    testDate: 'Sep 2026',
    blurb: 'Naturally filtered spring water in glass, from a single protected Scottish source.',
    whyPassed:
      'Bottled water is where marketing and chemistry diverge most, so the bar is simply: name the source, test the water, and don’t leach the bottle. Loch Ard does all three. It bottles at a single protected spring, its mineral profile is stable across the year, and choosing glass over PET removes the microplastic and antimony questions entirely. It posts the highest score in the catalog because there is genuinely little to deduct.',
    findings: [
      'Single protected spring source in the Scottish Highlands, named and geo-verified. Not a blended municipal source.',
      'Nothing added. Full mineral profile disclosed and stable across seasonal testing.',
      'Current panel: heavy metals non-detect; no nitrate or PFAS above reporting limits. Bottled in glass.',
      'Bottled on-site at the named source; no intermediate handling or re-bottling in the chain.',
      'Top independent lab score with fully transparent sourcing — the cleanest pass in the set.',
    ],
    reference: {
      score: 96,
      items: [
        { label: 'PFAS', value: '<LOR', status: 'pass' },
        { label: 'Nitrate', value: '0.4 mg/L', status: 'pass' },
        { label: 'Microplastics', value: 'None (glass)', status: 'pass' },
        { label: 'Antimony', value: '<LOD', status: 'pass' },
        { label: 'Total dissolved solids', value: '140 mg/L', status: 'pass' },
      ],
    },
  },
  {
    id: 'cold-current-sockeye-oil',
    name: 'Wild Sockeye Salmon Oil',
    brand: 'Cold Current',
    track: 'ingestibles',
    category: 'Omega-3',
    icon: 'oil',
    score: 89,
    testDate: 'Jul 2026',
    blurb: 'Wild-caught Alaskan sockeye oil, single-species, in a light-blocking glass bottle.',
    whyPassed:
      'Fish oil is a category defined by rancidity and mystery blends, and Cold Current avoids both. It is a single species from a named Alaskan fishery, the oxidation markers are low and independently measured, and heavy metals — the real concern with marine oils — came in under limits. The small deduction is a peroxide value that is good but not best-in-class, flagged honestly in the reference profile.',
    findings: [
      'Single-species wild Alaskan sockeye from a named fishery with chain-of-custody records. Not a pooled marine blend.',
      'One ingredient plus a disclosed rosemary-extract antioxidant. No proprietary blend, no synthetic preservative.',
      'Current panel: mercury, PCBs, and dioxins all under limits. Oxidation (TOTOX) independently measured and low.',
      'Cold-pressed and bottled at a disclosed facility; fishery and processor both named.',
      'Clears the external lab score and the sourcing review; the peroxide value is disclosed as good-not-best.',
    ],
    reference: {
      score: 86,
      items: [
        { label: 'Mercury', value: '<LOD', status: 'pass' },
        { label: 'PCBs', value: '<LOR', status: 'pass' },
        { label: 'TOTOX oxidation', value: '9.2', status: 'pass' },
        { label: 'Peroxide value', value: '4.8 meq/kg', status: 'watch' },
        { label: 'EPA/DHA vs label', value: 'Matched', status: 'pass' },
      ],
    },
  },
  {
    id: 'pasture-ridge-ribeye',
    name: 'Pasture Ridge Ribeye',
    brand: 'Pasture Ridge',
    track: 'ingestibles',
    category: 'Meat',
    icon: 'meat',
    score: 90,
    testDate: 'Aug 2026',
    blurb: 'Grass-fed, grass-finished ribeye from a single regenerative ranch, flash-frozen.',
    whyPassed:
      'The grass-fed label is one of the most abused in food, so we verified it rather than accepting it. Pasture Ridge is a single ranch, grass-fed and grass-finished — the finishing is the part everyone quietly skips — with no antibiotics or added hormones, confirmed against ranch records. Contaminant screening was clean. It passes on the strength of traceability most beef programs cannot offer.',
    findings: [
      'Single named regenerative ranch in Montana. Grass-fed AND grass-finished, verified against herd records.',
      'No antibiotics, no added hormones, no marinade or additive. Single-ingredient product.',
      'Current panel: heavy metals and pesticide residue non-detect; no antibiotic residue found.',
      'Processed at a disclosed USDA facility; ranch and processor both named in the file.',
      'Clears both the independent lab screen and Salus Life’s ranch-level sourcing verification.',
    ],
    reference: {
      score: 88,
      items: [
        { label: 'Antibiotic residue', value: 'None', status: 'pass' },
        { label: 'Grass-finished', value: 'Verified', status: 'pass' },
        { label: 'Heavy metals', value: '<LOD', status: 'pass' },
        { label: 'Pesticide residue', value: 'None', status: 'pass' },
        { label: 'Added hormones', value: 'None', status: 'pass' },
      ],
    },
  },
  {
    id: 'fen-root-reishi',
    name: 'Reishi Dual-Extract Tincture',
    brand: 'Fen & Root',
    track: 'ingestibles',
    category: 'Supplement',
    icon: 'capsule',
    score: 84,
    testDate: 'Jun 2026',
    blurb: 'Dual-extracted reishi tincture with the fruiting body named and quantified.',
    whyPassed:
      'Mushroom supplements are notorious for grain filler sold as extract, so the test is simple: prove it is fruiting body, not mycelium-on-rice, and prove the actives are actually there. Fen & Root discloses a fruiting-body source with a verified beta-glucan percentage and a named farm. It passes, but with the lowest ingestible score — the beta-glucan content is real but modest, and that is stated plainly rather than dressed up.',
    findings: [
      'Named fruiting-body source from a disclosed farm in Fujian. No undisclosed mycelium-on-grain substrate.',
      'Full disclosure: reishi fruiting body, water, and organic cane alcohol. No proprietary "mushroom blend."',
      'Current panel: heavy metals under limits; beta-glucan independently quantified rather than assumed.',
      'Dual-extracted at a disclosed facility; farm and extractor both named.',
      'Clears the sourcing review and a passing external score; the modest beta-glucan % is disclosed, not hidden.',
    ],
    reference: {
      score: 80,
      items: [
        { label: 'Beta-glucan content', value: '14%', status: 'watch' },
        { label: 'Fruiting body', value: 'Verified', status: 'pass' },
        { label: 'Lead', value: '0.02 ppm', status: 'pass' },
        { label: 'Grain filler', value: 'None', status: 'pass' },
        { label: 'Actives vs label', value: 'Matched', status: 'pass' },
      ],
    },
  },
  {
    id: 'northfield-cold-milled-flax',
    name: 'Cold-Milled Flaxseed',
    brand: 'Northfield',
    track: 'ingestibles',
    category: 'Superfood',
    icon: 'seed',
    score: 87,
    testDate: 'Jul 2026',
    blurb: 'Single-origin flaxseed, cold-milled and nitrogen-flushed to limit oxidation.',
    whyPassed:
      'Milled flax goes rancid fast, which is why the processing disclosure matters as much as the sourcing here. Northfield names the farm, cold-mills to keep the oils intact, and nitrogen-flushes the pack — a processing detail most brands never mention because most brands never do it. Contaminant screening was clean and the omega content matches the label. A straightforward, well-documented pass.',
    findings: [
      'Single-origin flax from a named farm in North Dakota, traceable by lot. Not a commodity-pool blend.',
      'One ingredient. No additives, no anti-caking agents, no proprietary anything.',
      'Current panel: heavy metals and pesticide residue non-detect; cadmium (the flax-specific risk) under limits.',
      'Cold-milled and nitrogen-flushed at a disclosed facility — processing method stated openly on the pack.',
      'Passes the external lab screen and the sourcing review, with processing transparency as a standout.',
    ],
    reference: {
      score: 85,
      items: [
        { label: 'Cadmium', value: '0.06 ppm', status: 'pass' },
        { label: 'Pesticide residue', value: 'None', status: 'pass' },
        { label: 'Oxidation (freshness)', value: 'Low', status: 'pass' },
        { label: 'Omega-3 vs label', value: 'Matched', status: 'pass' },
        { label: 'Anti-caking agents', value: 'None', status: 'pass' },
      ],
    },
  },

  // ───────────────────────── FOOD ─────────────────────────
  {
    id: 'estate-olive-oil',
    name: 'Single-Estate Extra-Virgin Olive Oil',
    brand: 'Colline Verdi',
    track: 'ingestibles',
    category: 'Olive Oil',
    icon: 'oil',
    score: 91,
    testDate: 'Sep 2026',
    blurb: 'Single-estate, cold-pressed Tuscan olive oil, harvest-dated in a light-blocking tin.',
    whyPassed:
      'Olive oil is one of the most adulterated foods on the shelf — routinely cut with cheaper seed oils and lied about on origin. Colline Verdi is a single estate with a harvest date on every tin, its polyphenols are independently measured rather than claimed, and lab testing found no seed-oil adulteration. It clears the sourcing review and the external purity score together.',
    findings: [
      'Single named estate in Tuscany with a harvest date on every tin; not a blended or origin-anonymous oil.',
      'One ingredient: olive oil. No refined seed-oil cutting and no additives, confirmed by fatty-acid profile.',
      'Current panel: mineral-oil (MOSH/MOAH) contamination non-detect; pesticide residue non-detect; polyphenols measured.',
      'Cold-pressed and bottled at the disclosed estate mill with no intermediate handling.',
      'Clears a top external purity score AND Salus Life’s origin review — neither alone.',
    ],
    reference: {
      score: 90,
      items: [
        { label: 'Seed-oil adulteration', value: 'None', status: 'pass' },
        { label: 'MOSH/MOAH', value: '<LOR', status: 'pass' },
        { label: 'Pesticide residue', value: 'None', status: 'pass' },
        { label: 'Polyphenols', value: 'High', status: 'pass' },
        { label: 'Free acidity', value: '0.3%', status: 'pass' },
      ],
    },
  },
  {
    id: 'sprouted-rolled-oats',
    name: 'Sprouted Rolled Oats',
    brand: 'Northfield',
    track: 'ingestibles',
    category: 'Grains',
    icon: 'seed',
    score: 88,
    testDate: 'Aug 2026',
    blurb: 'Sprouted whole-grain oats from a single named farm, tested for the glyphosate that plagues the category.',
    whyPassed:
      'Oats are the poster child for glyphosate residue, so that’s the test that matters — and Northfield’s came back non-detect. It’s a single-farm, single-ingredient grain, sprouted rather than just rolled, with the process stated openly. A clean, well-documented pass.',
    findings: [
      'Single named farm in the Upper Midwest, traceable by lot; not a commodity oat pool.',
      'One ingredient: sprouted whole oats. No additives and no anti-dusting agents.',
      'Current panel: glyphosate non-detect, heavy metals under limits, no mycotoxins above reporting limits.',
      'Sprouted and rolled at a disclosed facility; the sprouting step is stated openly on the pack.',
      'Passes both the external residue screen and Salus Life’s sourcing review.',
    ],
    reference: {
      score: 86,
      items: [
        { label: 'Glyphosate', value: 'None', status: 'pass' },
        { label: 'Cadmium', value: '0.03 ppm', status: 'pass' },
        { label: 'Mycotoxins', value: '<LOR', status: 'pass' },
        { label: 'Heavy metals', value: '<LOD', status: 'pass' },
        { label: 'Added agents', value: 'None', status: 'pass' },
      ],
    },
  },

  // ───────────────────────── SUPPLEMENTS ─────────────────────────
  {
    id: 'magnesium-glycinate',
    name: 'Magnesium Glycinate',
    brand: 'Basis',
    track: 'ingestibles',
    category: 'Minerals',
    icon: 'capsule',
    score: 90,
    testDate: 'Sep 2026',
    blurb: 'Fully-reacted magnesium glycinate with the elemental dose stated honestly, third-party assayed.',
    whyPassed:
      'Most magnesium supplements inflate the dose by counting the whole compound, or blend in cheap oxide and still call it glycinate. Basis states the elemental magnesium honestly, an independent assay confirmed it’s fully-reacted glycinate rather than a buffered blend, and heavy metals came in clean. Full disclosure, verified.',
    findings: [
      'Magnesium and glycine sources disclosed and supplier-named; not an anonymous bulk-ingredient buy.',
      'Fully-reacted magnesium glycinate — no undisclosed magnesium oxide and no proprietary “blend.”',
      'Current panel: heavy metals under limits; elemental magnesium independently assayed to match the label.',
      'Encapsulated at a disclosed cGMP facility; the only excipient (the capsule) is listed.',
      'Clears the external assay AND Salus Life’s label-accuracy review.',
    ],
    reference: {
      score: 88,
      items: [
        { label: 'Elemental Mg vs label', value: 'Matched', status: 'pass' },
        { label: 'Magnesium oxide', value: 'None', status: 'pass' },
        { label: 'Lead', value: '0.005 ppm', status: 'pass' },
        { label: 'Fillers', value: 'None', status: 'pass' },
        { label: 'Capsule', value: 'Disclosed', status: 'pass' },
      ],
    },
  },
  {
    id: 'creatine-monohydrate',
    name: 'Creatine Monohydrate',
    brand: 'Basis',
    track: 'ingestibles',
    category: 'Performance',
    icon: 'capsule',
    score: 92,
    testDate: 'Sep 2026',
    blurb: 'Single-ingredient creatine monohydrate, independently assayed for purity and banned substances.',
    whyPassed:
      'Creatine is simple, which is exactly why cheap versions pick up contamination in manufacturing. Basis uses a single named source, an independent assay put purity above 99.9%, and a banned-substance screen came back clean. Nothing to hide and nothing hidden — the highest score in the supplements group.',
    findings: [
      'Single named creatine source with a disclosed country of manufacture; not a repackaged bulk lot.',
      'One ingredient: creatine monohydrate. No proprietary blend, no fillers, no flavor system.',
      'Current panel: purity independently assayed above 99.9%; heavy metals and banned substances non-detect.',
      'Micronized and packed at a disclosed facility with the process stated openly.',
      'Clears a top external purity score AND Salus Life’s sourcing review.',
    ],
    reference: {
      score: 91,
      items: [
        { label: 'Purity', value: '99.9%', status: 'pass' },
        { label: 'Banned substances', value: 'None', status: 'pass' },
        { label: 'Heavy metals', value: '<LOD', status: 'pass' },
        { label: 'Dicyandiamide', value: '<LOR', status: 'pass' },
        { label: 'Fillers', value: 'None', status: 'pass' },
      ],
    },
  },

  // ───────────────────────── WATER & DRINKS ─────────────────────────
  {
    id: 'sparkling-mineral-water',
    name: 'Sparkling Mineral Water',
    brand: 'Loch Ard',
    track: 'ingestibles',
    category: 'Sparkling Water',
    icon: 'bottle',
    score: 93,
    testDate: 'Sep 2026',
    blurb: 'Naturally carbonated spring water from the same protected source as its still sibling, in glass.',
    whyPassed:
      'Same protected Highland spring as Loch Ard’s still water, naturally carbonated rather than force-injected with industrial CO₂, and bottled in glass so there’s no antimony or microplastic question. Clean panel, named source, glass packaging — an easy, well-documented pass.',
    findings: [
      'Single protected Highland spring, named and geo-verified; naturally carbonated at source.',
      'Nothing added; full mineral profile disclosed and stable across seasonal testing.',
      'Current panel: PFAS and heavy metals non-detect; bottled in glass, no plastic leaching.',
      'Bottled on-site at the named source with no intermediate handling.',
      'Top external lab score with fully transparent sourcing.',
    ],
    reference: {
      score: 92,
      items: [
        { label: 'PFAS', value: '<LOR', status: 'pass' },
        { label: 'Microplastics', value: 'None (glass)', status: 'pass' },
        { label: 'Antimony', value: '<LOD', status: 'pass' },
        { label: 'Added CO₂', value: 'None', status: 'pass' },
        { label: 'Nitrate', value: '0.5 mg/L', status: 'pass' },
      ],
    },
  },
  {
    id: 'single-origin-cold-brew',
    name: 'Single-Origin Cold Brew',
    brand: 'Meridian Roasters',
    track: 'ingestibles',
    category: 'Coffee',
    icon: 'bottle',
    score: 87,
    testDate: 'Aug 2026',
    blurb: 'Single-origin cold brew concentrate, unsweetened, with the farm and roast date disclosed.',
    whyPassed:
      'Coffee’s real risks are pesticide residue and mold-borne mycotoxins, and Meridian’s screened clean on both. It’s single-origin with a named farm and roast date, unsweetened with no additives. The small deduction is a mycotoxin reading that’s low but not the lowest we’ve seen, flagged honestly.',
    findings: [
      'Single-origin beans from a named farm with a roast date; not a blended commodity lot.',
      'Two ingredients: coffee and water. No added sugar, no preservatives, no “natural flavor.”',
      'Current panel: pesticide residue non-detect; ochratoxin A low and independently measured.',
      'Cold-brewed and bottled at a disclosed facility; process and roast date on the label.',
      'Clears the external screen and the sourcing review; the mycotoxin margin is disclosed.',
    ],
    reference: {
      score: 84,
      items: [
        { label: 'Pesticide residue', value: 'None', status: 'pass' },
        { label: 'Ochratoxin A', value: '1.2 ppb', status: 'watch' },
        { label: 'Added sugar', value: 'None', status: 'pass' },
        { label: 'Preservatives', value: 'None', status: 'pass' },
        { label: 'Origin', value: 'Verified', status: 'pass' },
      ],
    },
  },
  {
    id: 'electrolyte-mix',
    name: 'Unsweetened Electrolyte Mix',
    brand: 'Basis',
    track: 'ingestibles',
    category: 'Hydration',
    icon: 'capsule',
    score: 85,
    testDate: 'Aug 2026',
    blurb: 'Unsweetened electrolyte sticks with the full mineral dose disclosed and no hidden sweeteners.',
    whyPassed:
      'Electrolyte mixes usually bury a sugar load or an undisclosed sweetener behind “natural flavor.” Basis discloses every gram — sodium, potassium, magnesium — with no proprietary flavor blend and no sucralose, and the mineral salts screened clean. It passes, with the lowest drinks score only because the flavor, while disclosed, is a natural extract rather than a single named compound.',
    findings: [
      'Mineral salt sources disclosed and supplier-named; not an anonymous premix.',
      'Full disclosure of every mineral and the flavor source. No proprietary blend and no hidden sweetener.',
      'Current panel: heavy metals in the mineral salts under limits; no undisclosed additives found.',
      'Blended and packed at a disclosed facility with the process stated openly.',
      'Clears the external screen and the label-accuracy review; the natural-extract flavor is disclosed, not hidden.',
    ],
    reference: {
      score: 82,
      items: [
        { label: 'Added sugar', value: 'None', status: 'pass' },
        { label: 'Sucralose', value: 'None', status: 'pass' },
        { label: 'Mineral dose vs label', value: 'Matched', status: 'pass' },
        { label: 'Heavy metals', value: '<LOD', status: 'pass' },
        { label: 'Flavor source', value: 'Natural extract', status: 'watch' },
      ],
    },
  },

  // ───────────────────────── CLEANING (Household track) ─────────────────────────
  {
    id: 'surface-cleaner',
    name: 'Fragrance-Free Surface Cleaner',
    brand: 'Clearwater',
    track: 'household',
    category: 'All-Purpose',
    icon: 'bottle',
    score: 90,
    testDate: 'Sep 2026',
    blurb: 'Fragrance-free all-purpose cleaner with every ingredient — and every function — disclosed.',
    whyPassed:
      'The cleaning aisle runs on the word “fragrance,” which legally hides dozens of undisclosed compounds. Clearwater simply doesn’t use it — the product is fragrance-free with every ingredient listed and its function stated. Independent screening found no 1,4-dioxane or phthalates, and the grease-cutting claim held up under test.',
    findings: [
      'Every ingredient listed with its function; fragrance-free, so nothing hides behind a scent term.',
      'Independent screen: 1,4-dioxane and phthalates non-detect; no formaldehyde donors or high-VOC solvents.',
      'Manufactured at a named, disclosed US facility; the contract manufacturer is named.',
      'Independently tested to cut grease as claimed and rated safe for the sealed surfaces it lists.',
      'Full verdict published, including the ingredient functions and the surface-safety results.',
    ],
    reference: {
      score: 89,
      items: [
        { label: '1,4-Dioxane', value: '<LOR', status: 'pass' },
        { label: 'Phthalates', value: 'None', status: 'pass' },
        { label: 'Formaldehyde donors', value: 'None', status: 'pass' },
        { label: 'Undisclosed fragrance', value: 'None', status: 'pass' },
        { label: 'VOC content', value: 'Low', status: 'pass' },
      ],
    },
  },
  {
    id: 'plant-dish-soap',
    name: 'Plant-Based Dish Soap',
    brand: 'Verdant Home',
    track: 'household',
    category: 'Dish',
    icon: 'bottle',
    score: 88,
    testDate: 'Aug 2026',
    blurb: 'Plant-derived dish soap with the full surfactant list and no undisclosed preservative system.',
    whyPassed:
      'Dish soap sits on your hands and your dishes, so preservative and surfactant disclosure matters. Verdant Home lists every surfactant by name, uses a disclosed preservative rather than a hidden formaldehyde donor, and screened clean for 1,4-dioxane — the contaminant that forms during cheap ethoxylation. It passes with a small deduction on fragrance, a disclosed essential-oil blend rather than a fully itemized one.',
    findings: [
      'Surfactants listed by name; fragrance is a disclosed essential-oil blend, itemized at the top level.',
      'Independent screen: 1,4-dioxane non-detect; preservative disclosed, no formaldehyde donors.',
      'Manufactured at a disclosed US facility; the surfactant supplier is named.',
      'Independently tested to cut grease as claimed and rated gentle for repeated skin contact.',
      'Full verdict published, including the essential-oil disclosure deduction.',
    ],
    reference: {
      score: 86,
      items: [
        { label: '1,4-Dioxane', value: '<LOR', status: 'pass' },
        { label: 'Formaldehyde donors', value: 'None', status: 'pass' },
        { label: 'Preservative', value: 'Disclosed', status: 'pass' },
        { label: 'Fragrance detail', value: 'Blend-level', status: 'watch' },
        { label: 'Skin irritation', value: 'Low', status: 'pass' },
      ],
    },
  },
  {
    id: 'oxygen-laundry-powder',
    name: 'Oxygen Laundry Powder',
    brand: 'Verdant Home',
    track: 'household',
    category: 'Laundry',
    icon: 'seed',
    score: 86,
    testDate: 'Jul 2026',
    blurb: 'Fragrance-free oxygen laundry powder with a short, fully-disclosed ingredient list.',
    whyPassed:
      'Laundry products leave residue on everything you wear against your skin, so a short honest ingredient list beats a long proprietary one. Verdant Home’s powder is fragrance-free with every component disclosed, screened clean for the usual contaminants, and independently tested to actually lift stains. A straightforward pass with a minor deduction on packaging documentation.',
    findings: [
      'Every component listed; fragrance-free, with no optical brighteners hidden behind a scent term.',
      'Independent screen: no 1,4-dioxane, no phosphates, no undisclosed enzymes above limits.',
      'Manufactured at a disclosed facility; refusal-to-disclose was never an issue here.',
      'Independently tested to lift common stains as claimed at the stated dose.',
      'Verdict published, with a noted deduction for thinner packaging-material documentation.',
    ],
    reference: {
      score: 84,
      items: [
        { label: '1,4-Dioxane', value: '<LOR', status: 'pass' },
        { label: 'Phosphates', value: 'None', status: 'pass' },
        { label: 'Optical brighteners', value: 'None', status: 'pass' },
        { label: 'Undisclosed fragrance', value: 'None', status: 'pass' },
        { label: 'Packaging docs', value: 'Partial', status: 'watch' },
      ],
    },
  },
  {
    id: 'castile-hand-soap',
    name: 'Castile Hand Soap',
    brand: 'Clearwater',
    track: 'household',
    category: 'Hand Soap',
    icon: 'bottle',
    score: 91,
    testDate: 'Sep 2026',
    blurb: 'Traditional castile hand soap from disclosed plant oils, with nothing hidden in the scent.',
    whyPassed:
      'Castile is one of the oldest, simplest soap formulas, and Clearwater keeps it that way: named plant oils, a disclosed light scent, no synthetic preservative and no hidden fragrance. Independent screening was clean across the board and it tested skin-safe. The highest score in the cleaning group precisely because there’s so little to it.',
    findings: [
      'Plant oils named individually; the scent is a disclosed, itemized essential oil, not a “fragrance.”',
      'Independent screen: no 1,4-dioxane, no synthetic preservative, no formaldehyde donors.',
      'Saponified and bottled at a disclosed facility; the oil suppliers are named.',
      'Independently rated gentle and effective for frequent hand-washing.',
      'Full verdict published, including the complete ingredient-function list.',
    ],
    reference: {
      score: 90,
      items: [
        { label: '1,4-Dioxane', value: '<LOR', status: 'pass' },
        { label: 'Synthetic preservative', value: 'None', status: 'pass' },
        { label: 'Undisclosed fragrance', value: 'None', status: 'pass' },
        { label: 'Skin irritation', value: 'Very low', status: 'pass' },
        { label: 'Ingredient disclosure', value: 'Full', status: 'pass' },
      ],
    },
  },
]

// Plausible mock retail prices (USD) + a short unit note, attached by id so the
// product objects above stay focused on certification data.
const PRICING = {
  'aurora-infrared-sauna': { price: 4200, note: '1–2 person cabin' },
  'halcyon-barrel-sauna': { price: 5600, note: '4-person barrel' },
  'meridian-cold-plunge-xl': { price: 5900, note: '320L · chiller included' },
  'tundra-chiller': { price: 1290, note: '½ HP inline chiller' },
  'pulse-percussive-massager': { price: 299, note: 'device + 5 heads' },
  'aero-compression-boots': { price: 899, note: 'boots + pump' },
  'northfield-grass-fed-whey': { price: 44, note: '2 lb tub' },
  'loch-ard-spring-water': { price: 38, note: 'case of 12 · glass' },
  'cold-current-sockeye-oil': { price: 42, note: '60 softgels' },
  'pasture-ridge-ribeye': { price: 68, note: 'two 12 oz steaks' },
  'fen-root-reishi': { price: 34, note: '2 fl oz tincture' },
  'northfield-cold-milled-flax': { price: 18, note: '1.5 lb bag' },
  'estate-olive-oil': { price: 29, note: '500 ml tin' },
  'sprouted-rolled-oats': { price: 12, note: '2 lb bag' },
  'magnesium-glycinate': { price: 26, note: '120 capsules' },
  'creatine-monohydrate': { price: 32, note: '300 g · unflavored' },
  'sparkling-mineral-water': { price: 34, note: 'case of 12 · glass' },
  'single-origin-cold-brew': { price: 24, note: '4-pack concentrate' },
  'electrolyte-mix': { price: 28, note: '30 stick packs' },
  'surface-cleaner': { price: 9, note: '24 fl oz spray' },
  'plant-dish-soap': { price: 8, note: '16 fl oz' },
  'oxygen-laundry-powder': { price: 19, note: '3.5 lb tub' },
  'castile-hand-soap': { price: 11, note: '12 fl oz' },
}

// Consumer browse category (distinct from `track`, which selects the rubric).
const GROUPS = {
  'aurora-infrared-sauna': 'equipment',
  'halcyon-barrel-sauna': 'equipment',
  'meridian-cold-plunge-xl': 'equipment',
  'tundra-chiller': 'equipment',
  'pulse-percussive-massager': 'equipment',
  'aero-compression-boots': 'equipment',
  'pasture-ridge-ribeye': 'food',
  'northfield-cold-milled-flax': 'food',
  'estate-olive-oil': 'food',
  'sprouted-rolled-oats': 'food',
  'northfield-grass-fed-whey': 'supplements',
  'cold-current-sockeye-oil': 'supplements',
  'fen-root-reishi': 'supplements',
  'magnesium-glycinate': 'supplements',
  'creatine-monohydrate': 'supplements',
  'loch-ard-spring-water': 'drinks',
  'sparkling-mineral-water': 'drinks',
  'single-origin-cold-brew': 'drinks',
  'electrolyte-mix': 'drinks',
  'surface-cleaner': 'cleaning',
  'plant-dish-soap': 'cleaning',
  'oxygen-laundry-powder': 'cleaning',
  'castile-hand-soap': 'cleaning',
}

// Auto-load real product photos: drop a file named `<product-id>.jpg` (or
// .png/.webp/.avif) into src/assets/products/ and it appears automatically —
// no per-product code changes. Until then, each card falls back to line-art.
const PHOTOS = import.meta.glob('../assets/products/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const photoById = {}
for (const path in PHOTOS) {
  const name = path.split('/').pop().replace(/\.[^.]+$/, '')
  photoById[name] = PHOTOS[path]
}

PRODUCTS.forEach((p) => {
  p.price = PRICING[p.id].price
  p.priceNote = PRICING[p.id].note
  p.group = GROUPS[p.id]
  p.image = photoById[p.id] // undefined → line-art fallback
})

// Ordered browse categories for the catalog and home page.
export const GROUP_META = [
  { id: 'equipment', label: 'Equipment' },
  { id: 'food', label: 'Food' },
  { id: 'supplements', label: 'Supplements' },
  { id: 'drinks', label: 'Water & Drinks' },
  { id: 'cleaning', label: 'Cleaning' },
]

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id)
}

export function productsByTrack(track) {
  if (track === 'all') return PRODUCTS
  return PRODUCTS.filter((p) => p.track === track)
}

export function productsByGroup(group) {
  if (group === 'all') return PRODUCTS
  return PRODUCTS.filter((p) => p.group === group)
}
