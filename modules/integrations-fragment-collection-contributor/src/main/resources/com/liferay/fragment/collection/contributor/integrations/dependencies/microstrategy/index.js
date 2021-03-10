const baseRestURL = configuration.hostUrl;
const projectId = configuration.projectId;
const dossierId = configuration.dossierId;
const containerHeight = configuration.containerHeight;

const projectUrl = baseRestURL + '/app/' + projectId;

const dossierUrl = projectUrl + '/' + dossierId;

microstrategy.dossier.create({
	containerHeight: containerHeight,
	enableResponsive: true,
	placeholder: document.getElementById("dossierContainer"),
	url: dossierUrl
});