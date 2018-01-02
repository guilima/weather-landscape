export default function loadjs(src) {
  return new Promise(function(resolve, reject) {
    var script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", function() {
      resolve();
    });
    script.addEventListener("error", function(e) {
      reject(e);
    });
    document.head.appendChild(script);
  });
}
