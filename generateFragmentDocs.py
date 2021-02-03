import glob, json, os

def write_field(file, field):
	file.write("\n")
	file.write(field['label'])
	file.write(" | " + field['type'])

	if "defaultValue" in field:
		file.write(" | " + str(field['defaultValue']))

collectionsReadmeFile = open('collections.md', 'w')

for module in glob.glob("./modules/*-fragment-collection-contributor"):

	for collection in glob.glob(module + "/src/main/resources/**/dependencies/collection.json", recursive=True):
		openCollection = open(collection)
		collectionData = json.load(openCollection)

		collectionsReadmeFile.write('<h3>' + collectionData['name'] + '</h3>\n\n')
	
	for fragment in glob.glob(module + "/src/main/resources/**/dependencies/*[!.json]", recursive=True):
		fragmentJSON = open(fragment + '/fragment.json')

		fragmentJSONData = json.load(fragmentJSON)

		collectionsReadmeFile.write('<h4>' + fragmentJSONData['name'] + '</h4>\n\n')

		thumbnailPath = module + "/src/main/resources/META-INF/resources/thumbnails/" + fragmentJSONData['thumbnail']

		collectionsReadmeFile.write("![Image of " + fragmentJSONData['name'] + "](" + thumbnailPath + ")\n\n")

		if os.stat(fragment + '/index.json').st_size != 0:
			indexJSON = open(fragment + '/index.json')

			indexJSONData = json.load(indexJSON)

			if "fieldSets" in indexJSONData:
				collectionsReadmeFile.write("Configuration | type | Default Value\n")
				collectionsReadmeFile.write("------------- | ---- | -------------")

				for fieldSet in indexJSONData['fieldSets']:
					if "fields" in fieldSet:
						for field in fieldSet['fields']:
							write_field(collectionsReadmeFile, field)

				collectionsReadmeFile.write("\n\n")

collectionsReadmeFile.close()