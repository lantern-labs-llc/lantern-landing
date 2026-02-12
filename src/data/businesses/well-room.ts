import { Business } from "@/lib/types/business";

export const wellRoom: Business = {
  slug: "well-room",
  name: "Well Room",
  tagline: "Charlottesville's Premier Wellness Studio",
  description:
    "Well Room is a holistic wellness and aesthetic practice in Charlottesville, Virginia, founded by Megan Kingdon — a dual board-certified Nurse Practitioner with a Master's from Columbia University and over 20 years in medicine.",
  owner: "Megan Kingdon",
  ownerTitle: "NP, Founder",
  ownerCredentials: "Columbia '04",
  address: "134 10th St NW",
  city: "Charlottesville",
  state: "VA",
  zip: "22903",
  phone: "(434) 933-6100",
  website: "https://www.wellroomva.com",
  bookingUrl: "https://wellroomva.as.me/appointments",
  favicon: "/favicons/well-room.ico",
  latitude: 38.0337,
  longitude: -78.4938,
  rating: 4.9,
  reviewCount: 150,
  parking: "Free parking",
  heroSubtitle:
    "Charlottesville's top-rated holistic wellness studio. Private infrared sauna, IV therapy, cryotherapy, facials, and more.",
  trustSignals: [
    { icon: "★", title: "4.9 Stars", detail: "150+ Google reviews" },
    { icon: "◎", title: "Private Rooms", detail: "Never shared with strangers" },
    { icon: "✦", title: "NP-Led", detail: "Megan Kingdon, Columbia\u00a004" },
  ],
  howItWorks: [
    {
      title: "Pick your service",
      description:
        "Infrared sauna, IV therapy, cryotherapy, or facials. Not sure? The sauna is a great starting point.",
    },
    {
      title: "Book online in 30 seconds",
      description:
        "Choose your time and enter code LANTERN15 at checkout for 15% off.",
    },
    {
      title: "Show up and relax",
      description:
        "134 10th St NW, Charlottesville. Free parking. Towels and everything you need provided.",
    },
  ],
  hours: [
    { day: "Monday", open: "10:00 AM", close: "4:00 PM" },
    { day: "Tuesday", open: "10:00 AM", close: "4:00 PM" },
    { day: "Wednesday", open: "10:00 AM", close: "4:00 PM" },
    { day: "Thursday", open: "10:00 AM", close: "4:00 PM" },
    { day: "Friday", open: "10:00 AM", close: "4:00 PM" },
    { day: "Saturday", closed: true, open: "", close: "" },
    { day: "Sunday", closed: true, open: "", close: "" },
  ],
  promoCode: {
    code: "LANTERN15",
    description: "15% off your first visit",
    discount: "15%",
  },
  services: [
    {
      slug: "infrared-sauna",
      name: "Infrared Sauna",
      shortDescription:
        "Private room. Near + far infrared. 20 or 40 minute sessions.",
      description:
        "Infrared saunas use near and far infrared wavelengths to warm the body directly, rather than heating the air like a traditional sauna. This produces a deep, therapeutic sweat at lower, more comfortable air temperatures — typically 120–160°F compared to 180°F+ in a traditional sauna.\n\nWell Room uses both carbon (near infrared) and ceramic (far infrared) emitters for full-spectrum coverage. All sessions take place in private rooms — each session is individual or with a guest, never shared with other clients.",
      duration: "20 or 40 min",
      price: "From ~$35",
      isPrivate: true,
      bookingUrl:
        "https://wellroomva.as.me/?appointmentType=category:Infrared%20Sauna",
      benefits: [
        "Deep detoxification through sweating",
        "Reduced muscle and joint pain",
        "Improved circulation and cardiovascular health",
        "Stress relief and better sleep",
        "Skin purification and anti-aging benefits",
        "Calorie burn and weight management support",
      ],
      commonReasons: [
        "Stress relief and relaxation",
        "Muscle recovery and soreness after exercise",
        "Detoxification support",
        "Skin health and improved circulation",
        "General wellness and immune support",
        "Chronic pain management",
      ],
      pricing: [
        { name: "Single Session · 20 min", price: "~$35" },
        { name: "Single Session · 40 min", price: "~$55" },
        { name: "5-Session Package", price: "Available" },
        { name: "Monthly Membership", price: "Available" },
      ],
      whatToExpect: [
        { label: "Duration", value: "20 or 40 minutes — you choose when booking" },
        { label: "Setting", value: "Private room, just you (or you and a guest)" },
        { label: "Provided", value: "Towels and cold towels included" },
        { label: "What to wear", value: "Loose clothing or a towel" },
        { label: "Booking", value: "Online or walk-in when available" },
        { label: "First visit", value: "Arrive 5 minutes early" },
      ],
      beforeAfter: {
        before:
          "Hydrate well. Avoid heavy meals, caffeine, and alcohol. A quick shower helps open pores for better detoxification.",
        after:
          "Drink water. Rest for a few minutes. Moisturize. Avoid cold water immersion immediately after.",
      },
      facts: [
        { label: "Type", value: "Near + far infrared (full spectrum)" },
        { label: "Walk-ins", value: "Welcome when available" },
        { label: "Proximity", value: "5-min walk from UVA Rotunda" },
      ],
      faqs: [
        {
          question: "Is the infrared sauna at Well Room private?",
          answer:
            "Yes. All sauna sessions at Well Room are in private rooms. Each session is for one person or a pair — never shared with strangers.",
        },
        {
          question: "Do I need to make an appointment?",
          answer:
            "Appointments are recommended to guarantee your time slot, but walk-ins are welcome when space is available. Online booking takes about 30 seconds.",
        },
        {
          question: "How much does an infrared sauna session cost?",
          answer:
            "Sessions start at approximately $35 for 20 minutes and $55 for 40 minutes. Packages and monthly unlimited memberships are available at a discount.",
        },
        {
          question: "Is infrared sauna safe?",
          answer:
            "Infrared sauna is considered safe for most healthy adults. Consult your doctor first if you are pregnant, have cardiovascular conditions, or take medications that affect heat tolerance. Well Room is led by nurse practitioner Megan Kingdon, who can address specific health concerns.",
        },
        {
          question: "How is infrared sauna different from a regular sauna?",
          answer:
            "Traditional saunas heat the surrounding air to 180°F or higher. Infrared saunas use infrared wavelengths to warm the body directly at lower air temperatures (120–160°F), producing a comparable therapeutic sweat with less discomfort. Many people who find traditional saunas too intense prefer infrared.",
        },
        {
          question: "How often should I use the infrared sauna?",
          answer:
            "For general wellness, 1–2 sessions per week is typical. Many Well Room regulars come weekly. Benefits are cumulative — consistent use tends to produce better results than occasional sessions.",
        },
        {
          question:
            "What makes Well Room different from other saunas in Charlottesville?",
          answer:
            "Well Room is the only Charlottesville wellness practice combining private infrared sauna rooms with IV therapy, cryotherapy, facials, and medical aesthetics under one roof. It's led by Megan Kingdon, a dual board-certified nurse practitioner with a Master's from Columbia and over 20 years in medicine. The business has a 4.9-star Google rating across 150+ reviews, with consistent praise for the welcoming atmosphere, cleanliness, and knowledgeable staff.",
        },
        {
          question: "Can I combine the sauna with other treatments?",
          answer:
            "Yes. Many clients pair infrared sauna with IV therapy, cryotherapy, or facials in a single visit. Staff can recommend complementary treatment combinations.",
        },
        {
          question: "Where is Well Room located?",
          answer:
            "134 10th Street NW in Charlottesville, Virginia — a 5-minute walk from the UVA Rotunda and adjacent to the Downtown Mall. Free parking is available on-site.",
        },
      ],
    },
    {
      slug: "iv-therapy",
      name: "IV Therapy",
      shortDescription:
        "Custom nutrient blends for energy, recovery, immunity, and hydration.",
      description:
        "Our IV therapy sessions deliver vitamins, minerals, and hydration directly into your bloodstream for maximum absorption. Administered by our nurse practitioner, each drip is formulated to target specific wellness goals — from immune boosting and hangover recovery to energy enhancement and athletic performance.",
      duration: "30–45 min",
      price: "From ~$150",
      isPrivate: true,
      bookingUrl:
        "https://wellroomva.as.me/?appointmentType=category:IV%20Therapy",
      benefits: [
        "100% bioavailability — nutrients go directly into your bloodstream",
        "Rapid hydration and electrolyte replenishment",
        "Immune system support with high-dose vitamin C",
        "Increased energy and mental clarity",
        "Faster recovery from illness, travel, or exercise",
        "Administered by a licensed nurse practitioner",
      ],
      faqs: [
        {
          question: "Who administers the IV therapy?",
          answer:
            "All IV therapy sessions at Well Room are administered by Megan Kingdon, NP, our founder and licensed nurse practitioner with years of clinical experience.",
        },
        {
          question: "How long does an IV therapy session take?",
          answer:
            "Most sessions take 30–45 minutes. You'll relax in a comfortable chair while the IV drip works.",
        },
        {
          question: "Are there any side effects of IV therapy?",
          answer:
            "IV therapy is generally very well tolerated. Some people experience mild coolness at the injection site or a slight metallic taste. Serious side effects are rare.",
        },
      ],
    },
    {
      slug: "cryotherapy",
      name: "Cryotherapy",
      shortDescription:
        "Full-body or cryofacials. Reduce inflammation and speed recovery.",
      description:
        "Step into our state-of-the-art cryotherapy chamber for a brief, invigorating session at temperatures as low as -200°F. Whole-body cryotherapy triggers your body's natural healing response, reducing inflammation, accelerating muscle recovery, boosting energy, and releasing endorphins.",
      duration: "3 min",
      price: "From ~$40",
      isPrivate: true,
      bookingUrl:
        "https://wellroomva.as.me/?appointmentType=category:Cryotherapy",
      benefits: [
        "Rapid reduction of inflammation and swelling",
        "Accelerated muscle recovery after exercise",
        "Increased energy and endorphin release",
        "Improved sleep quality",
        "Enhanced collagen production for skin health",
        "Boosted metabolism",
      ],
      faqs: [
        {
          question: "Is cryotherapy safe?",
          answer:
            "Yes, cryotherapy is safe for most healthy adults. Our trained staff monitors every session.",
        },
        {
          question: "What does cryotherapy feel like?",
          answer:
            "You'll feel an intense cold sensation that lasts about 2–3 minutes. Most people describe it as bracing but tolerable, and the endorphin rush afterward is worth it.",
        },
        {
          question: "What should I wear for cryotherapy?",
          answer:
            "We provide gloves, socks, and slippers to protect your extremities. Men wear shorts; women can wear shorts and a sports bra or swimsuit.",
        },
      ],
    },
    {
      slug: "facials",
      name: "Facials",
      shortDescription:
        "Custom facials and chemical peels tailored to your skin.",
      description:
        "Our clinical-grade facials are tailored to your unique skin needs by trained estheticians. Using premium, medical-grade products, each facial includes a thorough skin analysis, deep cleansing, exfoliation, extractions (as needed), and targeted treatments.",
      duration: "60 min",
      price: "From ~$100",
      isPrivate: true,
      bookingUrl:
        "https://wellroomva.as.me/?appointmentType=category:Facials",
      benefits: [
        "Customized treatment for your specific skin concerns",
        "Deep pore cleansing and exfoliation",
        "Improved skin texture and tone",
        "Reduced fine lines and wrinkles",
        "Hydration and nourishment for healthy skin",
        "Relaxing, spa-like experience",
      ],
      faqs: [
        {
          question: "How often should I get a facial?",
          answer:
            "We recommend a facial every 4–6 weeks to maintain healthy skin and address ongoing concerns.",
        },
        {
          question: "Do your facials work for sensitive skin?",
          answer:
            "Absolutely. We customize every facial based on your skin type and sensitivity level, using gentle, medical-grade products designed for even the most sensitive skin.",
        },
        {
          question: "Is there any downtime after a facial?",
          answer:
            "Most facials have no downtime. You may experience mild redness for a few hours after treatments involving exfoliation or extractions.",
        },
      ],
    },
  ],
  reviews: [
    {
      author: "H.M.",
      rating: 5,
      text: "The sauna room is a good size, exactly what you need. Always clean, has clean large towels and small cold towels for when you're done. The ambiance is very relaxing and beautiful. We have been many times!",
      source: "Google",
      label: "On the sauna experience",
    },
    {
      author: "C.B.",
      rating: 5,
      text: "Well Room has become my safe haven. The facilities are such a good vibe and always clean. Everyone who works there is always upbeat and kind.",
      source: "Google",
      label: "On making it a routine",
    },
    {
      author: "N.S.",
      rating: 5,
      text: "The layout of the facility is quite nice, intimate, and absolutely has the small business charm. Lots of room to gather oneself before and after treatments, spotless bathrooms, and that relaxing spa aroma.",
      source: "Google",
      label: "On the space",
    },
    {
      author: "C.P.",
      rating: 5,
      text: "The best staff ever! I've felt amazing after each IV! And the infrared sauna is where it's at.",
      source: "Google",
      label: "On the full experience",
    },
    {
      author: "M.M.",
      rating: 5,
      text: "Megan truly listens and takes the time to understand your personal needs and wellness goals. Well Room is a local treasure!",
      source: "Google",
      label: "On the team",
    },
  ],
  faqs: [
    {
      question: "Where is Well Room located?",
      answer:
        "We're located at 134 10th St NW in Charlottesville, VA 22903, conveniently close to the Downtown Mall.",
    },
    {
      question: "Do I need an appointment?",
      answer:
        "Yes, we recommend booking in advance to secure your preferred time. You can book online or call us.",
    },
    {
      question: "What forms of payment do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and HSA/FSA cards for applicable services.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, free parking is available on-site at 134 10th St NW.",
    },
    {
      question: "Do you offer packages or memberships?",
      answer:
        "Yes! We offer multi-session packages and monthly memberships for our most popular services. Ask us for details or check our website.",
    },
  ],
};
