function GetPluginSettings()
{
	return {
		"name":			"Import",
		"id":			"mck_import",
		"version":		"1.1",
		"description":	"Import project files like CSS and JS at runtime",
		"author":		"McKack",
		"help url":		"https://www.w3schools.com/tags/tag_link.asp",
		"category":		"Web",
		"type":			"object",			// does not appears in layout
		"rotatable":	false,
		"flags":		0
	};
};

////////////////////////////////////////
// Conditions

AddStringParam("Text", "The text to compare the filename to.");
AddCondition(0, cf_none, "Compare last file imported", "Import conditions", "Name of last file imported is <i>{0}</i>", "Compare the name of the last file imported.", "CompareFile");

////////////////////////////////////////
// Actions

AddStringParam("Import file", "The file to import (eg. style.css or module.js)");
AddAction(0, af_none, "Import file", "Import actions", "Import file {0}", "Import (initial or additional) file.", "SetFile");

AddStringParam("Remove file", "The file to remove (eg. style.css or module.js)");
AddAction(1, af_none, "Remove file", "Import actions", "Remove file {0}", "Remove (already imported) file.", "RemFile");

////////////////////////////////////////
// Expressions

AddExpression(0, ef_return_string, "Get filename", "Import expressions", "GetFile", "Get the last file imported.");

ACESDone();

// Property grid properties for this plugin
var property_list = [new cr.Property(ept_text, "Auto-import", "", "Name of a file to automatically import on start. (More can be set in events!)"),];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

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
	//this.just_inserted = false;
	//this.font = null;
}

IDEInstance.prototype.OnCreate = function()
{
}

IDEInstance.prototype.OnInserted = function()
{
}

IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor
IDEInstance.prototype.Draw = function(renderer)
{
}

IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}