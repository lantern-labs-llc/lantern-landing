import { useState, useEffect, useRef } from "react";

const WellRoomLP = () => {
  const [couponCopied, setCouponCopied] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});
  const [activeReview, setActiveReview] = useState(0);

  const reviews = [
    {
      text: "Much love for Well Room and Megan. I've been coming for years for IV therapy, cryo facials, spray tans, sauna, and most recently the VI peel with dermaplaning. My skin is brighter and my pigmentation has greatly subsided.",
      author: "D.B.",
      service: "Multiple services",
    },
    {
      text: "The sauna room is a good size, exactly what you need. Always clean, has clean large towels and small cold towels for when you're done. The ambiance is very relaxing and beautiful. We have been many times!",
      author: "H.M.",
      service: "Infrared Sauna",
    },
    {
      text: "Well Room is a local treasure! The space is warm and inviting, and Megan is a true expert who provides best-in-class wellness and aesthetic advice & care. I trust her completely.",
      author: "M.M.",
      service: "Wellness & Aesthetics",
    },
    {
      text: "What a kind and warm experience! Cryotherapy has helped with swelling and my appointment was on time, quickly done but any questions I had were answered with great care and expertise.",
      author: "C.R.",
      service: "Cryotherapy",
    },
  ];

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

        .service-card {
          background: #FFFFFF;
          border: 1px solid #EDE5DA;
          border-radius: 12px;
          transition: all 0.25s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .service-card:hover {
          border-color: #C99A60;
          box-shadow: 0 4px 20px rgba(184, 142, 95, 0.1);
          transform: translateY(-2px);
        }

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
          gap: 8px;
          border-radius: 8px;
        }
        .btn-primary:hover {
          background: #B88E5F;
          box-shadow: 0 4px 16px rgba(196, 154, 108, 0.3);
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
          gap: 8px;
          border-radius: 8px;
        }
        .btn-secondary:hover {
          background: #B8845A;
          color: white;
        }

        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .hero-content { padding: 0 20px !important; }
          .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
          .trust-strip { gap: 20px !important; }
          .about-layout { flex-direction: column !important; text-align: center !important; }
        }
      `}</style>

      {/* Top accent bar */}
      <div style={{
        background: "#FAF9F5",
        borderBottom: "1px solid #EDE5DA",
        padding: "10px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        fontSize: "12px",
        color: "#9B9590",
        fontWeight: 400,
      }}>
        <span style={{ color: "#B8845A" }}>✦</span>
        <span>
          Use code <strong style={{ color: "#B8845A", fontWeight: 500 }}>LANTERN15</strong> for 15% off your first visit
        </span>
      </div>

      {/* Hero */}
      <div style={{ padding: "56px 0 40px", textAlign: "center", background: "#FFFFFF" }}>
        <div className="hero-content" style={{ maxWidth: "620px", margin: "0 auto", padding: "0 32px" }}>

          {/* Logo */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "30px",
              fontWeight: 400,
              letterSpacing: "10px",
              color: "#B8845A",
            }}>
              WELL ROOM
            </div>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(34px, 5.5vw, 48px)",
            fontWeight: 300,
            lineHeight: 1.2,
            color: "#2C2825",
            marginBottom: "20px",
          }}>
            Advanced aesthetics &{" "}
            <em style={{ fontStyle: "italic", color: "#B8845A" }}>whole-body wellness</em>
          </h1>

          <p style={{
            fontSize: "16px",
            lineHeight: 1.75,
            color: "#635B56",
            maxWidth: "460px",
            margin: "0 auto 16px",
            fontWeight: 300,
          }}>
            Board-certified care in Charlottesville. From infrared sauna to custom facials to Botox and fillers — personalized treatments tailored to your goals.
          </p>

          <p style={{ fontSize: "13px", color: "#B8845A", marginBottom: "36px", fontWeight: 400 }}>
            134 10th St NW · Mon–Fri 10am–4pm · Free parking
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wellroomva.as.me/appointments" className="btn-primary">Book Online</a>
            <a href="tel:4349336100" className="btn-secondary">Call (434) 933-6100</a>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div id="trust" ref={addRef("trust")} className="trust-strip" style={{
        display: "flex",
        justifyContent: "center",
        gap: "48px",
        padding: "32px 24px",
        borderTop: "1px solid #EDE5DA",
        borderBottom: "1px solid #EDE5DA",
        background: "#FAF9F5",
        flexWrap: "wrap",
      }}>
        {[
          { value: "4.9 ★", label: "150+ Google reviews" },
          { value: "Board Certified", label: "Megan Kingdon, MSN" },
          { value: "Columbia", label: "University trained" },
          { value: "Private", label: "Every room, every visit" },
        ].map((item, i) => (
          <div key={i} className={`fade-up stagger-${i + 1} ${isVisible("trust") ? "visible" : ""}`} style={{ textAlign: "center", minWidth: "100px" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "21px", fontWeight: 500, color: "#2C2825", marginBottom: "4px" }}>
              {item.value}
            </div>
            <div style={{ fontSize: "11px", color: "#978F89", letterSpacing: "0.5px", textTransform: "uppercase", fontWeight: 400 }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div id="coupon" ref={addRef("coupon")} className="section-pad" style={{ padding: "48px 32px", display: "flex", justifyContent: "center" }}>
        <div className={`fade-up ${isVisible("coupon") ? "visible" : ""}`} style={{
          padding: "28px 40px",
          borderRadius: "12px",
          textAlign: "center",
          maxWidth: "420px",
          width: "100%",
          background: "#FAF9F5",
          border: "1.5px dashed #CBBA9F",
          position: "relative",
        }}>
          <div style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#B8845A", marginBottom: "14px", fontWeight: 500 }}>
            15% off your first visit
          </div>
          <div onClick={copyCoupon} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "34px",
            fontWeight: 500,
            color: "#2C2825",
            letterSpacing: "6px",
            cursor: "pointer",
            padding: "4px 0",
            marginBottom: "10px",
            userSelect: "all",
          }}>
            LANTERN15
          </div>
          <div style={{ fontSize: "12px", color: "#978F89", fontWeight: 300 }}>
            {couponCopied ? "✓ Copied!" : "Tap to copy · Enter at checkout · Valid 30 days"}
          </div>
        </div>
      </div>

      {/* Services */}
      <div id="services" ref={addRef("services")} className="section-pad" style={{ padding: "24px 32px 56px", maxWidth: "880px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#B8845A", marginBottom: "10px", fontWeight: 500 }}>Services</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 300, color: "#2C2825" }}>
            More than you'd expect
          </h2>
        </div>

        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
          {[
            { name: "Infrared Sauna", desc: "Private room. Near + far infrared. The perfect starting point.", price: "From ~$35", link: "https://wellroomva.as.me/?appointmentType=category:Infrared%20Sauna", tag: "Great first visit" },
            { name: "IV Therapy", desc: "Custom nutrient blends for energy, recovery, immunity, and hydration.", price: "From ~$150", link: "https://wellroomva.as.me/?appointmentType=category:IV%20Therapy" },
            { name: "Cryotherapy", desc: "Full-body or cryofacials. Reduce inflammation and speed recovery.", price: "From ~$40", link: "https://wellroomva.as.me/?appointmentType=category:Cryotherapy" },
            { name: "Custom Facials", desc: "Tailored by a master esthetician. Peels, dermaplaning, and more.", price: "From ~$100", link: "https://wellroomva.as.me/?appointmentType=category:Facials" },
            { name: "Botox & Fillers", desc: "Neurotoxins and dermal fillers administered by a nurse practitioner.", price: "Consult", link: "https://wellroomva.as.me/appointments", tag: "NP-administered" },
            { name: "Laser & Morpheus8", desc: "IPL, laser hair removal, and RF microneedling for skin tightening.", price: "Varies", link: "https://wellroomva.as.me/appointments" },
          ].map((s, i) => (
            <a key={i} href={s.link} className={`service-card fade-up stagger-${(i % 4) + 1} ${isVisible("services") ? "visible" : ""}`}>
              <div style={{ padding: "22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", gap: "8px" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "19px", fontWeight: 500, color: "#2C2825" }}>{s.name}</div>
                  {s.tag && (
                    <span style={{ fontSize: "10px", letterSpacing: "0.3px", textTransform: "uppercase", color: "#B8845A", background: "#F7F0E6", padding: "3px 8px", borderRadius: "4px", fontWeight: 500, whiteSpace: "nowrap", border: "1px solid #E8DDD0" }}>
                      {s.tag}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "13px", color: "#635B56", lineHeight: 1.6, marginBottom: "14px", fontWeight: 300 }}>{s.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", color: "#2C2825", fontWeight: 500 }}>{s.price}</span>
                  <span style={{ fontSize: "12px", color: "#B8845A", fontWeight: 500 }}>Book →</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <a href="https://www.wellroomva.com/services" style={{ fontSize: "13px", color: "#B8845A", textDecoration: "none", borderBottom: "1px solid rgba(196,154,108,0.3)", paddingBottom: "2px" }}>
            See all services on wellroomva.com →
          </a>
        </div>
      </div>

      {/* About Megan */}
      <div id="about" ref={addRef("about")} style={{ background: "#FAF9F5", borderTop: "1px solid #EDE5DA", borderBottom: "1px solid #EDE5DA", padding: "56px 32px" }}>
        <div className={`about-layout fade-up ${isVisible("about") ? "visible" : ""}`} style={{ maxWidth: "640px", margin: "0 auto", display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          
          {/* Photo — production: replace with hosted client image */}
          <div style={{
            width: "180px",
            height: "220px",
            borderRadius: "12px",
            overflow: "hidden",
            flexShrink: 0,
            background: "linear-gradient(135deg, #E8DDD0 0%, #DDD2C4 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #EDE5DA",
          }}>
            {/* Placeholder — swap for <img src="hosted-photo.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
            <div style={{ textAlign: "center", opacity: 0.45 }}>
              <div style={{ fontSize: "28px", marginBottom: "4px" }}>📷</div>
              <div style={{ fontSize: "10px", color: "#978F89", letterSpacing: "0.5px" }}>Photo</div>
            </div>
          </div>

          {/* Copy */}
          <div style={{ flex: 1, minWidth: "260px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#B8845A", marginBottom: "10px", fontWeight: 500 }}>
              Your practitioner
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: "#2C2825", marginBottom: "6px" }}>
              Megan Kingdon, MSN, ANP-C, WHNP-C
            </h3>
            <p style={{ fontSize: "12px", color: "#B8845A", letterSpacing: "0.5px", marginBottom: "14px", fontWeight: 500 }}>
              Double Board Certified NP · Columbia University
            </p>
            <p style={{ fontSize: "14px", color: "#635B56", lineHeight: 1.75, fontWeight: 300 }}>
              Megan founded Well Room in 2020 with a vision: good health is our birthright, and we should have access to services that go beyond just mitigating sickness. 
              Advanced aesthetics and wellness under one roof — practitioner-owned, never a franchise.
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div id="reviews" ref={addRef("reviews")} className="section-pad" style={{ padding: "56px 32px", maxWidth: "580px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#B8845A", marginBottom: "28px", fontWeight: 500 }}>
          What people say
        </div>
        <div className={`fade-up ${isVisible("reviews") ? "visible" : ""}`} style={{ minHeight: "160px" }}>
          <div style={{ color: "#C99A60", marginBottom: "16px", letterSpacing: "3px", fontSize: "18px" }}>★ ★ ★ ★ ★</div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "19px", fontWeight: 400, lineHeight: 1.75,
            color: "#4A4540", fontStyle: "italic",
            marginBottom: "18px", transition: "opacity 0.4s ease",
          }}>
            "{reviews[activeReview].text}"
          </p>
          <div style={{ fontSize: "13px", color: "#978F89" }}>
            <span style={{ fontWeight: 500, color: "#6B6560" }}>{reviews[activeReview].author}</span> · {reviews[activeReview].service}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "24px" }}>
          {reviews.map((_, i) => (
            <div key={i} className={`review-dot ${i === activeReview ? "active" : ""}`} onClick={() => setActiveReview(i)} />
          ))}
        </div>
        <a href="https://g.co/kgs/WHegSC" style={{ display: "inline-block", marginTop: "18px", fontSize: "12px", color: "#978F89", textDecoration: "none", borderBottom: "1px solid #C8BFB4", paddingBottom: "1px" }}>
          Read all 150+ reviews on Google →
        </a>
      </div>

      {/* How to book */}
      <div id="steps" ref={addRef("steps")} className="section-pad" style={{ padding: "16px 32px 56px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 300, color: "#2C2825" }}>Book in 30 seconds</h2>
        </div>
        <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { step: "01", title: "Pick your service", desc: "Not sure? The infrared sauna is a great first visit." },
            { step: "02", title: "Enter LANTERN15", desc: "Apply the code at checkout for 15% off any service." },
            { step: "03", title: "Show up & relax", desc: "134 10th St NW. Free parking. Everything provided." },
          ].map((item, i) => (
            <div key={i} className={`fade-up stagger-${i + 1} ${isVisible("steps") ? "visible" : ""}`} style={{ flex: "1", minWidth: "170px", maxWidth: "190px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", fontWeight: 300, color: "#C99A60", marginBottom: "10px" }}>{item.step}</div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#2C2825", marginBottom: "6px" }}>{item.title}</div>
              <div style={{ fontSize: "13px", color: "#978F89", lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div id="location" ref={addRef("location")} className="section-pad" style={{ padding: "16px 32px 56px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#B8845A", marginBottom: "10px", fontWeight: 500 }}>Find us</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 300, color: "#2C2825" }}>10th Street, Downtown Charlottesville</h2>
        </div>
        <div className={`fade-up ${isVisible("location") ? "visible" : ""}`}>
          <a href="https://www.google.com/maps/dir/?api=1&destination=Well+Room,+134+10th+St+NW,+Charlottesville,+VA+22903" target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #EDE5DA" }}>
              <div style={{
                height: "200px",
                background: "linear-gradient(145deg, #F8F5F0 0%, #EDE5DA 50%, #F5F1EB 100%)",
                display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
                  {[...Array(7)].map((_, i) => (
                    <div key={`h${i}`} style={{ position: "absolute", top: `${(i + 1) * 13}%`, left: 0, right: 0, height: "1px", background: "#635B56", transform: `rotate(${i % 2 === 0 ? -1.5 : 2}deg)` }} />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <div key={`v${i}`} style={{ position: "absolute", left: `${(i + 1) * 16}%`, top: 0, bottom: 0, width: "1px", background: "#635B56", transform: `rotate(${i % 2 === 0 ? 0.5 : -0.5}deg)` }} />
                  ))}
                </div>
                <div style={{ textAlign: "center", zIndex: 1 }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50% 50% 50% 0",
                    background: "#B8845A", transform: "rotate(-45deg)",
                    margin: "0 auto 12px", boxShadow: "0 3px 12px rgba(196,154,108,0.2)",
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
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "18px", flexWrap: "wrap" }}>
            {[
              { label: "Free parking", icon: "P" },
              { label: "Mon–Fri 10am–4pm", icon: "◷" },
              { label: "Downtown Cville", icon: "◉" },
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
          Ready to experience Well Room?
        </h2>
        <p style={{ fontSize: "14px", color: "#978F89", marginBottom: "28px", fontWeight: 300 }}>
          Use code <strong style={{ color: "#B8845A", fontWeight: 500 }}>LANTERN15</strong> for 15% off your first visit.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wellroomva.as.me/appointments" className="btn-primary">Book Online</a>
          <a href="tel:4349336100" className="btn-secondary">Call (434) 933-6100</a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#FFFFFF", borderTop: "1px solid #EDE5DA", padding: "28px 32px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "14px", flexWrap: "wrap" }}>
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

export default WellRoomLP;
