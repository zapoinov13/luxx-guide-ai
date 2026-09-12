import type { BookingLabels, BookingOption } from "@/components/booking-form";
import { SITE, hostelSchema, type QA } from "@/lib/site";

/**
 * English content. Facts mirror src/lib/site.ts and src/lib/qa.ts: when a fact
 * changes there, change it here too. Prices are the client's rates for
 * September 2026 (bed per person, private rooms per room).
 */

export const EN = {
  tagline: "Hostel and apartments in Almaty",
  whoWeAre:
    "Luxx Aparts is a hostel and apartments in Almaty at 286/8 Tole Bi Street: 44 rooms, shared kitchen, 24/7 front desk, Wi-Fi, 7 km from Almaty-2 railway station",
  address: "286/8 Tole Bi Street, 2nd floor, Almaty",
  complex: "Kausar residential complex",
  distanceToStation: "7 km from Almaty-2 railway station",
  factsUpdated: "September 2026",
} as const;

export const NAV_EN = [
  ["/en/rooms", "Rooms"],
  ["/en/amenities", "Amenities"],
  ["/en/how-to-get-there", "Getting here"],
  ["/en/house-rules", "House rules"],
  ["/en/faq", "FAQ"],
  ["/en/contacts", "Contacts"],
] as const;

export const fmtEn = (n: number) => n.toLocaleString("en-US");

export const AMENITIES_EN = [
  { name: "Shared kitchen with cookware", detail: "Stove, microwave, fridge, free tea and coffee" },
  { name: "Wi-Fi", detail: "Free, in every area" },
  { name: "Coworking and lounge", detail: "Desks for laptops, TV in the lobby" },
  { name: "Washing machine", detail: "Iron and ironing board" },
  { name: "Air conditioning and heating", detail: "Ventilation in every room" },
  { name: "Soundproofed rooms", detail: "Power socket and reading lamp at every bed" },
  { name: "Lockers", detail: "For personal items in shared rooms" },
  { name: "Luggage storage", detail: "Before check-in and after check-out" },
  { name: "24/7 front desk and security", detail: "Staff speak Russian and English" },
  { name: "Hot showers and hair dryer", detail: "Hair dryer available at the desk on request" },
  { name: "Playground and board games", detail: "For families with children" },
  { name: "Parking nearby", detail: "Ask the desk for a spot" },
] as const;

export const ROOM_TYPES_EN = [
  {
    slug: "koyko-mesto",
    name: "Bed in a shared dorm",
    short: "Capsule beds with curtains in male and female dorms of 10–14 beds",
    capacity: "1 guest",
    bath: "Shared bathroom on the floor",
    price: `${fmtEn(6000)} ₸ per night`,
    priceNote: "per bed, September 2026",
    includes: ["Bed linen", "Locker", "Socket and reading lamp", "Kitchen, Wi-Fi, laundry"],
    forWhom: "Solo travellers, students, transit guests",
  },
  {
    slug: "odnomestny",
    name: "Single room Economy",
    short: "Private lockable room, with or without a window",
    capacity: "1 guest",
    bath: "Shared bathroom on the floor",
    price: `${fmtEn(10000)}–${fmtEn(11000)} ₸ per night`,
    priceNote: "10,000 ₸ without a window, 11,000 ₸ with a window",
    includes: ["Bed linen", "Air conditioning and heating", "Kitchen, Wi-Fi, laundry"],
    forWhom: "Business travellers and long stays",
  },
  {
    slug: "dvukhmestny",
    name: "Double room Economy",
    short: "Private room with a double bed and a window",
    capacity: "2 guests",
    bath: "Shared bathroom on the floor",
    price: `${fmtEn(15000)} ₸ per night`,
    priceNote: "per room, September 2026",
    includes: ["Bed linen", "Air conditioning and heating", "Kitchen, Wi-Fi, laundry"],
    forWhom: "Couples and families",
  },
] as const;

export const DISTANCES_EN = [
  {
    name: "Sairan bus station",
    value: "same street, a few minutes on foot",
    short: "same street",
    how: "a few minutes on foot",
    kind: "bus",
  },
  {
    name: "Sairan metro station",
    value: "1.9 km",
    short: "1.9 km",
    how: "20–25 min on foot or 5 min by taxi",
    kind: "metro",
  },
  {
    name: "Moskva metro station",
    value: "2.4 km",
    short: "2.4 km",
    how: "25 min on foot or 5 min by taxi",
    kind: "metro",
  },
  {
    name: "Almaty-2 railway station",
    value: "7 km",
    short: "7 km",
    how: "15–25 min by taxi",
    kind: "train",
  },
  {
    name: "Almaty-1 railway station",
    value: "14 km",
    short: "14 km",
    how: "about 30 min by taxi",
    kind: "train",
  },
  {
    name: "Almaty airport",
    value: "about 20 km",
    short: "≈ 20 km",
    how: "by taxi, at night too",
    kind: "plane",
  },
] as const;

export const HOME_FAQ_EN: QA[] = [
  [
    "Is there a kitchen?",
    "Yes, a shared kitchen with a stove, microwave, fridge, cookware and a kettle. Tea and coffee are free. A washing machine and an iron are next to it.",
  ],
  [
    "Can I check in at night?",
    `The front desk works 24/7. Standard check-in is from ${SITE.checkIn.from} to ${SITE.checkIn.to}. If you arrive later, message us on WhatsApp in advance and we will confirm the late check-in.`,
  ],
  [
    "Do you accept foreign guests?",
    "Yes. Staff speak Russian and English. Bring your passport for check-in; ask the desk about registration requirements before you arrive.",
  ],
  [
    "Can I stay with children?",
    "Yes, families stay in private rooms. Guests under 18 check in only with a parent or guardian. There is a playground and board games.",
  ],
  [
    "How far is the city centre?",
    "About 6 km: 15–25 minutes by taxi or by metro from Sairan station (1.9 km away). Almaty-2 railway station is 7 km away, the airport about 20 km, and Sairan bus station is on the same street.",
  ],
];

export const RULES_EN: QA[] = [
  [
    "What are the check-in and check-out times?",
    `Check-in from ${SITE.checkIn.from} to ${SITE.checkIn.to}, check-out by ${SITE.checkOut}. Early check-in and late check-out are possible if the room is free: ask when booking.`,
  ],
  [
    "Which documents do I need?",
    "A photo ID. Kazakhstan citizens need their ID card, foreign guests need a passport. Ask the desk about registration of foreign citizens before arrival.",
  ],
  [
    "Can I stay with children?",
    "Yes, families stay in private rooms. Guests under 18 check in only with a parent or guardian. There is a playground and board games.",
  ],
  ["Are pets allowed?", "No, pets are not allowed."],
  [
    "Can I smoke?",
    "Smoking is not allowed in rooms, the kitchen or common areas. The desk will show you where you can smoke outside.",
  ],
  [
    "Can I throw a party?",
    "No. Parties, stag and hen dos are not allowed: other guests live here, many work remotely and get up early.",
  ],
  [
    "Is there a deposit? How do I pay?",
    "You pay at check-in, in cash (tenge) or by card. No prepayment through the website. Ask when booking whether a deposit applies to a private room.",
  ],
  [
    "What is the cancellation policy?",
    "For bookings through platforms, free cancellation applies until one day before arrival; later cancellations and no-shows are charged the first night. For direct bookings the desk confirms the terms before you pay.",
  ],
  [
    "What if I arrive at night?",
    `The desk works 24/7, but standard check-in ends at ${SITE.checkIn.to}. Message us your arrival time on WhatsApp and we will confirm the night check-in.`,
  ],
  [
    "Are there quiet hours?",
    "Rooms are soundproofed, but after 23:00 we ask you to keep common areas quiet and use headphones.",
  ],
];

export const FAQ_EN: QA[] = [
  [
    "How much does a night cost?",
    `A dorm bed is ${fmtEn(6000)} ₸, a single room ${fmtEn(10000)} ₸ without a window or ${fmtEn(11000)} ₸ with a window, a double room ${fmtEn(15000)} ₸ per room (prices as of ${EN.factsUpdated}). Weekly and monthly stays are priced individually. No platform commission when you book directly.`,
  ],
  [
    "Are there private rooms?",
    "Yes: single rooms with or without a window and double rooms with a window, all lockable. The bathroom is shared on the floor.",
  ],
  [
    "Can I stay for a month?",
    "Yes. Weekly and monthly rates are agreed individually: send your dates and we will quote.",
  ],
  ["Do you accept cards?", "Yes. Pay at check-in in cash (tenge) or by card."],
  [
    "Is there a kitchen?",
    "Yes, a shared kitchen with a stove, microwave, fridge, cookware and a kettle. Tea and coffee are free.",
  ],
  [
    "How do I get there from the railway station?",
    "Almaty-2 station is 7 km away, easiest by taxi to 286/8 Tole Bi. Sairan bus station is on the same street and Sairan metro station is 1.9 km away.",
  ],
  [
    "Is there luggage storage?",
    "Yes. Leave your bags at the desk for free before check-in and after check-out.",
  ],
  [
    "Can I walk in without a booking?",
    `You can, but it is better to confirm availability first on WhatsApp or by phone ${SITE.phoneDisplay}, especially in the evening and at weekends.`,
  ],
  [
    "Are there female-only dorms?",
    "Yes, dorms are separate: female and male, 10–14 capsule beds each. The desk confirms availability for your dates.",
  ],
  [
    "Are bed linen and towels included?",
    "Bed linen is included. Towels are available at the desk for a small fee, a hair dryer on request.",
  ],
  [
    "Is there Wi-Fi and a place to work?",
    "Free Wi-Fi everywhere, plus a coworking area and desks in the lounge. Every bed has a socket.",
  ],
  [
    "Can I check in at night?",
    `Standard check-in is ${SITE.checkIn.from}–${SITE.checkIn.to}. The desk works 24/7, but please agree a late check-in in advance.`,
  ],
];

export const AMENITY_QA_EN: QA[] = [
  [
    "What is in the kitchen?",
    "A stove, microwave, fridge, cookware and a kettle. Tea and coffee are free. You can cook at any time; please wash up after yourself.",
  ],
  [
    "Can I do laundry?",
    "Yes. There is a washing machine, an iron and an ironing board. Ask the desk about the queue.",
  ],
  [
    "Where does Wi-Fi work?",
    "Everywhere in the hostel. The desk gives you the password at check-in. For work there is a coworking area and desks in the lounge.",
  ],
  [
    "Where can I leave my luggage?",
    "In the luggage room at the desk, free of charge, before check-in and after check-out.",
  ],
  [
    "Is there air conditioning and heating?",
    "Yes, in every room, plus ventilation. Rooms are soundproofed and every bed has a socket and a reading lamp.",
  ],
  [
    "Is it safe?",
    "The desk and security work 24/7, guests only. Every guest in a dorm has a locker; keep valuables there.",
  ],
  [
    "Which services are paid?",
    "Towels and the laundry service with ironing. Kitchen, Wi-Fi, washing machine, luggage storage, tea and coffee are free.",
  ],
];

/** Platform names as shown in English (RATINGS[].source → label). */
export const SOURCE_EN: Record<string, string> = { "Яндекс Карты": "Yandex Maps" };
export const sourceEn = (source: string) => SOURCE_EN[source] ?? source;

export const pluralReviewsEn = (n: number) => `${n} ${n === 1 ? "review" : "reviews"}`;

/** Hostel node for English pages: same facts, English description and amenity names. */
export const hostelSchemaEn = () => ({
  ...hostelSchema(),
  description: EN.whoWeAre,
  priceRange: `${fmtEn(SITE.priceFrom)}–${fmtEn(SITE.priceTo)} ₸`,
  paymentAccepted: "Cash, bank card",
  amenityFeature: AMENITIES_EN.map((a) => ({
    "@type": "LocationFeatureSpecification",
    name: a.name,
    value: true,
  })),
});

/** Booking form: options and labels for /en/booking. */
export const BOOKING_OPTIONS_EN: readonly BookingOption[] = [
  { label: "Bed in the male dorm", price: 6000, perBed: true },
  { label: "Bed in the female dorm", price: 6000, perBed: true },
  { label: "Single room with a window", price: 11000, perBed: false },
  { label: "Single room without a window", price: 10000, perBed: false },
  { label: "Double room", price: 15000, perBed: false },
  { label: "Not decided yet", price: null, perBed: false },
];

/** Preselected option for ?room=<slug> links from room cards. */
export const BOOKING_PRESET_EN: Record<string, string> = {
  "koyko-mesto": BOOKING_OPTIONS_EN[0]!.label,
  odnomestny: BOOKING_OPTIONS_EN[2]!.label,
  dvukhmestny: BOOKING_OPTIONS_EN[4]!.label,
};

export const BOOKING_LABELS_EN: BookingLabels = {
  checkIn: "Check-in date",
  checkOut: "Check-out date",
  guests: "Guests",
  room: "Accommodation",
  name: "Name",
  phone: "Phone",
  comment: "Comment",
  commentPlaceholder: "For example: arriving at night, need a room with a window",
  estimateTitle: "Estimated total",
  estimateNote: (perBed) =>
    `Base rates as of ${EN.factsUpdated}, ${perBed ? "per guest" : "per room"}. The desk confirms the final amount; you pay at check-in.`,
  estimateEmpty:
    "Choose dates and a room type to see an estimate at base rates: dorm bed 6,000 ₸, single room 10,000–11,000 ₸, double room 15,000 ₸.",
  submit: "Send via WhatsApp",
  call: "Call",
  sentText: "Your request is open in WhatsApp, just press Send. If the window did not appear,",
  sentLink: "open it by this link",
  privacy:
    "Nothing is stored: the request text opens in your own WhatsApp and you are the one who sends it.",
  nights: (n) => `${n} ${n === 1 ? "night" : "nights"}`,
  message: (f) =>
    [
      "Hello! I would like to book a stay at Luxx Aparts.",
      f.dates ? `Dates: ${f.dates}.` : "",
      `Guests: ${f.guests}.`,
      `Room: ${f.room}.`,
      f.estimate ? `Estimate: ${f.estimate}.` : "",
      f.name ? `My name is ${f.name}.` : "",
      f.phone ? `Phone: ${f.phone}.` : "",
      f.comment ? `Comment: ${f.comment}` : "",
    ]
      .filter(Boolean)
      .join(" "),
};
