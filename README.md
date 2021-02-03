# Demo Fragment Collections

Multiple collections of fragments for use in demos or as examples what is possible with [Liferay Page Fragments](https://learn.liferay.com/dxp/7.x/en/site-building/developer-guide/developing_page_fragments.html).

Developed to run on the following versions of Liferay and/or Commerce: `Liferay DXP 7.3`, `Commerce 2.1.1`, `etc`

Built with [Liferay Workspace](https://help.liferay.com/hc/en-us/articles/360029147471-Liferay-Workspace) and [Blade CLI](https://help.liferay.com/hc/en-us/articles/360029147071-Blade-CLI). This workspace contains the following module types: [Contributed Fragment Collection](https://learn.liferay.com/dxp/7.x/en/site-building/developer-guide/developing-page-fragments/creating-a-contributed-fragment-collection.html), [Theme Contributor](https://help.liferay.com/hc/en-us/articles/360029146831-Theme-Contributor-Template)

## How to Build and Deploy to Liferay

Follow the steps below to build and deploy or copy the modules from the [releases](../../releases/latest) page to your Liferay's deploy folder.

In order to build or deploy this module you will need to [install Blade CLI](https://help.liferay.com/hc/en-us/articles/360028833852-Installing-Blade-CLI).

### To Build

`$ blade gw build`

You can find the built modules at `modules/{module-name}/build/libs/{module-name}.jar`.

### To Deploy

In `gradle-local.properties` add the following line to point towards the Liferay instance you want to deploy to:
```
liferay.workspace.home.dir=/path/to/liferay/home
```

`$ blade gw deploy`

## Usage

Since these fragments are packaged as a Contributed Fragment Collection, they will automatically be available on all sites in your Liferay instance. Thus, you can start using them as you would the OOTB Liferay Fragments. You can see how to add fragments to a content page [here](https://learn.liferay.com/dxp/7.x/en/site-building/creating-pages/building-and-managing-content-pages/building-content-pages.html?highlight=fragments#adding-elements-to-content-pages).

### Features

[View Included Fragment Collection Docs](/collections.md)

## Contributors

Thanks to our current contributors:

* @ethib137
* @jverweijL
* @martin-dominguez

## Issues & Questions Welcome