/* Copyright (c) 2014 Intel Corporation. All rights reserved.
* Use of this source code is governed by a MIT-style license that can be
* found in the LICENSE file.
*/

function GetPluginSettings()
{
	return {
		"name":			"UnityAds",
		"id":			"Unityads",
		"version":		"2.2.0",
		"description":	"Handle UnityAds version 2 adverts for Cordova on iOS and Android.",
		"author":		"Waldemar Medina",
		"help url":		"https://www.construct.net/make-games/addons/100/unityads/documentation",
		"category":		"Monetisation",
		"type":			"object",			// appears in layout
		"rotatable":	false,
		"cordova-plugins": "com-artemisoftnian-plugins-unityads2",
		"flags":		pf_singleglobal
	};
};

AddCondition(0, 0, "Is initialized", "UnityAds", "Is initialized", "Returns true if Unity Ads SDK is initialized.", "onInitSuccess");

AddCondition(1, 0, "On video failed", "UnityAds", "On video failed", "Returns true if ocurred an error with the specified ad placement", "onVideoAdFailed");

AddCondition(2, 0, "On video ready", "UnityAds", "On video ready", "Returns true if the specified ad placement is ready to show an ad campaign.", "onVideoAdReady");

AddCondition(3, 0, "On rewarded video ready", "UnityAds", "On rewarded video ready", "Returns true if the specified ad placement is ready to show an ad campaign.", "onRewardedVideoAdReady");

AddCondition(4, cf_trigger, "On video complete", "UnityAds", "On video complete", "Triggers the ad was shown from beginning to end without error and without having been skipped.", "onVideoAdComplete");

AddCondition(5, cf_trigger, "On rewarded video complete", "UnityAds", "On rewarded video complete", "Triggers the ad was shown from beginning to end without error and without having been skipped.", "onRewardedVideoAdComplete");

AddCondition(6, cf_trigger, "On video skipped", "UnityAds", "On video skipped", "Triggers when the ad was skipped before reaching the end.", "onVideoAdSkipped");

AddCondition(7, cf_trigger, "On video cancelled", "UnityAds", "On video cancelled", "Triggers when an error occurred that prevented the ad from being shown.", "onVideoAdCancelled");

// Actions

AddComboParamOption("Video Ad");
AddComboParamOption("Rewarded Video Ad");
AddComboParam("Placement ID", "Select the video Placement ID to show to user");
AddAction(0, 0, "Show Video Ad", "UnityAds", "Show <i>{0}</i>", "Shows an ad campaign using the specified Video ad placement ID.", "ShowVideoAd");

AddComboParamOption("Video Ad");
AddComboParamOption("Rewarded Video Ad");
AddComboParam("Placement ID", "Select the video Placement ID to show to user");
AddAction(1, 0, "Get Placement State", "UnityAds", "Get <i>{0}</i> State", "Returns the state of the specified ad placement ID.", "GetPlacementState");

ACESDone();

// Property grid properties for this plugin
var property_list = [
	new cr.Property(ept_text,	"Android gameId",				"",	"Android game identifier. This can be found listed under your project in the Unity Ads dashboard."),
	new cr.Property(ept_text,	"iOS gameId", 					"",	"iOS game identifier. This can be found listed under your project in the Unity Ads dashboard."),
	new cr.Property(ept_text,	"Video placementId",			"",	"The ad placement identifier. This can be found listed under the specific platform of your project in the Unity Ads dashboard."),
	new cr.Property(ept_text,	"Rewarded Video placementId",	"",	"The ad placement identifier. This can be found listed under the specific platform of your project in the Unity Ads dashboard."),

	new cr.Property(ept_combo,	"Test Mode",				"True",	"Enables Test Mode when set to true. Test Mode defaults to being disabled when a value is not specified. While Test Mode is enabled, only test ads will be shown. Test ads do not generate any stats or revenue. To save yourself from ban this is set as true by default, remember to set to false before final build", "False|True"),
	new cr.Property(ept_combo,	"Debug Mode",				"False",	"Logs are verbose when set to true, and minimal when false.", "False|True"),
];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
};

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
};

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
};

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");

	// Save the constructor parameters
	this.instance = instance;
	this.type = type;

	// Set the default property values from the property table
	this.properties = {};

	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;

	// Plugin-specific variables
	this.just_inserted = false;
};

IDEInstance.prototype.OnCreate = function()
{
};

IDEInstance.prototype.OnInserted = function()
{
};

IDEInstance.prototype.OnDoubleClicked = function()
{
};

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
};

IDEInstance.prototype.OnRendererInit = function(renderer)
{
};

// Called to draw self in the editor
IDEInstance.prototype.Draw = function(renderer)
{
};

IDEInstance.prototype.OnRendererReleased = function(renderer)
{
};