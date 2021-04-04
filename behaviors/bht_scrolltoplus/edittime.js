// v1.0 - initial release.
// v1.1 - as of r165, ObjectSet.values() has been removed. ScrollTo uses ObjectSet.valuesRef(). This is backwards compatible (as far as I can tell).
//
function GetBehaviorSettings()
{
	return {
		"name":			"Scroll To Plus",
		"id":			"scrollto_plus",
		"version":		"1.1",
		"description":	"Always center the view on this object, or at the mid-point of multiple objects.",
		"author":		"Black Hornet Technologies",
		"help url":		"",
		"category":		"General",
		"flags":		bf_onlyone
	};
};

// ACEs
AddNumberParam("Magnitude", "The strength of the shake, in maximum pixels to scroll away.", "20");
AddNumberParam("Duration", "The time the shake should last, in seconds.", "0.4");
AddComboParamOption("Reducing magnitude");
AddComboParamOption("Constant magnitude");
AddComboParam("Mode", "Select whether the magnitude gradually reduces to zero over the duration, or stays constant.");
AddAction(0, 0, "Shake", "", "Shake {my} with magnitude <i>{0}</i> for <i>{1}</i> seconds ({2})", "Shake the screen for a duration of time.", "Shake");

ACESDone();

// Property grid properties for this plugin
var property_list = [
	new cr.Property(ept_integer, "Inset Top", "0", "Inset from the top to bind scrollto."),
	new cr.Property(ept_integer, "Inset Left", "0", "Inset from the left to bind scrollto."),
	new cr.Property(ept_integer, "Inset Bottom", "0", "Inset from the bottom to bind scrollto."),
	new cr.Property(ept_integer, "Inset Right", "0", "Inset from the right to bind scrollto.")
	];
	
// Called by IDE when a new behavior type is to be created
function CreateIDEBehaviorType()
{
	return new IDEBehaviorType();
}

// Class representing a behavior type in the IDE
function IDEBehaviorType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new behavior instance of this type is to be created
IDEBehaviorType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
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
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
