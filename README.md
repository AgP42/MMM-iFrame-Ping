# MMM-iFrame-Ping

The `MMM-iFrame-Ping` module is for MagicMirror². It allow to display an iFrame of (m)any web content to your [MagicMirror](https://github.com/MichMich/MagicMirror). Infortunately, not all websites support being in a iFrame.

MagicMirror Forum post : https://forum.magicmirror.builders/topic/8481/mmm-iframe-ping

## Main functionalities 
- Allow periodic refresh of the iFrame, or not (configurable), this allow to display images or video
- Ping the URL before trying to display the content. Display an error (with the last successful PING date and time) if the host is not reachable. PING code from [MMM-Ping by CFenner](https://github.com/CFenner/MMM-Ping)
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
			<td>the URL in the iFrame<br>
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
Nest Camera doesn't support the PING, consequently this module will not be able to display them ([Issue](https://github.com/AgP42/MMM-iFrame-Ping/issues/1)). Please use another iFrame module to display Nest Camera stream...(See bellow)

### D-Link Camera streaming
D-Link cameras streams can be easily embedded into an iFrame.  Some cameras require a username and password.  You can construct a URL that looks like this http://admin:password@10.0.1.7/mjpeg.cgi. For more info, check out http://forums.dlink.com/index.php?PHPSESSID=ag1ne0jgnnl7uft3s1ssts14p4&topic=59173.0.

### Youtube streaming
Just got to the video you want (see bellow more details). Click share and embed and pull out the url and add the autoplay parameter (eg.   https://www.youtube.com/embed/pcmjht0Hqvw?autoplay=1).

#### Youtube playlist streaming (thanks to [theramez](https://github.com/AgP42/MMM-iFrame-Ping/issues/4))

You can stream any public playlist or make your own playlist (this requires a youtube account). 
With your own playlist streaming on the mirror, you are able to change the contents directly on YouTube (adding videos, removing others, adding live channels and broadcasts..etc) using your mobile or desktop, without changing anything to the mirror and it'll be updated automatically 🥇

To do so : firstly, go to the first video in any playlist, right click and choose Copy embed code as seen here
![MMM-iFrame-Ping](https://github.com/AgP42/MMM-iFrame-Ping/blob/master/screenshot/youtubeplaylist.jpg)

now paste it on any notepad. It should look like that :
```
<iframe width="853" height="480" src="https://www.youtube.com/embed/XMIc4uTAMh0?list=PLbIZ6k-SE9ShGEZ_wuvG3hatiC6jWJgVm" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
```

we only need the source src part so copy this part only, it should look like that :
```
https://www.youtube.com/embed/XMIc4uTAMh0?list=PLbIZ6k-SE9ShGEZ_wuvG3hatiC6jWJgVm
```

copy this link to the module url: in config.js file and voila! you've a full playlist in your mirror... but wait a minute videos are not auto playable and I want to add a shuffle! also what happens when the list play is finished? here comes the fun part (^_^) you can simply add tags called YouTube player parameters within your link just like that link&TAG
so in our example to enable autoplay add tag:

    autoplay=1

so our link will be
```
https://www.youtube.com/embed/XMIc4uTAMh0?list=PLbIZ6k-SE9ShGEZ_wuvG3hatiC6jWJgVm&autoplay=1
```

you can add multiple tags like link&TAG1&TAG2&TAG3
to enable list repeating add tag

    loop=1

to remove the YouTube logo from the control bar add

    modestbranding=1

to disable videos annotations add

    iv_load_policy=3

Small hint: you can test your link in the browser easily : just open a new tab and paste it to see how it will be exactly on the mirror

so we'll edit our link to make it autoplayable and disable annoying annotations and remove YouTube logo
```
https://www.youtube.com/embed/XMIc4uTAMh0?list=PLbIZ6k-SE9ShGEZ_wuvG3hatiC6jWJgVm&autoplay=1&modestbranding=1&iv_load_policy=3
```

wanna edit the YouTube player more ? here is the full list of tags in The Official YouTube API page under Supported Parameters table :
to disable keyboard inputs to the player, add

    disablekb=1

to disable the player controls completely for more clean look, add

    controls=0

## CSS use

See MMM-iFrame-Ping.css file for details of configurable field

## Other iFrame modules:
Several other iFrame modules exists for MagicMirror, main others: 

- [iFrame from desertblade](https://github.com/desertblade/iFrame) : the original one with basics functions : one URL, no periodic refresh
- [MMM-iFrame from alberttwong](https://github.com/alberttwong/MMM-iFrame) : allow several rotating URL but no periodic refresh of the content
- [MMM-iFrameReload from TheBogueRat](https://github.com/TheBogueRat/MMM-iFrameReload) : one possible URL with periodic refresh

The MIT License (MIT)
=====================

Copyright © 2018 Agathe Pinel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
