// The two certification standards, verbatim to Salus Life's real 5-part rubrics.
// `passBar` is the disqualifying-condition language shown as supporting detail.

export const TRACKS = {
  equipment: {
    id: 'equipment',
    name: 'Equipment',
    tagline: 'Saunas, cold plunge, recovery tech',
    icon: 'sauna',
    flagship: true,
    lede:
      'Durable goods in wellness have no independent scoring at all. The best-marketed product wins, whether or not it is the best-made one. Equipment is our flagship standard because there is no incumbent to argue with — only a vacuum to fill.',
    rubric: [
      {
        title: 'Materials & construction',
        summary:
          'Full material disclosure, not a marketing spec sheet. Food- or medical-grade materials are required at every point the product contacts skin, water, or heat.',
        passBar:
          'Undisclosed adhesives in a heat-generating product are an automatic fail. "Premium materials" without a named grade does not clear the bar.',
      },
      {
        title: 'Safety testing',
        summary:
          'Independent EMF testing for electronics, off-gassing testing for anything heated or enclosed, and UL/ETL-equivalent certification for anything that plugs in.',
        passBar:
          'Self-attested safety is not evidence. Missing third-party EMF or off-gassing data on a heated product is a fail, not a pending item.',
      },
      {
        title: 'Manufacturing & sourcing transparency',
        summary:
          'The country and facility of manufacture must be disclosed. We verify where a product is actually made against where it claims to be made.',
        passBar:
          'Refusal to disclose the facility of manufacture is an automatic fail. "Designed in" is not "made in."',
      },
      {
        title: 'Performance & durability',
        summary:
          'The product is independently tested against its specific claim — a chiller must actually hold its stated temperature — with warranty length read as a confidence proxy.',
        passBar:
          'A claim that cannot be reproduced under test fails. A warranty shorter than the category norm is treated as a signal, not decoration.',
      },
      {
        title: 'Published documentation',
        summary:
          'Every decision must be explainable in plain language and published in full — the reasoning behind the verdict, not just the verdict.',
        passBar:
          'If we cannot write down why it passed in language a buyer can read, it does not pass.',
      },
    ],
  },

  ingestibles: {
    id: 'ingestibles',
    name: 'Ingestibles',
    tagline: 'Food & supplements',
    icon: 'capsule',
    flagship: false,
    lede:
      'Sourcing and ingredient claims are self-reported, and greenwashing is rampant. Ingestibles lean on independent lab scorers for the chemistry, and on Salus Life for the sourcing and transparency review that labs do not do.',
    rubric: [
      {
        title: 'Sourcing & agricultural practice',
        summary:
          'Farm-level verification and traceability to a specific, named source — not an anonymous supply chain reconstructed after the fact.',
        passBar:
          'Traceable to a named farm or co-op passes. An anonymous or interchangeable supply chain fails.',
      },
      {
        title: 'Ingredient & additive screening',
        summary:
          'Full ingredient disclosure with no proprietary blends, and no disqualifying additives hiding behind a flavor or "natural" label.',
        passBar:
          'Proprietary blends fail on disclosure grounds alone. A single disqualifying additive fails the product outright.',
      },
      {
        title: 'Contaminant & lab testing',
        summary:
          'Current independent lab data on heavy metals, pesticide residue, and relevant contaminants — leaning on external scorers rather than an in-house lab.',
        passBar:
          'Contaminant levels above category limits fail. Lab data older than the current production run does not count as current.',
      },
      {
        title: 'Processing & manufacturing transparency',
        summary:
          'Facility practices are disclosed and reviewed. How a product is processed is part of what it is.',
        passBar:
          'Refusal to disclose processing is a fail, not a neutral unknown. Silence is a verdict.',
      },
      {
        title: 'Independent verification threshold',
        summary:
          'The product must clear a minimum external lab score AND pass Salus Life’s own sourcing and transparency review. Neither one alone is sufficient.',
        passBar:
          'A top lab score with opaque sourcing fails. Clean sourcing with a weak or stale lab score fails. Both must hold.',
      },
    ],
  },

  household: {
    id: 'household',
    name: 'Household',
    tagline: 'Cleaning & home',
    icon: 'bottle',
    flagship: false,
    lede:
      'Cleaning products are ingredient claims you spread on every surface in your home and then breathe. “Non-toxic” and “natural” mean nothing on a label, so we hold them to the same rigor as things you swallow: full disclosure, independent screening, and a published verdict.',
    rubric: [
      {
        title: 'Ingredient & fragrance disclosure',
        summary:
          'Every ingredient listed with its function — including each component of “fragrance,” the catch-all term that legally hides dozens of undisclosed compounds.',
        passBar:
          'A blanket “fragrance” or “proprietary scent” with undisclosed components is a fail on disclosure alone.',
      },
      {
        title: 'Toxicity & contaminant screening',
        summary:
          'Independent screening for disqualifying substances — 1,4-dioxane, phthalates, formaldehyde donors, high-VOC solvents — against current data.',
        passBar:
          'Any disqualifying substance above its limit fails, whether it was added deliberately or formed as a manufacturing byproduct.',
      },
      {
        title: 'Manufacturing & sourcing transparency',
        summary:
          'Country and facility of manufacture disclosed and verified against where the product claims to be made.',
        passBar:
          'Refusal to disclose the facility of manufacture is an automatic fail.',
      },
      {
        title: 'Performance & safety',
        summary:
          'Independently tested that it actually works as claimed and is safe for the surfaces and skin contact it specifies.',
        passBar:
          'An efficacy claim that can’t be reproduced under test fails; unsafe skin or surface contact fails.',
      },
      {
        title: 'Published documentation',
        summary:
          'Every decision explainable in plain language and published in full — the reasoning, not just a badge.',
        passBar:
          'If we can’t write down why it passed in language a buyer can read, it does not pass.',
      },
    ],
  },
}

export const PROCESS = [
  {
    num: '01',
    title: 'Nominated or submitted',
    body: 'By us, by a customer, or by the brand itself. Submissions are free — there is no fee to be considered.',
  },
  {
    num: '02',
    title: 'Independent verification',
    body: 'Lab data, sourcing records, and manufacturing disclosures are checked against the category’s threshold.',
  },
  {
    num: '03',
    title: 'Pass or fail',
    body: 'Binary. No partial credit and no conditional passes. It clears the bar or it does not.',
  },
  {
    num: '04',
    title: 'Mark issued, publicly',
    body: 'The full reasoning is published alongside the verdict — so anyone can check our work.',
  },
]
