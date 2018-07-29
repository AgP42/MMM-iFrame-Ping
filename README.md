# MMM-iFrame-Ping

The `MMM-iFrame-Ping` module is for MagicMirror². It allow to display an iFrame of (m)any web content to your [MagicMirror](https://github.com/MichMich/MagicMirror). Infortunately, not all websites support being in a iFrame.

Several other iFrame modules exists for MagicMirror, main others: 

- [iFrame from desertblade](https://github.com/desertblade/iFrame) : the original one with basics functions : one URL, no periodic refresh
- [MMM-iFrame from alberttwong](https://github.com/alberttwong/MMM-iFrame) : allow several rotating URL but no periodic refresh of the content
- [MMM-iFrameReload from TheBogueRat](https://github.com/TheBogueRat/MMM-iFrameReload) : one possible URL with periodic refresh
 
## Main functionalities of MMM-iFrame-Ping module: 
- Allow periodic refresh of the iFrame, or not (configurable), this allow to display images or video
- Ping the URL before trying to display the content. Display an error (with the last successful PING date and time) is the host is not reachable. PING code from [MMM-Ping by CFenner](https://github.com/CFenner/MMM-Ping)
- If a PIR-sensor using MMM-PIR-Sensor module is used, the iFrame will not be updated during screen off (this behavior works also with all other module that send the notification "USER_PRESENCE") and will be refresh with screen on.
- If the iFrame-Ping module is hidden (by REMOTE-CONTROL or any Carousel module for example), the iFrame will not be updated. As soon as one MMM-iFrame-Ping module will be again displayed on the screen, an update will be requested.
- Possibility to display the date and time of the last update request (configurable)
- CSS file

Known issue : 
- In case the url can be reach by PING but cannot be displayed on a iFrame, no info will be given... To debug this case look on the MagicMirror console (Ctrl+Shit+i) and search the error. In that situation, no PING result will be displayed (Neither OK nor NOK ! No info !)

Some screenshot : 

Displaying YouTube (displayLastUpdate: true) : 
![MMM-iFrame-Ping](https://github.com/AgP42/MMM-iFrame-Ping/blob/master/screenshot/MMM-iFrame-Ping_youtube_update.png)
Displaying TRENDnet snapshot (displayLastUpdate: false) : 
![MMM-iFrame-Ping](https://github.com/AgP42/MMM-iFrame-Ping/blob/master/screenshot/MMM-iFrame-Ping.png)
PING Nok (displayLastUpdate: true) : 
![MMM-iFrame-Ping](https://github.com/AgP42/MMM-iFrame-Ping/blob/master/screenshot/MMM-iFrame-Ping_Nok_with%20update%20display.png)
PING OK but content not yet loaded (displayLastUpdate: true) : 
![MMM-iFrame-Ping](https://github.com/AgP42/MMM-iFrame-Ping/blob/master/screenshot/MMM-iFrame-Ping_ok.png)


## Installation

Git clone this repo into ~/MagicMirror/modules directory :
```
cd ~/MagicMirror/modules
git clone https://github.com/AgP42/MMM-iFrame-Ping.git
```
and add the configuration section in your Magic Mirror config file 

## Update
```
cd ~/MagicMirror/modules/MMM-iFrame-Ping
git pull
```

## Module configuration

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-iFrame-Ping',
		position: 'middle_center',	// This can be any of the regions.
		config: {
			// See 'Configuration options' for more information.
			url: "https://magicmirror.builders/", //url to display
			height:"100%", 
			width:"100%",
			autoRefresh: true, //set to false for video
			updateInterval: 1, //in min. Only if autoRefresh: true
			displayLastUpdate: true,
			width: "100%", // Optional. Default: 100%
			height: "400px", //Optional. Default: 100px
			scrolling: "no" 
			}
	},
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
		<tr>
			<td><code>url</code></td>
			<td>the URL(s) in the iFrame<br>
				<br><b>Example:</b> See use case examples bellow. https://github.com/AgP42/MMM-iFrame-Ping/blob/master/README.md#use-case-examples </code>
				<br><b>Default value:</b> <code>"http://magicmirror.builders/"</code>
			</td>
		</tr>		
		<tr>
			<td><code>width</code></td>
			<td>the width of the iFrame<br>
				<br><b>Example:</b><code>"100%"</code>
				<br><b>Example:</b><code>"200px"</code>
				<br><b>Default value:</b> <code>"100%"</code>
			</td>
		</tr>
		<tr>
			<td><code>height</code></td>
			<td>the width of the iFrame<br>
				<br><b>Example:</b><code>"100%"</code>
				<br><b>Example:</b><code>"300px"</code>
				<br><b>Default value:</b> <code>"100px"</code>
			</td>
		</tr>
			<tr>
			<td><code>scrolling</code></td>
			<td>Allow a scroll bar or not<br>
				<br><b>Default value:</b> <code>"no"</code>
			</td>
		</tr>
		<tr>
			<td><code>autoRefresh</code></td>
			<td>Set to true to allow an autorefresh of the iFrame<br>
				<br><b>Default value:</b> <code>true</code>
			</td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>the update internal for the iFrame, in minutes. If autoRefresh: true<br>
				<br><b>Example for 30 seconds:</b><code>0.5</code>
				<br><b>Default value:</b> <code>0.5</code>
			</td>
		</tr>
		<tr>
			<td><code>displayLastUpdate</code></td>
			<td>If true this will display the last update time at the end of the task list. See screenshot bellow<br>
				<br><b>Possible values:</b> <code>boolean</code>
				<br><b>Default value:</b> <code>false</code>
			</td>
		</tr>
		<tr>
			<td><code>displayLastUpdateFormat</code></td>
			<td>Format to use for the time display if displayLastUpdate:true <br>
				<br><b>Possible values:</b> See [Moment.js formats](http://momentjs.com/docs/#/parsing/string-format/)
				<br><b>Default value:</b> <code>'ddd - HH:mm:ss'</code>
			</td>
		</tr>
			<tr>
			<td><code>logDebug</code></td>
			<td>Set to true to have all log infos on the console<br>
				<br><b>Default value:</b> <code>false</code>
			</td>
		</tr>
</table>

## Use case examples

### TRENDnet camera (snapshots)
Snapshot URL : http://website.com:port/image/jpeg.cgi
(Works only without "Snapshot URL Authentication")

### Nest Camera streaming
As of right now, Nest Camera only support streaming to iFrame when the camera feed is set to public. When you set it to public, you'll get a live URL and a iFrame embedded URL (should look like https://video.nest.com/embedded/live/wSbs3mRsOF?autoplay=1). For more info, check out this thread https://nestdevelopers.io/t/is-there-a-way-to-get-nest-camera-streams-in-an-iframe/813. 

### D-Link Camera streaming
D-Link cameras streams can be easily embedded into an iFrame.  Some cameras require a username and password.  You can construct a URL that looks like this http://admin:password@10.0.1.7/mjpeg.cgi. For mroe info, check out http://forums.dlink.com/index.php?PHPSESSID=ag1ne0jgnnl7uft3s1ssts14p4&topic=59173.0.

### Youtube streaming
Just got to the video you want. Click share and embed and pull out the url and add the autoplay parameter (eg.   https://www.youtube.com/embed/pcmjht0Hqvw?autoplay=1).

## CSS use

See MMM-iFrame-Ping.css file for details of configurable field


The MIT License (MIT)
=====================

Copyright © 2018 Agathe Pinel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
