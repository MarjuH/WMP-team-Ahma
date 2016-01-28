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
	  
var vectorSource = new ol.source.Vector({
     // empty vector
})

//create the style
var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/**@type {olx.style.IconOptions}*/({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'http://openlayers.org/en/v3.9.0/examples/data/icon.png'
     }))
});

// and apply a style to whole layer
var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: iconStyle
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
		vectorLayer
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([24.955494, 60.18]),
		zoom: 13
	})     
});	 

function onLoadData() {
	var url = "https://asiointi.hel.fi/palautews/rest/v1/requests.json?start_date=2015-05-24T00:00:00Z&end_date=2015-06-24T00:00:00Z&status=open";

	$.getJSON( url, function( json ) {
	    $.each( json, function( key, data ) {
			var lonlat = [parseFloat(this.long), parseFloat(this.lat)];
			var feature = new ol.Feature({
				geometry: new ol.geom.Point(ol.proj.fromLonLat(lonlat)),
				name: this.service_request_id,
				service_code: this.service_code,
				description: this.description,
				status: this.status,
				status_notes: this.status_notes,
				address: this.address
			});
			vectorSource.addFeature(feature);
		});
	})
}

	  





