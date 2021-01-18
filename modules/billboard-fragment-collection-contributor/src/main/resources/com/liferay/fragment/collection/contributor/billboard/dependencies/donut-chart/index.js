var chart = bb.generate({
    bindto: fragmentElement,
    data: {
        type: "donut",
        columns: JSON.parse(configuration.data)
    },
	donut: {
		title: configuration.title
	}
});