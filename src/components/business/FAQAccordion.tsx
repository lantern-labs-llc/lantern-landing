"use client";

import { useState } from "react";
import { FAQ } from "@/lib/types/business";

export default function FAQAccordion({
  faqs,
  defaultOpen = -1,
}: {
  faqs: FAQ[];
  defaultOpen?: number;
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  if (faqs.length === 0) return null;

  return (
    <div>
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`border-b border-wr-border py-5 ${i === 0 ? "border-t" : ""}`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="w-full font-wr-body font-normal text-[0.95rem] text-wr-text text-left flex justify-between items-start gap-4 cursor-pointer bg-transparent border-none p-0"
          >
            <span>{faq.question}</span>
            <span className="text-wr-copper text-[1.1rem] shrink-0 leading-none mt-0.5">
              {openIndex === i ? "−" : "+"}
            </span>
          </button>
          {openIndex === i && (
            <div className="text-[0.9rem] text-wr-text-light mt-3 leading-[1.7]">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
