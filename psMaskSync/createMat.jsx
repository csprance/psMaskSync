#target photoshop

/*
<javascriptresource>
    <name>psMaskSync - Create Material</name>
    <category>psMaskSync</category>
</javascriptresource>
*/

var doc = app.activeDocument;

UI();

function UI() {
    var window = new Window('dialog', 'Create Material');
        // NameGroup
        var nameGroup = window.add('group');
            nameGroup.add('statictext', undefined, 'Name:');
            var nameEdit = nameGroup.add('edittext');
                nameEdit.characters = 16;
                
        //Buttons Group
        var btnGroup = window.add('group');
            var btnOk = btnGroup.add('button', undefined, 'Ok');
            btnOk.onClick = function() {createMat(nameEdit.text); window.close()};
            var btnCancel = btnGroup.add('button', undefined, 'Cancel');
        window.show();
}


function createMat(name) {
    var layerSets = doc.layerSets;
    for (var i=0; i<layerSets.length; i++) {
        var newSet = layerSets[i].layerSets.add()
        newSet.name = name;
        makeLayerMask('RvlA');
    }
}


function makeLayerMask(maskType) {
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
