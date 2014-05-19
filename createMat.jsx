#target photoshop
var doc = app.activeDocument;

UI();

function UI() {
    var window = new Window('dialog', 'Create Material');
    
        // NameGroup
        var nameGroup = window.add('group');
            var nameText = nameGroup.add('statictext');
                nameText.text = 'Name:';
            var nameEdit = nameGroup.add('edittext');
                nameEdit.characters = 16;
                
        //Buttons Group
        var btnGroup = window.add('group');
            var btnOk = btnGroup.add('button', undefined, 'Ok');
            btnOk.onClick = function() {$.writeln('Test')};
            var btnCancel = btnGroup.add('button', undefined, 'Cancel');
        window.show();
}
