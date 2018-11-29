  // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 15
        });
        infoWindow = new google.maps.InfoWindow;
        
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            localStorage.setItem('curr_lat',position.coords.latitude);
            localStorage.setItem('curr_long',position.coords.latitude);
            
            infoWindow.setPosition(pos);
            infoWindow.setContent('your location');
            infoWindow.open(map);
            map.setCenter(pos);
            // Create a marker and set its position.
            addMarker(pos,'My location');
            var agents = JSON.parse(localStorage.getItem('agents_list'));
            
             for(var i=0;i<agents.length;i++){
                 var cords = {
                     lat: (agents[i].lat).replace('"', '').trim(),
                     lng: (agents[i].long).replace('"', '').trim()
                   };
                 addMarker(cords,agents[i].name);
              }
            
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        function addMarker(cords,desc){ 
            var marker = new google.maps.Marker({
           map: map,
           position: cords,
           title: desc
              });
          }
      }
     
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
     
      function Assignment(){

      }

/*function initMap() {
  var myLatLng = {lat: 28.6141793, lng: 77.2022662};

  // Create a map object and specify the DOM element
  // for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 8
  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'Hello World!'
  });
}*/
