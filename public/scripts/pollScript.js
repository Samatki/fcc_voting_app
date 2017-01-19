/* global poll, Chart, $ */

$(document).ready(function(){ 

// Convert pollData to usable format (chart.JS uses Arrays);
var entryLabels = poll.pollData.map(function(item){return item.entryName;});
var entryData = poll.pollData.map(function(item){return item.entryVotes;});
var entryColors = poll.pollData.map(function(item){return item.entryColor;});

// Chart.JS Code

    // Accessing Canvas
var ctx = document.getElementById("pollChart").getContext("2d");

    // Data Entry
var data = {
    labels: entryLabels,
    datasets: [
        {
            data: entryData,
            backgroundColor: entryColors,
            hoverBackgroundColor: entryColors
        }]
};

    // Animation Settings
Chart.defaults.global.animation.easing = 'easeOutBounce';
Chart.defaults.global.animation.duration = 1000;

    // Drawing the Chart
var myPieChart = new Chart(ctx,{
    type: poll.pollOptions.pollChartType,
    data: data,
    options : {
         // Reponsive for browser scaling
         responsive: true,
         maintainAspectRatio: true
    }
});

});