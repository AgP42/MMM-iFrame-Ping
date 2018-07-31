/* Magic Mirror
 * Module: iFrame-Ping
 * 
 * By AgP42
 * First Version : 29/07/2018
 * 
 * MIT Licensed.
 */
 
//For the PIR sensor
var UserPresence = true; //by default : user present. (No PIR-Sensor)

Module.register("MMM-iFrame-Ping",{
		
		// Default module config.
		defaults: {
				logDebug: false, //set to true to get detailed debug logs. To see them : "Ctrl+Shift+i"
				height:"100%", //hauteur du cadre en pixel ou %
				width:"100%", //largeur
				autoRefresh: true, //allow the updateInterval value to be used for autoreload e iFrame. To set at false for video
                updateInterval: 0.5, //in min. Refrest interval if autoRefresh is set to true
                displayLastUpdate: true, //to display the last update of the iFrame bellow te iFrame
				displayLastUpdateFormat: 'ddd - HH:mm:ss', //format of the date and time to display
                url: "http://magicmirror.builders/", //source of the iFrame to be displayed
                scrolling: "no" // allow scrolling or not. html 4 only
		},

start: function () {
	
		Log.info("Starting module: " + this.name);

		self = this;
		this.ModuleiFrameHidden = false; //displayed by default
		this.IntervalID = 0;
		this.PING_OK = false;
		this.lastPingOK = null; //init at now dans le node_helper
				
		//data load once at start-up
		this.iframeLoad();
		
		//ping request to ensure the target it reachable, only if yes the iFrame will be displayed
		this.sendSocketNotification('PING_REQUEST', this.config.url);
				                               
		//set autoupdate if autoRefresh true                               
        if(this.config.autoRefresh){
			this.IntervalID = setInterval( function () { 
				self.sendSocketNotification('PING_REQUEST', self.config.url);
			}, this.config.updateInterval * 60 * 1000);    
		}

}, //end start function
  
suspend: function() { //function called when module is hiden
	this.ModuleiFrameHidden = true; 
	
	if(this.config.logDebug){
		Log.log("Fct suspend - ModuleHidden = " + this.ModuleiFrameHidden);
	}
	
	this.GestionUpdateIntervaliFrame(); //call the function that manage all cases
},

resume: function() { //function called when module is displayed again
	this.ModuleiFrameHidden = false;
	
	if(this.config.logDebug){
		Log.log("Fct resume - ModuleHidden = " + this.ModuleiFrameHidden);
	}
	
	this.GestionUpdateIntervaliFrame();	
},

notificationReceived: function(notification, payload) {
	if (notification === "USER_PRESENCE") { // notification sent by the module MMM-PIR-Sensor or others
		
		if(this.config.logDebug){
			Log.log("Fct notificationReceived USER_PRESENCE - payload = " + payload);
		}
		
		UserPresence = payload;
		this.GestionUpdateIntervaliFrame();
	}
},

GestionUpdateIntervaliFrame: function() {
	if (UserPresence === true && this.ModuleiFrameHidden === false){ //user is present and module is displayed
		
		var self = this;

		if(this.config.logDebug){
			Log.log(this.name + ": user is present and module is displayed ! Update !");
		}
    
		// update now
		iframe.src = this.config.url; //to launch again in case it was a video
		self.sendSocketNotification('PING_REQUEST', self.config.url);

		//set autoupdate again if autoRefresh true and no other setInterval is running                     
		if (this.IntervalID === 0 && this.config.autoRefresh){
			this.IntervalID = setInterval( function () { 
				self.sendSocketNotification('PING_REQUEST', self.config.url);
				}, this.config.updateInterval * 60 * 1000);  
		}
	
	}else{ //user is noit present OR module is not displayed : stop updating and stop video playing
		
		if(this.config.logDebug){
			Log.log("Stop update ! ID : " + this.IntervalID);
		}
		
		clearInterval(this.IntervalID); // on arrete l'intervalle d'update en cours
		this.IntervalID=0; //on reset la variable
		
		//stop the video if it was not an autorefresh iFrame
        if(!this.config.autoRefresh){
			iframe.src = ""; 
		}

	}
},

getStyles: function() {
    return ["MMM-iFrame-Ping.css"];
},

//call only once at start-up
iframeLoad: function() {
	
	if(this.config.logDebug){
		Log.log ("iframeLoad et : " + moment.unix(Date.now() / 1000).format('dd - HH:mm:ss'));		
	}
	
	//Init of the iFrame   
	iframe = document.createElement("IFRAME");
	iframe.width = this.config.width;
	iframe.height = this.config.height;
	iframe.scrolling = this.config.scrolling;
	iframe.src = this.config.url; 
	
    return iframe;
},

socketNotificationReceived: function(notification, payload) {

  var self = this;
	
  if (notification === 'PING_RESPONSE') {
	  
	if(this.config.logDebug){
	  Log.info('received notification : ' + notification);
	}

	if(payload){  
		  
		this.payload = payload;
		self.lastPingOK = this.payload.lastConnection; //in s. Memorize the date and time of the last successfull PING
		
		if(this.payload.status === "ERROR"){
			
			if(this.config.logDebug){
				Log.log("No PING since : " + moment(self.lastPingOK).format('dd - HH:mm:ss'));		
			}
			
			self.PING_OK = false;			
		
		}else{
			
			if(this.config.logDebug){
				Log.log("PING OK at " + moment(self.lastPingOK).format('dd - HH:mm:ss'));
			}
			
			self.PING_OK = true;
			
		}
		
		self.updateDom(1000); //update the Dom with the PING answer infos
		
	  }//end if payload
	  
  }//end notification = PING_RESPONSE
},

// Override dom generator.
getDom: function() {
	
	var self = this;

	if(this.config.logDebug){		
		Log.log ("update iFrame DOM at : " + moment.unix(Date.now() / 1000).format('dd - HH:mm:ss'));		
	}
	
	var wrapper = document.createElement("div");// main Wrapper that containts the others
	wrapper.className = "mainWrapperIP"; //for CSS customization

	var pinginfo = document.createElement("div"); //line that display the ping result
	
	if(self.PING_OK){//if PING ok : iFrame to be displayed

		wrapper.appendChild(iframe);//request the iFrame to be displayed

		//display infos about PING result
		pinginfo.className = "pinginfoIP";
		pinginfo.innerHTML = "PING OK : Loading..."
		wrapper.appendChild(pinginfo);
			
		//this fonction will be automatically called after the load of the iFrame.... but also if an error occurs and the iFrame cannot be displayed... so some degraded cases can occurs here
		//this function is called even when the Dom update is not called...
		iframe.onload = function(){

			if(self.config.logDebug){			
				Log.log ("iframe.onload : " + moment.unix(Date.now() / 1000).format('dd - HH:mm:ss'));	
			}
			
			pinginfo.innerHTML = "" //iFrame is loaded, PING result info to be removed from display
			wrapper.appendChild(pinginfo);
			
			//we also enter this loop in case the PING is OK but another loading issue occurs. But how to catch that... ??

		}
		
	}else{ //otherwise : PING NOK... --> display the last successfull ping with an error message
		
		pinginfo.className = "pinginfoIP errorpingIP";
		pinginfo.innerHTML = "PING NOK since " + moment(self.lastPingOK).format(this.config.displayLastUpdateFormat);
		wrapper.appendChild(pinginfo);
		
	}	
	
	//to display last update at the end
	if(this.config.displayLastUpdate){
		
		this.lastUpdate = Date.now() / 1000 ; 

		var updateinfo = document.createElement("div"); //le div qui donne la date, si configuré pour etre affichée
		updateinfo.className = "updateinfoIP"; // align-left
		updateinfo.innerHTML = "Update requested at : " + moment.unix(this.lastUpdate).format(this.config.displayLastUpdateFormat);
		wrapper.appendChild(updateinfo);
	}
			
	return wrapper;
	
	}//fin getDom

}); //fin module register
