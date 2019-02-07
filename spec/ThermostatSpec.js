describe('Thermostat', function() {

  let thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe('creating a new thermostat', function() {
    it('starting temperature should be set at 20 degrees', function() {
      expect(thermostat.temp).toEqual(20);
    });
    it('minimum temperature should be set at 10 degrees', function() {
      expect(thermostat.MINIMUM_TEMPERATURE).toEqual(10);
    });
    it('has power saving mode switched on by default', function() {
      expect(thermostat.powerSaving).toEqual(true);
    })
  });

  describe('increasing the temperature', function() {
    it('increases temperature by increments of 1 degrees', function() {
      thermostat.up();
      expect(thermostat.temp).toEqual(21);
    });
    it('increases the temperature 5 times', function() {
      for (var i = 0; i < 5; i++) {
        thermostat.up();}
        expect(thermostat.temp).toEqual(25);
    });
    it('error if you increase temp above 25 degrees when power saving is on', function() {
      for (var i = 0; i < 5; i++) {
        thermostat.up();}
        expect(function() { thermostat.up() }).toThrowError('Temperature cannot go above 25 degrees when power saving mode is on!');
    });
    it('error if you increase temp above 32 degrees when power saving is off', function() {
      thermostat.powerSavingOff();
      for (var i = 0; i < 12; i++) {
        thermostat.up();}
        expect(function() { thermostat.up() }).toThrowError('Temperature cannot go above 32 degrees when power saving mode is off!');
    });
  });

  describe('decreasing the temperature', function() {
    it('decreases temperature by increments of 1 degrees', function() {
      thermostat.down();
      expect(thermostat.temp).toEqual(19);
    });
    it('decreases the temperature 5 times', function() {
      for (var i = 0; i < 5; i++) {
        thermostat.down();}
        expect(thermostat.temp).toEqual(15);
    });
    it('Error if you try to decrease the temperature below 10 degrees', function() {
      for (var i = 0; i < 10; i++) {
        thermostat.down();}
        expect(function() { thermostat.down() }).toThrowError('Temperature cannot go below 10 degrees!');
    });
  });

  describe('power saving mode', function() {
    it('can be switched off', function() {
      thermostat.powerSavingOff();
      expect(thermostat.powerSaving).toEqual(false);
    });
    it('can be switched on', function() {
      thermostat.powerSavingOff();
      thermostat.powerSavingOn();
      expect(thermostat.powerSaving).toEqual(true);
    });
    describe('reseting temperature when power saving mode is turned on', function() {
      it('resets to 25 degrees if power saving mode is turned on when temp is above 25', function() {
        thermostat.powerSavingOff();
        for (var i = 0; i < 6; i++) {
          thermostat.up();}
        thermostat.powerSavingOn();
        expect(thermostat.temp).toEqual(25);
      });
      it('doesn\'t change the temperature when power saving mode is turned on if the temperature is below 25', function() {
        thermostat.powerSavingOff()
        for (var i = 0; i < 4; i++) {
          thermostat.up();}
        thermostat.powerSavingOn();
        expect(thermostat.temp).toEqual(24);
      });
    });
  });

  describe('resetting temperature', function() {
    it('should reset temperature to 20 degrees', function() {
      thermostat.reset();
      expect(thermostat.temp).toEqual(20);
    });
  });

  describe('current energy usage', function() {
    it('returns \'low usage\' when temperature is below 18', function() {
      for (var i = 0; i < 3; i++) {
        thermostat.down();}
      expect(thermostat.energyUsage()).toEqual('Low Usage');
    });
    it('returns \'medium usage\' when temperature is below or equal to 24', function() {
        expect(thermostat.energyUsage()).toEqual('Medium Usage');
    });
    it('returns \'high usage\' when temperature is above 24 degrees', function() {
      for (var i = 0; i < 5; i++) {
        thermostat.up();}
      expect(thermostat.energyUsage()).toEqual('High Usage');
    });

  });
});
