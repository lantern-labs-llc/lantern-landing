"use client";

import { motion } from "framer-motion";
import {
  UtensilsCrossed, Scissors, Wrench, Dumbbell, Stethoscope, GraduationCap,
} from "lucide-react";

const businesses = [
  { icon: UtensilsCrossed, name: "Restaurants & Cafés", desc: "Get recommended when locals ask 'Where should I eat tonight?'" },
  { icon: Scissors, name: "Salons & Spas", desc: "Show up when someone searches for the best haircut in town." },
  { icon: Wrench, name: "Home Services", desc: "Plumbers, electricians, contractors — be the first name AI suggests." },
  { icon: Dumbbell, name: "Fitness & Wellness", desc: "Yoga studios, gyms, personal trainers — stand out in AI results." },
  { icon: Stethoscope, name: "Healthcare", desc: "Dentists, therapists, vets — help patients find you through AI." },
  { icon: GraduationCap, name: "Education & Tutoring", desc: "Music lessons, tutoring, enrichment — reach families via chatbots." },
];

const BusinessTypes = () => (
  <section id="businesses" className="section-padding relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl mb-4">
          Built for <span className="italic text-gradient-lantern">Main Street</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          If customers find you by word of mouth, they'll find you through AI — with Lantern's help.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((biz, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-card rounded-xl p-6 shadow-card-lantern border border-border/50 hover:shadow-lantern hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
              <biz.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-display text-lg mb-2">{biz.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{biz.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BusinessTypes;
