// Function to update gauge chart based on selected individual. This is modified from: https://plotly.com/javascript/gauge-charts/
function updateGaugeChart(selectedId) {
    let index = data.names.indexOf(selectedId);
    let wfreq = data.metadata[index].wfreq;

    // Create trace for the gauge chart. Couldn't get the arrow to appear.
    let gaugeTrace = {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: `Belly Button Wash Frequency ${selectedId}<br><span style="font-size:0.8em;color:gray;">Washes Per Week</span>` },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 5 },
        gauge: {
            axis: { range: [0, 9] },
            steps: [
                { range: [0, 1], color: "#FFEDD2" }, // Light orange
                { range: [2, 3], color: "#FFDAA3" }, // Medium light orange
                { range: [4, 5], color: "#FFBB55" }, // Medium orange
                { range: [6, 7], color: "#FF9E15" }, // Dark orange
                { range: [8, 9], color: "#FF7C00" }  // Darker orange
            ],
            threshold: {
                line: { color: "red", width: 10 },
                thickness: 3.0,
                value: wfreq
            },
            bar: { color: "blue" },
        }
    };

    // Create layout for the gauge chart
    let gaugeLayout = {
        width: 600,
        height: 450,
        margin: { t: 0, b: 0 }
    };

    // Create and display the gauge chart
    Plotly.newPlot('gauge', [gaugeTrace], gaugeLayout);
}

// Function to display sample metadata
function displaySampleMetadata(selectedId) {
    let index = data.names.indexOf(selectedId);
    let metadata = data.metadata[index];

    // Clear existing metadata
    d3.select("#sample-metadata").html("");

    // Append each key-value pair to the sample-metadata div
    Object.entries(metadata).forEach(([key, value]) => {
        d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
    });
}

// Event listener for dropdown change
d3.select("#selDataset").on("change", function () {
    selectedId = d3.select(this).property("value");
    updateDashboard(selectedId);
});

//Change color of the Demographics Info box
function updatePanelHeadingColor(color) {
    // Get the panel heading element by its class
    let panelHeading = document.querySelector('.panel-heading');

    // Set the background color of the panel heading
    panelHeading.style.backgroundColor = color;
}

updatePanelHeadingColor('orange');

// Function to update border width of the demographics box
function updateBorderWidth(width) {
    // Get the demographics box element by its class
    let demographicsBox = document.querySelector('.panel');

    // Set the border width of the demographics box
    demographicsBox.style.borderWidth = `${width}px`;
}

updateBorderWidth(3);

// Function to update border color of the demographics box
function updateBorderColor(color) {
    // Get the demographics box element by its class
    let demographicsBox = document.querySelector('.panel');

    // Set the border color of the demographics box
    demographicsBox.style.borderColor = color;
}

updateBorderColor('black');