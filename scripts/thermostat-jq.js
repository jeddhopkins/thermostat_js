$(document).ready(function() {

  var thermostat = new Thermostat;

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
