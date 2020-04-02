
var selector = d3.select("#selDataset");
d3.json("samples.json").then((myData) => {
	// console.log(myData)
	myData.names.forEach((sample) => { 
			selector.append("option")
			.text(sample)
			.property("value", sample);
		});
	createChart(myData.names[0]);
	getMetadata(myData.names[0]); 
});

function optionChanged(currentId){ 
	console.log("ID CHANGED TO "+ currentId)
	getMetadata(currentId);
	createChart(currentId)
}
	
function createChart(currentId){
d3.json("samples.json").then((myData) => { 
		myData.samples.forEach((sample) => {
			if(sample.id === currentId){ 
				console.log(sample.id + " is equivalent to " + currentId + " my dude!")
				
				var otuIdBar = []; 
				var otuIdBubble = []; 
				var sampleValue = []; 
				var otuLabel = []; 
				for(i = 0; (i < 10)&&(i < sample.otu_ids.length); i++){ 
					otuIdBar.push("OTU " + sample.otu_ids[i].toString())
					otuIdBubble.push(sample.otu_ids[i])
					sampleValue.push(sample.sample_values[i])
					otuLabel.push(sample.otu_labels[i])
				}
				console.log(otuIdBar)
				var createBar = [{ 
					type: "bar",
					x: sampleValue.reverse(), 
					y: otuIdBar.reverse(),
					text: otuLabel,
					orientation: "h",
  				}];

				var createBubble = [{
					x: otuIdBubble,
					y: sampleValue,
					mode: 'markers',
					marker:{
						size: sampleValue,
						color: otuIdBubble,
					}
				}]
				var bubbleLayout = {
					title: 'Bubble Chart',
					height: 630,
					width: 630
				}
				Plotly.newPlot("bar", createBar); 
				Plotly.newPlot("bubble", createBubble, bubbleLayout);
			}	
		});
	});
}
function getMetadata(currentId){
	d3.json("samples.json").then((myData) => {
		myData.metadata.forEach((sample) => { 
			if(sample.id.toString() === currentId){ 
				var metadataDiv = d3.select("#sample-metadata");
				metadataDiv.html("");
				Object.entries(sample).forEach(([key,value])=>{ 
					var newRow = metadataDiv.append("p");
					newRow.text(`${key}: ${value}`);
				});
			}
		});
	});
}