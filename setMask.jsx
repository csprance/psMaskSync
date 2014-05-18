var doc = app.activeDocument;

setLayersetMask();

function setLayersetMask() {
    var activeSet = doc.activeLayer;
    var layerSets = doc.layerSets;
    var lSets = getSets(layerSets);

    for (var i=0; i<lSets.length; i++) {
        if (lSets[i].name == activeSet.name) {
            // HasMask
            doc.activeLayer = lSets[i];
            if (hasMask()) {
                deleteMask();
                doc.activeLayer = activeSet;
                }
             //copyMask(lSets[i].name);
        } 
    }
};


function getSets(layerSets) {
    var lSets = [];
    for(var i=0; i<layerSets.length; i++) {
        var set = layerSets[i];
        lSets.push(set);
        if (set.layerSets.length > 0) {
            lSets.push.apply(lSets, getSets(set.layerSets));
        }    
    }
    return lSets;    
};


function hasMask(target) {
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desc = executeActionGet(ref);
    return desc.hasKey(charIDToTypeID("UsrM"));
};


function deleteMask() {
    var desc523 = new ActionDescriptor();
    var ref325 = new ActionReference();
    ref325.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc523.putReference( charIDToTypeID('null'), ref325 );
    executeAction( charIDToTypeID('Dlt '), desc523, DialogModes.NO );
};


function copyMask(target) {
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
    ref14.putName( idLyr, target ); //FIXME use ID instead
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
};


function getSetID(target) {
    var oldSel = doc.activeLayer;
    doc.activeLayer = target;
    
    var ref = new ActionReference();   
    ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "LyrI" ));   
    ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );  
    var ret = executeActionGet(ref).getInteger( stringIDToTypeID( "layerID" ) );
    
    doc.activeLayer = oldSel;
    return ret;
};    

// SetClass
function set(ref) {
    this.ref = ref;
}

function set.hasMask() {
    $.writeln('test');
}

// End SetClass
