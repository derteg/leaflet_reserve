(function(){
	'use strict'
	var loader = document.getElementById('loader');
	// переопределяем проекцию по умолчанию на коническую 'Asia North Albers Equal Area Conic'
	var crs = new L.Proj.CRS('EPSG:102025',
		'+proj=aea +lat_1=15 +lat_2=65 +lat_0=30 +lon_0=95 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
		{
			resolutions: [7168, 6144, 4096, 2048, 1024, 512], // задаем допустимые уровни зума
			origin: [0, 0]
		}
	);

	var startView = [64.63,97.08],
		startZoom = 0,
		regionsData,
		groups = [],
		pointsGeoJson,
		routesGeoJson;

	var map = L.map('leafletMap', {
		crs: crs, 
		maxZoom: crs.options.resolutions.length - 1, 
		minZoom: 0,
	}).setView(startView, startZoom);

	map.dragging.disable();
	map.on('zoomend', function(event) {
		if(event.target['_animateToZoom'] === 0) {
			map.dragging.disable();
			map.setView(startView, startZoom);
		} else {
			map.dragging.enable();
		}
	});

	startPreloader();
	regionsData = new L.GeoJSON.AJAX("ajax/leaflet_reserve.geojson", {
		style: regionGetStyle,
		onEachFeature: onEachRegion
	}).addTo(map).on('data:loaded', finishPreloader);

	function startPreloader() {
		loader.style.display = 'block';
		loader.style.opacity = '1';
	}
	function finishPreloader() {
		loader.style.opacity = '0';
		setTimeout(function() {
			loader.style.display = 'none';
		}, 500);

		// делаем слой с регионами подложкой (z-index: 0)
		regionsData.bringToBack();
	}

	// перебираем регионы
	function onEachRegion(feature, layer) {
		
	}

	// стилизуем регионы
	function regionGetStyle(feature) {
		return {
			color: '#FC4E32',
			weight: 2,
			opacity: 1,
			fillColor: '#196DFC',
			fillOpacity: 0.7
		}
	}
}());