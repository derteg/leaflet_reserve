(function(){
	'use strict'
	var loader = document.getElementById('loader');

	var startView = [68.66,97.08],
		startZoom = 3,
		regionsData,
		groups = [],
		pointsGeoJson,
		routesGeoJson;

	var map = L.map('leafletMap').setView(startView, startZoom);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.light',
	    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'
	}).addTo(map);

	

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