var open = [];

onconnect = function(event) {
  open.push(event.ports[0]);
  event.ports[0].onmessage = function(e) {
    for (var i = 0; i < open.length; i++) {
      open[i].postMessage(e.data);
    }
  };
};

self.addEventListener('close', function (event) {
  var idx = open.indexOf(event.source);
  open.splice(idx, 1);
}.bind(self), false);
