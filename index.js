let rowAdded = false;

async function getAdressByZipCode() {
  const zipCode = document.getElementById("zipCode").value;
  try {
    console.log(zipCode.length);
    if (zipCode.length !== 8) {
      let message =
        "CEP não encontrado. Por favor, verifique e tente novamente.";
      showModal(message);
      return;
    }
    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
    const data = await response.json();
    console.log(data);

    if (data.erro) {
      let message =
        "CEP não encontrado. Por favor, verifique e tente novamente.";
      showModal(message);
      return;
    }

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
    let message = `Erro ao buscar o CEP: ${error.message}`;
    showModal(message);
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
    let message = `Erro ao pesquisar clima: ${error.message}`;
    showModal(message);
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
    let message = "Preencha os campos corretamente!";
    showModal(message);
  }
}

function showModal(message) {
  const modal = document.getElementById("modal");
  modal.classList.add("active");
  const modalMessage = document.getElementById("modal-message");
  modalMessage.textContent = `${message}`;

  const closeModalButton = document.getElementById("close-modal-button");
  closeModalButton.addEventListener("click", closeModal);
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
}
