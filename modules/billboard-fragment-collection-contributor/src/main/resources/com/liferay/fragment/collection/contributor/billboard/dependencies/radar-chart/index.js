var chart = bb.generate({
	data: {
		x: "x",
		columns: JSON.parse(configuration.data),
		type: "radar",
		labels: true
	},
	radar: {
		axis: {
			max: parseInt(configuration.axisMax)
		},
		level: {
			depth: parseInt(configuration.levelDepth)
		},
		direction: {
			clockwise: configuration.clockwise
		}
	},
	bindto: fragmentElement
});