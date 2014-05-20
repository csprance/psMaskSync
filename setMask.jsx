#target photoshop
var doc = app.activeDocument;

setLayersetMask();

function setLayersetMask() {
    var activeSet = new Set(doc.activeLayer);
    var lSets = getSets(doc.layerSets);

    if (activeSet.hasMask()) {
        for (var i=0; i<lSets.length; i++) {
            if (lSets[i].ref.name == activeSet.ref.name && lSets[i].getID() != activeSet.getID()) {
                    if (lSets[i].hasMask()) {
                        lSets[i].deleteMask();
                    }
                    activeSet.copyMask(lSets[i].getID())
            }
        }
    }
    else { alert ('This Layer Set has no mask to sync!', 'syncMask', 'errorIcon'); }
}


function getSets(layerSets) {
    var lSets = [];
    for(var i=0; i<layerSets.length; i++) {
        var set = new Set(layerSets[i]);
        lSets.push(set);
        if (set.ref.layerSets.length > 0) {
            lSets.push.apply(lSets, getSets(set.ref.layerSets));
        }    
    }
    return lSets;    
}


// Set Classs
function Set(ref) {
    this.ref = ref;
    this.oldSel;
    
    //Methods
    this.setActive = function() {
        this.oldSel = doc.activeLayer;
        doc.activeLayer = this.ref;
    };

    this.oldActive = function() {
        doc.activeLayer = this.oldSel;
    };
    
    this.hasMask = function() {
        this.setActive();
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var desc = executeActionGet(ref);
        
        var ret = desc.hasKey(charIDToTypeID("UsrM"));
        this.oldActive();
        return ret;
    };

    this.getID = function() {
        this.setActive();
        
        var ref = new ActionReference();   
        ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "LyrI" ));   
        ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );  
        var ret = executeActionGet(ref).getInteger( stringIDToTypeID( "layerID" ) );
    
        this.oldActive();
        return ret; 
    };

    this.copyMask = function(dest) {
        this.setActive();
        var idMk = charIDToTypeID( "Mk  " );
        var desc18 = new ActionDescriptor();
        var idNw = charIDToTypeID( "Nw  " );
        var idChnl = charIDToTypeID( "Chnl" );
        desc18.putClass( idNw, idChnl );
        var idAt = charIDToTypeID( "At  " );
        var ref14 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idChnl = charIDToTypeID( "Chnl" );
        var idMsk = charIDToTypeID( "Msk " );
        ref14.putEnumerated( idChnl, idChnl, idMsk );
        var idLyr = charIDToTypeID( "Lyr " );
        ref14.putIdentifier( idLyr, dest ); //FIXME use ID instead
        desc18.putReference( idAt, ref14 );
        var idUsng = charIDToTypeID( "Usng" );
        var ref15 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idChnl = charIDToTypeID( "Chnl" );
        var idMsk = charIDToTypeID( "Msk " );
        ref15.putEnumerated( idChnl, idChnl, idMsk );
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );  
        ref15.putEnumerated( idLyr, idOrdn, idTrgt );
        desc18.putReference( idUsng, ref15 );
        var idDplc = charIDToTypeID( "Dplc" );
        desc18.putBoolean( idDplc, true );
        executeAction( idMk, desc18, DialogModes.NO );
        this.oldActive ();
    };
    
    this.deleteMask = function() {
        this.setActive();
        var desc523 = new ActionDescriptor();
        var ref325 = new ActionReference();
        ref325.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
        desc523.putReference( charIDToTypeID('null'), ref325 );
        executeAction( charIDToTypeID('Dlt '), desc523, DialogModes.NO );
        this.oldActive();
    };
}
