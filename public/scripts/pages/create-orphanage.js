const map = L.map("mapid").setView([-23.1168501, -46.555522], 15);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGVkcm9kdWFydGUyMDA1IiwiYSI6ImNrZzg0cXZqMDA3ZHcyeXFyb3JpbGloYjYifQ.lqqKAasrTAKGB-LtGRFUhQ"
).addTo(map);

const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

let marker;

map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  marker && map.removeLayer(marker);

  marker = L.marker([lat, lng], { icon }).addTo(map);
});

function addPhotoField() {
  const container = document.querySelector("#images");

  const fieldsContainer = document.querySelectorAll(".new-upload");

  const newFieldContainer =
    fieldsContainer[fieldsContainer.length - 1].cloneNode(true);

  const input = newFieldContainer.children[0];

  if (input.value == "") {
    return;
  }

  input.value = "";

  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll(".new-upload");

  if (fieldsContainer.length < 2) {
    span.parentNode.children[0].value = "";
    return;
  }

  span.parentNode.remove();
}

function toggleSelect(event) {
  document.querySelectorAll(".button-select button").forEach((button) => {
    button.classList.remove("active");
  });

  const button = event.currentTarget;
  button.classList.add("active");

  const input = document.querySelector('[name="open_on_weekends"]');

  input.value = button.dataset.value;
}

function validate(event) {
  const needsLatAndLng = false;

  if (needsLatAndLng) {
    event.preventDefault();
    alert("Selecione um ponto no mapa");
  }
}
