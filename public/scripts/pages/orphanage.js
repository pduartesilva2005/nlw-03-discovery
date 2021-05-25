const options = {
  dragging: false,
  touchZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  zoomControl: false,
};

const map = L.map("mapid", options).setView([-23.1168501, -46.555522], 15);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGVkcm9kdWFydGUyMDA1IiwiYSI6ImNrZzg0cXZqMDA3ZHcyeXFyb3JpbGloYjYifQ.lqqKAasrTAKGB-LtGRFUhQ"
).addTo(map);

// create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

L.marker([-23.1168501, -46.555522], { icon }).addTo(map);

function selectImage(event) {
  const button = event.currentTarget;

  console.log(button.children);

  const buttons = document.querySelector(".orphanage-details > img");
  buttons.forEach(removeActiveClass);

  function removeActiveClass(button) {
    button.classList.remove("active");
  }

  const image = button.children[0];
  const imageContainer = document.querySelector(".orphanage-details > img");

  imageContainer.src = image.src;

  button.classList.add("active");
}
