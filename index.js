
let studentProfile = {
    name: "N/A",
    birthYear: null,
    city: "N/A",
    saved: false
};
const motivationalQuotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "An investment in knowledge pays the best interest. - Benjamin Franklin",
    "The roots of education are bitter, but the fruit is sweet. - Aristotle",
    "You don't have to be great to start, but you have to start to be great. - Zig Ziglar"
];
function openTab(tabName, buttonElement) {
    const tabcontent = document.getElementsByClassName("content-section");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    document.getElementById(tabName).style.display = "block";
    buttonElement.classList.add("active");

    if (tabName === 'Greeting') {
        displayPersonalizedGreeting();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const profileSection = document.getElementById('Profile');
    if (profileSection) {
        profileSection.style.display = 'block';
        profileSection.classList.add('active');
    }
    displayProfileJSON();

    document.getElementById('profile-form').addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const nameInput = document.getElementById('student-name').value.trim();
        const yearInput = document.getElementById('student-birth-year').value.trim();
        const cityInput = document.getElementById('student-city').value.trim();
        
        try {
            if (!nameInput || !yearInput || !cityInput) {
                throw new Error("All profile fields must be filled out.");
            }
            const birthYear = parseInt(yearInput, 10);
            const currentYear = new Date().getFullYear();
            
            if (isNaN(birthYear) || birthYear < 1900 || birthYear > currentYear) {
                throw new Error("Invalid Birth Year. Must be a valid year.");
            }
            studentProfile.name = nameInput;
            studentProfile.birthYear = birthYear;
            studentProfile.city = cityInput;
            studentProfile.saved = true;

            displayProfileJSON();
            alert('Profile saved successfully!');
            
        } catch (error) {
            const resultBox = document.getElementById('profile-display');
            resultBox.textContent = `Error: ${error.message}`;
        }
    });
});
function displayProfileJSON() {
    const profileDisplay = document.getElementById('profile-display');
    profileDisplay.textContent = JSON.stringify(studentProfile, null, 2);
}


function calculateAndDisplayAge() {
    const ageResult = document.getElementById('age-result');
    
    try {
        if (!studentProfile.saved || studentProfile.birthYear === null) {
            throw new Error("Please save your Name and Birth Year in the Profile tab first.");
        }
        const currentYear = new Date().getFullYear();
        const age = currentYear - studentProfile.birthYear;
        const name = studentProfile.name.split(' ')[0] || "Student";

        let eligibilityMessage = "";
        if (age >= 18) {
            eligibilityMessage = "<span style='color: green;'>You are eligible (18+).</span>";
        } else {
            eligibilityMessage = "<span style='color: orange;'>You are NOT yet 18.</span>";
        }
        ageResult.innerHTML = `
            <p>Hello, <strong>${name}</strong>!</p>
            <p>Your current age is: <strong>${age} years old</strong>.</p>
            <p>Eligibility Status: ${eligibilityMessage}</p>
        `;

    } catch (error){
        ageResult.innerHTML = `<span class="error-message">Error: ${error.message}</span>`;
    }
}

function displayPersonalizedGreeting() {
    const now = new Date();
    const hour = now.getHours();
    
    let timeOfDay;
    if (hour < 12) {
        timeOfDay = "Good Morning";
    } else if (hour < 18) {
        timeOfDay = "Good Afternoon";
    } else {
        timeOfDay = "Good Evening";
    }
    const firstName = studentProfile.name.split(' ')[0] || "Valued Student";
    
    const greeting = `${timeOfDay}, ${firstName}! It is currently ${now.toLocaleTimeString()}.`;
    document.getElementById('greeting-display').textContent = greeting;
}

function calculate(operation) {
    const num1Input = document.getElementById('num1').value;
    const num2Input = document.getElementById('num2').value;
    const resultBox = document.getElementById('calculator-result');

    try {
        const num1 = parseFloat(num1Input);
        const num2 = parseFloat(num2Input);

        if (isNaN(num1) || isNaN(num2)) {
            throw new Error("Please enter valid numbers for both fields.");
        }

        let result;
        let symbol;

        switch (operation) {
            case 'add':
                result = num1 + num2;
                symbol = '+';
                break;
            case 'subtract':
                result = num1 - num2;
                symbol = '-';
                break;
            case 'multiply':
                result = num1 * num2;
                symbol = '*';
                break;
            case 'divide':
                if (num2 === 0) {
                    throw new Error("Cannot divide by zero.");
                }
                result = num1 / num2;
                symbol = '/';
                break;
        }
        resultBox.innerHTML = `
            <p>Calculation: <strong>${num1} ${symbol} ${num2}</strong></p>
            <p>Result: <strong>${result.toFixed(2)}</strong></p>
        `;

    } catch (error) {
        resultBox.innerHTML = `<span class="error-message">Error: ${error.message}</span>`;
    }
}


function displayRandomQuote() {
    const quoteDisplay = document.getElementById('quote-display');
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    const quote = motivationalQuotes[randomIndex];
    quoteDisplay.innerHTML = `<p style="font-style: italic;">"${quote}"</p>`;
}