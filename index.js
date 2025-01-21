let rowAdded = false;

async function getAdressByZipCode() {
  const zipCode = document.getElementById("zipCode").value;
  try {
    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
    const data = await response.json();
    if (!rowAdded) {
      document.getElementById("table-body").innerHTML += `
    <tr class="zipcode-table-row">        
        <th id="logradouro">${data.logradouro}</th>
        <th id="bairro">${data.bairro}</th>
        <th id="uf">${data.uf}</th>
    </tr>
    `;
      rowAdded = true;
    } else {
      document.getElementById("logradouro").textContent = data.logradouro;
      document.getElementById("bairro").textContent = data.bairro;
      document.getElementById("uf").textContent = data.uf;
    }
  } catch (error) {
    alert(error.message);
  }
}

async function getWeather() {
  const longitude = document.getElementById("longitude").value;
  const latitude = document.getElementById("latitude").value;
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
    );
    //-23.758378, -53.296727
    const data = await response.json();
    document.getElementById(
      "temperatureLabel"
    ).textContent = `Previsão de tempo de acordo com a região: ${data.current.temperature_2m}° C`;
  } catch (error) {
    alert(error.message);
  }
}

function buttonClick() {
  const zipCode = document.getElementById("zipCode").value;
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;

  if (zipCode) {
    getAdressByZipCode();
  }
  if (latitude && longitude) {
    getWeather();
  }

  if (!zipCode && !latitude && !longitude) {
    alert("Preencha os campos corretamente!");
  }
}
