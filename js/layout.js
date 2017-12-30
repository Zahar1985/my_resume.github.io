//global variables
var map, dynamicLayer, visible  = [];
require([
"esri/geometry/Extent",
"dojo/parser",
"esri/map",
"esri/dijit/Scalebar",
"esri/layers/ArcGISDynamicMapServiceLayer",
"esri/layers/FeatureLayer",
"esri/dijit/Legend",
"dojo/_base/array",
"dojo/dom", "dojo/on", "dojo/query", "dojo/_base/array",
"dojo/domReady!"
], function(
Extent, parser, Map, Scalebar, ArcGISDynamicMapServiceLayer, FeatureLayer, Legend, arrayUtils, dom, on, query, arrayUtils
) {
parser.parse();
//set extension
var initExtent = new Extent({"xmin":3800000,"ymin":5800000,"xmax":4100000,"ymax":7200000,"spatialReference":{"wkid":102100}});
//load map
map = new Map("mapDiv", {
basemap: "streets", extent:initExtent
});
//add scalebar
var scalebar = new Scalebar({
map: map,
scalebarUnit: "metric",
attachTo: "bottom-left"
}, dojo.byId("scalebar"));
//resize map
map.resize();
//add dynamic service
var dynamicUrl = "http://77.47.192.22:6080/arcgis/rest/services/UkrainianSkiResorts_wdc02_011/MapServer";
var dynamicLayer = new ArcGISDynamicMapServiceLayer(dynamicUrl,{opacity:0.8});
map.on("layers-add-result", function (evt) {
var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
return {layer:layer.layer, title:layer.layer.name};
});
if (layerInfo.length > 0) {
var legendDijit = new Legend({
map: map,
layerInfos: layerInfo
}, "legendDiv");
legendDijit.startup();
}
});
map.addLayers([dynamicLayer]);
dynamicLayer.on("load", buildLayerList);
function buildLayerList() {
var items = arrayUtils.map(dynamicLayer.layerInfos, function(info,index) {
if (info.defaultVisibility) {
visible.push(info.id);
}
return "<br><br>" + "<input type='checkbox' class='list_item'" +(info.defaultVisibility ? "checked=checked" : "") + "' id='" + info.id + "'' /> <label for='" + info.id + "'>" + info.name + "</label>";
});
var ll = dom.byId("layer_list");
ll.innerHTML = items.join(' ');
dynamicLayer.setVisibleLayers(visible);
on(ll, "click", updateLayerVisibility);
}
function updateLayerVisibility() {
var inputs = query(".list_item");
var input;
visible = [];
arrayUtils.forEach(inputs, function(input) {
if (input.checked) {
visible.push(input.id);
}
});
//if there aren't any layers visible set the array to be -1
if (visible.length === 0) {
visible.push(-1);
}
dynamicLayer.setVisibleLayers(visible);
}
 });