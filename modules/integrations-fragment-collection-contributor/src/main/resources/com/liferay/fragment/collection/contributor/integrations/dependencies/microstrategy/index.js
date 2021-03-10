//BEGIN CONFIG PARAMETERS -------------------------------------------------------------------------
const baseRestURL = configuration.hostUrl;
const projectID = configuration.projectId;
const dossierID = configuration.dossierId;
const containerHeight = configuration.containerHeight;
//END CONFIG PARAMETERS -------------------------------------------------------------------------

var projectUrl = baseRestURL + '/app/' + projectID;
var dossierUrl = projectUrl + '/' + dossierID;

//populate div with Dossier:
microstrategy.dossier.create({
	placeholder: document.getElementById("dossierContainer"),
	url: dossierUrl,
	enableResponsive: true,
	containerHeight: containerHeight
}).then(function(dossier) {
	//Do something after the code
});