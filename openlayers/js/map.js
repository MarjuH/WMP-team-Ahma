 /*
 var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([24.955494, 60.203579]),
          zoom: 12
        })
      });
*/

$(document).ready(function() {
	onLoadData();
});
	

var vectorSourceClosed = new ol.source.Vector({
     // empty vector
});


var vectorSourceOpen = new ol.source.Vector({
     // empty vector
});


//create the style
var iconStyleClosed = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        src: '../img/check.png'
     }))
});


var iconStyleOpen = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        src: '../img/cancel.png'
     }))
});


// and apply a style to whole layer
var vectorLayerClosed = new ol.layer.Vector({
    source: vectorSourceClosed,
    style: iconStyleClosed
});	  


var vectorLayerOpen = new ol.layer.Vector({
    source: vectorSourceOpen,
    style: iconStyleOpen
});	 
	  
var map = new ol.Map({
	target: 'map',
	layers: [
		new ol.layer.Tile({
			source: new ol.source.XYZ({
			url: 'http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
			attributions: [new ol.Attribution({ html: ['&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'] })]
			})
		}),
		vectorLayerClosed,
		vectorLayerOpen
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([24.955494, 60.18]),
		zoom: 13
	})     
});	 

function onLoadData() {
	var url = "https://asiointi.hel.fi/palautews/rest/v1/requests.json";
	
	var params = resolveParameters();
	
	$.getJSON( url, params, function( json ) {
	    $.each( json, function( key, data ) {
			if (this.long !== undefined || this.lat !== undefined) {
					
				var lonlat = [parseFloat(this.long), parseFloat(this.lat)];
				var feature = new ol.Feature({
					geometry: new ol.geom.Point(ol.proj.fromLonLat(lonlat)),
					name: this.service_request_id,
					service_code: getServiceCodeName(this.service_code),
					description: this.description,
					status: this.status,
					status_notes: this.status_notes,
					address: this.address
				});
				
				if (this.status === 'open'){
					vectorSourceOpen.addFeature(feature);					
				}
				
				else{
					vectorSourceClosed.addFeature(feature);
					console.log(this.status)
				} 
			}
		});
	})
}

	  
// Create a popup overlay which will be used to display feature info
var element = document.getElementById('popup');
var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false
});
map.addOverlay(popup);



// display popup on click
map.on('click', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });
  if (feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
	var props = feature.getProperties();
	
	var info = "<h4>" + props.service_code + " osoitteessa: <br>" + props.address + "</h4>";
		info += "<p>" + props.description + "</p>";
	
	// Offset the popup so it points at the middle of the marker not the tip
	popup.setPosition(coord);
    $(element).popover({
      'placement': 'top',
      'html': true,
      'content': info
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
  }
});

var cursorHoverStyle = "pointer";
var target = map.getTarget();
var jTarget = typeof target === "string" ? $("#"+target) : $(target);

// change mouse cursor when over marker
map.on('pointermove', function(e) {
	if (e.dragging) {
		$(element).popover('destroy');
		return;
	}
	var pixel = map.getEventPixel(e.originalEvent);
	var hit = map.hasFeatureAtPixel(pixel);
	if (hit) {
		jTarget.css("cursor", cursorHoverStyle);
	} else {
		jTarget.css("cursor", "");
	}
});


// get name for the popup window



