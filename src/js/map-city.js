//Class to handle methods related to cities
map.city = {

  searchUrl: 'http://nominatim.openstreetmap.org/search?format=json&limit=1&q=',
  hover: {
      over: function (e) {
        this.c = this.c || this.attr("fill");
        this.stop().animate({fill: "#85e024"}, 500);
      },
      out: function () {
        this.stop().animate({fill: this.c}, 500);
      }
   }, 

  //Draw circles for each cities in the list
  drawCircles: function(cities) {
      var cityObj;
      for (var city in cities) { 
          cityObj = cities[city];
          this.drawAndTriggerAdd(cityObj.lat, cityObj.lon, city);
      }
  },
  
  drawAndTriggerAdd: function(lat, lon, city) {
      var cityElement = this.drawCircle(lat, lon, city);
      $('body').trigger('addCity', { name: city, id: cityElement.node.id } );
      return cityElement;
  },

  drawCircle: function(lat, lon, city) {
      var circle, attr;
      attr = map.getCoords(lat, lon);
      attr.r = 15;
      circle = this.paper.circle().attr(attr).animate({r: 5, fill: "#ffa324"}, 1000, "elastic");
      circle.hover(this.hover.over, this.hover.out);
      circle.node.id = map.getUniqueId("city");
      $(circle.node).qtip({ 
          content: { text: city +'<hr/> Latitude:  ' +lat+'<br/> Longitude:  '+lon },
          hide: { fixed: true, delay: 250 },
          position: { my: 'top left', at: 'center center' }

      });
      return circle;
    },

  searchAndAdd: function(query){
     var self, cityName, cityElement;
     self = this;
     $.getJSON(this.searchUrl + query)
     .done(function(data) {
        if (data.length !== 0) {
           cityName = data[0].display_name.substring(0, data[0].display_name.indexOf(","));
           cityElement = self.drawAndTriggerAdd(data[0].lat, data[0].lon, cityName);
           map.scaleObjectToCurrentSize(cityElement);
        }
        else {
          $('body').trigger('noresult');
        }
      });          
  },
  
  
};


