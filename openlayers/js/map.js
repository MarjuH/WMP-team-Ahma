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