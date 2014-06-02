﻿#target photoshop

/*
<javascriptresource>
    <name>psMaskSync - Install Actions</name>
    <category>psMaskSync</category>
</javascriptresource>
*/

try {
    var actions = new File($.fileName);
    actions = new File(actions.parent.parent.parent + "/Actions/psMaskSync.atn")
    load(actions);
}
catch(e) {
    alert('psMaskSync actions could not be loaded!', 'psMaskSync', 'erroricon');
}
