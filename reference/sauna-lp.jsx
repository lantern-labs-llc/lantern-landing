import { useState, useEffect, useRef } from "react";

const SaunaLP = () => {
  const [couponCopied, setCouponCopied] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});
  const [openFaq, setOpenFaq] = useState(null);

  const reviews = [
    {
      text: "We go weekly to enjoy their sauna. The sauna room is a good size, exactly what you need. Always clean, has clean large towels and small cold towels for when you're done. The ambiance is very relaxing and beautiful.",
      author: "H.M.",
    },
    {
      text: "Well Room has become my safe haven. I usually just go for a sauna but it's 30 minutes I can take to decompress and not have to do anything. The facilities are such a good vibe and always clean.",
      author: "Google Reviewer",
    },
    {
      text: "I am a simple man — I just love a good private sauna session and this couldn't have been better. The layout of the facility is quite nice, intimate, and absolutely has the small business charm.",
      author: "Google Reviewer",
    },
  ];

  const faqs = [
    { q: "What should I wear?", a: "Loose, comfortable clothing or just a towel. Whatever feels right — it's your private room." },
    { q: "Should I eat before?", a: "A light snack is fine, but avoid heavy meals right before. Skip caffeine and alcohol too, as they increase dehydration." },
    { q: "How often should I go?", a: "Many regulars come weekly. You can start with once a week and adjust based on how you feel. Some people come 2–3 times a week." },
    { q: "Can I bring my phone?", a: "Yes — the sauna has Bluetooth connectivity, so you can play your own music, a podcast, or just scroll. It's your time." },
    { q: "Is it safe?", a: "Yes. Infrared saunas warm your body directly rather than heating the air, so they operate at lower, more comfortable temperatures than traditional saunas. Sessions are 20–40 minutes, and you're in control the whole time." },
    { q: "What should I do after?", a: "Drink plenty of water. Avoid jumping into cold water — just relax for a few minutes and let your body cool naturally. A good moisturizer helps too." },
  ];

  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const copyCoupon = () => {
    navigator.clipboard?.writeText("LANTERN15");
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 2000);
  };

  const addRef = (id) => (el) => { sectionRefs.current[id] = el; };
  const isVisible = (id) => visibleSections.has(id);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FFFFFF", color: "#2C2825", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .stagger-1 { transition-delay: 0.08s; }
        .stagger-2 { transition-delay: 0.16s; }
        .stagger-3 { transition-delay: 0.24s; }
        .stagger-4 { transition-delay: 0.32s; }

        .btn-primary {
          background: #B8845A;
          color: white;
          border: none;
          padding: 15px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          border-radius: 8px;
        }
        .btn-primary:hover {
          background: #A67848;
          box-shadow: 0 4px 16px rgba(184, 132, 90, 0.3);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: transparent;
          color: #2C2825;
          border: 1.5px solid #B8845A;
          padding: 13px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          border-radius: 8px;
        }
        .btn-secondary:hover {
          background: #B8845A;
          color: white;
        }

        .session-card {
          background: white;
          border: 1px solid #EDE5DA;
          border-radius: 12px;
          transition: all 0.25s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .session-card:hover {
          border-color: #B8845A;
          box-shadow: 0 4px 20px rgba(184, 132, 90, 0.1);
          transform: translateY(-2px);
        }
        .session-card.featured {
          border-color: #B8845A;
          background: #FFFBF7;
        }

        .faq-item {
          border-bottom: 1px solid #EDE5DA;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .faq-item:hover { background: #FDFAF5; }

        .review-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          border: 1.5px solid #C99A60;
          background: transparent;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .review-dot.active {
          background: #C99A60;
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .session-grid { grid-template-columns: 1fr !important; }
          .expect-layout { flex-direction: column !important; }
          .hero-content { padding: 0 20px !important; }
          .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      {/* Top bar */}
      <div style={{
        background: "#FAF9F5",
        borderBottom: "1px solid #EDE5DA",
        padding: "10px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        fontSize: "12px",
        color: "#978F89",
        fontWeight: 400,
      }}>
        <span style={{ color: "#B8845A" }}>✦</span>
        <span>
          Use code <strong style={{ color: "#B8845A", fontWeight: 500 }}>LANTERN15</strong> for 15% off your first visit
        </span>
      </div>

      {/* Hero */}
      <div style={{ padding: "56px 0 40px", textAlign: "center", background: "#FFFFFF" }}>
        <div className="hero-content" style={{ maxWidth: "600px", margin: "0 auto", padding: "0 32px" }}>

          {/* Logo — production: use hosted client logo image */}
          <a href="/b/well-room" style={{ textDecoration: "none", display: "block", marginBottom: "36px" }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "30px",
              fontWeight: 400,
              letterSpacing: "10px",
              color: "#B8845A",
            }}>
              WELL ROOM
            </div>
          </a>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(34px, 5.5vw, 48px)", fontWeight: 300, lineHeight: 1.2, color: "#2C2825", marginBottom: "20px",
          }}>
            Infrared Sauna
          </h1>

          <p style={{
            fontSize: "16px", lineHeight: 1.75, color: "#635B56",
            maxWidth: "440px", margin: "0 auto 16px", fontWeight: 300,
          }}>
            A private room with near and far infrared heat, red light therapy, and Bluetooth — 20 or 40 minutes of deep, therapeutic warmth.
          </p>

          <p style={{ fontSize: "15px", color: "#B8845A", marginBottom: "32px", fontWeight: 500 }}>
            From ~$35 per session
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wellroomva.as.me/?appointmentType=category:Infrared%20Sauna" className="btn-primary">Book Infrared Sauna</a>
            <a href="tel:4349336100" className="btn-secondary">Call (434) 933-6100</a>
          </div>

          <p style={{ fontSize: "13px", color: "#978F89", marginTop: "18px", fontWeight: 300, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <span style={{ color: "#B8845A", fontSize: "14px" }}>✦</span>
            Use code <span onClick={copyCoupon} style={{ fontWeight: 500, color: "#2C2825", letterSpacing: "1.5px", cursor: "pointer", borderBottom: "1.5px dashed #CBBA9F", paddingBottom: "1px" }}>LANTERN15</span> for 15% off your first visit
            {couponCopied && <span style={{ color: "#B8845A", marginLeft: "4px" }}>· Copied!</span>}
          </p>
        </div>
      </div>

      {/* Trust bar */}
      <div id="trust" ref={addRef("trust")} style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0",
        padding: "0 24px",
        borderTop: "1px solid #EDE5DA",
        borderBottom: "1px solid #EDE5DA",
        background: "#FAF9F5",
        flexWrap: "wrap",
      }}>
        {[
          { top: "4.9 ★", bottom: "150+ reviews" },
          { top: "Private rooms", bottom: "Never shared" },
          { top: "Board certified", bottom: "NP-led care" },
          { top: "All included", bottom: "Towels & amenities" },
        ].map((item, i, arr) => (
          <div key={i} className={`fade-up stagger-${i + 1} ${isVisible("trust") ? "visible" : ""}`} style={{
            textAlign: "center",
            padding: "20px 28px",
            borderRight: i < arr.length - 1 ? "1px solid #EDE5DA" : "none",
          }}>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "#2C2825", marginBottom: "2px" }}>
              {item.top}
            </div>
            <div style={{ fontSize: "11px", color: "#978F89", fontWeight: 300 }}>
              {item.bottom}
            </div>
          </div>
        ))}
      </div>

      {/* What to expect — with photo */}
      <div id="expect" ref={addRef("expect")} className="section-pad" style={{ padding: "40px 32px 56px", maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#B8845A", marginBottom: "10px", fontWeight: 500 }}>Your visit</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 4vw, 32px)", fontWeight: 300, color: "#2C2825" }}>
            What to expect
          </h2>
        </div>

        <div className="expect-layout" style={{ display: "flex", gap: "32px", alignItems: "stretch" }}>
          
          {/* Photo placeholder */}
          <div style={{
            width: "240px",
            minHeight: "300px",
            borderRadius: "12px",
            overflow: "hidden",
            flexShrink: 0,
            background: "linear-gradient(135deg, #F0E8DC 0%, #E8DDD0 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #EDE5DA",
          }}>
            <div style={{ textAlign: "center", opacity: 0.45 }}>
              <div style={{ fontSize: "32px", marginBottom: "4px" }}>📷</div>
              <div style={{ fontSize: "10px", color: "#978F89", letterSpacing: "0.5px" }}>Sauna room photo</div>
            </div>
          </div>

          {/* Expect items */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center" }}>
            {[
              { icon: "◐", title: "Your own private room", desc: "A spacious 4-person sauna all to yourself. No sharing, no strangers." },
              { icon: "◈", title: "Near + far infrared", desc: "Carbon and ceramic elements warm your body directly — a deep, therapeutic heat that penetrates tissue." },
              { icon: "✧", title: "Red light therapy included", desc: "Every session includes red light at no extra charge. Great for skin, collagen, and cellular repair." },
              { icon: "♫", title: "Bluetooth, towels, everything", desc: "Play your music, grab a clean towel, cool down with a cold towel after. Just show up." },
            ].map((item, i) => (
              <div key={i} className={`fade-up stagger-${i + 1} ${isVisible("expect") ? "visible" : ""}`} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ fontSize: "18px", color: "#B8845A", flexShrink: 0, marginTop: "1px" }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#2C2825", marginBottom: "3px" }}>{item.title}</div>
                  <div style={{ fontSize: "13px", color: "#635B56", lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Session options */}
      <div id="sessions" ref={addRef("sessions")} className="section-pad" style={{ padding: "16px 32px 56px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#B8845A", marginBottom: "10px", fontWeight: 500 }}>Pricing</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 4vw, 32px)", fontWeight: 300, color: "#2C2825" }}>
            Choose your session
          </h2>
        </div>

        <div className="session-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
          <a href="https://wellroomva.as.me/?appointmentType=category:Infrared%20Sauna" className={`session-card fade-up stagger-1 ${isVisible("sessions") ? "visible" : ""}`}>
            <div style={{ padding: "24px" }}>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#2C2825", marginBottom: "6px" }}>20-Minute Session</div>
              <div style={{ fontSize: "13px", color: "#635B56", lineHeight: 1.6, marginBottom: "16px", fontWeight: 300 }}>
                A quick reset. Great for a lunch break or your first time trying infrared.
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 500, color: "#2C2825" }}>~$35</span>
                <span style={{ fontSize: "12px", color: "#B8845A", fontWeight: 500 }}>Book →</span>
              </div>
            </div>
          </a>

          <a href="https://wellroomva.as.me/?appointmentType=category:Infrared%20Sauna" className={`session-card featured fade-up stagger-2 ${isVisible("sessions") ? "visible" : ""}`}>
            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "#2C2825" }}>40-Minute Session</div>
                <span style={{ fontSize: "10px", letterSpacing: "0.3px", textTransform: "uppercase", color: "#B8845A", background: "#F7F0E6", padding: "3px 8px", borderRadius: "4px", fontWeight: 500, border: "1px solid #E8DDD0" }}>
                  Most popular
                </span>
              </div>
              <div style={{ fontSize: "13px", color: "#635B56", lineHeight: 1.6, marginBottom: "16px", fontWeight: 300 }}>
                The full experience. Deep therapeutic sweat with time to really unwind.
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 500, color: "#2C2825" }}>~$45</span>
                <span style={{ fontSize: "12px", color: "#B8845A", fontWeight: 500 }}>Book →</span>
              </div>
            </div>
          </a>
        </div>

        <div style={{ textAlign: "center", marginTop: "18px" }}>
          <a href="https://www.wellroomva.com/bundles-packages" style={{ fontSize: "13px", color: "#B8845A", textDecoration: "none", borderBottom: "1px solid rgba(184,132,90,0.3)", paddingBottom: "2px" }}>
            Sauna bundles & multi-packs also available →
          </a>
        </div>
      </div>

      {/* Benefits */}
      <div id="benefits" ref={addRef("benefits")} style={{ background: "#FAF9F5", borderTop: "1px solid #EDE5DA", borderBottom: "1px solid #EDE5DA", padding: "56px 32px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#B8845A", marginBottom: "10px", fontWeight: 500 }}>Why infrared</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 4vw, 32px)", fontWeight: 300, color: "#2C2825" }}>
              What it does for your body
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { title: "Deep detoxification", desc: "Infrared penetrates tissue to help release heavy metals and stored chemicals — more effectively than traditional saunas." },
              { title: "Muscle & joint relief", desc: "The deep heat increases blood flow and soothes aches, stiffness, and inflammation. Especially helpful post-workout or for chronic pain." },
              { title: "Stress & cortisol reduction", desc: "The calming warmth lowers cortisol, promotes endorphin release, and leaves you feeling genuinely reset." },
              { title: "Better sleep", desc: "Regular sessions help relax the nervous system and ease tension, making it easier to fall and stay asleep." },
              { title: "Skin health & circulation", desc: "Improved blood flow nourishes skin cells. Many people notice clearer, brighter skin after regular sessions." },
              { title: "Calorie burn while you relax", desc: "Infrared can mimic the effects of moderate exercise, increasing heart rate and supporting metabolism." },
            ].map((item, i) => (
              <div key={i} className={`fade-up stagger-${(i % 4) + 1} ${isVisible("benefits") ? "visible" : ""}`} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#B8845A", flexShrink: 0, marginTop: "8px" }} />
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "#2C2825" }}>{item.title}</span>
                  <span style={{ fontSize: "14px", color: "#635B56", fontWeight: 300 }}> — {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div id="reviews" ref={addRef("reviews")} className="section-pad" style={{ padding: "56px 32px", maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#B8845A", marginBottom: "28px", fontWeight: 500 }}>
          Sauna regulars say
        </div>
        <div className={`fade-up ${isVisible("reviews") ? "visible" : ""}`} style={{ minHeight: "140px" }}>
          <div style={{ color: "#C99A60", marginBottom: "16px", letterSpacing: "3px", fontSize: "18px" }}>★ ★ ★ ★ ★</div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "19px", fontWeight: 400, lineHeight: 1.75,
            color: "#4A4540", fontStyle: "italic",
            marginBottom: "16px", transition: "opacity 0.4s ease",
          }}>
            "{reviews[activeReview].text}"
          </p>
          <div style={{ fontSize: "13px", color: "#978F89" }}>
            — {reviews[activeReview].author}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "24px" }}>
          {reviews.map((_, i) => (
            <div key={i} className={`review-dot ${i === activeReview ? "active" : ""}`} onClick={() => setActiveReview(i)} />
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" ref={addRef("faq")} className="section-pad" style={{ padding: "16px 32px 56px", maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#B8845A", marginBottom: "10px", fontWeight: 500 }}>FAQ</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 4vw, 32px)", fontWeight: 300, color: "#2C2825" }}>
            Before your first session
          </h2>
        </div>

        <div className={`fade-up ${isVisible("faq") ? "visible" : ""}`}>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div style={{
                padding: "16px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "#2C2825" }}>{faq.q}</div>
                <div style={{
                  fontSize: "18px", color: "#B8845A", flexShrink: 0,
                  transition: "transform 0.2s ease",
                  transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                }}>+</div>
              </div>
              {openFaq === i && (
                <div style={{ paddingBottom: "16px", fontSize: "14px", color: "#635B56", lineHeight: 1.7, fontWeight: 300 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Compact Megan strip */}
      <div style={{ background: "#FAF9F5", borderTop: "1px solid #EDE5DA", borderBottom: "1px solid #EDE5DA", padding: "28px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", alignItems: "center", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            background: "linear-gradient(135deg, #C99A60, #B8845A)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", color: "white", flexShrink: 0,
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 500,
          }}>MK</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "#2C2825" }}>Megan Kingdon, MSN, ANP-C, WHNP-C</div>
            <div style={{ fontSize: "12px", color: "#978F89", marginTop: "2px" }}>
              Double Board Certified NP · Columbia University · Founder, Well Room
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div id="location" ref={addRef("location")} className="section-pad" style={{ padding: "48px 32px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: "#2C2825" }}>10th Street, Downtown Charlottesville</h2>
        </div>
        <div className={`fade-up ${isVisible("location") ? "visible" : ""}`}>
          <a href="https://www.google.com/maps/dir/?api=1&destination=Well+Room,+134+10th+St+NW,+Charlottesville,+VA+22903" target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #EDE5DA" }}>
              <div style={{
                height: "180px",
                background: "linear-gradient(145deg, #F8F5F0 0%, #F0ECE6 50%, #F5F1EB 100%)",
                display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
                  {[...Array(7)].map((_, i) => (
                    <div key={`h${i}`} style={{ position: "absolute", top: `${(i + 1) * 13}%`, left: 0, right: 0, height: "1px", background: "#8B8580", transform: `rotate(${i % 2 === 0 ? -1.5 : 2}deg)` }} />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <div key={`v${i}`} style={{ position: "absolute", left: `${(i + 1) * 16}%`, top: 0, bottom: 0, width: "1px", background: "#8B8580", transform: `rotate(${i % 2 === 0 ? 0.5 : -0.5}deg)` }} />
                  ))}
                </div>
                <div style={{ textAlign: "center", zIndex: 1 }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50% 50% 50% 0",
                    background: "#B8845A", transform: "rotate(-45deg)",
                    margin: "0 auto 12px", boxShadow: "0 3px 12px rgba(184,132,90,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "white", transform: "rotate(45deg)" }} />
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#2C2825", background: "rgba(255,255,255,0.9)", padding: "6px 14px", borderRadius: "6px" }}>
                    134 10th St NW
                  </div>
                </div>
              </div>
              <div style={{ background: "white", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", borderTop: "1px solid #EDE5DA" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#2C2825" }}>Well Room</div>
                  <div style={{ fontSize: "12px", color: "#978F89", marginTop: "2px" }}>134 10th St NW, Charlottesville, VA 22903</div>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 500, color: "#B8845A" }}>Get directions →</div>
              </div>
            </div>
          </a>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "16px", flexWrap: "wrap" }}>
            {[
              { label: "Free parking", icon: "P" },
              { label: "Mon–Fri 10am–4pm", icon: "◷" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#978F89" }}>
                <span style={{ color: "#B8845A", fontSize: "13px" }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ background: "#FAF9F5", borderTop: "1px solid #EDE5DA", padding: "56px 32px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 300, color: "#2C2825", marginBottom: "10px" }}>
          Ready to try infrared sauna?
        </h2>
        <p style={{ fontSize: "14px", color: "#978F89", marginBottom: "28px", fontWeight: 300 }}>
          Use code <strong style={{ color: "#B8845A", fontWeight: 500 }}>LANTERN15</strong> for 15% off your first visit.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wellroomva.as.me/?appointmentType=category:Infrared%20Sauna" className="btn-primary">Book Infrared Sauna</a>
          <a href="tel:4349336100" className="btn-secondary">Call (434) 933-6100</a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#FFFFFF", borderTop: "1px solid #EDE5DA", padding: "28px 32px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "14px", flexWrap: "wrap" }}>
          <a href="/b/well-room" style={{ fontSize: "13px", color: "#635B56", textDecoration: "none" }}>All services</a>
          <a href="https://www.wellroomva.com" style={{ fontSize: "13px", color: "#635B56", textDecoration: "none" }}>wellroomva.com</a>
          <a href="https://www.google.com/maps/place/Well+Room" style={{ fontSize: "13px", color: "#635B56", textDecoration: "none" }}>Directions</a>
          <a href="tel:4349336100" style={{ fontSize: "13px", color: "#635B56", textDecoration: "none" }}>(434) 933-6100</a>
        </div>
        <div style={{ fontSize: "11px", color: "#B0A89E" }}>
          134 10th St NW, Charlottesville, VA · Mon–Fri 10am–4pm
        </div>
        <div style={{ fontSize: "11px", color: "#C8BFB4", marginTop: "10px" }}>
          Powered by <a href="https://lantern.llc" style={{ color: "#B0A89E", textDecoration: "none" }}>Lantern</a>
        </div>
      </div>
    </div>
  );
};

export default SaunaLP;
