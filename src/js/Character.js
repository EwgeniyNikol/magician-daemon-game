export default class Character {
  constructor(name, type, baseAttack = 100) {
    this.name = name;
    this.type = type;
    this.baseAttack = baseAttack;
    this._attack = baseAttack;
    this._stoned = false;
    this.distance = 1;
  }

  set attack(value) {
    this._attack = value;
  }

  get attack() {
    let attackValue = this._attack;
    const distanceMultiplier = this.getDistanceMultiplier(this.distance);
    attackValue *= distanceMultiplier;

    return Math.max(0, Math.round(attackValue * 100) / 100);
  }

  set stoned(value) {
    this._stoned = value;
  }

  get stoned() {
    return this._stoned;
  }

  setDistance(distance) {
    if (distance >= 1 && distance <= 5) {
      this.distance = distance;
    } else {
      throw new Error('Distance must be between 1 and 5');
    }
  }

  getDistanceMultiplier(distance) {
    const multipliers = {
      1: 1.0,
      2: 0.9,
      3: 0.8,
      4: 0.7,
      5: 0.6,
    };
    return multipliers[distance] || 1.0;
  }
}
