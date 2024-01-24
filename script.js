function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    document.getElementById('hours').textContent = formattedHours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('amPm').textContent = amPm;

    updateBackground(now);
    updateTimeBasedGreeting()
    updateWeather();
}

function updateBackground(now) {
    const hour = now.getHours();
    const body = document.body;
    const clockContainer = document.querySelector('.clock-container');

    if (hour >= 6 && hour < 12) {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1499002238440-d264edd596ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')";
    } else if (hour >= 12 && hour < 18) {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1577257108037-e85032e84049?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    } else {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    }
}

async function updateWeatherInformation(zip, apiKey) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${zip}&appid=${apiKey}`);
        const data = await response.json();

        const weatherInfoElement = document.getElementById('weatherInfo');
        weatherInfoElement.textContent = `Currently,its ${data.weather[0].description}, ${Math.round(data.main.temp - 273.15)}°C Outside.`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateRandomTimeFact() {
    const timeFacts = [
        'Did you know that a day on Venus is longer than a year?',
        'The first mechanical clock was created in the 14th century.',
        'A nanosecond is one billionth of a second.',
        'The word "hour" is derived from the Anglo-Norman "houre," which means "time."',
        'Time travel is a popular concept in science fiction.'
    ];

    const randomFact = timeFacts[Math.floor(Math.random() * timeFacts.length)];
    document.getElementById('timeFact').textContent = `Time Fact: ${randomFact}`;
}

function updateTimeBasedGreeting() {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    document.getElementById('greeting').textContent = `${greeting}`;
}

function setupClockAndFeatures() {

    const apiKey = '4b67d2b36df8c92e7114c00b0c02bdfd';
    const zip = '713386';
    updateWeatherInformation(zip, apiKey);

    setInterval(() => {
        updateRandomTimeFact();
        updateTimeBasedGreeting();
    }, 60000);
}

setupClockAndFeatures();
setInterval(updateClock, 1000);
updateRandomTimeFact();
updateClock();