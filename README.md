<table> <tr> <td> <h3>Flight Search Web App</h3> <p> <strong>A lightweight full-stack flight search application built for learning and portfolio use.</strong><br/> Designed to demonstrate API integration, client-server communication, and automated UI testing using a clean and approachable architecture. </p> </td> </tr> </table>
What Is This Project

The Flight Search Web App is a small full-stack web application that simulates the core functionality of popular flight comparison platforms. It allows users to search for flights between two destinations, compare prices and travel details, and switch between currencies using live flight data.

The project combines a browser-based front end with a local Python proxy server that securely fetches flight data from an external API while avoiding common browser limitations such as CORS restrictions. Automated Selenium tests are included to validate core user-facing functionality.

This repository is intended as a learning resource and a portfolio-ready example of a simple but realistic full-stack application.

Project Goal

Build a simple, understandable full-stack application that demonstrates how front-end interfaces, backend services, and third-party APIs work together.

The goal is not to replicate a production flight booking system, but to provide a clean foundation that can be forked, extended, and customized by developers learning full-stack development.

Core Architecture
Component	Description
Frontend	HTML, CSS, and JavaScript with React loaded via CDN
Backend	Python-based local proxy server
External API	Google Flights data accessed through SerpAPI
Testing	Selenium WebDriver with Python
Key Features

Flight search by origin, destination, and travel dates

Dynamic rendering of prices, durations, airlines, and layovers

Currency selector for international price comparison

Clean, card-based results layout with strong visual hierarchy

Responsive design for desktop and mobile

Demo mode using static example data

Automated UI testing for critical user flows

Project Structure
File	Purpose
index.html	Application entry point
styles.css	Layout, colors, and responsive styling
app.jsx	Front-end logic and dynamic UI rendering
airportCodes.json	Airport names and IATA code data
example.json	Static API response for demo and testing
server.py	Python proxy server for API requests
test_flight_search.py	Selenium automated UI tests
README.md	Project documentation
Getting Started
Prerequisites
Requirement	Notes
Python	Version 3.7 or higher
Browser	Google Chrome recommended
Selenium	Required for automated tests

Install Selenium:

pip install selenium

Running the Application Locally

Start the local server:

python server.py


Open a browser and navigate to:

http://127.0.0.1:8080/index.html


Select airports from the dropdown suggestions or enter valid three-letter IATA codes such as YYZ or JFK.
