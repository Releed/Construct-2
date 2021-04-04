﻿function GetPluginSettings()
{
	return {
		"name":			"Phonegap Game",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"PhonegapGame",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0.46",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"show leaderboard and achievements (google play game and game center, SDK)",
		"author":		"cranberrygame",
		"help url":		"https://www.scirra.com/forum/viewtopic.php?t=109586",
		"category":		"Phonegap extension: game",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
/*
//cranberrygame start
com.cranberrygame.phonegap.plugin.game
phonegap build service: 
cordova registry: 
github: https://github.com/cranberrygame/com.cranberrygame.phonegap.plugin.game#544946ee7789ef539f7efe02ea6b12d03b1b8c62
//cranberrygame end
*/
		"cordova-plugins":	"https://github.com/cranberrygame/com.cranberrygame.phonegap.plugin.game#544946ee7789ef539f7efe02ea6b12d03b1b8c62 --variable APP_ID='YOUR_GOOGLE_PLAY_GAME_APP_ID'",		
		"flags":		0						// uncomment lines to enable flags...
						| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
/*
		// example
		,"dependency": "three.min.js;OBJLoader.js"
*/
//cranberrygame start
//cranberrygame start												
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name

/*				
// example				
AddNumberParam("Number", "Enter a number to test if positive.");
AddCondition(0, cf_none, "Is number positive", "My category", "{0} is positive", "Description for my condition!", "MyCondition");
AddCondition(1, cf_trigger, "Trigger Condition", "My category", "Trigger Condition", "Triggered when TriggerAction", "TriggerCondition");//cranberrygame
*/
//cranberrygame start
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different login.", "\"\"");
AddCondition(0, cf_trigger, "On login succeeded", "My category", "On login (tag <b>{0}</b>) succeeded", "Triggered when TriggerAction.", "OnLoginSucceeded");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different login.", "\"\"");
AddCondition(1, cf_trigger, "On login failed", "My category", "On login (tag <b>{0}</b>) failed", "Triggered when TriggerAction.", "OnLoginFailed");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different submit score.", "\"\"");
AddCondition(2, cf_trigger, "On submit score succeeded", "My category", "On submit score (tag <b>{0}</b>) succeeded", "Triggered when TriggerAction.", "OnSubmitScoreSucceeded");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different submit score.", "\"\"");
AddCondition(3, cf_trigger, "On submit score failed", "My category", "On submit score (tag <b>{0}</b>) failed", "Triggered when TriggerAction.", "OnSubmitScoreFailed");
AddCondition(4, cf_none, "Is logged in", "My category", "Is logged in", "Description for my condition!", "IsLoggedIn");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different unlock achievement.", "\"\"");
AddCondition(5, cf_trigger, "On unlock achievement succeeded", "My category", "On unlock achievement (tag <b>{0}</b>) succeeded", "Triggered when TriggerAction.", "OnUnlockAchievementSucceeded");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different unlock achievement.", "\"\"");
AddCondition(6, cf_trigger, "On unlock achievement failed", "My category", "On unlock achievement (tag <b>{0}</b>) failed", "Triggered when TriggerAction.", "OnUnlockAchievementFailed");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different get player score.", "\"\"");
AddCondition(7, cf_trigger, "On get player score succeeded", "My category", "On get player score (tag <b>{0}</b>) succeeded", "Triggered when TriggerAction.", "OnGetPlayerScoreSucceeded");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different get player score.", "\"\"");
AddCondition(8, cf_trigger, "On get player score failed", "My category", "On get player score (tag <b>{0}</b>) failed", "Triggered when TriggerAction.", "OnGetPlayerScoreFailed");
AddCondition(9, cf_trigger, "On reset achievements succeeded", "My category", "On reset achievements succeeded", "Triggered when TriggerAction.", "OnResetAchievementsSucceeded");
AddCondition(10, cf_trigger, "On reset achievements failed", "My category", "On reset achievements failed", "Triggered when TriggerAction.", "OnResetAchievementsFailed");
AddCondition(11, cf_trigger, "On get player image succeeded", "My category", "On get player image succeeded", "Triggered when TriggerAction.", "OnGetPlayerImageSucceeded");
AddCondition(12, cf_trigger, "On get player image failed", "My category", "On get player image failed", "Triggered when TriggerAction.", "OnGetPlayerImageFailed");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different increment achievement.", "\"\"");
AddCondition(13, cf_trigger, "On increment achievement succeeded", "My category", "On increment achievement (tag <b>{0}</b>) succeeded", "Triggered when TriggerAction.", "OnIncrementAchievementSucceeded");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different increment achievement.", "\"\"");
AddCondition(14, cf_trigger, "On increment achievement failed", "My category", "On increment achievement (tag <b>{0}</b>) failed", "Triggered when TriggerAction.", "OnIncrementAchievementFailed");
//cranberrygame end
	
////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

/*
// example
AddStringParam("Message", "Enter a string to alert.");
AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");
AddAction(1, af_none, "Trigger Action", "My category", "Trigger Action", "Trigger TriggerCondition", "TriggerAction");//cranberrygame
*/
//cranberrygame start
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different login.", "\"\"");
AddAction(0, af_none, "Login", "My category", "Login (tag <i>{0}</i>)", "Login.", "Login");
AddStringParam("Leaderboard ID", "Leaderboard ID to submit to, e.g. \"My Game Name\"");
AddNumberParam("Score", "The score to submit.");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different submit score.", "\"\"");
AddAction(1, af_none, "Submit score", "My category", "Submit score of <b>{1}</b> to <i>{0}</i> (tag <i>{2}</i>)", "Submit a score to a leaderboard.", "SubmitScore");
AddStringParam("Leaderboard ID", "Leaderboard ID to show, e.g. \"My Game Name\"");
AddAction(2, af_none, "Show leaderboard", "My category", "Show leaderboard for <i>{0}</i>", "Display a leaderboard.", "ShowLeaderboard");
AddStringParam("Achievement ID", "Achievement ID to submit, e.g. \"My Game Name\"");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different unlock achievement.", "\"\"");
AddAction(3, af_none, "Unlock achievement", "My category", "Unlock achievement of <i>{0}</i> (tag <i>{1}</i>)", "Unlock an achievement.", "UnlockAchievement");
AddAction(4, af_none, "Show achievements", "My category", "Show achievements", "Display the achievements.", "ShowAchievements");
AddAction(5, af_none, "Logout", "My category", "Logout", "Logout.", "Logout");
AddStringParam("Leaderboard ID", "Leaderboard ID to show, e.g. \"My Game Name\"");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different get player score.", "\"\"");
AddAction(6, af_none, "Get player score", "My category", "Get player score {0} (tag <i>{1}</i>)", "Description for my action!", "GetPlayerScore");
AddAction(7, af_none, "Reset achievements", "My category", "Reset achievements", "Description for my action!", "ResetAchievements");
AddAction(8, af_none, "Get player image", "My category", "Get player image", "Description for my action!", "GetPlayerImage");
AddStringParam("Achievement ID", "Achievement ID to submit, e.g. \"My Game Name\"");
AddNumberParam("Incremental step or current percent", "Incremental step (android) or current percent (ios) for incremental achievement.", "2");
AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between different increment achievement.", "\"\"");
AddAction(9, af_none, "Increment achievement", "My category", "Increment achievement of <i>{0}</i> {1} (tag <i>{2}</i>)", "Incremen an achievement.", "IncrementAchievement");
//cranberrygame end

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

/*
// example
AddExpression(0, ef_return_number, "Get cell x count", "My category", "MyExpression", "Get cell x count."); //cranberrygame
AddExpression(1, ef_return_string, "Get text.", "My category", "TextWithNoParam", "Get text."); //cranberrygame
AddStringParam("StringParam", "Enter string param");
AddExpression(2, ef_return_string, "Get text.", "My category", "Text", "Get text."); //cranberrygame
*/
//cranberrygame start
AddExpression(1, ef_return_string, "Get player id", "My category", "PlayerId", "Get player id."); //cranberrygame
AddExpression(2, ef_return_string, "Get player display name", "My category", "PlayerDisplayName", "Get player display name."); //cranberrygame
AddExpression(3, ef_return_string, "Get player image url", "My category", "PlayerImageUrl", "Get player image url."); //cranberrygame
AddExpression(4, ef_return_number, "Get player score", "My category", "PlayerScore", "Get player score."); //cranberrygame
//cranberrygame end

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
/*
	new cr.Property(ept_integer, 	"My property",		77,		"An example property.") //cranberrygame , this.properties[0] from runtime.js
*/
//cranberrygame start
	new cr.Property(ept_text,		"Android google play game app id",		"",			"The app id, set also in the native plugin install command.")
//cranberrygame emd
	];
	
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
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}

//cranberrygame start
//cranberrygame end
