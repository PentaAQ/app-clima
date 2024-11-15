let urlBase = "https://api.openweathermap.org/data/2.5/weather";
let api_key = "891529386b6d737d88215aa35634c53a";
let diferenciaDeKelvin = 273.15;


const descripcionesEnEspañol = {
    "clear sky": "Cielo Despejado",
    "few clouds": "Pocas Nubes",
    "scattered clouds": "Nubes Dispersas",
    "broken clouds": "Nubes Rotas",
    "shower rain": "Lluvia Ligera",
    "rain": "Lluvia",
    "thunderstorm": "Tormenta Eléctrica",
    "snow": "Nieve",
    "mist": "Neblina",
  };



document.getElementById("botonBusqueda").addEventListener("click", () => {
  const ciudad = document.getElementById("ciudadEntrada").value;
  if (ciudad) {
    fetchDatosClima(ciudad);
  }
});
function fetchDatosClima(ciudad) {
  fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
    .then((data) => data.json())
    .then((data) => mostrarDatosClima(data));
}
function mostrarDatosClima(data) {
  console.log(data);
  const divDatosclima = document.getElementById("datosClima");
  divDatosclima.innerHTML = "";

  const ciudadNombre = data.name;
  const pais = data.sys.country;
  const humedad = data.main.humidity;
  const temperatura = (data.main.temp - diferenciaDeKelvin).toFixed(1);
  let descripcion = data.weather[0].description;
  const icono = data.weather[0].icon;

  descripcion = descripcionesEnEspañol[descripcion] || descripcion;

  const ciudadTitulo = document.createElement("h2");
  ciudadTitulo.innerText = `${ciudadNombre}, ${pais}`;

  const ciudadTemp = document.createElement("p");
  ciudadTemp.innerText = `Temperatura Actual: ${temperatura} °C`;

  const ciudadHumedad = document.createElement("p");
  ciudadHumedad.innerText = `Humedad: ${humedad} %`;

  const iconoInfo = document.createElement("img");
  iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`;

  const ciudadDescripcion = document.createElement("p");
  ciudadDescripcion.innerText = `Descripción Meteorologica: ${descripcion}`;

  divDatosclima.appendChild(ciudadTitulo);
  divDatosclima.appendChild(ciudadTemp);
  divDatosclima.appendChild(ciudadHumedad);
  divDatosclima.appendChild(iconoInfo);
  divDatosclima.appendChild(ciudadDescripcion);
}
