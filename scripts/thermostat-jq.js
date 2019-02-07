$(document).ready(function() {

  var thermostat = new Thermostat;
  var weatherAPIUrl = 'http://api.openweathermap.org/data/2.5/forecast?APPID=9a27568ed1d7f9682ac8dc1b08ea36a0&id='

  function getCityURL(city, callback) {
    $.getJSON( weatherAPIUrl + city, callback);
  }
  getCityURL('2643741', (data) => ($('.day1').text(Math.round(data.list[0].main.temp - 273.15)),
    $('.day2').text(Math.round(data.list[1].main.temp - 273.15)),
    $('.day3').text(Math.round(data.list[2].main.temp - 273.15)),
    $('.day4').text(Math.round(data.list[3].main.temp - 273.15)),
    $('.day5').text(Math.round(data.list[4].main.temp - 273.15)),
    $('.day6').text(Math.round(data.list[5].main.temp - 273.15)),
    $('.day7').text(Math.round(data.list[6].main.temp - 273.15))));


  function energyUsageColour() {
    thermostat.energyUsage();
    if (thermostat.energyUsage() === 'Low Usage') { $('h1').css('color', 'green'); };
    if (thermostat.energyUsage() === 'Medium Usage') { $('h1').css('color', 'orange'); };
    if (thermostat.energyUsage() === 'High Usage') { $('h1').css('color', 'red'); }
  };

  function printTempAndUsage() {
    $('.temp').text(thermostat.temp).hide(200).show(200);
    $('.usage').text(thermostat.energyUsage());
  };

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
