﻿function GetPluginSettings()
{
	return {
		"name":			"Browser",
		"id":			"Browser",
		"version":		"1.0",
		"description":	"Access the browser that is running the HTML5 application.",
		"author":		"Scirra",
		"help url":		"http://www.scirra.com/manual/110/browser",
		"category":		"Web",
		"type":			"object",			// not in layout
		"rotatable":	false,
		"cordova-plugins": "cordova-plugin-inappbrowser",	// for window.open(..., "_system")
		"flags":		pf_singleglobal
	};
};

//////////////////////////////////////////////////////////////
// Conditions
AddCondition(0, 0, "Cookies enabled", "Browser", "Cookies are enabled", "Browser has cookies enabled.", "CookiesEnabled");
AddCondition(1, 0, "Is online", "Browser", "Is online", "Browser is online (i.e. not in an offline browsing mode).", "IsOnline");
AddCondition(2, cf_deprecated, "Java supported", "Browser", "Java is supported", "Browser supports java.", "HasJava");

AddCondition(3, cf_trigger, "On went online", "Browser", "On went online", "Triggered when user is offline and a connection becomes available.", "OnOnline");
AddCondition(4, cf_trigger, "On went offline", "Browser", "On went offline", "Triggered when user is online and the connection becomes unavailable.", "OnOffline");

AddCondition(5, cf_deprecated, "Is downloading update", "Offline cache", "Is downloading update", "True when the browser is running from the offline cache, but downloading an update in the background.", "IsDownloadingUpdate");
AddCondition(6, cf_deprecated | cf_trigger, "On update ready", "Offline cache", "On update ready", "Triggered when an update has finished downloading.  You may want to prompt the user to reload the page.", "OnUpdateReady");

AddCondition(7, 0, "Page is visible", "Page", "Page is visible", "True if the page is currently visible to the user (e.g. in active tab or mobile app is in foreground).", "PageVisible");
AddCondition(8, cf_trigger, "On resumed", "Page", "On resumed", "Triggers when resuming (switched back to tab, restored window, mobile app returns to foreground, etc.)", "OnPageVisible");
AddCondition(9, cf_trigger, "On suspended", "Page", "On suspended", "Triggers when suspending (switched tab, minimized window, mobile app goes in to background, etc.)", "OnPageHidden");

AddCondition(10, 0, "Is fullscreen", "Page", "Is fullscreen", "True if the page is currently in fullscreen mode.", "IsFullscreen");

AddCondition(11, cf_trigger, "On menu button", "Mobile", "On mobile menu button pressed", "Triggers when device 'Menu' button is pressed.  Note not all devices have a 'Menu' button.", "OnMenuButton");
AddCondition(12, cf_trigger, "On search button", "Mobile", "On search menu button pressed", "Triggers when device 'Search' button is pressed.  Note not all devices have a 'Search' button.", "OnSearchButton");

AddCondition(13, cf_deprecated, "Is metered", "Connection", "Connection is metered", "True if the connection is metered (e.g. pay-per-use).  False if not or if unknown.", "IsMetered");

AddCondition(14, 0, "Is charging", "Battery", "Battery is charging", "False if device is battery-powered and is not plugged in, otherwise true.", "IsCharging");

AddCondition(15, cf_trigger, "On resized", "Browser", "On resized", "Triggered when the current browser viewport is resized.", "OnResize");

AddComboParamOption("Portrait");
AddComboParamOption("Landscape");
AddComboParam("Orientation", "Select the orientation to test.");
AddCondition(16, 0, "Is portrait/landscape", "Mobile", "Is {0}", "Check the current orientation of the device.", "IsPortraitLandscape");

AddCondition(17, cf_trigger, "On back button", "Mobile", "On mobile back button pressed", "Triggers when device 'Back' button is pressed.  Note not all devices have a 'Back' button.", "OnBackButton");

AddCondition(18, cf_none, "Supports requesting fullscreen", "Window", "Supports requesting fullscreen", "Check if the current browser/platform supports the 'Request fullscreen' action.", "SupportsFullscreen");

AddCondition(19, cf_trigger, "On update found", "Offline", "On update found", "Triggers upon starting to download an update in the background.", "OnUpdateFound");
AddCondition(20, cf_trigger, "On update ready", "Offline", "On update ready", "Triggers when an update has finished downloading in the background.", "OnUpdateReady");
AddCondition(21, cf_trigger, "On offline ready", "Offline", "On offline ready", "Triggers on the first run when finished saving resources for offline support.", "OnOfflineReady");

//////////////////////////////////////////////////////////////
// Actions
AddAnyTypeParam("Message", "Enter the message to display in the alert.", "\"\"");
AddAction(0, 0,	"Alert", "Window", "Alert {0}", "Pop up a message box with a message and an OK button.", "Alert");
AddAction(1, 0,	"Close", "Window", "Close", "Close the current browser window or tab.  The browser may prompt the user to confirm.", "Close");
AddAction(2, 0,	"Focus", "Window", "Focus", "Focus the current browser window or tab.", "Focus");
AddAction(3, 0,	"Blur", "Window", "Blur", "Blur (unfocus) the current browser window or tab.", "Blur");

AddAction(4, 0,	"Go back", "Navigation", "Go back", "Go to the previous page in browser history.", "GoBack");
AddAction(5, 0,	"Go forward", "Navigation", "Go forward", "Go to the next page in browser history.", "GoForward");
AddAction(6, 0,	"Go home", "Navigation", "Go home", "Go to the browser homepage.", "GoHome");

AddStringParam("URL", "Enter the full URL to navigate to.", "\"http://\"");
AddComboParamOption("self");
AddComboParamOption("parent");
AddComboParamOption("top");
AddComboParam("Target", "Which frame level to navigate. Only has an effect when using frames in a web browser.");
AddAction(7, 0,	"Go to URL", "Navigation", "Go to {0} (target <i>{1}</i>)", "Navigate to a URL.", "GoToURL");

AddStringParam("URL", "Enter the full URL to navigate to.", "\"http://\"");
AddStringParam("Tag", "A string to identify this window.  You can reuse an existing window by reusing its tag.", "\"NewWindow\"");
AddAction(8, 0,	"Open URL in new window", "Navigation", "Go to {0} in a new window (<i>{1}</i>)", "Open a new window and navigate to a URL.", "GoToURLWindow");

AddAction(9, 0, "Reload", "Navigation", "Reload", "Reload the current page.  Also updates if an 'On update ready' event has triggered.", "Reload");

AddComboParamOption("Centered");
AddComboParamOption("Stretch (crop)");
AddComboParamOption("Stretch (scale outer)");
AddComboParamOption("Stretch (letterbox scale)");
AddComboParamOption("Stretch (integer letterbox scale)");
AddComboParamOption("Stretch (scale inner)");
AddComboParam("Mode", "Determine how the game viewport is displayed in the monitor area.");
AddAction(10, 0, "Request fullscreen", "Window", "Request fullscreen - {0}", "Request the user to enter fullscreen mode. Usually this only works in a user input trigger.", "RequestFullScreen");

AddAction(11, 0, "Cancel fullscreen", "Window", "Cancel fullscreen", "Exit fullscreen mode.", "CancelFullScreen");

AddStringParam("Pattern", "A comma-separated string with a list of times in milliseconds, describing a pattern of vibrations and pauses.", "\"200,100,200\"");
AddAction(12, 0, "Vibrate", "Device", "Vibrate with pattern <i>{0}</i>", "Vibrate with a specified pattern if the device (e.g. phone) supports it.", "Vibrate");

AddStringParam("URL", "A data URI, project file, or any website address to invoke as a download.");
AddStringParam("Filename", "The filename to give the downloaded file.");
AddAction(13, 0, "Invoke download", "Navigation", "Invoke download of <b>{0}</b> with filename <i>{1}</i>", "Start a file download of a data URI, project file or web address.", "InvokeDownload");

AddComboParamOption("Log");
AddComboParamOption("Warn");
AddComboParamOption("Error");
AddComboParam("Type", "Choose the type of message to log to the browser console.");
AddAnyTypeParam("Message", "Enter the message text to log to the browser console.");
AddAction(14, 0, "Log", "Console", "{0} in console: <i>{1}</i>", "Log a message to the browser console, which can be useful for debugging.", "ConsoleLog");

AddStringParam("Group name", "Enter the group name to add to the browser console.");
AddAction(15, 0, "Start group", "Console", "Start console group <i>{0}</i>", "Start a message group in the browser console.", "ConsoleGroup");

AddAction(16, 0, "End group", "Console", "End console group", "End a message group in the browser console.", "ConsoleGroupEnd");

AddStringParam("Javascript", "String of javascript code to execute. Beware of causing security vulnerabilities or causing errors that break the game! Refer to the documentation for more advice. Wherever possible, prefer to use Construct 2's Javascript SDK instead.", "\"myFunction();\"");
AddAction(17, 0, "Execute Javascript", "Browser", "Execute javascript <i>{0}</i>", "Execute a string of javascript in the browser. Use with care!", "ExecJs");

AddComboParamOption("portrait");
AddComboParamOption("landscape");
AddComboParamOption("primary portrait");
AddComboParamOption("secondary portrait");
AddComboParamOption("primary landscape");
AddComboParamOption("secondary landscape");
AddComboParam("Orientation", "The orientation to lock the device to. This may only take effect if already in fullscreen mode.");
AddAction(18, 0, "Lock orientation", "Window", "Lock orientation to <b>{0}</b>", "Prevent the orientation of the device changing.", "LockOrientation");

AddAction(19, 0, "Unlock orientation", "Window", "Unlock orientation", "Restore normal device orientation after locking.", "UnlockOrientation");

AddStringParam("String", "A string of data to download as a file, e.g. JSON data from the AsJSON expression.");
AddStringParam("MIME type", "The MIME type of the given data.", "\"application/json\"");
AddStringParam("Filename", "The filename to give the downloaded file.", "\"mydata.json\"");
AddAction(20, 0, "Invoke download of string", "Navigation", "Invoke download of string <b>{0}</b> with MIME type <i>{1}</i> and filename <i>{2}</i>", "Start a file download of data given in a string, e.g. JSON.", "InvokeDownloadString");

//////////////////////////////////////////////////////////////
// Expressions
//AddExpression(3, ef_return_number, "Absolute mouse Y", "Cursor", "AbsoluteY", "Get the mouse cursor Y co-ordinate on the canvas.");
AddExpression(0, ef_return_string, "Get current URL", "Navigation", "URL", "Get the current browser URL.");
AddExpression(1, ef_return_string, "Get protocol", "Navigation", "Protocol", "Get the current protocol, e.g. http:.");
AddExpression(2, ef_return_string, "Get domain", "Navigation", "Domain", "Get the current domain, e.g. scirra.com.");
AddExpression(3, ef_return_string, "Get path name", "Navigation", "PathName", "Get the path relative to domain.");
AddExpression(4, ef_return_string, "Get hash", "Navigation", "Hash", "Get the hash from the URL, e.g. #myAnchor.");
AddExpression(5, ef_return_string, "Get referrer", "Navigation", "Referrer", "Get the referrer (the page that linked to this page).");

AddExpression(6, ef_return_string, "Get title", "Document", "Title", "Get the page title.");

AddExpression(7, ef_return_string, "Get name", "Browser", "Name", "Get the browser application name.");
AddExpression(8, ef_return_string, "Get version", "Browser", "Version", "Get the browser application version.");
AddExpression(9, ef_return_string, "Get language", "Browser", "Language", "Get the browser language.");
AddExpression(10, ef_return_string, "Get platform", "Browser", "Platform", "Get the browser platform (e.g. Windows, Mac).");
AddExpression(11, ef_return_string, "Get product", "Browser", "Product", "Get the browser product name (e.g. Gecko).");
AddExpression(12, ef_return_string, "Get vendor", "Browser", "Vendor", "Get the browser vendor.");
AddExpression(13, ef_return_string, "Get user agent", "Browser", "UserAgent", "Get the full browser user agent string.");

AddExpression(14, ef_return_string, "Get query string", "Navigation", "QueryString", "Get the full query string, including the ?.");

AddStringParam("name", "Query string parameter name.");
AddExpression(15, ef_return_string, "Get query string parameter", "Navigation", "QueryParam", "Get a query string parameter by name.");

AddExpression(16, ef_return_number, "Estimated bandwidth", "Connection", "Bandwidth", "Estimated connection bandwidth in megabits/s if known (infinity if unknown).");

AddExpression(17, ef_return_number, "Battery level", "Battery", "BatteryLevel", "Get battery charge level from 0 to 1, or 1 if unknown.");
AddExpression(18, ef_return_number, "Battery discharge time", "Battery", "BatteryTimeLeft", "Get the time left in seconds before battery is fully discharged, if not charging.");

AddStringParam("Javascript", "A string of Javascript code to execute.");
AddExpression(19, ef_return_any, "", "Browser", "ExecJS", "Execute a string of javascript code and return a string or number. Wherever possible, prefer to use Construct 2's Javascript SDK instead.");

AddExpression(20, ef_return_number, "", "Display", "ScreenWidth", "Get the width of the user's entire screen in pixels.");
AddExpression(21, ef_return_number, "", "Display", "ScreenHeight", "Get the height of the user's entire screen in pixels.");

AddExpression(22, ef_return_number, "", "Display", "DevicePixelRatio", "The display pixels per CSS pixel.");

AddExpression(23, ef_return_string, "", "Connection", "ConnectionType", "Type of connection in use if known e.g. \"wifi\" or \"cellular\".");

AddExpression(24, ef_return_number, "", "Display", "WindowInnerWidth", "Get the width of the window client area in pixels.");
AddExpression(25, ef_return_number, "", "Display", "WindowInnerHeight", "Get the height of the window client area in pixels.");
AddExpression(26, ef_return_number, "", "Display", "WindowOuterWidth", "Get the width of the window outer area in pixels.");
AddExpression(27, ef_return_number, "", "Display", "WindowOuterHeight", "Get the height of the window outer area in pixels.");

ACESDone();

// Property grid properties for this plugin
var property_list = [
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
	
// Called by the IDE to draw this instance in the editor
IDEInstance.prototype.Draw = function(renderer)
{
}

// Called by the IDE when the renderer has been released (ie. editor closed)
// All handles to renderer-created resources (fonts, textures etc) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function()
{
}
