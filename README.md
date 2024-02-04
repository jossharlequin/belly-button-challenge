# belly-button-challenge
// Data variable in the outer scope
let data;
let selectedId;

// URL of the samples.json file. Don't know how to actually read the file rather than the internet.
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use D3 to read in the JSON file
d3.json(url).then(function (response) {
    // Assign the data to the outer variable
    data = response;

    // Populate dropdown with individual IDs
    populateDropdown(data.names);

    // Initialize the dashboard with the first individual's data
    selectedId = data.names[0];
    updateDashboard(selectedId);
}).catch(function (error) {
    console.error("Error loading data:", error);
});

// Function to populate dropdown with individual IDs
function populateDropdown(names) {
    let dropdown = d3.select("#selDataset");
    dropdown.html(""); // Clear existing options
    names.forEach(function (id) {
        dropdown.append("option").text(id).property("value", id);
    });
}

// Function to update the entire dashboard based on selected individual
function updateDashboard(selectedId) {
    // Update the bar chart
    updateBarChart(selectedId);

    // Update the bubble chart
    updateBubbleChart(selectedId);

    // Update the gauge chart
    updateGaugeChart(selectedId);

    // Display sample metadata
    displaySampleMetadata(selectedId);
}

// Function to update bar chart based on selected individual
function updateBarChart(selectedId) {
    let index = data.names.indexOf(selectedId);

    // Top 10 OTUs data for the selected individual
    let top10OTUs = {
        otu_ids: data.samples[index].otu_ids.slice(0, 10).reverse(),
        sample_values: data.samples[index].sample_values.slice(0, 10).reverse(),
        otu_labels: data.samples[index].otu_labels.slice(0, 10).reverse(),
    };

    // Create trace for the bar chart. Modified version: https://plotly.com/javascript/bar-charts/
    let barTrace = {
        x: top10OTUs.sample_values,
        y: top10OTUs.otu_ids.map(id => `OTU ${id}`),
        text: top10OTUs.otu_labels,
        type: "bar",
        orientation: "h",
        marker: {
            color: 'orange',
            line: {
                color: 'black',
                width: 3,
            },
        },
    };

    // Create layout for the bar chart
    let barLayout = {
        title: `Top 10 OTUs for ${selectedId}`,
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" },
    };

    // Create and display the bar chart
    Plotly.newPlot("bar", [barTrace], barLayout);
}

// Function to update bubble chart based on selected individual 
function updateBubbleChart(selectedId) {
    let index = data.names.indexOf(selectedId);

    // Create trace for the bubble chart. The colorscale doesn't want to work. Modified version: https://plotly.com/javascript/bubble-charts/
    let bubbleTrace = {
        x: data.samples[index].otu_ids,
        y: data.samples[index].sample_values,
        text: data.samples[index].otu_labels,
        mode: 'markers',
        marker: {
            size: data.samples[index].sample_values,
            color: data.samples[index].otu_ids,
            colorscale: 'Oranges_r',
            opacity: 0.7,
            line: {
                color: 'black',
                width: 3,
            },
        },
    };

    // Create layout for the bubble chart
    let bubbleLayout = {
        title: `Bubble Chart for ${selectedId}`,
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' },
    };

    // Create and display the bubble chart
    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
}

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

updatePanelHeadingColor('blue');

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



