"use server";

import {
  budgets,
  projectTypes,
  type ContactField,
  type ContactState,
} from "../data/contact";
import { siteConfig } from "../data/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, key: string, max: number) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real visitors never fill this hidden field.
  if (field(formData, "company_website", 200)) {
    return { status: "success", message: "Thanks — your message is on its way." };
  }

  const name = field(formData, "name", 100);
  const email = field(formData, "email", 200);
  const projectType = field(formData, "projectType", 100);
  const budget = field(formData, "budget", 100);
  const message = field(formData, "message", 5000);

  const values = { name, email, projectType, budget, message };
  const errors: Partial<Record<ContactField, string>> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!projectTypes.includes(projectType as (typeof projectTypes)[number])) {
    errors.projectType = "Please choose what you need help with.";
  }
  if (message.length < 10) errors.message = "Please add a few details (10+ characters).";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: `The form isn't set up yet — please email ${siteConfig.email} instead.`,
      values,
    };
  }

  const safeBudget = budgets.includes(budget as (typeof budgets)[number]) ? budget : "Not given";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? siteConfig.email],
        reply_to: email,
        subject: `Portfolio enquiry: ${projectType} — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Project: ${projectType}`,
          `Budget: ${safeBudget}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      throw new Error(`Resend responded ${res.status}`);
    }
  } catch (error) {
    console.error("Contact form failed", error);
    return {
      status: "error",
      message: `Sorry, something went wrong. Please email ${siteConfig.email} directly.`,
      values,
    };
  }

  return { status: "success", message: "Thanks! Your message is on its way — I'll get back to you soon." };
}
