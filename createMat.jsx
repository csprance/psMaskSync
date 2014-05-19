#target photoshop
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
    }
}
