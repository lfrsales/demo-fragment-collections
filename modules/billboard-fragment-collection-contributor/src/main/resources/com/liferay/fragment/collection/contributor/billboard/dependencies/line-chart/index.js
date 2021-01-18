var chart = bb.generate({
	bindto: fragmentElement,
	data: {
		columns: JSON.parse(configuration.data)
	}
});