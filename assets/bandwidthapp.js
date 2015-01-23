function initChart(dataset) {
	var ctx = document.getElementById("bandwidth-chart").getContext("2d");

	var chart_labels = [];
	var chart_points = [];

	dataset.forEach(function(school) {
		chart_labels.push(school.ben);
		chart_points.push(school.cost_per_megabit);
	});

	var data = {
	    labels: chart_labels,
	    datasets: [
	        {
	            label: "Bandwidth Cost Per Megabit",
	            fillColor: "rgba(151,187,205,0.5)",
            	strokeColor: "rgba(151,187,205,0.8)",
            	highlightFill: "rgba(151,187,205,0.75)",
            	highlightStroke: "rgba(151,187,205,1)",
	            data: chart_points
	        }
	    ]
	};

	var bandwidthBarChart = new Chart(ctx).Bar(data);
}

