"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { projects, type Project } from "../../data/projects";
import Container from "../shared/container";
import MaterialIcon from "../ui/material-icon";

function ProjectTag({
  label,
  variant,
}: {
  label: string;
  variant: "default" | "primary";
}) {
  if (variant === "primary") {
    return (
      <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
        {label}
      </span>
    );
  }

  return (
    <span className="rounded-full bg-surface-container-high px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isFull = project.width === "full";

  return (
    <div
      className={`slide-item flex-none snap-center ${
        isFull ? "w-full md:w-[780px]" : "w-full md:w-[388px]"
      }`}
    >
      <div className="premium-shadow group flex h-full min-h-[400px] flex-col justify-between rounded-xl border border-outline-variant/20 bg-surface p-8">
        <div
          className={
            isFull
              ? "flex items-start justify-between"
              : "flex flex-col"
          }
        >
          <div>
            <div className={`flex gap-2 ${isFull ? "mb-4" : "mb-4 inline-block"}`}>
              {project.tags.map((tag) => (
                <ProjectTag key={tag.label} {...tag} />
              ))}
            </div>
            <h3 className="mb-2 font-headline-sm text-2xl text-white">
              {project.title}
            </h3>
            <p
              className={`text-on-surface-variant ${
                isFull ? "max-w-sm" : "text-sm"
              }`}
            >
              {project.description}
            </p>
          </div>

          {isFull && (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant transition-colors group-hover:bg-primary group-hover:text-white">
              <MaterialIcon name="north_east" />
            </div>
          )}
        </div>

        {project.image && (
          <div className="mt-8 h-64 overflow-hidden rounded-lg border border-outline-variant/10">
            <Image
              src={project.image}
              alt={project.title}
              width={780}
              height={256}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {project.icon && project.iconPosition === "center" && (
          <div className="mt-8 flex justify-center py-4">
            <MaterialIcon
              name={project.icon}
              className="text-6xl text-primary opacity-20 transition-opacity group-hover:opacity-100"
            />
          </div>
        )}

        {project.icon && project.iconPosition === "end" && (
          <div className="mt-8 flex justify-end">
            <MaterialIcon
              name={project.icon}
              className="text-4xl text-on-surface-variant transition-all group-hover:rotate-12 group-hover:text-primary"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollPosition = slider.scrollLeft;
    const sliderWidth = slider.offsetWidth;
    const items = slider.querySelectorAll(".slide-item");

    items.forEach((item, index) => {
      const itemLeft =
        (item as HTMLElement).offsetLeft - slider.offsetLeft;
      if (Math.abs(scrollPosition - itemLeft) < sliderWidth / 2) {
        setActiveIndex(index);
      }
    });
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => slider.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const item = slider.querySelectorAll(".slide-item")[index] as HTMLElement;
    if (!item) return;

    slider.scrollTo({
      left: item.offsetLeft - slider.offsetLeft,
      behavior: "smooth",
    });
  };

  const scrollByPage = (direction: "prev" | "next") => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction === "prev" ? -slider.offsetWidth : slider.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      className="bg-surface-container-lowest py-section-padding-lg"
    >
      <Container>
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="mb-4 font-display-lg text-4xl text-white">
              Featured Work
            </h2>
            <p className="max-w-lg font-body-md text-on-surface-variant">
              Selected projects that demonstrate technical depth and
              user-centric design in the eCommerce space.
            </p>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <button
              type="button"
              onClick={() => scrollByPage("prev")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant text-white transition-all hover:border-primary hover:bg-primary"
              aria-label="Previous project"
            >
              <MaterialIcon name="chevron_left" />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage("next")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant text-white transition-all hover:border-primary hover:bg-primary"
              aria-label="Next project"
            >
              <MaterialIcon name="chevron_right" />
            </button>
            <span className="ml-4 flex items-center gap-2 font-label-sm text-xs uppercase tracking-widest text-primary">
              Archives
              <MaterialIcon
                name="arrow_right_alt"
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="slider-container flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8"
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to project ${index + 1}`}
                className={`slider-dot h-2 rounded-full bg-outline-variant/30 transition-all duration-300 ${
                  activeIndex === index ? "active" : "w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
