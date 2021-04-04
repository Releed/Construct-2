function GetBehaviorSettings()
{
	return {
		"name": "Viewport Wrap",
		"id": "WrapH",	
		"version": "1.3.0.0",
		"description": "Makes an object appear from the other side when it leaves the viewport.",
		"author": "Zouhair Serrar",
		"help url": "http://www.gameplaypassion.com",
		"category": "ParallaxBG",
		"flags": bf_onlyone
	};
};


// <editor-fold defaultstate="collapsed" desc="Conditions">

// </editor-fold>


// <editor-fold defaultstate="collapsed" desc="Actions">

// </editor-fold>


// <editor-fold defaultstate="collapsed" desc="Expressions">

// </editor-fold>


ACESDone();


// <editor-fold defaultstate="collapsed" desc="Properties">
var property_list = [
new cr.Property(ept_combo, "Direction", "Horizontal", "Which direction to use, choose Horizontal for side scrollers, Vertical for vertical scrollers, and both for games with a top-down perspective.", "Horizontal|Vertical|Both")
];
// </editor-fold>


// <editor-fold defaultstate="collapsed" desc="SDK code">
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
};

// Class representing an individual instance of the behavior in the IDE
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
};

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
};
// </editor-fold>