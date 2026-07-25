# Garissa and Moyale Fashion Ltd 🛍️

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()
[![Location](https://img.shields.io/badge/Location-Nandi_Hills_Town,_Kenya-red.svg)]()

Modern, high-performance, mobile-responsive e-commerce web platform for **Garissa and Moyale Fashion Ltd**, located **Opposite Migingo/KCB, Nandi Hills Town, Kenya**.

> **Slogan / Tagline:** *"Quality Fashion. Affordable Prices. Trusted Service."* (Kwa Bei Nafuu)

---

## 🌟 Key Features

* **High-Performance WebP CDN Image Delivery:**
  * Powered by Cloudinary dynamic transformation (`f_auto,q_auto`), serving optimized WebP/AVIF images dynamically to save over 70% bandwidth and guarantee ultra-fast page loads.
* **Interactive Shopping Cart Drawer (`LocalStorage`):**
  * Persistent client-side cart allows users to add items, modify quantities, and clear items. State persists across browser refreshes.
* **One-Click WhatsApp Order Checkout:**
  * Instantly converts cart contents into an itemized, formatted order receipt sent directly to **0793788938** on WhatsApp.
* **Dynamic Search & Multi-Criteria Sorting:**
  * Real-time search across title, description, category, and target audience.
  * Multi-criteria sorting: *Featured*, *Name (A to Z)*, *Name (Z to A)*, and *By Category*.
* **Mobile-First & Android Optimized:**
  * Native sticky mobile bottom bar, touch-action optimizations, and smooth slide-out drawer menus built for smartphones and tablets across Kenya.
* **Layered Security Architecture:**
  * Strict Content Security Policy (CSP) meta tags, input sanitization against XSS & script injection, anti-automation rate limiting on forms, and secure `rel="noopener noreferrer"` external links.
* **Rich SEO & Google Indexing:**
  * Embedded JSON-LD `ClothingStore` schema markup (`schema.org`) for enhanced Google search engine listings and rich snippets.

---

## 🏬 Business Scope & Inventory

We operate both **wholesale** and **retail** operations across Kenya:
* **Outerwear & Jackets:** Varsity bomber jackets, heavy winter puffer coats, Planda jackets, XL-4XL coats, fleece-lined denim jackets, classic executive jackets, and sweaters.
* **Footwear & Shoes:** Mary Jane strap heels & wedge pumps (`MB26-25J`), Samba classic white & leather sneakers, Nike running shoes, Kaisifeier leather dress shoes (`KS-P2035`), loafers, and outdoor hiking boots.
* **Ladies Wear & Jeans:** High-waist stretch denim jeans, elegant dresses, leopard print tops.
* **Bags, Accessories & Home:** Handbags, travel bags, belts, wallets, mattresses, and household items.

---

## 🔒 Security Strategy Implementation

1. **Content Security Policy (CSP):**
   * Configured strict CSP headers restricting script, style, font, and image execution to trusted origin domains (`https://res.cloudinary.com`, `https://cdnjs.cloudflare.com`, `https://fonts.googleapis.com`).
2. **Input Sanitization & Protection:**
   * All user text input in contact forms, search bars, and order fields undergo strict HTML sanitization before DOM rendering or WhatsApp string generation to prevent Cross-Site Scripting (XSS).
3. **Anti-Automation & Rate Limiting:**
   * Client-side submission throttling prevents automated bot spam on WhatsApp order forms.
4. **Data Protection & Secure Storage:**
   * Safe JSON parsing and fallback error handling for `localStorage` cart state prevents code injection via corrupted local storage states.
5. **HTTPS & Reverse Tabnabbing Protection:**
   * Enforced `rel="noopener noreferrer"` on all external links opening in new tabs.

---

## 🛠️ Tech Stack

* **Frontend:** Vanilla JavaScript (ES6+), HTML5, Vanilla CSS3 (Custom Variables, Flexbox, Grid).
* **Typography & Icons:** Google Fonts (`Outfit`, `Plus Jakarta Sans`), FontAwesome 6.5.
* **Image CDN:** Cloudinary (Dynamic WebP/AVIF auto-format & quality optimization).
* **SEO:** JSON-LD Schema.org (`ClothingStore`).
* **License:** Apache License 2.0.

---

## 📍 Store Location & Contact Information

* **Address:** Opposite Migingo / KCB, Nandi Hills Town, Nandi County, Kenya
* **Operating Hours:** Open **8:00 AM – 9:00 PM Daily** (Monday – Sunday)
* **Phone / WhatsApp:** [0793788938](tel:0793788938) | [+254 793 788 938](https://wa.me/254793788938)

---

## 📜 License

This project is open-source under the terms of the [Apache License 2.0](LICENSE).
