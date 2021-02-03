import glob, json, os

def write_field(file, langDict, field):
	file.write("\n")
	file.write(langDict[field["label"]])
	file.write(" | " + field["type"])

	if "defaultValue" in field:
		file.write(" | " + str(field["defaultValue"]))

collectionsReadmeFile = open("collections.md", "w")

for module in glob.glob("./modules/*-fragment-collection-contributor"):
	langDict = {}

	langFile = open(module + "/src/main/resources/content/Language.properties")

	langFileLines = langFile.readlines()

	for line in langFileLines:
		keyValuePair = line.split("=")

		langDict[keyValuePair[0]] = keyValuePair[1].rstrip()

	for collection in glob.glob(module + "/src/main/resources/**/dependencies/collection.json", recursive=True):
		openCollection = open(collection)

		collectionData = json.load(openCollection)

		collectionsReadmeFile.write("<h2>" + langDict[collectionData["name"]] + "</h2>\n\n")

		if "description" in collectionData:
			collectionsReadmeFile.write(collectionData["description"] + "\n\n")

	for fragment in glob.glob(module + "/src/main/resources/**/dependencies/*[!.json]", recursive=True):
		fragmentJSON = open(fragment + "/fragment.json")

		fragmentJSONData = json.load(fragmentJSON)

		fragmentName = langDict[fragmentJSONData["name"]]

		collectionsReadmeFile.write("<h3>" + fragmentName + "</h3>\n\n")

		if "description" in fragmentJSONData:
			collectionsReadmeFile.write(fragmentJSONData["description"] + "\n\n")

		thumbnailPath = module + "/src/main/resources/META-INF/resources/thumbnails/" + fragmentJSONData["thumbnail"]

		collectionsReadmeFile.write("![Image of " + fragmentName + "](" + thumbnailPath + ")\n\n")

		if os.stat(fragment + "/index.json").st_size != 0:
			indexJSON = open(fragment + "/index.json")

			indexJSONData = json.load(indexJSON)

			if "fieldSets" in indexJSONData:
				collectionsReadmeFile.write("Configuration | Type | Default Value\n")
				collectionsReadmeFile.write("------------- | ---- | ---------------")

				for fieldSet in indexJSONData["fieldSets"]:
					if "fields" in fieldSet:
						for field in fieldSet["fields"]:
							write_field(collectionsReadmeFile, langDict, field)

				collectionsReadmeFile.write("\n\n")

collectionsReadmeFile.close()