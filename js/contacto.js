
  // Coordenadas del negocio 
   var negocioLatLng = [36.734725, -4.105916];

   // Iniciar el mapa centrado en la ubicación del negocio
   var map = L.map('map').setView(negocioLatLng, 13);

  
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   // Marcador - negocio
   L.marker(negocioLatLng).addTo(map)
     .bindPopup("Donde Estamos<br> C/ Mar Egeo ,Torre del Mar (Málaga)")
     .openPopup();

   // Verificamos la geolocalización  del cliente para obtener su ubicación
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       var clienteLatLng = [position.coords.latitude, position.coords.longitude];

       // Marcador - ubicación del cliente
       L.marker(clienteLatLng).addTo(map)
         .bindPopup("Tu ubicación")
         .openPopup();

       // Calculamos y mostramos la ruta entre el negocio y el cliente
       L.Routing.control({
         waypoints: [
           L.latLng(negocioLatLng[0], negocioLatLng[1]),
           L.latLng(clienteLatLng[0], clienteLatLng[1])
         ],
         router: L.Routing.osrmv1({
           serviceUrl: 'https://router.project-osrm.org/route/v1'
         }),
         geocoder: L.Control.Geocoder.nominatim(),
         routeWhileDragging: true
       }).addTo(map);
     }, function(error) {
       console.error("Error en la geolocalización: " + error.message);
       alert("No se pudo obtener tu ubicación. Por favor, permite el acceso a la geolocalización.");
     });
   } else {
     alert("Tu navegador no soporta geolocalización.");
   }
 
