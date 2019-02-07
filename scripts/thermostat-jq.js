$(document).ready(function() {

  var thermostat = new Thermostat;

  function getCityURL(city, callback) {
    var weatherAPIUrl = 'http://api.openweathermap.org/data/2.5/forecast?'
    var apiKey = 'APPID=9a27568ed1d7f9682ac8dc1b08ea36a0'
    var id = '&id='
    var units = '&units=metric'
    $.get(weatherAPIUrl + apiKey + units + id + city, callback);
  }


  function energyUsageColour() {
    thermostat.energyUsage();
    if (thermostat.energyUsage() === 'Low Usage') { $('h1').css('color', 'green'); };
    if (thermostat.energyUsage() === 'Medium Usage') { $('h1').css('color', 'orange'); };
    if (thermostat.energyUsage() === 'High Usage') { $('h1').css('color', 'red'); }
  };

  function printTempAndUsage() {
    $('.temp').text(thermostat.temp).hide(200).show(200);
  };

  $('#cityDropDown').change( function () {
    var city = $('#cityDropDown').val()
    getCityURL(city, (data) => $('.cityTemp').text(Math.round(data.list[0].main.temp)));
  })

  $('.temp').text(thermostat.temp);
    energyUsageColour();
    printTempAndUsage();

  $('.up').on('click', function() {
    thermostat.up();
    energyUsageColour();
    printTempAndUsage();
  });

  $('.down').on('click', function() {
    thermostat.down();
    energyUsageColour();
    printTempAndUsage();
  });

  $('.reset').on('click', function() {
    thermostat.reset();
    energyUsageColour();
    printTempAndUsage();
  });

  $('.pws_off').on('click', function() {
    thermostat.powerSavingOff();
  });

  $('.pws_on').on('click', function() {
    thermostat.powerSavingOn();
    energyUsageColour();
    printTempAndUsage();
  });
});
