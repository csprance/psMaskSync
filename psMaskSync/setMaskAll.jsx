﻿#target photoshop   
#include "setMask.jsxinc"

/*
<javascriptresource>
    <name>psMaskSync - Sync All</name>
    <category>psMaskSync</category>
</javascriptresource>
*/

var doc = app.activeDocument;

setLayersetMask(doc.layerSets);