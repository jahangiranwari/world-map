//Map namespace
var map = {
    width: 1000,
    height: 400,
    sizes: [ 0.25, 0.5, 1.0, 1.25, 1.5, 2, 2.25, 2.50, 2.75, 3.0, 3.25, 3.5, 3.75],
    currSize: 1,
    xFactor: 2.6938,
    yFactor: -2.6938,
    xOffset: 465.4,
    yOffset: 227.066,
    idCounter: 0,
    
    getCoords: function(lat, lon) {
      return {
            cx: (lon * this.xFactor) + this.xOffset,
            cy: (lat * this.yFactor) + this.yOffset
        };
    },
    
    resize: function(size) {
      var transform = 'S0'+size+','+size+',0,0';
      this.paper.forEach(function(obj){
       obj.transform(transform);
      });

      this.paper.setSize(this.width * size, this.height * size);
      this.currSize = size;
    },
    
    scaleObjectToCurrentSize: function(obj) {
       var transform = 'S0'+this.currSize+','+this.currSize+',0,0';
       obj.transform(transform);
    },
    
    //source Underscore.js
    getUniqueId: function(prefix) {
      var id = ++this.idCounter + '';
      return prefix ? prefix + id : id;
    }
    
};


map.registerDomEventHandlers = function () {

      //Resize buttons
      $('span.plus').on('click', function(event) {
        var index = $.inArray(map.currSize,  map.sizes);
        if (index < (map.sizes.length - 1)) {
          map.resize(map.sizes[index + 1]);
        } 
      });
      
      $('span.minus').on('click', function(event) {
        var index = $.inArray(map.currSize,  map.sizes);
        if (index > 0) {
          map.resize(map.sizes[index - 1]);
        }
      });


      //City search
      $('#add-city').on('submit', function(event) {
          event.preventDefault();
          var query = $(this).find('input[name="city"]').val();
          map.city.searchAndAdd(query);
      });
      
      $('#cities').on('mouseover', 'a', function(event) {
          var id = $(event.currentTarget).attr("href");
          $(id).trigger('mouseover');
      });
      
      $('#cities').on('mouseout', 'a', function(event) {
          var id = $(event.currentTarget).attr("href");
          $(id).trigger('mouseout');
      });
      
      $('body').on("noresult", function(){
        $('span.alert').fadeIn().delay(2800).fadeOut();
      });
      
      $('body').on("addCity", function(event, cityObj){
         var li = '<li><a href="#'+cityObj.id+'">'+cityObj.name+'</a></li>';
         $('#cities').append(li);
      });
};

map.init = function() {

    map.registerDomEventHandlers();
    map.city.paper = map.country.paper = map.paper;
    
    this.paper.rect(0, 0, 1000, 400, 10).attr({ stroke: "none", fill: "#177b7b" });
    map.country.drawPaths(worldmap.shapes);
    map.city.drawCircles(cities);
}
          
