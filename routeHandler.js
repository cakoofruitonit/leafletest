const map = L.map('map'); 
// Initializes map

map.setView([37.72569410938344, -122.45226657608829], 20); 
// Sets initial coordinates and zoom level
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map); 
// Sets map data source and associates with map

var lMarker, lCircle, zoomed, marker, circleStart, marker1, polyline1, polylineAB, polylineABForADA, polylineAC, polylineACForADA, 
polylineAD, polylineADForADA, polylineAE, polylineAEForADA, polylineSCItoA, polylineBK, polylineCI, polylineDH, polylineEJ,
polylineHG, polylineHI, polylineIF, polylineIL, polylineJH, polylineJO, polylineLM, polylineLtoBATL, polylineMN, polylineMUBtoJ,
polylineNK, polylineGtoART, polylineGtoARTX, polylineOtoSCI, polylineKtoLIBR, polylineBtoCAFE, polylinetest, polylineFP,
polylinePtoJDVL, polylinePtoEHF, polylineKR, polylineQR, polylineBQ, polylineQR, polylineQU, polylineKR, polylineKS, 
polylineStoLIBR, polylineST, polylineTtoAMPH, polylineUV, polylineVtoMUB, polylineAMPHtoWELL, polylineQtoCAFE, polylineFtoVART,
polylineWtoHLTH, polylineGW, polylineRtoSU, polylineMX, polylineXY, polylineYZ, polylineZ_a, polylinea_b, polylinebtoB700,
markerSUElevator, polylineRc, polylinectoSU, polylinec_d, polylinedtoWELL, polylinedtoAMPH, polylineeB, polylineetoCLOUD,
polylineeE, polylineAe, polylineItoART, polylineQe, polylineftoCAFE, polylined_f, polylineXtoBATL, polylinegtoHLTH, polylinegtoJDVL,
polylineJDVL, polylineT_h, polylineh_i, polylinei_j, polylinej_k, polylinek_l, polylineZ_l, polylineEU, polylineE_m, polylineJ_m,
polylineV_m, polylinentoCLOUD, polylineK_n, polylineBATL, polylineN_o, polylineotoCLOUD;
let startlat, startlong;
let destinationlat, destinationlong;
let latitude, longitude;

document.getElementById("walking-btn").classList.add("active");
let wheelchairAssessibilityNeeded = false;

let startingCoordinates = [];
let destinationCoordinates = [];
let directions = [];
let imageLocations = [];

document.getElementById("maps-tab").classList.add('active');
const panoContainer = document.querySelector('.pano-container');
const directionContainer = document.getElementById("typed-direction-container");

let counter = 0;
let size = 0;
const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

var startingPoint = "SCI";
var destination = "MUB";

let shape1 = [
    [37.72558946535073, -122.45063602924347], [37.725560293677326, -122.45059960773112],
    [37.7254690693381, -122.45055803349275],[37.72537572338828, -122.45058083226918],
    [37.72530571384896, -122.45067605068536],[37.725283968447954, -122.45075383474659], 
    [37.72527336093268, -122.45075383474659], [37.72525744965564, -122.450679403447], 
    [37.72520653355138, -122.45062441816296], [37.72518531849814, -122.45062039484986],
    [37.72513705422887, -122.45061435987964], [37.72508242540177, -122.45066867461156], 
    [37.725008172562724, -122.45081619610696], [37.72488636937464, -122.45145120723384], 
    [37.72481070408807, -122.45078626472295], [37.724697977786796, -122.45144280588889]
];

let shape2 = [
    [37.7257029109819, -122.45077517492479],[37.725848116998655, -122.45061048214252], 
    [37.72595454971086, -122.45056354348515], [37.72602827123092, -122.45058567170945],
    [37.72609774971896, -122.45068759565149], [37.726127450426745, -122.450764038608], 
    [37.72615927260198, -122.45067351405393], [37.72620541472955, -122.45063059871009], 
    [37.726277544893094, -122.4506292576056], [37.72633588541714, -122.45067016129327], 
    [37.72639263479101, -122.45082103554972], [37.726489692030945, -122.45146744792082], 
    [37.72658634631661, -122.45080427982603], [37.72672649245709, -122.45148198601615]
];
let AC = shape2.concat([[37.72680311010429, -122.45078517492479]]);
let AD = shape2.concat([[37.72680595642644, -122.45172134374558]]);

let EJ = [
    [37.72464213925238, -122.45174060814374],[37.72471522536498, -122.45188037899639], 
    [37.72479849494462, -122.45196352747524], [37.72457459442172, -122.45205250325165], 
    [37.7248790916372, -122.45214715188555], [37.724541639282165, -122.45225193921242], 
    [37.7256223800879, -122.45226395560371]
];

let shape3 = [
    [37.724594969482396, -122.45077517492479], [37.72447090392019, -122.45077506981772], 
    [37.7244910584166, -122.45051355444272], [37.72452394205446, -122.45032982312472]
];

let BK = shape3.concat([[37.724568494060584, -122.45016218506078], [37.72461320049394, -122.45004282675973], 
    [37.724673509392495, -122.44994626723535],[37.72476206272458, -122.44988591753273]]);

let IL = [
    [37.726927930648294, -122.45080079724654], [37.726911221030966, -122.45071202405849], 
    [37.726949783764695, -122.4505826074732], [37.726936601581744, -122.45048403629178], 
    [37.72692440321325, -122.45041362830577], [37.72688523717416, -122.45028624545753], 
    [37.726827472778304, -122.45020453489546], [37.72676064680028, -122.45005164898112], 
    [37.72669745637407, -122.44994838393367], [37.726605626097915, -122.4498317078415]
];

let MN = [
    [37.72638787552949, -122.44966336901145], [37.72619408096292, -122.44955004859686], 
    [37.72605638579957, -122.44948911531249], [37.72586969526052, -122.44945424659475], 
    [ 37.72583661900278, -122.44944512844087 ], [ 37.725831315285, -122.4495041370392 ], 
    [ 37.725704025944346, -122.44949609041215 ]
]

let NK = [
    [ 37.725704025944346, -122.44949609041215 ], [37.725574600456156, -122.44950592016887], 
    [ 37.72557249339588, -122.44944244623186 ],[37.72545436308979, -122.44945650747626], 
    [37.725340902859266, -122.44948779862958], [37.72529955578054, -122.44955453783082], 
    [37.72506179091299, -122.44963759092536], [37.72476206272458, -122.4498591753273]
]

let MUBtoJ = [
    [37.72534222155596, -122.45297519895082], [37.72545191921251,-122.45297519895082], 
    [37.72545191921251, -122.4525141854476], [37.7256223800879, -122.45251753820871], 
    [37.7256223800879, -122.45226395560371]
]

let PtoJDVL = [
    [37.72802591518471, -122.45080079724654], [37.72795643850786, -122.45090918251088],
    [37.72795643850786, -122.4510895610673], [37.72799621524043, -122.45119953163605],
    [37.72806410081516, -122.45127463348813], [37.7280800575637, -122.45130121707918]
]

let PtoEHF = [
    [37.72802591518471, -122.45080079724654], [37.72824866440335, -122.45080658801605], 
    [37.72825184653033, -122.45042705543909], [37.72812403099609, -122.45042705543909]
]
updateMap();

var selectElement1 = document.getElementById("choose-location1");
var selectElement2 = document.getElementById("choose-location2");
selectElement1.addEventListener('change', ()=> {
    this.setStartAndDestination();
});
selectElement2.addEventListener('change', ()=> {
    this.setStartAndDestination();
});

function onReverseMarkersBtnPressed(){
    var temp = selectElement2.value;
    selectElement2.value = selectElement1.value;
    selectElement1.value = temp;
    this.setStartAndDestination();
}

function onWalkingBtnPressed(){
    this.changeAccessibilityRoute(false, '.accessibility-btn', "walking-btn");
}

function onADABtnPressed(){
    this.changeAccessibilityRoute(true, '.accessibility-btn' , "ada-btn");
}

function changeAccessibilityRoute(needADARoute, btnClass, str){
    const btnClasses = document.querySelectorAll(btnClass);
    btnClasses.forEach(btn => {
        btn.classList.remove("active");
    })
    const btnToSelect = document.getElementById(str);
    btnToSelect.classList.add("active");
    wheelchairAssessibilityNeeded = needADARoute;
    console.log("wheelchairAssessibilityNeeded = " + wheelchairAssessibilityNeeded);
    this.setStartAndDestination();
}

function setStartAndDestination(){
    //var selectElement = document.getElementById("choose-location1");
    //var selectElement1 = document.getElementById("choose-location2");
    startingPoint = selectElement1.options[selectElement1.selectedIndex].value;
    destination = selectElement2.options[selectElement2.selectedIndex].value;

    updateMap();
}
    
function updateMap(){
    
    clearMap();
    
    displayRoute(startingPoint, destination);
    navigator.geolocation.watchPosition(success, error);
    
}

function clearMap(){

    var mapMarkers = [
        marker, circleStart, marker1, polyline1, polylineAB, polylineABForADA, polylineAC, polylineACForADA, 
        polylineAD, polylineADForADA, polylineAE, polylineAEForADA, polylineSCItoA, polylineBK, polylineCI, polylineDH, polylineEJ,
        polylineHG, polylineHI, polylineIF, polylineIL, polylineJH, polylineJO, polylineLM, polylineLtoBATL, polylineMN, polylineMUBtoJ,
        polylineNK, polylineGtoART, polylineGtoARTX, polylineOtoSCI, polylineKtoLIBR, polylineBtoCAFE, polylinetest, polylineFP,
        polylinePtoJDVL, polylinePtoEHF, polylineKR, polylineQR, polylineBQ, polylineQR, polylineQU, polylineQtoCAFE, polylineKR, 
        polylineKS, polylineStoLIBR, polylineST, polylineTtoAMPH, polylineUV, polylineVtoMUB, polylineAMPHtoWELL, polylineFtoVART,
        polylineWtoHLTH, polylineGW, polylineRtoSU, polylineMX, polylineXY, polylineYZ, polylineZ_a, polylinea_b, polylinebtoB700,
        markerSUElevator, polylineRc, polylinectoSU, polylinec_d, polylinedtoWELL, polylinedtoAMPH, polylineeB, polylineetoCLOUD,
        polylineeE, polylineAe, polylineItoART, polylineQe, polylineftoCAFE, polylined_f, polylineXtoBATL, polylinegtoHLTH,
        polylinegtoJDVL, polylineJDVL, polylineT_h, polylineh_i, polylinei_j, polylinej_k, polylinek_l, polylineZ_l, polylineEU,
        polylineE_m, polylineJ_m, polylineV_m, polylineBATL, polylineN_o, polylineotoCLOUD
    ];

    for(var i = 0; i < mapMarkers.length; i++){
        var currentMarker = mapMarkers[i];
        if(currentMarker !== undefined){
            currentMarker.remove();
        }
    }
}

function success(pos) {

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    console.log("latitude: " + lat + " longitude: " + lng);
    const accuracy = pos.coords.accuracy;

    if (lMarker) {
        map.removeLayer(lMarker);
        map.removeLayer(lCircle);
        
    }
    if(polyline1){
        map.removeLayer(polyline1);
    }
    // Removes any existing marker and circule (new ones about to be set)

    lMarker = L.marker([lat, lng]).addTo(map);
    lCircle = L.circle([lat, lng], { radius: accuracy/2 }).addTo(map);
    // Adds marker to the map and a circle for accuracy

    displayUserVector(lat, lng);

    //uncomment for zoom
    /*
    if (!zoomed) {
        zoomed = map.fitBounds([[destinationlat, destinationlong], [lat, lng]]); 
    }
    */
    // Set zoom to boundaries of accuracy circle

    //37.72569410938344, -122.45226657608829
    //calculate the distance bewteen lat lng and destination
    latitude = destinationlat - (destinationlat - lat)/2;
    longitude = destinationlong - (destinationlong - lng)/2;
    // Set map focus to current user position

}

function error(err) {

    if (err.code === 1) {
        console.log("Please allow geolocation access");
    } else {
        console.log("Cannot get current location");
    }
    if (map.hasLayer(lMarker)) {
        map.removeLayer(lMarker);
        map.removeLayer(lCircle);
    }
    if(map.hasLayer(polyline1)){
        map.removeLayer(polyline1);
    }
}

//second arguement:
//false indicates destination
//true indeicates start
function displayMarker(string, type){
    let lat, long, buildingName;
    switch(string){
        case "AMPH-0":
            lat = 37.724102653723;
            long = -122.44991155889541;
            buildingName = "Amphitheater Plaza";
            break;
        case "ART-0":
            lat = 37.72711687806445; 
            long = -122.4515670166594;
            buildingName = "Creative Arts Building";
            break;
        case "ART-1":
            lat = 37.72713601841314; 
            long = -122.45084792375566;
            buildingName = "Creative Arts Building";
            break;
        case "ARTX-0": 
            lat = 37.72711687806445;
            long = -122.45179031055791;
            buildingName = "Creative Arts Extension Building";
            break;
        case "BATL-0":
            lat = 37.72675835905989; 
            long = -122.44931324533881;
            buildingName = "Batmale Hall";
            break;
        case "BATL-1": 
            lat = 37.72678809982633;
            long = -122.44915679097177;
            buildingName = "Batmale Hall";
            break;
        case "B700-0":
            lat = 37.72677643179663;
            long = -122.44741737842561;
            buildingName = "Bungalows 701 - 716";
            break;
        case "CAFE-0":
            lat = 37.72400257075262;
            long = -122.45083048939706;
            buildingName = "Cafeteria";
            break;
        case "CLOUD-0":
            lat = 37.72551521301948;
            long = -122.45030745863917;
            buildingName = "Cloud Hall";
            break;
        case "CLOUD-1":
            lat = 37.72507394048661;
            long = -122.45023503899577;
            buildingName = "Cloud Hall";
            break;
        case "CLOUD-2":
            lat = 37.72541656337853;
            long = -122.45007812976839;
            buildingName = "Cloud Hall";
            break;
        case "EHF-0":
            lat = 37.72812403099609;
            long = -122.45042705543909;
            buildingName = "Floristry / Horticulture Center";
            break;
        case "HLTH-0":
            lat = 37.727550825413836;
            long = -122.45204494422353;
            buildingName = "Student Health Center";
            break;
        case "HLTH-1":  
            lat = 37.72763561815933;
            long = -122.45190605521205;
            buildingName = "Student Health Center";
            break;
        case "JDVL-0":
            lat = 37.7280800575637;
            long = -122.45130121707918;
            buildingName = "Judson Village";
            break;
        case "JDVL-1": 
            lat = 37.72806414689119;
            long = -122.45180279016496;
            buildingName = "Judson Village";
            break;
        case "LIBR-0":
            lat = 37.72476206272458;
            long = -122.44962644354963;
            buildingName = "Rosenburg Library";
            break;
        case "MUB-0":
            lat = 37.72534222155596;
            long = -122.45297519895082;
            buildingName = "Multi-Use Building";
            break;
        case "MUB-1":
            lat = 37.724430792066286;
            long = -122.45297519895082;
            buildingName = "Multi-Use Building";
            break;
        case "SCI-0":
            lat = 37.7257029109819;
            long = -122.45106814833785;
            buildingName = "Science Building";
            break;
        case "SCI-1":
            lat = 37.7257028758774;
            long = -122.45122442674977;
            buildingName = "Science Building";
            break;
        case "SCI-2": 
            lat = 37.725733825219024; 
            long = -122.45106537623089;
            buildingName = "Science Building";
            break;
        case "SU-0":
            lat = 37.724230844579436;
            long = -122.45032982312472;
            buildingName = "Student Union";
            break;
        case "VART-0":
            lat = 37.72723245488745;
            long = -122.45044357153154;
            buildingName = "Visual Arts Building";
            break;
        case "VART-1":
            lat = 37.72706414140307;
            long = -122.450170803117;
            buildingName = "Visual Arts Building";
            break;
        case "WELL-0":
            lat = 37.72391542787471;
            long = -122.44988004293974;
            buildingName = "Wellness Center";
            break;
        default:
            console.log("Could not find node " + string);
            break;
    }
    if(type === "start"){
        startlat = lat;
        startlong = long;
        //console.log(map.getZoom());
        marker = L.marker([startlat, startlong], {
            rotationOrigin: 45
        }).addTo(map).bindPopup("<h1>" + buildingName + "<\h1>");
        //circleStart = L.circle([startlat, startlong], {radius: 3, color: "black"}).addTo(map);
    } else if(type === "destination"){
        destinationlat = lat;
        destinationlong = long;
        marker1 = L.marker([destinationlat, destinationlong]).addTo(map).bindPopup("<h1>" + buildingName + "<\h1>");
        marker1._icon.classList.add("huechange");
    } else {
        destinationlat = lat;
        destinationlong = long;
        marker1 = L.marker([destinationlat, destinationlong], {color: 'red'}).addTo(map);
    }
}

function displayUserVector(lat, lng){
    /*if(lat > 37.728380525319494 || lat < 37.72338230493978 || lng > -122.44651955791487 || lng < -122.45551032250923){
        const entrances = [
            {
                lat1: 37.723665454003175, 
                long1: -122.44973690637808
            }
        ]
        let closestVectorIndex;
        var smallestDistance = 300;
        for(var i = 0; i < entrances.length; i++){
            const distance = Math.sqrt((entrances[i].lat1 - lat)**2 + (entrances[i].long1 - lng)**2);
            if(distance < smallestDistance){
                closestVectorIndex = i;
                smallestDistance = distance;
            }
        }
        polyline = L.polyline([[entrances[closestVectorIndex].lat1, entrances[closestVectorIndex].long1], [lat, lng]], {color: 'black', weight: 6}).addTo(map);
    }*/
    
    //polyline = L.polyline([[destinationlat, destinationlong], [lat, lng]], {color: 'black', weight: 6}).addTo(map);
}

function displayRoute(start, end){
    //37.728380525319494, -122.44651955791487
    //37.72338230493978, -122.45551032250923
    if(start !== end){
        var graph = new WeightedGraph();
        graph.addVertex("A");
        graph.addVertex("B");
        graph.addVertex("C");
        graph.addVertex("D");
        graph.addVertex("E");
        graph.addVertex("F");
        graph.addVertex("G");
        graph.addVertex("H");
        graph.addVertex("I");
        graph.addVertex("J");
        graph.addVertex("K");
        graph.addVertex("L");
        graph.addVertex("M");
        graph.addVertex("N");
        graph.addVertex("O");
        graph.addVertex("P");
        graph.addVertex("Q");
        graph.addVertex("R");
        graph.addVertex("S");
        graph.addVertex("T");
        graph.addVertex("U");
        graph.addVertex("V");
        graph.addVertex("W");
        graph.addVertex("X");
        graph.addVertex("Y");
        graph.addVertex("Z");
        graph.addVertex("a");
        graph.addVertex("b");
        graph.addVertex("c");
        graph.addVertex("d");
        graph.addVertex("e");
        graph.addVertex("f");
        graph.addVertex("g");
        graph.addVertex("h");
        graph.addVertex("i");
        graph.addVertex("j");
        graph.addVertex("k");
        graph.addVertex("l");
        graph.addVertex("m");
        graph.addVertex("n");
        graph.addVertex("o");
        graph.addVertex("AMPH-0");
        graph.addVertex("ART-0");
        graph.addVertex("ART-1");
        graph.addVertex("ARTX-0");
        graph.addVertex("BATL-0");
        graph.addVertex("BATL-1");
        graph.addVertex("B700-0")
        graph.addVertex("CAFE-0");
        graph.addVertex("CLOUD-0");
        graph.addVertex("CLOUD-1");
        graph.addVertex("CLOUD-2");
        graph.addVertex("EHF-0");
        graph.addVertex("HLTH-0");
        graph.addVertex("HLTH-1");
        graph.addVertex("JDVL-0");
        graph.addVertex("JDVL-1");
        graph.addVertex("LIBR-0");
        graph.addVertex("MUB-0");
        graph.addVertex("MUB-1");
        graph.addVertex("SCI-0");
        graph.addVertex("SCI-1");
        graph.addVertex("SCI-2");
        graph.addVertex("SU-0");
        graph.addVertex("VART-0");
        graph.addVertex("WELL-0");

        if(wheelchairAssessibilityNeeded){
            //graph.addEdge("A", "B", 1110);
            graph.addEdge("A", "C", 1110);
            graph.addEdge("A", "D", 1010);
            //graph.addEdge("A", "E", 1010);
            graph.addEdge("Y", "Z", 185);
            graph.addEdge("g", "HLTH-1", 130);
        } else {
            graph.addEdge("A", "B", 400);
            graph.addEdge("A", "C", 400);
            graph.addEdge("A", "D", 592);
            graph.addEdge("A", "E", 614);
            graph.addEdge("A", "SCI-0", 40);
            graph.addEdge("J", "O", 240);
            graph.addEdge("M", "X", 250);
            graph.addEdge("O", "SCI-1", 80);
            graph.addEdge("S", "T", 110);
            graph.addEdge("U", "V", 210);
            graph.addEdge("Y", "Z", 45);
            graph.addEdge("d", "f", 230);
            graph.addEdge("g", "HLTH-1", 75);
        }
        //For All
        graph.addEdge("A", "SCI-2", 130);
        graph.addEdge("A", "e", 50);
        graph.addEdge("B", "Q", 35);
        graph.addEdge("C", "I", 50);
        graph.addEdge("D", "H", 50);
        graph.addEdge("E", "U", 65);
        graph.addEdge("E", "m", 400);
        graph.addEdge("F", "I", 125);
        graph.addEdge("F", "P", 250);
        graph.addEdge("F", "VART-0", 80);
        graph.addEdge("G", "ART-0", 40);
        graph.addEdge("G", "ARTX-0", 30);
        graph.addEdge("G", "H", 65);
        graph.addEdge("G", "W", 120);
        graph.addEdge("H", "I", 265);
        graph.addEdge("I", "L", 300);
        graph.addEdge("I", "ART-1", 75);
        graph.addEdge("J", "H", 600);
        graph.addEdge("J", "m", 400);
        graph.addEdge("J", "MUB-0", 310);
        graph.addEdge("K", "N", 390);
        graph.addEdge("K", "R", 140);
        graph.addEdge("K", "S", 40);
        graph.addEdge("K", "n", 40);
        graph.addEdge("L", "M", 100);
        graph.addEdge("L", "BATL-0", 200);
        graph.addEdge("M", "N", 260);
        graph.addEdge("N", "o", 40);
        graph.addEdge("P", "EHF-0", 245);
        graph.addEdge("P", "JDVL-0", 165);
        graph.addEdge("Q", "R", 130);
        graph.addEdge("Q", "U", 280);
        //graph.addEdge("Q", "CAFE-0", 205);
        //graph.addEdge("R", "SU-0", 100);
        graph.addEdge("Q", "f", 185);
        graph.addEdge("R", "c", 90);
        graph.addEdge("S", "LIBR-0", 15);
        graph.addEdge("T", "h", 360);
        graph.addEdge("T", "AMPH-0", 130);
        graph.addEdge("V", "m", 150);
        graph.addEdge("V", "MUB-1", 310);
        graph.addEdge("W", "HLTH-0", 120);
        graph.addEdge("X", "Y", 225);
        graph.addEdge("X", "BATL-1", 140);
        graph.addEdge("Z", "a", 75);
        graph.addEdge("Z", "l", 170);
        graph.addEdge("a", "b", 45);
        graph.addEdge("b", "B700-0", 145);
        graph.addEdge("c", "SU-0", 10);
        //+1000 for elevator
        graph.addEdge("c", "d", 1500);
        graph.addEdge("d", "AMPH-0", 40);
        graph.addEdge("d", "WELL-0", 40);
        graph.addEdge("e", "B", 1060);
        graph.addEdge("e", "E", 960);
        graph.addEdge("e", "CLOUD-0", 60);
        graph.addEdge("f", "CAFE-0", 20);
        graph.addEdge("g", "JDVL-1", 120);
        graph.addEdge("h", "i", 380);
        graph.addEdge("i", "j", 145);
        graph.addEdge("j", "k", 65);
        graph.addEdge("k", "l", 30);
        graph.addEdge("n", "CLOUD-1", 125);
        graph.addEdge("o", "CLOUD-2", 225);
        graph.addEdge("AMPH-0", "WELL-0", 80);
        graph.addEdge("BATL-0", "BATL-1", 120);
        graph.addEdge("JDVL-1", "JDVL-0", 140);

        const route = graph.Dijkstra(start, end);
        let listOfAdjacencyNodes = [];
        
        /*
        for(var i = route.length - 1; i > 0; i--){
            let newAdjacencyNode = route[i] + route[i-1];
            listOfAdjacencyNodes.push(newAdjacencyNode);
            displayEdge(route[i], route[i-1]);
        }
        */
        
        for(var i = 0; i < route.length - 1; i++){
            let newAdjacencyNode = route[i] + route[i+1];
            listOfAdjacencyNodes.push(newAdjacencyNode);
            displayEdge(route[i], route[i+1]);
        }
        
        displayMarker(graph.getStart(), "start");
        displayMarker(graph.getFinish(), "destination");

        //empties all the directions
        directions = [];
        imageLocations = [];
        directionsHandler(listOfAdjacencyNodes);

        console.log(document.getElementById("directions-tab").classList.contains("active"));
        if(document.getElementById("directions-tab").classList.contains("active")){
            this.addSetOfDirectionsAndImage();
        }
    } else {
        alert("You must choose a different starting point and destination");
    }
}

/*
* Function displayEdge etermines which edges needs to be displayed
*/
function displayEdge(node1, node2){
    switch(true){
        case node1 === "A" && node2 === "B":
            if (wheelchairAssessibilityNeeded) {
                let AB = shape1.concat([[37.724594969482396, -122.45077517492479]]);
                polylineABForADA = L.polyline(AB, {color: 'blue', weight: 6}).addTo(map);
            } else { 
                polylineAB = L.polyline([[37.7257029109819, -122.45077517492479],[37.724594969482396, -122.45077517492479]], {color: 'red', weight: 6}).addTo(map);
            }
            break;
        case node1 === "A" && node2 === "C":
            if (wheelchairAssessibilityNeeded) {
                polylineACForADA = L.polyline(AC, {color: 'blue', weight: 6}).addTo(map);
            } else { 
                polylineAC = L.polyline([[37.7257029109819, -122.45077517492479],[37.72680311010429, -122.45078517492479]], {color: 'red', weight: 6}).addTo(map);
            }
            break;
        case node1 === "A" && node2 === "D":
            if (wheelchairAssessibilityNeeded) {
                polylineADForADA = L.polyline(AD, {color: 'blue', weight: 6}).addTo(map);
            } else { 
                polylineAD = L.polyline([[37.7257029109819, -122.45077517492479],[37.72657487092926, -122.45077517492479], [37.72680595642644, -122.45172134374558]], {color: 'red', weight: 6}).addTo(map);
            }
            break;
        case node1 === "A" && node2 === "E":
            if (wheelchairAssessibilityNeeded) {
                let AE = shape1.concat([[37.72464213925238, -122.45174060814374]]);
                polylineAEForADA = L.polyline(AE, {color: 'blue', weight: 6}).addTo(map);
            } else { 
                polylineAE = L.polyline([[37.7257029109819, -122.45077517492479],[37.72479962250000, -122.45077517492479], [37.72464213925238, -122.45174060814374]], {color: 'red', weight: 6}).addTo(map);
            }
            break;
        case node1 === "A" && node2 === "e": 
            polylineAe = L.polyline([[37.7257029109819, -122.45077517492479], [37.72558946535073, -122.45063602924347]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "A" && node2 === "SCI-0":
            if (wheelchairAssessibilityNeeded) {
                console.log("Does not exist");
            } else { 
                polylineSCItoA = L.polyline([[37.7257029109819, -122.45106814833785], [37.7257029109819, -122.45077517492479]], {color: 'red', weight: 6}).addTo(map);
            }
            break;
        case node1 === "A" && node2 === "SCI-2":
            if(wheelchairAssessibilityNeeded){
                polylineSCItoA = L.polyline([[37.725733825219024, -122.45106537623089], [37.72573488596401, -122.45094870013874], 
                    [37.72571897478768, -122.45094870013874], [37.72571579255201, -122.45103453082722],
                    [37.7257029109819, -122.45103453082722], [37.7257029109819, -122.45077517492479]
                ], {color: 'blue', weight: 6}).addTo(map);
            }
            break;
        case node1 === "B" && node2 === "Q":
            polylineBQ = L.polyline([[37.724594969482396, -122.45077517492479], [37.72447090392019, -122.45077506981772]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "B" && node2 === "K":
            polylineBK = L.polyline(BK, {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "B" && node2 === "CAFE-0":
            polylineBtoCAFE = L.polyline([[37.724594969482396, -122.45077517492479], [37.72395165948694, -122.45077517492479],[37.72395165948694, -122.45081165013444]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "C" && node2 === "I":
            polylineCI = L.polyline([[37.72680311010429, -122.45078517492479], [37.726927930648294, -122.45080079724654]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "D" && node2 === "H":
            polylineDH = L.polyline([[37.72680595642644, -122.45172134374558], [37.726920384869686, -122.45171562000382]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "E"  && node2 === "J":
            polylineEJ = L.polyline(EJ, {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "E" && node2 === "U":
            polylineEU = L.polyline([[37.72464213925238, -122.45174060814374], [ 37.7246019032562, -122.45170488953592 ],
                [37.72447090392019, -122.45175259331734]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "E" && node2 === "m":
            //J = [37.7256223800879, -122.45226395560371]
            polylineE_m = L.polyline([[37.72464213925238, -122.45174060814374],[37.72471522536498, -122.45188037899639], 
                [37.72479849494462, -122.45196352747524], [37.72457459442172, -122.45205250325165], 
                [37.7248790916372, -122.45214715188555], [37.724541639282165, -122.45225193921242]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "F" && node2 === "I":
            polylineIF = L.polyline([[37.726927930648294, -122.45080079724654], [ 37.72695145204931, -122.45084926486015 ], 
                [ 37.72723254431681, -122.45084926486015 ] , [37.72723245488745, -122.45079724516542]], {color: 'blue', weight: 6}).addTo(map);        
            break;
        case node1 === "F" && node2 === "P":
            polylineFP = L.polyline([[37.72723245488745, -122.45079724516542], [37.72802591518471, -122.45080079724654]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "F" && node2 === "VART-0":
            polylineFtoVART = L.polyline([[37.72723245488745, -122.45079724516542], [37.72723245488745, -122.45044357153154]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "G" && node2 === "H":
            polylineHG = L.polyline([[37.726920384869686, -122.45171562000382], [37.72711687806445, -122.4517118510434]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "G" && node2 === "W":
            polylineGW = L.polyline([[37.72711687806445, -122.4517118510434], [37.727133349554386, -122.45179144486204], [37.727394287428424, -122.45191884978509]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "G" && node2 === "ART-0":
            polylineGtoART = L.polyline([[37.72711687806445, -122.4517118510434], [37.72711687806445, -122.4515670166594]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "G" && node2 === "ARTX-0":
            polylineGtoARTX = L.polyline([[37.72711687806445, -122.4517118510434], [37.72711687806445, -122.45179031055791]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "H" && node2 === "I": 
            polylineHI = L.polyline([[37.726920384869686, -122.45171562000382], [37.726927930648294, -122.45080079724654]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "I" && node2 === "L":
            polylineIL = L.polyline(IL, {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "I" && node2 === "ART-1":
            polylineItoART = L.polyline([[37.726927930648294, -122.45080079724654], [37.72713601841314, -122.45080079724654], 
                [37.72713601841314, -122.45084792375566]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "J" && node2 === "H":
            polylineJH = L.polyline([[37.7256223800879, -122.45226395560371], [37.726794033346096, -122.45225198492271], [37.72688101313737, -122.45199851617306], [37.726920384869686, -122.45171562000382]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "J" && node2 === "O":
            if(wheelchairAssessibilityNeeded){
                console.log("To be added");
            } else {
                polylineJO = L.polyline([[37.7256223800879, -122.45226395560371],[37.7257028758774, -122.45149193737093]], {color: 'red', weight: 6}).addTo(map);
            }
            break;
        case node1 === "J" && node2 === "m":
            polylineJ_m = L.polyline([[37.7256223800879, -122.45226395560371], [37.724541639282165, -122.45225193921242]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "J" && node2 === "MUB-0":
            //polylineMUBtoJ = L.polyline(MUBtoJ, {color: 'blue', weight: 6}).addTo(map);
            polylinetest = L.layerGroup().addLayer(L.polyline(MUBtoJ, {color: 'blue', weight: 6})).addTo(map);
            break;
        case node1 === "K" && node2 === "N":
            polylineNK = L.polyline(NK, {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "K" && node2 === "LIBR-0":
            polylineKtoLIBR = L.polyline([[37.72476206272458, -122.4498591753273], [37.72476206272458, -122.44962644354963]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "K" && node2 === "R":
            polylineKR = L.polyline([[37.72452394205446, -122.45032982312472], [37.724568494060584, -122.45016218506078], [37.72461320049394, -122.45004282675973], 
                [37.724673509392495, -122.44994626723535],[37.72476206272458, -122.4498591753273]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "K" && node2 === "S":
            polylineKS = L.polyline([[37.72476206272458, -122.4498591753273], [37.72476206272458, -122.44976129961127]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "K" && node2 === "n":
            polylineK_n = L.polyline([[37.72476206272458, -122.4498591753273], [ 37.724751470434576, -122.44993999600412 ],
                [37.72479496154325, -122.44999900460245]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "L" && node2 === "M":
            polylineLM = L.polyline([[37.726605626097915, -122.4498317078415], [37.726515518135476, -122.44975430348917], [37.72638787552949, -122.44966336901145]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "L" && node2 === "BATL-0":
            polylineLtoBATL = L.polyline([[37.726605626097915, -122.4498317078415], [37.72675729832949, -122.44975580982445], [37.72675835905989, -122.44931324533881]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "M" && node2 === "N":
            polylineMN = L.polyline(MN, {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "M" && node2 === "X":
            polylineMX = L.polyline([ [ 37.72638787552949, -122.44966336901145 ], [ 37.72642712273711, -122.44952121193366 ],
                [ 37.726347567564844, -122.44945415670828 ], [ 37.72632243794053, -122.44940087199214 ], 
                [ 37.72631317062824, -122.44934284503415 ], [ 37.72633377799296, -122.44923555667359 ], 
                [ 37.72640802950358, -122.44915240819412 ], [ 37.72647758461088, -122.44911753947693 ], 
                [ 37.72652536639427, -122.44899183515828 ] ], {color: 'red', weight: 6}).addTo(map);
            break;
        case node1 === "N" && node2 === "o":
            polylineN_o = L.polyline([[ 37.725704025944346, -122.44949609041215 ], [ 37.72570084370802, -122.44960203766824 ]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "O" && node2 === "SCI-1":
            polylineOtoSCI = L.polyline([[37.7257028758774, -122.45149193737093], [37.7257028758774, -122.45122442674977]], {color: 'red', weight: 6}).addTo(map);
            break;
        case node1 === "P" && node2 === "JDVL-0":
            polylinePtoJDVL = L.polyline(PtoJDVL, {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "P" && node2 === "EHF-0":
            polylinePtoEHF = L.polyline(PtoEHF, {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "Q" && node2 === "R":
            polylineQR = L.polyline([[37.72447090392019, -122.45077506981772], [37.7244910584166, -122.45051355444272], [37.72452394205446, -122.45032982312472]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "Q" && node2 === "U":
            polylineQU = L.polyline([[37.72447090392019, -122.45077506981772], [37.72447090392019, -122.45175259331734]], {color: 'blue', weight: 6}).addTo(map);
            break;
        //remove
        case node1 === "Q" && node2 === "CAFE-0":
            polylineQtoCAFE = L.polyline([[37.72447090392019, -122.45077506981772], [37.72400257075262, -122.45077506981772], [37.72400257075262, -122.45083048939706]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "Q" && node2 === "f":
            polylineQe = L.polyline([[37.72447090392019, -122.45077506981772], [37.72400257075262, -122.45077506981772]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "R" && node2 === "SU-0":
            polylineRtoSU = L.polyline([[37.72452394205446, -122.45032982312472], [37.724230844579436, -122.45032982312472]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "R" && node2 === "c":
            polylineRc = L.polyline([[37.72452394205446, -122.45032982312472], [37.724260844579436, -122.45032982312472]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "S" && node2 === "T":
            polylineST = L.polyline([[37.72476206272458, -122.44976129961127], [37.72441629003369, -122.44976129961127]], {color: 'red', weight: 6}).addTo(map);
            break;
        case node1 === "S" && node2 === "LIBR-0":
            polylineStoLIBR = L.polyline([[37.72476206272458, -122.44976129961127], [37.72476206272458, -122.44962644354963]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "T" && node2 === "AMPH-0":
            polylineTtoAMPH = L.polyline([[37.72441629003369, -122.44976129961127], [37.724102653723, -122.44991155889541]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "T" && node2 === "h":
            polylineT_h = L.polyline([[37.72441629003369, -122.44976129961127], [ 37.72443642432393, -122.44897440075876 ],
                [ 37.72446718646111, -122.44893014431001 ], [ 37.72450007011088, -122.44891941547395 ],
                [ 37.72453083222162, -122.44892477989198 ], [ 37.72455416898678, -122.44893014431001 ],
                [ 37.72466767042149, -122.44893014431001 ], [ 37.724785414716706, -122.44892746210101 ] ], {color: 'blue', weight: 6}).addTo(map);    
            break;
        case node1 === "U" && node2 === "V":
            polylineUV = L.polyline([[37.72447090392019, -122.45175259331734], [37.724483548933065, -122.45191526245611],
                [37.72421729696977, -122.45225992631322], [37.72413243558602, -122.45225992631322]], {color: 'red', weight: 6}).addTo(map);
            break;
        case node1 === "V" && node2 === "m":
            polylineV_m = L.polyline([[37.72413243558602, -122.45225992631322], [37.724541639282165, -122.45225193921242]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "V" && node2 === "MUB-1":
            polylineVtoMUB = L.polyline([[37.72413243558602, -122.45225992631322], [37.72413243558602, -122.45274624769276],
                [37.724330019437275, -122.45274624769276], [37.724330019437275, -122.45297519895082], 
                [37.724430792066286, -122.45297519895082]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "W" && node2 === "HLTH-0":
            polylineWtoHLTH = L.polyline([[37.727394287428424, -122.45191884978509], [37.72744672334469, -122.45191884978509],
                [37.72744672334469, -122.45204494422353], [37.727550825413836, -122.45204494422353]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "X" && node2 === "Y":
            polylineXY = L.polyline([ [ 37.72652536639427, -122.44899183515828 ], [ 37.726545192283105, -122.44890868663789 ], 
                [ 37.726544131549716, -122.44822204113008 ] ], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "X" && node2 === "BATL-1":
            polylineXtoBATL = L.polyline([ [37.72652536639427, -122.44899183515828], [ 37.72647094091001, -122.44913130998613 ], 
                [ 37.72678916055623, -122.44913801550868 ], [37.72678809982633, -122.44915679097177]], {color: 'blue', weight: 6, dashArray: '8, 8'}).addTo(map);        
            break;
        case node1 === "Y" && node2 === "Z":
            if(!wheelchairAssessibilityNeeded){
                polylineYZ = L.polyline([[37.726544131549716, -122.44822204113008], [37.72654094934947, -122.44807586073878]], {color: 'red', weight: 6}).addTo(map);
            } else {
                polylineYZForADA = L.polyline([[37.726544131549716, -122.44822204113008],[ 37.72630016246942, -122.44814157485963 ],
                    [ 37.72630016246942, -122.44811475276948 ], [37.72654094934947, -122.44807586073878]], {color: 'blue', weight: 6}).addTo(map);
            }
            break;
        case node1 === "Z" && node2 === "a":
            polylineZ_a = L.polyline([[37.72654094934947, -122.44807586073878], [ 37.72672763819789, -122.44807049632072 ],
                [ 37.72672763819789, -122.4480463564396 ]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "Z" && node2 === "l":
            polylineZ_l = L.polyline([[37.72654094934947, -122.44807586073878], [ 37.72650594513802, -122.44804099202157 ],
                [37.726104986626545, -122.44803696870805]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "a" && node2 === "b":
            polylinea_b = L.polyline([[37.72672763819789, -122.4480463564396], [37.726729759659364, -122.44789212942125]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "b" && node2 === "B700-0":
            polylinebtoB700 = L.polyline([[37.726729759659364, -122.44789212942125], [ 37.7267329418515, -122.44757428765298 ], 
                [ 37.726757338653115, -122.44757428765298 ], [ 37.726757338653115, -122.44744822382927 ], 
                [ 37.72677643179663, -122.44744822382927 ], [ 37.72677643179663, -122.44741737842561 ]
            ], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "c" && node2 === "d":
            polylinec_d = L.polyline([[37.724260844579436, -122.45032982312472], [ 37.724260844579436, -122.45021358132365 ],
                [37.72417404088113, -122.45017202679541], [ 37.72414365299964, -122.45018944144252 ],
                [ 37.72414365299964, -122.45014384388925 ], [ 37.72417653679302, -122.45011568069458 ],
                [ 37.72417441525842, -122.45008751749995 ], [ 37.72413198455329, -122.45010361075404 ],
                [ 37.72408318921237, -122.4500995874405 ], [ 37.72404181922424, -122.45007410645486 ],
                [ 37.724004692292155, -122.45001778006554 ], [ 37.72398878074413, -122.44998157024385 ] ], {color: 'blue', weight: 6}).addTo(map);    
            this.displaySUElevator();
            break;
        case node1 === "c" && node2 === "SU-0":
            polylinectoSU = L.polyline([[37.724260844579436, -122.45032982312472], [37.724230844579436, -122.45032982312472]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "d" && node2 === "f":
            polylined_f = L.polyline([[37.72398878074413, -122.44998157024385], [ 37.723937863767475, -122.45013177394868 ], 
                [ 37.72400150998282, -122.4504402279854 ], [ 37.72400150998282, -122.45053678750993 ],
                [37.72400257075262, -122.45077506981772]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "d" && node2 === "AMPH-0":
            polylinedtoAMPH = L.polyline([[37.72398878074413, -122.44998157024385], [37.724102653723, -122.44991155889541]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "d" && node2 === "WELL-0":
            polylinedtoAMPH = L.polyline([[37.72398878074413, -122.44998157024385], [37.72391542787471, -122.44988004293974]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "e" && node2 === "B":
            let eB = shape1.concat([[37.724594969482396, -122.45077517492479]]);
            polylineeB = L.polyline(eB, {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "e" && node2 === "E":
            let eE = shape1.concat([[37.72464213925238, -122.45174060814374]]);
            polylineeE = L.polyline(eE, {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "e" && node2 === "CLOUD-0":
            polylineetoCLOUD = L.polyline([[ 37.72558946535073, -122.45063602924347 ], [ 37.72551521301948, -122.45030745863917 ]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "f" && node2 === "CAFE-0":
            polylineftoCAFE = L.polyline([[37.72400257075262, -122.45077506981772], [37.72400257075262, -122.45083048939706]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "g" && node2 === "HLTH-1":
            if(wheelchairAssessibilityNeeded){
                polylinegtoHLTH = L.polyline([[37.72766213609839, -122.4517773091793], [ 37.72766213609839, -122.45180413126948 ],
                    [ 37.72772896126267, -122.45180547237398 ], [ 37.727727900546235, -122.45189264416696 ], 
                    [ 37.72763561815933, -122.45188862085344 ], [37.72763561815933, -122.45190605521205]], {color: 'blue', weight: 6}).addTo(map);
            } else {
                polylinegtoHLTH = L.polyline([[37.72766213609839, -122.4517773091793], [ 37.72763561815933, -122.45188862085344 ], 
                    [37.72763561815933, -122.45190605521205]], {color: 'red', weight: 6}).addTo(map);  
            }
            break;
        case node1 === "g" && node2 === "JDVL-1":
            polylinegtoJDVL = L.polyline([ [37.72766213609839, -122.4517773091793],[ 37.72776396489607, -122.45177865028383 ], 
                [ 37.72793367924775, -122.45184302330019 ], [ 37.72802171841449, -122.45184302330019 ],
                [ 37.72806414689119, -122.45180279016496 ] ], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "h" && node2 === "i":
            polylineh_i = L.polyline([ [ 37.724785414716706, -122.44892746210101 ], [ 37.72486178929459, -122.44884431362154 ],
                [ 37.724874518383245, -122.44842857122424 ], [ 37.72491482714956, -122.44830384850503 ],
                [ 37.724960439674476, -122.44822606444362 ], [ 37.72503151029681, -122.44816169142726 ], 
                [ 37.72509303406408, -122.44811207056047 ], [ 37.72531367060228, -122.44805574417116 ] ], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "i" && node2 === "j":
            polylinei_j = L.polyline([[37.72531367060228, -122.44805574417116], [ 37.72541656337853, -122.44794443249705 ],
                [ 37.725486572814674, -122.44794711470604 ], [ 37.72548551206615, -122.44789615273477 ],
                [ 37.725647806415935, -122.44789481163026 ] ], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "j" && node2 === "k":
            polylinej_k = L.polyline([ [ 37.725647806415935, -122.44789481163026 ], [ 37.7258270723105, -122.44789347052574 ],
                [ 37.7258270723105, -122.44796857237816 ], [ 37.72602437036745, -122.44796857237816 ] ], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "k" && node2 === "l":
            polylinek_l = L.polyline([[37.72602437036745, -122.44796857237816], [ 37.726104986626545, -122.44803696870805 ]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "n" && node2 === "CLOUD-1":
            polylinentoCLOUD = L.polyline([ [ 37.72479496154325, -122.44999900460245 ], [ 37.72496786496657, -122.45020553469658 ], 
                [ 37.725019841990374, -122.45018675923349 ],[ 37.725037874826846, -122.45025247335435 ], 
                [ 37.72507394048661, -122.45023503899577 ]], {color: 'red', weight: 6}).addTo(map);
            break;
        case node1 === "o" && node2 === "CLOUD-2":
            polylineotoCLOUD = L.polyline([[37.72570084370802, -122.44960203766824], [ 37.72564886716214, -122.44961678981782 ],
                [ 37.72533382486868, -122.44999900460245 ], [ 37.72534337162453, -122.45004862546922 ],
                [ 37.725401712883574, -122.4500231444836 ], [37.72541656337853, -122.45007812976839]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "AMPH-0" && node2 === "WELL-0":
            polylineAMPHtoWELL = L.polyline([[37.724102653723, -122.44991155889541], [37.72391542787471, -122.44988004293974]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "BATL-1" && node2 === "BATL-0":
            polylineBATL = L.polyline([ [37.72675835905989, -122.44931324533881], [ 37.72689311201102, -122.44931638240816 ],
                [ 37.72689311201102, -122.44925200939178 ], [ 37.7268252253632, -122.4492667615414 ], 
                [ 37.726785978366514, -122.44925737380983 ], [ 37.72678809982633, -122.44915679097177 ] ], {color: 'blue', weight: 6, dashArray: '8, 8'}).addTo(map);
            displayBATLElevator();
            break;
        case node1 === "JDVL-1" && node2 === "JDVL-0":
            polylineJDVL = L.polyline([[37.72806414689119, -122.45180279016496], [ 37.72808111827507, -122.45172634720804 ], 
                [ 37.7280800575637, -122.45133206248286 ], [ 37.7280800575637, -122.45130121707918 ]], {color: 'blue', weight: 6}).addTo(map);
            break;
        default:
            displayEdge(node2, node1);
            break;
    }
}
function directionsHandler(list){
    
    fetch("resources/path.json")
    .then(response => response.json())
    .then(data => {
        list.forEach(listElement => {
            console.log(listElement);
            if(listElement in data){
                const key = data[listElement];
                let text = [];
                let urls = [];
                if("ForAll" in key){
                    text = key["ForAll"];
                    urls = key["imageForAll"];
                } else if("Walking" in key && !wheelchairAssessibilityNeeded){
                    text = key["Walking"];
                    urls = key["imageWalking"];
                } else if("ADA" in key){
                    text = key["ADA"];
                    urls = key["imageADA"];
                } else {
                    console.log("No info avaliable on this node");
                }
                directions.push(text);
                imageLocations.push(urls);
            } else {
                console.log("Nodes " + listElement + " does not exist.");
            }
        });
    })
}
console.log(directions);
console.log(imageLocations);

tabs.forEach(tab => {
    tab.addEventListener('click', ()=> {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach(element => {
            element.classList.remove('active');
        });
        target.classList.add('active');
        this.addSetOfDirectionsAndImage();

        tabs.forEach(element => {
            element.classList.remove('active');
        });
        tab.classList.add('active');
        
    })
});

function addSetOfDirectionsAndImage(){

    if(panoContainer.innerHTML === ""){
        //viewer.add(panorama);
    }

    if(document.getElementById("directions-1") !== null){
        this.clearDirections("directions");
    } else {
        console.log("Set of directions does not exist ATM!");
    }

    size = 0;
    setTimeout( ()=> {
        directions.forEach(text => {
            console.log("Written directions are being added!");
            directionContainer.innerHTML += '<span id="directions-' + size + '" class="written-direction">'+ text + '\n</span>';
            if(size % 2 !== 0){
                document.getElementById("directions-" + size).classList.add('gray');
            }
            size++;
        });
        const writtenDirections = document.querySelectorAll(".written-direction");
        writtenDirections.forEach(direction => {
            direction.addEventListener('click', ()=> {
                this.removeDirectionFormatting();
                const valueString = direction.id.split("-")[1];
                const value = parseFloat(valueString);
                this.changeSelectedDirection(value);
            });
        });
        this.changeSelectedDirection(0);
    }, 100);
}

function onUpBtnPressed(){
    if(counter > 0){
        this.removeDirectionFormatting();
        changeSelectedDirection(counter - 1);
    }
}

function onDownBtnPressed(){
    if(counter < size - 1){
        this.removeDirectionFormatting();
        changeSelectedDirection(counter + 1);
    }
}

function changeSelectedDirection(value){
    document.getElementById("directions-" + value).classList.add("selected");

    counter = value;
    while(panoContainer.firstChild){
        panoContainer.removeChild(panoContainer.firstChild);
    }
    const imageSetting = imageLocations[value];
    const panorama = new PANOLENS.ImagePanorama(imageSetting["location"]);

    const viewer = new PANOLENS.Viewer({
        initialLookAt: new THREE.Vector3(imageSetting["initialLook"][0], imageSetting["initialLook"][1], imageSetting["initialLook"][2]),
        container: panoContainer,
        controlBar: false
    });
    
    viewer.add(panorama);
}

function removeDirectionFormatting(){
    for(var i = 0; i < size; i++){
        document.getElementById("directions-" + i).classList.remove("selected");
    }
}

function clearDirections(container){
    for(var i = 0; i < size; i++){
        var c = document.getElementById(container + "-" + i);
        c.remove();
    }
}

function displaySUElevator(){
    markerSUElevator = L.marker([37.72417404088113, -122.45017202679541]).addTo(map).bindPopup("<h1>Student Union Elevator<\h1>");
}

function displayBATLElevator(){
    markerBATLElevator = L.marker([ 37.72689311201102, -122.44925200939178 ]).addTo(map).bindPopup("<h1>Batmale Hall Elevator<\h1>");
}
