const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";


var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(API_URL).then(function (crypto) {
    if (crypto.status === "ok") {
      const coin = crypto.data;

      let name = document.getElementById("name");
      let disclaimer = document.getElementById("disclaimer")
      let usd = document.getElementById("usd");
      let eur = document.getElementById("eur");
      let gbp = document.getElementById("gbp");


      name.innerHTML += coin.chartName
      disclaimer.innerHTML += coin.disclaimer

      //muestra tarjeta de usd
      usd.innerHTML += `<div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">`+ coin.bpi.USD.code + " " + coin.bpi.USD.symbol + `</h5>
        <h6 class="card-subtitle mb-2 text-muted">` + coin.bpi.USD.description + `</h6>
        <p class="card-text">Price: ` + coin.bpi.USD.rate + " " + coin.bpi.USD.symbol + `</p>
      </div>
      <br>
      <small>` + coin.time.updated + `</small>
      </div>
      `
      //muestra tarjeta de eur
      eur.innerHTML += `<div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">`+ coin.bpi.EUR.code + " " + coin.bpi.EUR.symbol + `</h5>
        <h6 class="card-subtitle mb-2 text-muted">` + coin.bpi.USD.description + `</h6>
        <p class="card-text">Price: ` + coin.bpi.EUR.rate + " " + coin.bpi.EUR.symbol + ` </p>
      </div>
      <br>
      <small>` + coin.time.updated + `</small>
      </div>
      `
      //muestra tarjeta de gbp
      gbp.innerHTML += `<div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">`+ coin.bpi.GBP.code + " " + coin.bpi.GBP.symbol + `</h5>
        <h6 class="card-subtitle mb-2 text-muted">` + coin.bpi.GBP.description + `</h6>
        <p class="card-text">Price: ` + coin.bpi.GBP.rate + " " + coin.bpi.GBP.symbol + ` </p>
      </div>
      <br>
      <small>` + coin.time.updated + `</small>
      </div>
      `


      var rateUsd = coin.bpi.USD.rate;
      var rateGbp = coin.bpi.GBP.rate;
      var rateEur = coin.bpi.EUR.rate;


    }

    //boton convierte de bitcoin a moneda
    document.getElementById("converterBtoC").addEventListener("click", () => {
      let bToC = document.getElementById("bToC").value;
      let inputB = document.getElementById("nBit").value;
      let inputC = document.getElementById("resultCurrency");

      if (bToC === "1") {
        inputC.innerHTML = `<br><input type="number" class="form-control" value="` + (parseFloat(rateUsd) * parseFloat(inputB)) + `">`
      };

      if (bToC === "2") {
        inputC.innerHTML = `<br><input type="number" class="form-control" value="` + parseFloat(rateEur) * parseFloat(inputB) + `">`
      };

      if (bToC === "3") {
        inputC.innerHTML = `<br><input type="number" class="form-control" value="` + (parseFloat(rateGbp) * parseFloat(inputB)) + `">`
      };

    });

    //boton convierte de moneda a bitcoin
    document.getElementById("converterCtoB").addEventListener("click", () => {
      let cToB = document.getElementById("cToB").value;
      let inputCurrency = document.getElementById("nCurrency").value;
      let inputBit = document.getElementById("resultBit");

      if (cToB === "1") {
        inputBit.innerHTML = `<br><input type="number" class="form-control" value="` + (parseFloat(inputCurrency) / parseFloat(rateUsd)) + `">`
      };

      if (cToB === "2") {
        inputBit.innerHTML = `<br><input type="number" class="form-control" value="` + parseFloat(rateEur) / parseFloat(inputCurrency) + `">`
      };

      if (cToB === "3") {
        inputBit.innerHTML = `<br><input type="number" class="form-control" value="` + (parseFloat(rateGbp) / parseFloat(inputCurrency)) + `">`
      };
    });

  });
});




