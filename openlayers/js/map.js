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
	

function clearMap() {
  vectorSourceClosed.clear();
  vectorSourceOpen.clear();
}; 
	
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
        src: '../img/check.png',
		size: [32,32],
		scale: 0.85
     }))
});


var iconStyleOpen = new ol.style.Style({
    image: new ol.style.Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        src: '../img/cancel.png',
		size: [32,32]
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

var HelsinkiCoord = {lat: 60.211, lon: 24.948};
	  
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
		center: ol.proj.fromLonLat([HelsinkiCoord.lon, HelsinkiCoord.lat]),
		zoom: 12
	})     
});	 

function onLoadData() {
	
	
	
	var url = "https://asiointi.hel.fi/palautews/rest/v1/requests.json";
	vectorSourceClosed.clear();
	vectorSourceOpen.clear();
	var params = resolveParameters();

	$("#loadDataButton").text("Ladataan...");
	$("#loadDataButton").prop("disabled", true);
		
	$.getJSON( url, params, function( json ) {
	    $.each( json, function( key, data ) {
			if (this.long !== undefined || this.lat !== undefined) {
					
				var lonlat = [parseFloat(this.long), parseFloat(this.lat)];
				var requested_datetime = moment(this.requested_datetime).format("DD.MM.YYYY");
				var updated_datetime = moment(this.updated_datetime).format("DD.MM.YYYY");
				var feature = new ol.Feature({
					geometry: new ol.geom.Point(ol.proj.fromLonLat(lonlat)),
					name: this.service_request_id,
					service_code: getServiceCodeName(this.service_code),
					description: this.description,
					status: this.status,
					status_notes: this.status_notes,
					address: this.address,
					requested_datetime: requested_datetime,
					updated_datetime: updated_datetime
				});
				
				if (this.status === 'open'){
					vectorSourceOpen.addFeature(feature);					
				}
				else {
					vectorSourceClosed.addFeature(feature);
				} 
			}
		});
	})
	.always(function() {
			$("#loadDataButton").text("PÄIVITÄ");
			$("#loadDataButton").prop("disabled", false);
	});
	
	
}
var helsinki = ol.proj.fromLonLat([HelsinkiCoord.lon, HelsinkiCoord.lat]);
function onHelsinkiBtnClicked() {
	var pan = ol.animation.pan({
          source: map.getView().getCenter()
        });
        map.beforeRender(pan);
        map.getView().setCenter(helsinki);
		map.getView().setZoom(12);
}

// Create a popup overlay which will be used to display feature info
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var popup = new ol.Overlay({
	element: container,
	positioning: 'bottom-center',
	autoPan: true,
	autoPanAnimation: {
	  duration: 250
	}
});
map.addOverlay(popup);



// display popup on click
map.on('singleclick', function(evt) {
	
  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });
  if (feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
	var props = feature.getProperties();
	
	var info = "<h4>" + props.service_code + " osoitteessa: <br>" + props.address + "</h4>";
		info += "<p>Palaute jätetty: " + props.requested_datetime;
		if (props.status === "closed") {
			info += "<br>Palaute käsitelty: " + props.updated_datetime;
		}
		info += "</p>";
		info += "<p>" + props.description + "</p>";
		
	content.innerHTML = info;
	
	// Offset the popup so it points at the middle of the marker not the tip
	popup.setPosition(coord);
	

  }
});

var closer = document.getElementById('popup-closer');
closer.onclick = function() {
  popup.setPosition(undefined);
  closer.blur();
  return false;
};

var cursorHoverStyle = "pointer";
var target = map.getTarget();
var jTarget = typeof target === "string" ? $("#"+target) : $(target);

// change mouse cursor when over marker
map.on('pointermove', function(e) {

	var pixel = map.getEventPixel(e.originalEvent);
	var hit = map.hasFeatureAtPixel(pixel);
	if (hit) {
		jTarget.css("cursor", cursorHoverStyle);
	} else {
		jTarget.css("cursor", "");
	}
});





