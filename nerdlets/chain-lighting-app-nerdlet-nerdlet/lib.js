class Lightning {
    constructor(canvas, l, r) {
      var c = canvas
      var size = l;
      c.width = size;
      c.height = 40;
      var ctx = c.getContext("2d");
      var center = {x: 0, y: 20};
      var minSegmentHeight = 10;
      var groundHeight = size - 20;
      var color = "hsl(180, 80%, 80%)";
      var roughness = 2;
      var maxDifference = 15;

      ctx.globalCompositeOperation = "lighter";

      ctx.strokeStyle = color;
      ctx.shadowColor = color;

      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "hsla(0, 0%, 10%, 0.2)";

      function render() {
        ctx.clearRect(0, 0, l, 40);

        ctx.shadowBlur = 0;
        ctx.globalCompositeOperation = "source-over";
        ctx.fillRect(0, 0, size, size);
        ctx.globalCompositeOperation = "lighter";
        ctx.shadowBlur = 15;
        var lightning = createLightning();
        ctx.beginPath();
        ctx.lineWidth = r;
        for (var i = 0; i < lightning.length; i++) {
          ctx.lineTo(lightning[i].x, lightning[i].y);
        }
        ctx.stroke();
      }

      function createLightning() {
        var segmentHeight = groundHeight - center.y;
        var lightning = [];
        lightning.push({x: center.x, y: center.y});
        lightning.push({x: l, y: 20});
        var currDiff = maxDifference;
        while (segmentHeight > minSegmentHeight) {
          var newSegments = [];
          for (var i = 0; i < lightning.length - 1; i++) {
            var start = lightning[i];
            var end = lightning[i + 1];
            var midX = (start.y + end.y) / 2;
            var newX = midX + (Math.random() * 2 - 1) * currDiff;
            newSegments.push(start, {x: (start.x + end.x) / 2, y: newX});
          }

          newSegments.push(lightning.pop());
          lightning = newSegments;

          currDiff /= roughness;
          segmentHeight /= 2;
        }
        return lightning;
      }

      render();
    }
  }
export default Lightning