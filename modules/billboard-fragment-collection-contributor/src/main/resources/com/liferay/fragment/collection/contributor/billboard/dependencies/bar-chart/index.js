var chart = bb.generate({
	bindto: fragmentElement,
	data: {
		type: "bar",
		columns: JSON.parse(configuration.data)
	}
});