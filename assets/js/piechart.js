

var config = {
    type: 'pie',
    data: {
    labels: [
        "Skipped words",
        "Explained words",
        "Mimicked words"
    ],
    datasets: [
        { //example data
            data: [30, 50, 20],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
	},
    options: {
        responsive: true
	}
};


window.onload = function() {
    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myPie = new Chart(ctx, config);
};


