# ✈️ Flight Search Web App

A lightweight full-stack flight search application built for learning and portfolio use.

This project demonstrates API integration, client–server communication, and automated UI testing using a clean, beginner-friendly architecture.

---

## 📖 Overview

The **Flight Search Web App** simulates the core functionality of modern flight comparison tools. Users can:

- Search for flights by origin, destination, and travel dates  
- Compare prices, durations, airlines, and layovers  
- View results in different currencies  

The frontend runs in the browser and communicates with a Python proxy server that fetches flight data from an external API while avoiding CORS issues.

This repository is designed to be both:
- a **learning resource**  
- a **portfolio-ready full-stack example**

---

## 🎯 Project Goals

- Demonstrate how frontend and backend components communicate
- Show safe integration with a third-party API
- Provide a clean foundation that can be extended or customized

This is **not** a production booking system. The focus is clarity, structure, and learning.

---

## 🏗️ Architecture

- **Frontend:** HTML, CSS, JavaScript, React (via CDN)
- **Backend:** Python proxy server
- **External API:** Google Flights data (SerpAPI)
- **Testing:** Selenium WebDriver (Python)

---

## ✨ Features

- Flight search by origin, destination, and dates
- Dynamic rendering of:
  - prices
  - durations
  - airlines
  - layovers
- Currency selector for international price comparison
- Card-based, responsive results layout
- Demo mode using static example data
- Automated UI testing for core user flows

---

## 📁 Project Structure

```text
├── index.html            # Application entry point
├── styles.css            # Layout, colors, responsive styling
├── app.jsx               # Frontend logic and UI rendering
├── airportCodes.json     # Airport names and IATA codes
├── example.json          # Static API response for demo/testing
├── server.py             # Python proxy server
├── test_flight_search.py # Selenium automated UI tests
└── README.md             # Project documentation

