"use client";

import React from "react";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";
import { stats } from "../../data/stats";
import Container from "../shared/container";

export default function ImpactStats() {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`scroll-fade-in ${isVisible ? "visible" : ""} border-y border-outline-variant/10 bg-surface-container-lowest py-section-padding-md`}
    >
      <Container>
        <h3 className="mb-12 text-center font-label-sm text-xs uppercase tracking-widest text-primary">
          Global Impact & Delivery
        </h3>

        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-5">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`space-y-1 ${
                index === stats.length - 1 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="font-display-lg text-3xl text-white">
                {stat.value}
              </div>
              <div className="font-label-sm text-xs text-on-surface-variant">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
