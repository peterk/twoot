
Twoot is a customizable minimal twitter client for WebKit-based SSBs. It is based on jQuery_, Fluid_ and some basic HTML and CSS. The idea is to provide a native-looking application that is easy to customize to your specific needs. The twitter javascript code is sinspired by the `SeaOfClouds tweet code`_.

.. _jQuery: http://jquery.com/
.. _Fluid: http://fluidapp.com/
.. _SeaOfClouds tweet code: http://tweet.seaofclouds.com/

The code has only been tested with Fluid, but should work in Safari and other WebKit-based browsers (including the iPhone I guess).

.. image:: http://www.peterkrantz.com/wp-content/uploads/2008/10/twoot-hud.png
.. image:: http://www.peterkrantz.com/wp-content/uploads/2008/08/screenshot.gif

Installation
------------

Put all Twoot files in a folder somewhere. Download Fluid and create the Twoot.app by following the instructions here:

http://www.peterkrantz.com/2008/twitter-client-with-fluid-and-jquery/

Launching the app will prompt you for your username and password on the first run.


License
-------

MIT

The default icon was found at http://www.iconarchive.com/show/dragon-soft-icons-by-artua/User-icon.html and is used according to the restrictions described (free for non-commercial use).

The styles/default/Morpho-Helena-128x128.png icon is created by Adrian Melsha and is used in accordance with the license terms here:
http://www.iconarchive.com/category/animals/morpho-butterfly-icons-by-adrian-melsha.html

Customization
-------------

The idea is that you should adapt Twoot to fit your requirements. If you know HTML and CSS it is trivial to add a new style. Create a new folder under the style directory and add all style files (css/images) there. Don't forget to change the stylesheet link in the twoot.htm file.

If you want to modify the way Twoot works, all javascript code is in the twoot.js file.

Currently Twoot has two themes, "Default" and "HUD-black" to match the window styles available in Fluid. To switch theme, edit twoot.htm and point the stylesheet to the correct css file in the styles folder.


Bugs, praise, feature requests
------------------------------

Create a comment on the `initial announcement page`_.

.. _initial announcement page: http://www.peterkrantz.com/2008/twitter-client-with-fluid-and-jquery/


