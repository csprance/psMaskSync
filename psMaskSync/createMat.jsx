﻿#target photoshop
#include "pbLib.jsxinc"

/*
<javascriptresource>
    <name>psMaskSync - Create Material</name>
    <category>psMaskSync</category>
</javascriptresource>
*/

try {
    var doc = app.activeDocument;}
catch(e) {alert('No Active Documeant to work on!', 'psMaskSync', 'erroricon')}

UI();

function UI() {
    //Methods
    this.getMats = function() {
        var matNames = [];
        for (var i=0; i<this.matList.length; i++) {
            if (this.matList[i].value == 1) {matNames.push(this.matList[i].text)}
        }
    return matNames;
    };
    var self = this; // allows this ref via self in callbacks.

    var window = new Window('dialog', 'Create Material');
           //Material Group
        var matGroup = window.add('group');
            this.matList = [];
            for (var i=0; i<doc.layerSets.length; i++) {
                this.matList.push(matGroup.add('checkbox', undefined, doc.layerSets[i].name));
            }
    
        // NameGroup
        var nameGroup = window.add('group');
            nameGroup.add('statictext', undefined, 'Name:');
            var nameEdit = nameGroup.add('edittext');
            nameGroup.add
                nameEdit.characters = 16;
                
        //Buttons Group
        var btnGroup = window.add('group');
            var btnOk = btnGroup.add('button', undefined, 'Ok');
            btnOk.onClick = function() {createMat(nameEdit.text, self.getMats()); window.close()};
            var btnCancel = btnGroup.add('button', undefined, 'Cancel');
        window.show();
}


function createMat(name, matList) {
    var layerSets = doc.layerSets;
    for (var i=0; i<layerSets.length; i++) {
        if (matList.indexOf(layerSets[i].name) > -1) {
            var newSet = layerSets[i].layerSets.add()
            newSet.name = name;
            makeLayerMask('RvlA');
        }
    }
}


function makeLayerMask(maskType, maps) {
    if( maskType == undefined) maskType = 'RvlS' ; //from selection
    //requires a selection 'RvlS'  complete mask 'RvlA' otherThanSelection 'HdSl'
    var desc140 = new ActionDescriptor();
    desc140.putClass( charIDToTypeID('Nw  '), charIDToTypeID('Chnl') );
    var ref51 = new ActionReference();
    ref51.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk ') );
    desc140.putReference( charIDToTypeID('At  '), ref51 );
    desc140.putEnumerated( charIDToTypeID('Usng'), charIDToTypeID('UsrM'), charIDToTypeID(maskType) );
    executeAction( charIDToTypeID('Mk  '), desc140, DialogModes.NO );
}
