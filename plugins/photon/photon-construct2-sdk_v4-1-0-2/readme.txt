Photon SDK for Scirra Construct 2/3 readme.  
(C) Exit Games GmbH 2017

Overview 
----------------------------------------------------------------------------------------------------
Photon SDK contains Scirra Construct 2/3 plugins exposing underlying Photon Javascript library 
functionality:
- Photon Realtime Plugin allows to develop multiplayer games with clients communicating through 
  Photon Cloud or self-hosted Photon Server. 
  Follow https://www.photonengine.com/en/Realtime for info on Photon Realtime.
- Photon Chat Plugin adds chat functionality to your game.
  Follow https://www.photonengine.com/en/Chat for info on Photon Chat.

Installation
----------------------------------------------------------------------------------------------------
- Construct 2: Drag and drop photon.c2addon and photon-chat.c2addon files into editor window. 
  Construct 3: Install photon.c3addon and photon-chat.c3addon in Addon Manager: Menu -> View -> Addon manager.
  See Construct 2/3 documentation on plugins installation details.
- Register a new realtime app at https://www.photonengine.com/en/Dashboard/Realtime 
- Register a new chat app at https://www.photonengine.com/en/Dashboard/Chat

Running demos
----------------------------------------------------------------------------------------------------
- Find Photon object in project tree and set its AppId property to application id value from dashboard.
- Select Main layout.
- Run the application. Editor will open browser page. Copy url and open it in new browser pages.
- Check browser console for helpful info.
- Pool demo: all clients automatically join single room, each spawns the fish and notifies others 
  with fish positions. Click on the pool makes owned fish move to the click location.
- Test demo: automatically joins or creates new room. Pressing Leave will bring the client to the lobby 
  where client can create new room or join existing from list. Also, test event firing is available 
  inside the room (check other clients log for events receive report).
- Chat demo: start 2 or more clients. For every client, choose user id and press Connect. 
  When client is connected to front end, enter channel names separated by comma and press Subscribe. 
  Select channel in list, enter message and press Publish. Or specify destination user id and send 
  private message by pressing Send.

Package Contents
----------------------------------------------------------------------------------------------------
- license.txt         - the license terms
- readme.txt          - this readme text
- release_history.txt - changelog
- photon.c2addon      - Photon Realtime Construct 2 Plugin
- photon-chat.c2addon - Photon Chat Construct 2 Plugin
- photon.c3addon      - Photon Realtime Construct 3 Plugin
- photon-chat.c3addon - Photon Chat Construct 3 Plugin
- demo-test.capx      - application for testing Photon Realtime features
- demo-pool.capx      - Realtime demo application
- demo-chat.capx      - Chat demo application

Documentation
----------------------------------------------------------------------------------------------------
There is no Photon Construct 2/3 Plugin specific documentation or tutorials available currently.  
General documentation on Photon Realtime: http://doc.photonengine.com/en-us/realtime/current/getting-started/realtime-intro  
Photon Chat documentation: http://doc.photonengine.com/en-us/chat/current/getting-started/chat-intro  
Underlying Photon Javascript API reference: http://doc-api.photonengine.com/en/javascript/current  

Demos included in the package show clear how plugin works and may be used as tempaltes for real projects.  
Short descriptions available for each plugin item in editor.

Download
----------------------------------------------------------------------------------------------------
The latest version of Photon Plugin for Scirra Construct 2/3 can be found at
https://www.photonengine.com/sdks

Contact
----------------------------------------------------------------------------------------------------
To get in touch with other Photon developers and our engineers, visit our Developer Forum:
http://forum.photonengine.com  
Keep yourself up to date following Exit Games on Twitter http://twitter.com/exitgames
and our blog at http://blog.photonengine.com  


