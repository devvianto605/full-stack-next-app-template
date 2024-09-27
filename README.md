# Frontend Challenge

## Overview
Create a responsive weather application that allows users to search for cities and view current weather conditions. The app should feature a search box with suggestions, a list of selected cities with current temperatures, and detailed weather information for each city. Users should be able to configure the temperature unit system (Kelvin, Fahrenheit, Celsius).

# Design Guideline
This is just a guideline. You can adjust or totally redesign it as you see fit.

![example](https://github.com/factory-talk/frontend-challenge/assets/120702073/d937815c-b452-4e9c-8a7f-a6fcf1daab0d)

# Features
## Index Page
- Search Box: Allows users to search for cities by name or ZIP code
    - Provides a suggestion list as the user types.
- City List: Display a list of cities selected by the user alont with the current time and average temperature.
    - User can manage the list by adding or removing cities.

## Search Page
- Auto-Suggestions: When typing in the search box, display a list of suggested cities based on the input.
- City Selection: Allows user to select a city from the suggestion list to add to their index.

## Detail Page
- City Weather Details: Display detailed weather information for the selected city, including:
    - Average Temperature
    - Minimum and Maximum Temperature
    - Weather Icon
    - Main Weather (e.g., Rain, Snow, Sunny)
    - Weather Description
    - Wind Speed
    - Humidity
    - Pressure
    - Rain Volume
- 24-Hour Forecast: Show a forecast for the next 24 hours, including temperature and weather conditions.

## Additional Features
- Temperature Unit Configuration: Allow users to select their preferred temperature unit (Kelvin, Fahrenheit, Celsius).
- Responsive Design: Ensure the application is responsive and works well on various device sizes.
- Current Date and Time: Display the current date and time for each city in the list.

## Technology Stack
- Use Next.js or React.js for building the user interface.
- Utilize CSS-in-JS solutions (e.g., Styled-Components, Emotion) or CSS frameworks (e.g., Bootstrap, Tailwind CSS) for styling.
- Implement unit tests using a testing framework (e.g., Jest, React Testing Library) to ensure code reliability and quality.
- Use TypeScript to provide static type checking and improve code quality and maintainability.
- Follow best practices for user experience.

## Data Source
### OpenWeather API
https://openweathermap.org/api
### Weather icons
https://openweathermap.org/weather-conditions
### Places API
https://geoawesomeness.com/google-maps-api-alternatives-best-cheap-affordable/

You can choose any Places API as your datasource.


## Submission
- Fork this repository, make a pull request to this repo. when you're done an assignment.
- Ensure the code follows best practices and includes comprehensive unit tests.
- Ensure that the project can be run successfully with the provided instructions or setup. We should be able to execute and test your code without any issues.
- Focus on demonstrating your programming skills rather than aiming for a perfect solution. We are more interested in your approach, thought process, and coding practices.




