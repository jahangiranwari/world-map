//Class to handle methods related to countries
map.country = {
  
  hover: {
      over: function (e) {
        this.c = this.c || this.attr("fill");
        this.stop().animate({fill: "#cf7d75"}, 500);
      },
      
      out: function () {
        this.stop().animate({fill: this.c}, 500);
      }
   }, 
   
  // Draw world map given the svg paths in world.js
  drawPaths: function(paths) {
    this.paper.setStart();
    for (var country in paths) { 
      this.drawPath(worldmap.shapes[country], worldmap.names[country]);
    }
    var countrySet = this.paper.setFinish();
    countrySet.hover(this.hover.over, this.hover.out);
  },
    
  drawPath: function(path, countryName) {
    var countryPath = this.paper.path(path).attr({stroke: "white", fill: "#aec2c1", "stroke-opacity": 0.35});
    $(countryPath.node).qtip({ 
          content: { text: countryName },
          hide: { fixed: true, delay: 250 },
          position: { my: 'top right', at: 'center center' }

      });
  }
}
