import { Business } from "@/lib/types/business";

export const wellRoom: Business = {
  slug: "well-room",
  name: "Well Room",
  tagline: "Advanced aesthetics & whole-body wellness",
  description:
    "Well Room is an independent, practitioner-owned wellness and aesthetics practice in downtown Charlottesville, Virginia. Founded in 2020 by Megan Kingdon, a dual board-certified nurse practitioner (ANP-C, WHNP-C) and Columbia University MSN graduate, Well Room offers advanced aesthetic treatments alongside whole-body wellness services under one roof.",
  owner: "Megan Kingdon",
  ownerTitle: "NP, Founder",
  ownerCredentials: "MSN, ANP-C, WHNP-C",
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
  parking: "Free on-site",
  founded: "2020",
  heroSubtitle:
    "Board-certified care in Charlottesville. From infrared sauna to custom facials to Botox and fillers — personalized treatments tailored to your goals.",

  practitioner: {
    name: "Megan Kingdon",
    fullTitle: "Megan Kingdon, MSN, ANP-C, WHNP-C",
    credentials: "Double Board Certified NP · Columbia University",
    bio: "Megan founded Well Room in 2020 with a vision: good health is our birthright, and we should have access to services that go beyond just mitigating sickness. Advanced aesthetics and wellness under one roof — practitioner-owned, never a franchise.",
  },

  // LP trust strip items
  lpTrustItems: [
    { value: "4.9 ★", label: "150+ Google reviews" },
    { value: "Board Certified", label: "Megan Kingdon, MSN" },
    { value: "Columbia", label: "University trained" },
    { value: "Private", label: "Every room, every visit" },
  ],

  // LP curated service cards (6 cards for grid)
  lpServiceCards: [
    {
      name: "Infrared Sauna",
      description: "Private room. Near + far infrared. The perfect starting point.",
      price: "From ~$35",
      bookingUrl: "https://wellroomva.as.me/?appointmentType=category:Infrared%20Sauna",
      tag: "Great first visit",
    },
    {
      name: "IV Therapy",
      description: "Custom nutrient blends for energy, recovery, immunity, and hydration.",
      price: "From ~$150",
      bookingUrl: "https://wellroomva.as.me/?appointmentType=category:IV%20Therapy",
    },
    {
      name: "Cryotherapy",
      description: "Full-body or cryofacials. Reduce inflammation and speed recovery.",
      price: "From ~$40",
      bookingUrl: "https://wellroomva.as.me/?appointmentType=category:Cryotherapy",
    },
    {
      name: "Custom Facials",
      description: "Tailored by a master esthetician. Peels, dermaplaning, and more.",
      price: "From ~$100",
      bookingUrl: "https://wellroomva.as.me/?appointmentType=category:Facials",
    },
    {
      name: "Botox & Fillers",
      description: "Neurotoxins and dermal fillers administered by a nurse practitioner.",
      price: "Consult",
      bookingUrl: "https://wellroomva.as.me/appointments",
      tag: "NP-administered",
    },
    {
      name: "Laser & Morpheus8",
      description: "IPL, laser hair removal, and RF microneedling for skin tightening.",
      price: "Varies",
      bookingUrl: "https://wellroomva.as.me/appointments",
    },
  ],

  // LP booking steps
  lpBookingSteps: [
    { step: "01", title: "Pick your service", description: "Not sure? The infrared sauna is a great first visit." },
    { step: "02", title: "Enter LANTERN15", description: "Apply the code at checkout for 15% off any service." },
    { step: "03", title: "Show up & relax", description: "134 10th St NW. Free parking. Everything provided." },
  ],

  // LP reviews (4 for carousel)
  lpReviews: [
    {
      text: "Much love for Well Room and Megan. I've been coming for years for IV therapy, cryo facials, spray tans, sauna, and most recently the VI peel with dermaplaning. My skin is brighter and my pigmentation has greatly subsided.",
      author: "D.B.",
      service: "Multiple services",
      rating: 5,
    },
    {
      text: "The sauna room is a good size, exactly what you need. Always clean, has clean large towels and small cold towels for when you're done. The ambiance is very relaxing and beautiful. We have been many times!",
      author: "H.M.",
      service: "Infrared Sauna",
      rating: 5,
    },
    {
      text: "Well Room is a local treasure! The space is warm and inviting, and Megan is a true expert who provides best-in-class wellness and aesthetic advice & care. I trust her completely.",
      author: "M.M.",
      service: "Wellness & Aesthetics",
      rating: 5,
    },
    {
      text: "What a kind and warm experience! Cryotherapy has helped with swelling and my appointment was on time, quickly done but any questions I had were answered with great care and expertise.",
      author: "C.R.",
      service: "Cryotherapy",
      rating: 5,
    },
  ],

  // Info page fact cards
  infoFacts: [
    { label: "Rating", value: "4.9 ★ (150+ reviews)" },
    { label: "Practitioner", value: "Megan Kingdon, MSN" },
    { label: "Credentials", value: "ANP-C, WHNP-C (dual board certified)" },
    { label: "Education", value: "Columbia University" },
    { label: "Location", value: "134 10th St NW, Charlottesville, VA 22903" },
    { label: "Hours", value: "Mon–Fri 10am–4pm" },
    { label: "Phone", value: "(434) 933-6100" },
    { label: "Founded", value: "2020" },
  ],

  // About sections for B-IP
  aboutSections: [
    "Well Room is an independent, practitioner-owned wellness and aesthetics practice in downtown Charlottesville, Virginia. Founded in 2020 by Megan Kingdon, a dual board-certified nurse practitioner (ANP-C, WHNP-C) and Columbia University MSN graduate, Well Room offers advanced aesthetic treatments alongside whole-body wellness services under one roof.",
    "Megan founded Well Room with the belief that good health is our birthright and that people should have access to services that go beyond mitigating sickness. The practice combines medical-grade aesthetics with restorative therapies, with every treatment plan guided by clinical expertise. Megan personally administers all neurotoxin and dermal filler treatments.",
    "The studio is known for its warm, clean, private atmosphere and a personalized approach to care. It is not a franchise, chain, or medspa brand — it is a locally owned, practitioner-led business.",
  ],

  // What makes it different
  differentiators: [
    {
      title: "Board-certified NP-led",
      text: "All injectable aesthetics (Botox, fillers) are administered by Megan Kingdon, a dual board-certified nurse practitioner — not a technician or esthetician. This provides a higher standard of safety and clinical judgment than many medspas.",
    },
    {
      title: "Breadth of services",
      text: 'Few local businesses offer wellness services (sauna, cryo, IV), medical aesthetics (Botox, fillers), and advanced laser treatments (Morpheus8, IPL, laser hair removal) in a single location. This makes Well Room unusually comprehensive for its size.',
    },
    {
      title: "Private rooms",
      text: "Infrared sauna, cryotherapy, and treatment rooms are all private — never shared with other clients.",
    },
    {
      title: "Locally owned since 2020",
      text: "Megan moved from NYC to Charlottesville and built Well Room from scratch, adapting offerings based on community demand over time.",
    },
  ],

  // Service categories for B-IP tables
  serviceCategories: [
    {
      name: "Wellness",
      services: [
        { name: "Infrared Sauna", slug: "infrared-sauna", details: "Private room, near + far infrared, red light therapy, Bluetooth. 20 or 40 min.", startingPrice: "~$35" },
        { name: "IV Therapy", slug: "iv-therapy", details: "Classic, Glow, Detox, Shield, NAD+, High Vitamin C. Custom nutrient blends.", startingPrice: "~$150" },
        { name: "Cryotherapy", slug: "cryotherapy", details: "Full-body cryotherapy and cryofacials.", startingPrice: "~$40" },
        { name: "IM Shots", slug: "im-shots", details: "B12, Lipo MIC, and other nutrient injections.", startingPrice: "Varies" },
        { name: "Red Light Therapy", slug: "red-light-therapy", details: "Standalone sessions for skin, circulation, and recovery.", startingPrice: "Varies" },
        { name: "Healthy Weight Program", slug: "healthy-weight", details: "Personalized weight management with clinical oversight.", startingPrice: "Consult" },
        { name: "Health Coaching", slug: "health-coaching", details: "Nutrition and lifestyle guidance.", startingPrice: "Consult" },
      ],
    },
    {
      name: "Aesthetics",
      services: [
        { name: "Custom Facials", slug: "facials", details: "Personalized by master esthetician. Includes dermaplaning, chemical peels.", startingPrice: "~$100" },
        { name: "Neurotoxins", slug: "neurotoxins", details: "Botox, Dysport, Daxxify, Jeauveau. Administered by NP Megan Kingdon.", startingPrice: "Consult" },
        { name: "Dermal Fillers", slug: "fillers", details: "Volume restoration and facial contouring. NP-administered.", startingPrice: "Consult" },
        { name: "Microneedling", slug: "microneedling", details: "Collagen stimulation. Optional exosome treatment for enhanced results.", startingPrice: "Varies" },
        { name: "Chemical Peels", slug: "chemical-peels", details: "VI Peels and others for pigmentation, texture, and brightening.", startingPrice: "Varies" },
        { name: "Organic Spray Tans", slug: "spray-tans", details: "Natural, organic products for a sun-kissed glow.", startingPrice: "Varies" },
      ],
    },
    {
      name: "Laser",
      services: [
        { name: "IPL Photofacial", slug: "ipl", details: "Targets pigmentation, sun damage, redness. Face, neck, chest, hands, arms.", startingPrice: "~$550 (3 treatments)" },
        { name: "Laser Hair Removal", slug: "laser-hair-removal", details: "Multiple body areas. Packages of 3 sessions.", startingPrice: "~$250 (3 treatments)" },
        { name: "Morpheus8", slug: "morpheus8", details: "RF microneedling for skin tightening, acne scarring, texture.", startingPrice: "~$1,500" },
      ],
    },
  ],

  // Info page reviews (6 reviews from well-room-info.html)
  infoReviews: [
    {
      author: "D.B.",
      rating: 5,
      text: "Much love for Well Room and Megan. I've been coming for years for IV therapy, cryo facials, spray tans, sauna, and most recently the VI peel with dermaplaning. My skin is brighter and my pigmentation has greatly subsided. Would recommend the Well Room to all!!",
      source: "Google",
    },
    {
      author: "M.M.",
      rating: 5,
      text: "Well Room is a local treasure! The space is warm and inviting with a delightful selection of carefully sourced products, and Megan is a true expert who provides best-in-class wellness and aesthetic advice & care. I trust her completely to hear and respond accurately to my treatment desires.",
      source: "Google",
    },
    {
      author: "H.M.",
      rating: 5,
      text: "The sauna room is a good size, exactly what you need. Always clean, has clean large towels and small cold towels for when you're done. The ambiance is very relaxing and beautiful. We have been many times!",
      source: "Google",
    },
    {
      author: "B.K.",
      rating: 5,
      text: "The Well Room is an exceptional destination for healthy services, answers and antidotes for body and soul. Not an overstatement. It is so lovely, clean and has a delightful, knowledgable staff.",
      source: "Google",
    },
    {
      author: "C.R.",
      rating: 5,
      text: "What a kind and warm experience! I highly recommend Well Room. Cryotherapy has helped with swelling and my appointment was on time, quickly done but any questions I had were answered with great care and expertise.",
      source: "Google",
    },
    {
      author: "C.F.",
      rating: 5,
      text: "The Morpheus 8 treatment on my son's facial acne scarring was amazing! It offered instant improvement in the texture and coloration. It was worth the price and made him so happy.",
      source: "Google",
    },
  ],

  // Info page FAQs (10 from well-room-info.html)
  infoFaqs: [
    {
      question: "What services does Well Room offer?",
      answer: "Wellness (infrared sauna, IV therapy, cryotherapy, IM shots, red light therapy, weight management, health coaching), aesthetics (custom facials, Botox, dermal fillers, microneedling, chemical peels, regenerative aesthetics, organic spray tans), and laser (IPL photofacials, laser hair removal, Morpheus8 RF microneedling).",
    },
    {
      question: "Who runs Well Room?",
      answer: "Megan Kingdon, MSN, ANP-C, WHNP-C — a dual board-certified nurse practitioner and Columbia University graduate. Megan founded Well Room in 2020 and personally administers all neurotoxin and filler treatments. The team also includes a master esthetician for facials and skin treatments.",
    },
    {
      question: "Where is Well Room?",
      answer: "134 10th Street NW, Charlottesville, VA 22903. Downtown Charlottesville, near the Downtown Mall. Free on-site parking.",
    },
    {
      question: "What are the hours?",
      answer: "Monday through Friday, 10am to 4pm. Pop-up events and special events occasionally held on weekends.",
    },
    {
      question: "How do I book?",
      answer: "Book online at www.lantern.llc/b/well-room or call (434) 933-6100.",
    },
    {
      question: "Is Well Room a medical practice?",
      answer: "Well Room is led by a dual board-certified nurse practitioner who provides medical-grade aesthetic treatments (neurotoxins, fillers, laser) alongside wellness services. It is a practitioner-owned practice, not a franchise or chain.",
    },
    {
      question: "What is the most popular service?",
      answer: "Infrared sauna is the most popular entry point — it's affordable (~$35 for 20 minutes), relaxing, and a good introduction to the space. For returning clients, IV therapy and facials are among the most frequently booked.",
    },
    {
      question: "Is parking available?",
      answer: "Yes, free parking is available on-site at 134 10th Street NW.",
    },
    {
      question: "Are the rooms private?",
      answer: "Yes. Infrared sauna, treatment rooms, and cryotherapy are all private — never shared with other clients.",
    },
    {
      question: "What should a first-time visitor try?",
      answer: "The infrared sauna is the most common first visit — it's affordable, relaxing, requires no preparation, and gives a good sense of the space and staff. For those interested in aesthetics, a custom facial or consultation for neurotoxins is a natural starting point.",
    },
  ],

  trustSignals: [
    { icon: "★", title: "4.9 Stars", detail: "150+ Google reviews" },
    { icon: "◎", title: "Private Rooms", detail: "Never shared with strangers" },
    { icon: "✦", title: "NP-Led", detail: "Megan Kingdon, Columbia\u00a004" },
  ],

  howItWorks: [
    {
      title: "Pick your service",
      description: "Infrared sauna, IV therapy, cryotherapy, or facials. Not sure? The sauna is a great starting point.",
    },
    {
      title: "Book online in 30 seconds",
      description: "Choose your time and enter code LANTERN15 at checkout for 15% off.",
    },
    {
      title: "Show up and relax",
      description: "134 10th St NW, Charlottesville. Free parking. Towels and everything you need provided.",
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

  // Core services (used for routing + service pages)
  services: [
    {
      slug: "infrared-sauna",
      name: "Infrared Sauna",
      shortDescription: "Private room. Near + far infrared. 20 or 40 minute sessions.",
      description:
        "Infrared saunas use near and far infrared wavelengths to warm the body directly, rather than heating the air like a traditional sauna. This produces a deep, therapeutic sweat at lower, more comfortable air temperatures — typically 120–160°F compared to 180°F+ in a traditional sauna.",
      duration: "20 or 40 min",
      price: "From ~$35",
      isPrivate: true,
      bookingUrl: "https://wellroomva.as.me/?appointmentType=category:Infrared%20Sauna",
      benefits: [
        "Deep detoxification through sweating",
        "Reduced muscle and joint pain",
        "Improved circulation and cardiovascular health",
        "Stress relief and better sleep",
        "Skin purification and anti-aging benefits",
        "Calorie burn and weight management support",
      ],
      facts: [
        { label: "Session Length", value: "20 or 40 minutes" },
        { label: "Starting Price", value: "~$35" },
        { label: "Room", value: "Private (never shared)" },
        { label: "Infrared Type", value: "Near + far (carbon & ceramic)" },
        { label: "Extras Included", value: "Red light therapy, Bluetooth, towels" },
        { label: "Capacity", value: "Spacious 4-person sauna" },
        { label: "Hours", value: "Mon–Fri 10am–4pm" },
        { label: "Location", value: "134 10th St NW, Downtown Charlottesville" },
        { label: "Parking", value: "Free on-site" },
        { label: "Booking", value: "Appointment required" },
      ],
      pricing: [
        { name: "20-Minute Session", price: "~$35", description: "A quick reset. Great for a lunch break or your first time trying infrared." },
        { name: "40-Minute Session", price: "~$45", description: "The full experience. Deep therapeutic sweat with time to really unwind.", featured: true, tag: "Most popular" },
      ],
      whatToExpect: [
        { label: "Duration", value: "20 or 40 minutes — you choose when booking" },
        { label: "Setting", value: "Private room, just you (or you and a guest)" },
        { label: "Provided", value: "Towels and cold towels included" },
        { label: "What to wear", value: "Loose clothing or a towel" },
        { label: "Booking", value: "Online or walk-in when available" },
        { label: "First visit", value: "Arrive 5 minutes early" },
      ],
      commonReasons: [
        "Stress relief and relaxation",
        "Muscle recovery and soreness after exercise",
        "Detoxification support",
        "Skin health and improved circulation",
        "General wellness and immune support",
        "Chronic pain management",
      ],
      beforeAfter: {
        before: "Hydrate well. Avoid heavy meals, caffeine, and alcohol. A quick shower helps open pores for better detoxification.",
        after: "Drink water. Rest for a few minutes. Moisturize. Avoid cold water immersion immediately after.",
      },
      // S-LP specific
      lpTrustItems: [
        { top: "4.9 ★", bottom: "150+ reviews" },
        { top: "Private rooms", bottom: "Never shared" },
        { top: "Board certified", bottom: "NP-led care" },
        { top: "All included", bottom: "Towels & amenities" },
      ],
      lpExpectItems: [
        { icon: "◐", title: "Your own private room", description: "A spacious 4-person sauna all to yourself. No sharing, no strangers." },
        { icon: "◈", title: "Near + far infrared", description: "Carbon and ceramic elements warm your body directly — a deep, therapeutic heat that penetrates tissue." },
        { icon: "✧", title: "Red light therapy included", description: "Every session includes red light at no extra charge. Great for skin, collagen, and cellular repair." },
        { icon: "♫", title: "Bluetooth, towels, everything", description: "Play your music, grab a clean towel, cool down with a cold towel after. Just show up." },
      ],
      lpBenefits: [
        { title: "Deep detoxification", description: "Infrared penetrates tissue to help release heavy metals and stored chemicals — more effectively than traditional saunas." },
        { title: "Muscle & joint relief", description: "The deep heat increases blood flow and soothes aches, stiffness, and inflammation. Especially helpful post-workout or for chronic pain." },
        { title: "Stress & cortisol reduction", description: "The calming warmth lowers cortisol, promotes endorphin release, and leaves you feeling genuinely reset." },
        { title: "Better sleep", description: "Regular sessions help relax the nervous system and ease tension, making it easier to fall and stay asleep." },
        { title: "Skin health & circulation", description: "Improved blood flow nourishes skin cells. Many people notice clearer, brighter skin after regular sessions." },
        { title: "Calorie burn while you relax", description: "Infrared can mimic the effects of moderate exercise, increasing heart rate and supporting metabolism." },
      ],
      lpReviews: [
        {
          text: "We go weekly to enjoy their sauna. The sauna room is a good size, exactly what you need. Always clean, has clean large towels and small cold towels for when you're done. The ambiance is very relaxing and beautiful.",
          author: "H.M.",
          rating: 5,
        },
        {
          text: "Well Room has become my safe haven. I usually just go for a sauna but it's 30 minutes I can take to decompress and not have to do anything. The facilities are such a good vibe and always clean.",
          author: "Google Reviewer",
          rating: 5,
        },
        {
          text: "I am a simple man — I just love a good private sauna session and this couldn't have been better. The layout of the facility is quite nice, intimate, and absolutely has the small business charm.",
          author: "Google Reviewer",
          rating: 5,
        },
      ],
      lpFaqs: [
        { question: "What should I wear?", answer: "Loose, comfortable clothing or just a towel. Whatever feels right — it's your private room." },
        { question: "Should I eat before?", answer: "A light snack is fine, but avoid heavy meals right before. Skip caffeine and alcohol too, as they increase dehydration." },
        { question: "How often should I go?", answer: "Many regulars come weekly. You can start with once a week and adjust based on how you feel. Some people come 2–3 times a week." },
        { question: "Can I bring my phone?", answer: "Yes — the sauna has Bluetooth connectivity, so you can play your own music, a podcast, or just scroll. It's your time." },
        { question: "Is it safe?", answer: "Yes. Infrared saunas warm your body directly rather than heating the air, so they operate at lower, more comfortable temperatures than traditional saunas. Sessions are 20–40 minutes, and you're in control the whole time." },
        { question: "What should I do after?", answer: "Drink plenty of water. Avoid jumping into cold water — just relax for a few minutes and let your body cool naturally. A good moisturizer helps too." },
      ],
      infoReviews: [
        {
          text: "We go weekly to enjoy their sauna. The sauna room is a good size, exactly what you need. Always clean, has clean large towels and small cold towels for when you're done. The ambiance is very relaxing and beautiful. We have been many times!",
          author: "H.M.",
          source: "Google",
          rating: 5,
        },
        {
          text: "Well Room has become my safe haven. I usually just go for a sauna but it's 30 minutes I can take to decompress and not have to do anything. The facilities are such a good vibe and always clean.",
          author: "Google Reviewer",
          source: "Google",
          rating: 5,
        },
        {
          text: "I am a simple man — I just love a good private sauna session and this couldn't have been better. The layout of the facility is quite nice, intimate, and absolutely has the small business charm that I know many people like. Lots of room to gather oneself before and after treatments, spotless bathrooms, and that relaxing spa aroma that I love when I'm wanting to relax.",
          author: "Google Reviewer",
          source: "Google",
          rating: 5,
        },
        {
          text: "The best staff ever!! So many products for sale in the cute lobby. And the infrared sauna is where it's at :) thanks again!!",
          author: "Google Reviewer",
          source: "Google",
          rating: 5,
        },
      ],
      faqs: [
        { question: "What is infrared sauna therapy?", answer: "Infrared sauna therapy uses infrared light to heat the body directly, rather than heating the air like a traditional sauna. It operates at lower, more comfortable temperatures (110–150°F vs. 150–195°F) while still inducing a deep sweat. Well Room's sauna uses both near-infrared (carbon) and far-infrared (ceramic) wavelengths." },
        { question: "What does the research say about infrared sauna benefits?", answer: "Research is emerging but promising. Studies have shown potential benefits for cardiovascular health, chronic pain, post-exercise muscle recovery, and stress reduction. A 2018 review in Mayo Clinic Proceedings found regular sauna bathing linked to reduced cardiovascular risk. However, some popular claims (especially around detoxification and weight loss) are not well-supported by current evidence. Infrared sauna is best understood as a complementary wellness practice." },
        { question: "How is this different from a traditional sauna?", answer: "Traditional saunas heat the air to 150–195°F; infrared saunas use light to heat the body directly at 110–150°F. Both induce sweating and raise core temperature. Many people find infrared more comfortable, especially those new to sauna therapy or who find traditional heat overwhelming." },
        { question: "What should I wear?", answer: "Loose, comfortable clothing or a towel. The room is private — wear whatever feels right." },
        { question: "Should I eat before?", answer: "A light snack is fine, but avoid heavy meals. Skip caffeine and alcohol, as they increase dehydration." },
        { question: "Can I bring my phone?", answer: "Yes. The sauna has Bluetooth connectivity, so you can stream music, podcasts, or whatever helps you relax." },
        { question: "How often should I go?", answer: "Most regular users go 1–3 times per week. If you're new, start with once a week and shorter sessions, then build up based on how you feel. Cleveland Clinic recommends limiting sessions to three to four times per week." },
        { question: "Is it safe?", answer: "For most healthy adults, yes. No serious adverse events have been reported in clinical studies. People with cardiovascular conditions, peripheral neuropathy, autoimmune conditions, or who are pregnant should consult a doctor first. Stay hydrated and don't exceed 45 minutes per session." },
        { question: "Who should avoid infrared saunas?", answer: "People who have difficulty sensing temperature changes (peripheral neuropathy), certain heart conditions, autoimmune conditions, or who are pregnant should talk to their doctor first. Anyone taking medications that affect sweating or heat tolerance should also check with a healthcare provider." },
        { question: "Are the rooms private?", answer: "Yes. Well Room's infrared sauna room is always private — never shared with other clients. It's a spacious room with a 4-person sauna, so you can also bring a partner or friend." },
        { question: "Do I need an appointment or can I walk in?", answer: "Appointments are required. Book online at lantern.llc/b/well-room/s/infrared-sauna or call (434) 933-6100. Same-day availability is sometimes open." },
        { question: "What are the hours?", answer: "Monday through Friday, 10am to 4pm. Pop-up events and special hours occasionally on weekends. Book ahead to confirm availability." },
        { question: "Is there parking?", answer: "Yes, free parking is available on-site at 134 10th Street NW in downtown Charlottesville." },
        { question: "What's the difference between 20 and 40-minute sessions?", answer: "The 20-minute session is a quick reset — good for first-timers or a lunch-break visit. The 40-minute session allows more time for your body to reach full therapeutic temperature and is the most popular option for regular users." },
      ],
    },
    {
      slug: "iv-therapy",
      name: "IV Therapy",
      shortDescription: "Custom nutrient blends for energy, recovery, immunity, and hydration.",
      description: "Our IV therapy sessions deliver vitamins, minerals, and hydration directly into your bloodstream for maximum absorption.",
      duration: "30–45 min",
      price: "From ~$150",
      isPrivate: true,
      bookingUrl: "https://wellroomva.as.me/?appointmentType=category:IV%20Therapy",
      benefits: [],
      faqs: [],
    },
    {
      slug: "cryotherapy",
      name: "Cryotherapy",
      shortDescription: "Full-body or cryofacials. Reduce inflammation and speed recovery.",
      description: "Step into our state-of-the-art cryotherapy chamber for a brief, invigorating session.",
      duration: "3 min",
      price: "From ~$40",
      isPrivate: true,
      bookingUrl: "https://wellroomva.as.me/?appointmentType=category:Cryotherapy",
      benefits: [],
      faqs: [],
    },
    {
      slug: "facials",
      name: "Custom Facials",
      shortDescription: "Personalized facials by master esthetician including dermaplaning and chemical peels.",
      description: "Our clinical-grade facials are tailored to your unique skin needs.",
      duration: "60 min",
      price: "From ~$100",
      isPrivate: true,
      bookingUrl: "https://wellroomva.as.me/?appointmentType=category:Facials",
      benefits: [],
      faqs: [],
    },
  ],

  // Legacy reviews (for backward compat)
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
      author: "M.M.",
      rating: 5,
      text: "Megan truly listens and takes the time to understand your personal needs and wellness goals. Well Room is a local treasure!",
      source: "Google",
      label: "On the team",
    },
  ],

  // Legacy FAQs
  faqs: [
    { question: "Where is Well Room located?", answer: "We're located at 134 10th St NW in Charlottesville, VA 22903." },
    { question: "Do I need an appointment?", answer: "Yes, we recommend booking in advance." },
    { question: "What forms of payment do you accept?", answer: "We accept all major credit cards, debit cards, and HSA/FSA cards." },
    { question: "Is there parking available?", answer: "Yes, free parking is available on-site." },
    { question: "Do you offer packages or memberships?", answer: "Yes! We offer multi-session packages and monthly memberships." },
  ],
};
