Flight Search Web App
<table>
<tr>
<td>

<strong>A lightweight full‑stack flight search application built for learning and portfolio use.</strong><br/>
Designed to demonstrate API integration, client–server communication, and automated UI testing using a clean and approachable architecture.

</td>
</tr>
</table>

What Is This Project
<table>
<tr>
<td>
The <strong>Flight Search Web App</strong> simulates the core functionality of modern flight comparison tools. It allows users to search for flights, compare prices and durations, and switch currencies using live or demo data.<br/><br/>
A browser-based frontend communicates with a Python proxy server that fetches flight data from an external API while avoiding CORS issues. Automated Selenium tests validate core user flows.<br/><br/>
This repository serves as a <strong>learning resource</strong> and a <strong>portfolio-ready example</strong> of a simple but realistic full-stack application.
</td>
</tr>
</table>

###Project Goal
<table>
<tr>
<td>
Build a simple, understandable full-stack application that demonstrates how front-end interfaces, backend services, and third-party APIs work together.<br/><br/>
The goal is not to replicate a production booking system, but to provide a clean foundation that can be extended and customized.
</td>
</tr>
</table>

Core Architecture
<table>
<tr><th>Component</th><th>Description</th></tr>
<tr><td><strong>Frontend</strong></td><td>HTML, CSS, JavaScript, React via CDN</td></tr>
<tr><td><strong>Backend</strong></td><td>Python-based local proxy server</td></tr>
<tr><td><strong>External API</strong></td><td>Google Flights data via SerpAPI</td></tr>
<tr><td><strong>Testing</strong></td><td>Selenium WebDriver with Python</td></tr>
</table>

Key Features
<table>
<tr><td>

Flight search by origin, destination, and travel dates

Dynamic rendering of prices, durations, airlines, and layovers

Currency selector for international price comparison

Clean, card-based results layout

Responsive design for desktop and mobile

Demo mode using static example data

Automated UI testing for critical flows

</td></tr>
</table>

Project Structure
<table>
<tr><th>File</th><th>Purpose</th></tr>
<tr><td>index.html</td><td>Application entry point</td></tr>
<tr><td>styles.css</td><td>Layout, colors, responsive styling</td></tr>
<tr><td>app.jsx</td><td>Front-end logic and dynamic UI rendering</td></tr>
<tr><td>airportCodes.json</td><td>Airport names and IATA code data</td></tr>
<tr><td>example.json</td><td>Static API response for demo/testing</td></tr>
<tr><td>server.py</td><td>Python proxy server for API requests</td></tr>
<tr><td>test_flight_search.py</td><td>Selenium automated UI tests</td></tr>
<tr><td>README.md</td><td>Project documentation</td></tr>
</table>

Getting Started
Prerequisites
<table>
<tr><th>Requirement</th><th>Notes</th></tr>
<tr><td>Python</td><td>Version 3.7 or higher</td></tr>
<tr><td>Browser</td><td>Google Chrome recommended</td></tr>
<tr><td>Selenium</td><td>Required for automated tests</td></tr>
</table>

Install Selenium:

Code
pip install selenium
Running the Application Locally
<table>
<tr><td>

1. Start the local server
Code
python server.py
2. Open the application
Code
http://127.0.0.1:8080/index.html
</td></tr>
</table>
