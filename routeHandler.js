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

var lMarker, lCircle, zoomed, marker, marker1, polyline, polylineAB, polylineABForADA, polylineAC, polylineACForADA, 
polylineAD, polylineADForADA, polylineAE, polylineAEForADA, polylineSCItoA, polylineBK, polylineCI, polylineDH, polylineEJ,
polylineHG, polylineHI, polylineIF, polylineIL, polylineJH, polylineJO, polylineLM, polylineLtoBATL, polylineMN, polylineMUBtoJ,
polylineNK, polylineGtoART, polylineGtoARTX, polylineOtoSCI, polylineKtoLIBR, polylineBtoCAFE, polylinetest, polylineFP,
polylinePtoJDVL, polylinePtoEHF, polylineKR, polylineQR, polylineBQ;
let startlat, startlong;
let destinationlat, destinationlong;
let latitude, longitude;
let wheelchairAssessibilityNeeded = false;

let startingCoordinates = [];
let destinationCoordinates = [];

var startingPoint = "MUB";
var destination = "SCI";

let shape1 = [
    [37.7257029109819, -122.45077517492479],[37.725560293677326, -122.45059960773112],
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
    [37.726355047712474, -122.44965506175564], [37.72619408096292, -122.44955004859686], 
    [37.72605638579957, -122.44948911531249], [37.72586969526052, -122.44945424659475], 
    [37.72572013034101, -122.44948911531249]
]

let NK = [
    [37.72572013034101, -122.44948911531249], [37.725574600456156, -122.44950592016887], 
    [37.72545436308979, -122.44945650747626], [37.725340902859266, -122.44948779862958], 
    [37.72529955578054, -122.44955453783082], [37.72506179091299, -122.44963759092536], 
    [37.72476206272458, -122.44988591753273]
]

let MUBtoJ = [
    [37.72534222155596, -122.45297519895082], [37.72545191921251,-122.45297519895082], 
    [37.72545191921251, -122.4525141854476], [37.7256223800879, -122.45251753820871], 
    [37.7256223800879, -122.45226395560371]
]

let PtoJDVL = [
    [37.72802591518471, -122.45080079724654], [37.72795643850786, -122.45090918251088],
    [37.72795643850786, -122.4510895610673], [37.72799621524043, -122.45119953163605],
    [37.72806410081516, -122.45127463348813], [37.72806403843405, -122.45131634697346]
]

let PtoEHF = [
    [37.72802591518471, -122.45080079724654], [37.72824866440335, -122.45080658801605], 
    [37.72825184653033, -122.45042705543909], [37.72812403099609, -122.45042705543909]
]
updateMap();

var selectElement = document.getElementById("choose-location1");
var selectElement1 = document.getElementById("choose-location2");
selectElement.addEventListener('change', ()=> {
    setStartAndDestination();
});
selectElement1.addEventListener('change', ()=> {
    setStartAndDestination();
});

function setStartAndDestination(){
    //var selectElement = document.getElementById("choose-location1");
    //var selectElement1 = document.getElementById("choose-location2");
    startingPoint = selectElement.options[selectElement.selectedIndex].value;
    destination = selectElement1.options[selectElement1.selectedIndex].value;
    updateMap();
}
    
function updateMap(){
    
    clearMap();
    
    displayRoute(startingPoint, destination);
    navigator.geolocation.watchPosition(success, error);
    
}

function clearMap(){

    var mapMarkers = [
        marker, marker1, polyline, polylineAB, polylineABForADA, polylineAC, polylineACForADA, 
        polylineAD, polylineADForADA, polylineAE, polylineAEForADA, polylineSCItoA, polylineBK, 
        polylineCI, polylineDH, polylineEJ, polylineHG, polylineHI, polylineIF, polylineIL, polylineJH, 
        polylineJO, polylineLM, polylineLtoBATL, polylineMN, polylineMUBtoJ, polylineNK, polylinetest,
        polylineGtoART, polylineGtoARTX, polylineOtoSCI, polylineKtoLIBR, polylineBtoCAFE, polylineFP,
        polylinePtoJDVL, polylinePtoEHF
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
    if(polyline){
        map.removeLayer(polyline);
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
    if(map.hasLayer(polyline)){
        map.removeLayer(polyline);
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
        case "B700-0":
            lat = 37.7267185103933;
            long = -122.44741684032692;
            buildingName = "Bungalows 701 - 716";
            break;
        case "CAFE-0":
            lat = 37.72395165948694;
            long = -122.45081165013444;
            buildingName = "Cafeteria";
            break;
        case "CLOUD-0":
            lat = 37.725455816805;
            long = -122.45024838624327;
            buildingName = "Cloud Hall";
            break;
        case "EHF-0":
            lat = 37.72812403099609;
            long = -122.45042705543909;
            buildingName = "Floristry / Horticulture Center";
            break;
        case "HLTH-0":
            lat = 37.727550825413836;
            long = -122.4520963867931;
            buildingName = "Student Health Center";
            break;
        case "JDVL-0":
            lat = 37.72806403843405;
            long = -122.45131634697346;
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
        case "SU-0":
            lat = 37.724180844579436;
            long = -122.4503093650356;
            buildingName = "Student Union";
            break;
        case "VART-0":
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
        marker = L.marker([startlat, startlong]).addTo(map).bindPopup("<h1>" + buildingName + "<\h1>");
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
        graph.addVertex("ART-0");
        graph.addVertex("ARTX-0");
        graph.addVertex("BATL-0");
        graph.addVertex("CAFE-0");
        graph.addVertex("EHF-0");
        graph.addVertex("JDVL-0");
        graph.addVertex("LIBR-0");
        graph.addVertex("MUB-0");
        graph.addVertex("SCI-0");
        graph.addVertex("SCI-1");
        graph.addVertex("WELL-0");

        if(wheelchairAssessibilityNeeded){
            console.log("Not done yet!");
        } else {
            graph.addEdge("A", "B", 400);
            graph.addEdge("A", "C", 400);
            graph.addEdge("A", "D", 592);
            graph.addEdge("A", "E", 614);
            graph.addEdge("A", "SCI-0", 40);
            graph.addEdge("B", "Q", 35);
            //graph.addEdge("B", "K", 315);
            graph.addEdge("B", "CAFE-0", 240);
            graph.addEdge("C", "I", 50);
            graph.addEdge("D", "H", 50);
            graph.addEdge("E", "J", 800);
            graph.addEdge("F", "I", 125);
            graph.addEdge("F", "P", 250);
            graph.addEdge("G", "ART-0", 40);
            graph.addEdge("G", "ARTX-0", 30);
            graph.addEdge("G", "H", 65);
            graph.addEdge("H", "I", 265);
            graph.addEdge("I", "L", 300);
            graph.addEdge("J", "H", 600);
            graph.addEdge("J", "O", 240);
            graph.addEdge("J", "MUB-0", 310);
            graph.addEdge("K", "N", 390);
            graph.addEdge("K", "R", 140);
            graph.addEdge("K", "LIBR-0", 65);
            graph.addEdge("L", "M", 100);
            graph.addEdge("L", "BATL-0", 200);
            graph.addEdge("M", "N", 260);
            graph.addEdge("O", "SCI-1", 80);
            graph.addEdge("P", "JDVL-0", 165);
            graph.addEdge("P", "EHF-0", 245);
            graph.addEdge("Q", "R", 130);
            //must fix multiple exits
        }
        const route = graph.Dijkstra(start, end);
        
        for(var i = 0; i < route.length - 1; i++){
            //console.log(route[i] + "," + route[i+1]);
            displayEdge(route[i], route[i+1]);
        }
        
        displayMarker(graph.getStart(), "start");
        displayMarker(graph.getFinish(), "destination");
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
        case node1 === "A" && node2 === "SCI-0":
            if (wheelchairAssessibilityNeeded) {
                console.log("Does not exist");
            } else { 
                polylineSCItoA = L.polyline([[37.7257029109819, -122.45106814833785], [37.7257029109819, -122.45077517492479]], {color: 'red', weight: 6}).addTo(map);
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
        case node1 === "F" && node2 === "I":
            polylineIF = L.polyline([[37.726927930648294, -122.45080079724654], [37.72723245488745, -122.45079724516542]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "F" && node2 === "P":
            polylineFP = L.polyline([[37.72723245488745, -122.45079724516542], [37.72802591518471, -122.45080079724654]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "G" && node2 === "H":
            polylineHG = L.polyline([[37.726920384869686, -122.45171562000382], [37.72711687806445, -122.4517118510434]], {color: 'blue', weight: 6}).addTo(map);
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
        case node1 === "J" && node2 === "MUB-0":
            //polylineMUBtoJ = L.polyline(MUBtoJ, {color: 'blue', weight: 6}).addTo(map);
            polylinetest = L.layerGroup().addLayer(L.polyline(MUBtoJ, {color: 'blue', weight: 6})).addTo(map);
            break;
        case node1 === "K" && node2 === "N":
            polylineNK = L.polyline(NK, {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "K" && node2 === "LIBR-0":
            polylineKtoLIBR = L.polyline([[37.72476206272458, -122.44988591753273], [37.72476206272458, -122.44962644354963]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "K" && node2 === "R":
            polylineKR = L.polyline([[37.72452394205446, -122.45032982312472], [37.724568494060584, -122.45016218506078], [37.72461320049394, -122.45004282675973], 
                [37.724673509392495, -122.44994626723535],[37.72476206272458, -122.44988591753273]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "L" && node2 === "M":
            polylineLM = L.polyline([[37.726605626097915, -122.4498317078415], [37.726515518135476, -122.44975430348917], [37.726355047712474, -122.44965506175564]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "L" && node2 === "BATL-0":
            polylineLtoBATL = L.polyline([[37.726605626097915, -122.4498317078415], [37.72675729832949, -122.44975580982445], [37.72675835905989, -122.44931324533881]], {color: 'blue', weight: 6}).addTo(map);
            break;
        case node1 === "M" && node2 === "N":
            polylineMN = L.polyline(MN, {color: 'blue', weight: 6}).addTo(map);
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
        default:
            displayEdge(node2, node1);
            break;
    }
}
    
