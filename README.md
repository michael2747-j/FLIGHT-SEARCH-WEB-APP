# FLIGHT-SEARCH-WEB-APP
Personal project showcasing a flight search web application with real-time API integration, responsive UI design, and automated Selenium testing.
=======
Flight Search Web App

A modern, web-based flight search application that helps users explore and compare airline travel options with a clean interface, real-time data, and automated UI testing.

🌍 Overview

The Flight Search Web App is a personal project designed to simulate the core functionality of popular flight comparison platforms. It allows users to search for flights between two destinations, view pricing and travel details, and compare options in different currencies.

The application combines a responsive front end with a lightweight Python proxy server to securely fetch flight data and avoid browser CORS limitations. It also includes automated Selenium tests to verify critical user-facing functionality.

✨ Key Features

🔍 Search flights by origin, destination, and travel dates

💰 View prices, durations, layovers, and airline details

🌐 Currency selector for easy international price comparison

🧾 Clear, card-based flight result layout

📱 Responsive design for desktop and mobile

🧪 Automated UI testing with Selenium

🧩 Demo mode using static example data

🛠️ Tech Stack
Layer	Technologies
Frontend	HTML, CSS, JavaScript (React via CDN)
Backend	Python (local proxy server)
API	Google Flights (via SerpAPI)
Testing	Selenium WebDriver (Python)
📂 Project Structure
FLIGHT-SEARCH-WEB-APP/
│
├── index.html               # Main HTML entry point
├── styles.css               # Application styling
├── app.jsx                  # React application logic
├── airportCodes.json        # Airport and IATA code data
├── example.json             # Demo API response
├── server.py                # Python proxy server
├── test_flight_search.py    # Selenium tests
└── README.md

🚀 Getting Started
✅ Prerequisites

Python 3.7 or higher

Google Chrome (for Selenium tests)

Selenium installed:

pip install selenium

▶️ Run the Application Locally

Start the local server:

python server.py


Open your browser and navigate to:

http://127.0.0.1:8080/index.html


When searching, select airports from the dropdown suggestions or enter valid 3-letter IATA codes (e.g., YYZ, JFK).

🧪 Demo Mode

The app includes an example.json file that simulates a successful API response.

Click Load example data

Instantly view flight results without making live API calls

Useful for demos, testing, and avoiding API quota limits

🤖 Automated Testing

Selenium is used to test key user flows and UI behavior.

▶️ Run the Tests

Ensure the local server is running:

python server.py


In a separate terminal:

python test_flight_search.py

✔ Tests Validate

Successful loading of flight data

Rendering of flight cards with visible pricing

Proper UI behavior without errors

🔐 Security Notes

API keys are exposed only for development purposes

In production, API requests should be handled server-side

CORS policies are intentionally relaxed for local development

🔮 Future Enhancements

⭐ Airline ratings and reviews

🎒 Baggage allowance and refund policy details

☁️ Weather and travel disruption alerts

❤️ Save and compare favorite flights

🌐 Hosted backend deployment (Render, Railway, etc.)

📄 License

This project is for personal and educational use.
>>>>>>> master
