const mongoose = require('mongoose');
const { Traffic } = require('./traffic'); // Import your model

mongoose.connect('mongodb://localhost:27017/wallpapers', { useNewUrlParser: true, useUnifiedTopology: true });

const totalVisitsArray = [
    345, 372, 398, 423, 429, 432, 460, 470, 455, 480, 
    475, 483, 497, 485, 505, 520, 510, 525, 520, 510, 
    515, 505, 515, 530, 545, 530, 540, 525, 510, 520, 
    535, 483, 497, 485, 505, 520, 510, 525, 520, 510,
    432, 460, 470, 455, 480, 340, 450, 485, 470, 460,
    490, 500, 530, 545, 530, 540, 525, 510, 520, 485,
];

const generateRandomTrafficData = () => {
    const data = [];
    let currentDate = new Date('2025-01-01');

    for (let i = 0; i < totalVisitsArray.length; i++) {
        const totalVisits = totalVisitsArray[i] || 0;

        // Distribute visits across devices randomly
        const mobile = Math.floor(totalVisits * (Math.random() * 0.6)); // 0-60% of traffic
        const pc = Math.floor(totalVisits * (Math.random() * 0.3)); // 0-30% of traffic
        const other = totalVisits - (mobile + pc); // Remaining

        // Generate random routes and their visit counts
        const routes = {
            "/home": Math.floor(Math.random() * totalVisits),
            "/profile": Math.floor(Math.random() * totalVisits),
            "/traffic": Math.floor(Math.random() * totalVisits),
            "/preview": Math.floor(Math.random() * totalVisits),
            "/auth": Math.floor(Math.random() * totalVisits)
        };

        // Determine most visited route
        const mostVisitedRoute = Object.keys(routes).reduce((a, b) => (routes[a] > routes[b] ? a : b), "/");

        // Create a document for the day
        data.push({
            mobile,
            pc,
            other,
            totalVisits,
            routes,
            mostVisitedRoute,
            date: new Date(currentDate) // Store date as Date type
        });

        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
};

const insertTestData = async () => {
    try {
        const testData = generateRandomTrafficData();
        await Traffic.insertMany(testData);
        console.log('Test data inserted successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error inserting test data:', err);
    }
};

insertTestData();
