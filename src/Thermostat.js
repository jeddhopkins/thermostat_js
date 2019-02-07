function Thermostat() {
  this.MINIMUM_TEMPERATURE = 10;
  this.temp = 20;
  this.powerSaving = true;
};

Thermostat.prototype.up = function () {
  this._errorAtMaximum();
  this.temp++;
};

Thermostat.prototype.down = function () {
  this._errorAtMinimum();
  this.temp--;
};

Thermostat.prototype.powerSavingOff = function () {
  this.powerSaving = false;
};

Thermostat.prototype.powerSavingOn = function () {
  this._resetTo25();
  this.powerSaving = true;
};

Thermostat.prototype.reset = function () {
  this.temp = 20
};

Thermostat.prototype.energyUsage = function () {
  if (this.temp < 18) { return 'Low Usage' };
  if (this.temp <= 24) { return 'Medium Usage' };
  return 'High Usage';
};

Thermostat.prototype._errorAtMinimum = function () {
  if (this.temp === this.MINIMUM_TEMPERATURE) { throw new Error('Temperature cannot go below 10 degrees!'); }
};

Thermostat.prototype._errorAtMaximum = function () {
  if (this.powerSaving ) {
    if (this.temp === 25) { throw new Error('Temperature cannot go above 25 degrees when power saving mode is on!'); } }
  else {
    if (this.temp === 32) { throw new Error('Temperature cannot go above 32 degrees when power saving mode is off!'); };
  };
};

Thermostat.prototype._resetTo25 = function () {
  if (this.temp > 25 ) { this.temp = 25 }
};
