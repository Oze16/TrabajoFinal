
   src="https://unpkg.com/leaflet/dist/leaflet.js"
 
   src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"
 
  src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"

 
    // Coordenadas de la ubicación del negocio 
    var businessLat = 36.7201;
    var businessLng = -4.2320;

    // Inicializar el mapa  en la ubicación del negocio
    var map = L.map('map').setView([businessLat, businessLng], 14);

    // Cargar  OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Agregar un marcador en la ubicación del negocio
    L.marker([businessLat, businessLng]).addTo(map)
      .bindPopup("<strong>Nuestra Ubicación:</strong><br>C. Mar Egeo 29740, Torre del Mar, Málaga")
      .openPopup();

    
    L.Routing.control({
      waypoints: [
        L.latLng(businessLat, businessLng),
        L.latLng(businessLat + 0.01, businessLng + 0.01)
      ],
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim()
    }).addTo(map);
 