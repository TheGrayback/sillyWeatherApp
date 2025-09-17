# Weather App TODO


## MVP Checklist (React-transition ready)

- [ ] API request on page load
- [ ] API request when changing forecast length
- [x] Display current weather (icon, temperature, condition, location, date/time)
- [x] Display forecast days dynamically (3 / 5 / 7 / 14)
- [x] Skip current day in forecast
- [x] Forecast card with scroll + placeholder ("Choose more days!") if needed
- [x] Weather metrics card: humidity, pressure, wind (at least 3 metrics)
- [ ] Handle invalid city input and API errors
- [ ] Basic responsive layout for main cards


## Core Features

- Add dynamic API request:
    - [ ] On page load
    - [ ] From changing forecast length
- Display current weather :
    - [x] Weather icon 
    - [x] Temperature 
    - [x] Condition description 
    - [x] Location (city, country) 
    - [x] Current date & time 
- Weekly forecast card :
    - [x] Dynamically render forecast days (3 / 5 / 7 / 14) 
    - [x] Skip current day (start from next day) 
    - [x] Scrollable forecast container 
    - [x] Placeholder ("Choose more days!") if <14 days 
- Error & edge cases:
    - [ ] Invalid city input
    - [ ] API errors / no response
    - [ ] No results found

## Weather Metrics Card

- Layout mini-cards:
    - [ ] Top row → metric title
    - [ ] Bottom row → value + icon
- Add metrics from API:
    - [ ] Humidity
    - [ ] Pressure
    - [ ] Wind speed
    - [ ] UV index
    - [ ] Precipitation chance
    - [ ] Radiation (if available)
- Ensure consistent sizing and responsive layout

## Advanced UI / UX

- [ ] Add loader/spinner while fetching data
- [ ] Add "no data" states
- [ ] Transition/animation when updating forecast
- [ ] Improve search:
    - [ ] Input with suggestions/autocomplete (optional)
    - [ ] Search button + enter key support

## Graphs & Data Visualization

- [ ] Add chart to the 4th card:
    - [ ] Hourly forecast (temperature line chart)
    - [ ] Optional: precipitation or wind speed
- [ ] Add toggle between different chart modes
- [ ] Responsive chart sizing

## User Profile (simple, WIP)

- [ ] Profile picture
- [ ] Display username
- [ ] Recent searched cities
- [ ] Saved favorite location

## Settings

- [ ] Night/Day theme switch
- [ ] Measurement units:
    - [ ] °C / °F
    - [ ] Wind: km/h / mph
    - [ ] Pressure: hPa / mmHg
- [ ] Default location option
- Language (optional)

## Refactor / Next Steps

- [ ] Migrate project to React:
    - [ ] Split UI into reusable components
    - [ ] State management for API data
    - [ ] Hooks for fetching and updating
- [ ] Optional: try other frameworks (Vue / Svelte)
- [ ] Extract constants (icons, colors) into config files

## Deployment

- [ ] Deploy MVP to GitHub Pages / Netlify / Vercel **(DONE)**
- [ ] Add favicon and metadata (SEO / PWA basics) 
- [ ] Check responsive layout on mobile/tablet

## Stretch Goals

- [ ] Notifications for severe weather
- [ ] Animated weather backgrounds (rain, snow, sun, etc.)
- [ ] Offline support / caching
- [ ] Multi-language support
- [ ] Geolocation auto-detect on first load
