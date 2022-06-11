"use strict";
class Map {
    constructor() {
        //Get current loaction
        this.position = [43.539, -5.857];
        this.markers = [
            L.marker([43.354, -5.851]).bindPopup('<h2>Taller de Oviedo</h2><br>Campus de los catalanes').on('click', this.markerClickEvent),
            L.marker([43.537, -5.637]).bindPopup('<h2>Taller de Gijón</h2><br>Estadio El Molinón-Enrique Castro “Quini”').on('click', this.markerClickEvent),
            L.marker([43.553, -5.931]).bindPopup('<h2>Taller de Avilés</h2><br>Avenida de San Agustín').on('click', this.markerClickEvent)
        ];
        this.directionMarker = undefined;
        // Boleano para toglear entre modo de elegir en tienda y elegir tu direccion
        this.selectShops = false;

        this.map = L.map('map').setView(this.position, 10);

        this.geocodeService = L.esri.Geocoding.geocodeService({
            apikey: 'AAPK72476b3d18494a8380e1d10e8746df1efb2CswqWfr_NGxAsNrQ-zkGp-RFiFupZI5MBBUcmaP-HUMF7-lv2UOWMNKXN2lNN'
        });
    }

    markerClickEvent(e) {
        map.geocodeService.reverse().latlng(e.latlng).run(function(error, result) {
            if (error) {
                return;
            }
            $("#direction").val(result.address.Match_addr);
        });
    }

    initializate() {
        this.loadMap();
        this.getCurrentLocation();
    }

    loadMap() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

        let self = this;
        this.map.on('click', function(e) {
            self.geocodeService.reverse().latlng(e.latlng).run(function(error, result) {
                if (error) {
                    return;
                }
                $("#direction").val(result.address.Match_addr);

                if (self.directionMarker != undefined) {
                    self.map.removeLayer(self.directionMarker);
                }
                self.directionMarker = L.marker(result.latlng).bindPopup(result.address.Match_addr);
                self.directionMarker.addTo(self.map).openPopup();
            });
        });
    }

    loadMarkers() {
        this.markers.map(marker => marker.addTo(this.map));

        this.updateLocation();

    }

    removeMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
            this.map.removeLayer(this.markers[i]);
        }

    }

    updateLocation() {
        this.map.setView(this.position, 10)
    }

    toogleLocationSelector() {
        if (this.selectShops) {
            this.selectShops = false;
            this.removeMarkers();
            $("#toogle-options").html('\
                <button id="toogle-location" onclick="map.toogleLocationSelector()" >Cambiar a recoger en tienda</button>\
            ');

        } else {
            this.selectShops = true;
            if (this.directionMarker != undefined) {
                this.map.removeLayer(this.directionMarker);
            }
            this.loadMarkers();
            $("#toogle-options").html('\
                <button id="toogle-location" onclick="map.toogleLocationSelector()" >Cambiar a buscar dirección</button>\
            ');
        }
    }

    // Geo-related functions
    getCurrentLocation() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        var self = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            self.position = [position.coords.latitude, position.coords.longitude];
            self.updateLocation();
        });
    }


}
var map = new Map();
$(document).ready(function() {
    map.initializate();
})