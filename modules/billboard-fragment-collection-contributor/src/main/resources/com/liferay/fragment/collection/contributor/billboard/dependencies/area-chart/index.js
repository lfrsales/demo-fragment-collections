var chart = bb.generate({
	data: {
		columns: JSON.parse(configuration.data),
		type: "area-spline"
	},
	bindto: fragmentElement
});