/* Copyright (c) 2014 Intel Corporation. All rights reserved.
* Use of this source code is governed by a MIT-style license that can be
* found in the LICENSE file.
*/

// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.Unityads = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{


	var placements = {
		normalVideo:"0",
		rewardedVideo:"1"
	}

	var Messages = {
		IS_READY: "IS_READY",
		NOT_READY: "NOT_READY",
		TEST:"TEST",
		TEST_REWARDED: "TEST_REWARDED"
	}

	var PlacementState = {
		READY: "READY", //A campaign is available and ready to be shown.
		NOT_AVAILABLE: "NOT_AVAILABLE", //Either the SDK is not yet initialized, or the specified placement ID is invalid. For a placement ID to be valid, it must be listed among the placements for the Android platform of your project in the Unity Ads dashboard. Note: Each platform has its own list of placements. When using the same custom placement ID for both Android and iOS, the placement must be added to both platforms.
		DISABLED: "DISABLED", //The specified placement is currently disabled for the Android platform of your project. Placement settings can be updated from the Unity Ads dashboard.
		WAITING: "WAITING", //The specified placement is in the process of becoming ready.
		NO_FILL: "NO_FILL" //There are no campaigns currently available.
	}

	var FinishState = {
		ERROR:"ERROR", 	//An error occurred that prevented the ad from being shown.
		COMPLETED: "COMPLETED", //The ad was shown from beginning to end without error and without having been skipped.
		SKIPPED: "SKIPPED" //The ad was skipped before reaching the end.
	}

	var UnityAdsError = {
		NOT_INITIALIZED: "NOT_INITIALIZED", //An attempt to show an ad was made before Unity Ads was initialized.
		INITIALIZE_FAILED: "INITIALIZE_FAILED", //Some condition prevented Unity Ads from being initialized.
		INTERNAL_ERROR:"INTERNAL_ERROR", //Some other internal error occurred.		
	}
	
	//PARAMETERS
	var gameId = ""; 
	var videoAdPlacementId = ""; 
	var rewardedVideoAdPlacementId = "";
	var isTest = true; 
	var isDebug = false;

	//VARIABLES
	var _unityAdsPlugin = null;
	var _onVideoError = null;
	var _onVideo = null;
	var _onVideoReady = null;
	var _onRewardedVideoAdReady

    var _setParameters = null;
	var _onInitFailed = null;
	var _onInitSuccess = null;
	var _onPlacementStateCheck = null;

	var _getVideoPlacementId = null;
	var _getRewardedVideoPlacementID = null;


	function Log(str){
		console.log("[UnityAds]", str);
	}	/////////////////////////////////////

	var pluginProto = cr.plugins_.Unityads.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};

	var instanceProto = pluginProto.Instance.prototype;
	
	var isSupported = false;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{

		if(this.runtime.isCordova && typeof window['unityads2']){
			if (this.runtime.isiOS || this.runtime.isAndroid){
				_unityAdsPlugin = window['unityads2'];

				if(this.runtime.isAndroid) {
					gameId  = this.properties[0].trim(); 
				}

				if(this.runtime.isiOS) {
					gameId  = this.properties[1].trim();  
				}		
				
				videoAdPlacementId = this.properties[2].trim(); 
				rewardedVideoAdPlacementId = this.properties[3].trim();
				isTest  = (this.properties[4] === 'true') ? true : false;
				isDebug = (this.properties[5] === 'true') ? true : false;

				var runtime = this.runtime;
				var self = this;

				var CNDS = cr.plugins_.Unityads.prototype.cnds;
				var ACTS = cr.plugins_.Unityads.prototype.acts;

				//Events					
				_setParameters = function (name, err, type, message) {
					Log("[Event:"+name+"] [Error:"+err+"] [Type:"+type+"] [Message:"+ message + "]" );
					
					self.errorMessage = err || "";
				}
		
				_onInitFailed = function (error){
					_setParameters("INIT_FAILED", error);
					console.log(error);
					runtime.trigger(CNDS.onInitFailed, self);
				};
				_onInitSuccess = function (type, value){
					_setParameters("INIT_SUCESS", null, type, value);
					runtime.trigger(CNDS.onInitSuccess, self);
				};	

				_onVideoReady = function (){
					setParamenters("VIDEO_READY");
					runtime.trigger(CNDS.onVideoAdReady, self);
				};

				_onVideoError = function (error){
					_setParameters("VIDEO_ERROR", error);
					runtime.trigger(CNDS.onVideoAdError, self);
				};

				_onPlacementStateCheck = function (type, value, send){
					_setParameters(value, null, type, value);

					if(value == PlacementState.READY){
						if(type==videoAdPlacementId  || send == Messages.TEST){
							console.log("REGULAR VIDEO READY");
							runtime.trigger(CNDS.onVideoAdReady, self);
						}
						else if( type == rewardedVideoAdPlacementId || send == Messages.TEST_REWARDED){
							console.log("REWARD VIDEO READY");
							runtime.trigger(CNDS.onRewardedVideoAdReady, self);
						}
					}else{
						runtime.trigger(CNDS.onVideoAdFailed, self);
					}				
				};						

				_onVideo = function (type, value, send){
					_setParameters(value, null, type, value);                        

					if(value == FinishState.SKIPPED){
						runtime.trigger(CNDS.onVideoAdSkipped, self);
					}
					else if(value == FinishState.COMPLETED){
						if(type==videoAdPlacementId  || send == Messages.TEST){
							runtime.trigger(CNDS.onVideoAdComplete, self);
						}
						else if( type == rewardedVideoAdPlacementId || send == Messages.TEST_REWARDED){
							runtime.trigger(CNDS.onRewardedVideoAdComplete, self);
						}							
					}
					else if(value == FinishState.ERROR){
						runtime.trigger(CNDS.onVideoAdCancelled, self);
					}
					else if(value == Messages.NOT_READY){
						runtime.triggers(CNDS.onVideoAdFailed, self);				
					}
				
				};	

				_getVideoPlacementId = function(){
					return videoAdPlacementId;
				};

				_getRewardedVideoPlacementID = function(){
					return rewardedVideoAdPlacementId;
				};												

				if(gameId)
					ACTS.InitializeUnityAds(gameId, isTest, isDebug);

			}
		}


	};	

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	Cnds.prototype.onInitSuccess = function(){
		return true;
	};

	Cnds.prototype.onVideoAdFailed = function(){
		return true;
	};

	Cnds.prototype.onVideoAdReady = function(){
		return true;
	};

	Cnds.prototype.onRewardedVideoAdReady = function(){
		return true;
	};

	Cnds.prototype.onVideoAdComplete = function(){
		return true;
	};

	Cnds.prototype.onRewardedVideoAdComplete = function(){
		return true;
	};

	Cnds.prototype.onVideoAdSkipped = function(){
		return true;
	};

	Cnds.prototype.onVideoAdCancelled = function(){
		return true;
	};
	
	

	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.ShowVideoAd = function (placementID)
	{
		console.log("ShowVideoAd: ", placementID );
		var _pid = "";

		if(!_unityAdsPlugin){				
			console.error("unityads plugin is not loaded");
			return;
		}

		if( placementID == placements.normalVideo){
			_pid = _getVideoPlacementId();
		}else if( placementID == placements.rewardedVideo){
			_pid = _getRewardedVideoPlacementID();
		}
		
		_unityAdsPlugin["ShowVideoAd"](_pid, function callback(error, result){			

			if(error){
				_onVideoError(error);
			}
			else{
				var arr = JSON.parse(result);
				_onVideo(arr[0], arr[1], _pid);
			}
		});

	};

	Acts.prototype.GetPlacementState = function (placementID)
	{
		console.log("GetPlacementState: ", placementID );
		var _pid = "";

		if(!_unityAdsPlugin){				
			console.error("unityads plugin is not loaded");
			return;
		}

		if( placementID == placements.normalVideo){
			_pid = _getVideoPlacementId();
		}else if( placementID == placements.rewardedVideo){
			_pid = _getRewardedVideoPlacementID();
		}else{
			_pid = placementID;
		}			
		
		_unityAdsPlugin["GetPlacementState"](_pid, function callback(error, result){		
			if(error){
				_onVideoError(error);
			}
			else{
				var arr = JSON.parse(result);
				_onPlacementStateCheck(arr[0], arr[1], _pid);
			}
		});
	};
	
	Acts.prototype.InitializeUnityAds = function (gameId, isTest, isDebug)
	{
		if(!_unityAdsPlugin){
			_onInitFailed("UnityAds plugin is not loaded");
			return;
		}

		_unityAdsPlugin["UnityAdsInit"](gameId, isTest, isDebug, function callback(error, result){
			console.log("UnityAdsInit: ", result);				
			if(error){
				_onInitFailed(error);
			}
			else{
				var arr = JSON.parse(result);
				var type = arr[0]
				var msg = arr[1]
				if(msg == Messages.IS_READY){
					_onInitSuccess(type, msg);
				}										
			}

		});
	};	
	
	///EJEMPLO BORRAR LUEGO
	Acts.prototype.PreloadBanner = function ()
	{
		if (!isSupported)
			return;
		
		this.AdMob["preloadBannerAd"]();
	};

	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	Exps.prototype.ErrorMessage = function(ret){
		ret.set_string(this.ErrorMessage || "");
	}

	pluginProto.exps = new Exps();

}());