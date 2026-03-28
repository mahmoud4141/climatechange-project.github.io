// Sample Training Set [Moisture, Temp, Label(1=ON, 0=OFF)]
const trainingData = [
    [10, 40, 1], [15, 38, 1], [25, 35, 1],
    [45, 25, 0], [55, 20, 0], [40, 30, 0],
    [20, 32, 1], [60, 15, 0]
];

document.getElementById('predictBtn').addEventListener('click', () => {
    const moisture = parseFloat(document.getElementById('moisture').value);
    const temp = parseFloat(document.getElementById('temp').value);
    const cropFactor = parseFloat(document.getElementById('crop').value);
    const soilFactor = parseFloat(document.getElementById('soil').value);

    // 1. Run KNN Algorithm (finding the nearest neighbor)
    let nearest = trainingData.map(point => {
        let distance = Math.sqrt(Math.pow(moisture - point[0], 2) + Math.pow(temp - point[1], 2));
        return { label: point[2], dist: distance };
    }).sort((a, b) => a.dist - b.dist)[0];

    // 2. Determine Output
    const resultsDiv = document.getElementById('results');
    const pumpSpan = document.getElementById('pumpStatus');
    const volSpan = document.getElementById('volume');

    resultsDiv.classList.remove('hidden');

    if (nearest.label === 1) {
        pumpSpan.innerText = "PUMP ON";
        pumpSpan.className = "status on";
        // Calculate volume based on factors
        let baseVol = 4000; 
        volSpan.innerText = Math.round(baseVol * cropFactor * soilFactor);
    } else {
        pumpSpan.innerText = "PUMP OFF";
        pumpSpan.className = "status off";
        volSpan.innerText = "0";
    }
});
