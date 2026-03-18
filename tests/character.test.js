import Character from '../src/js/Character';
import Magician from '../src/js/Magician';
import Daemon from '../src/js/Daemon';

describe('Character class', () => {
  test('should create character with correct properties', () => {
    const character = new Character('Test', 'Magician', 100);
    expect(character.name).toBe('Test');
    expect(character.type).toBe('Magician');
    expect(character.baseAttack).toBe(100);
    expect(character.stoned).toBe(false);
    expect(character.distance).toBe(1);
  });

  test('should calculate attack without stoned correctly', () => {
    const character = new Character('Test', 'Magician', 100);

    character.distance = 1;
    expect(character.attack).toBe(100);

    character.distance = 2;
    expect(character.attack).toBe(90);

    character.distance = 3;
    expect(character.attack).toBe(80);

    character.distance = 4;
    expect(character.attack).toBe(70);

    character.distance = 5;
    expect(character.attack).toBe(60);
  });

  test('should calculate attack with stoned correctly', () => {
    const character = new Character('Test', 'Magician', 100);
    character.stoned = true;

    character.distance = 2;
    expect(character.attack).toBe(90);
  });

  test('should handle negative attack values', () => {
    const character = new Character('Test', 'Magician', 10);
    character.stoned = true;
    character.distance = 5;
    expect(character.attack).toBe(6);
  });

  test('should set distance correctly', () => {
    const character = new Character('Test', 'Magician', 100);
    character.setDistance(3);
    expect(character.distance).toBe(3);
  });

  test('should throw error for invalid distance', () => {
    const character = new Character('Test', 'Magician', 100);
    expect(() => character.setDistance(0)).toThrow('Distance must be between 1 and 5');
    expect(() => character.setDistance(6)).toThrow('Distance must be between 1 and 5');
  });

  test('should get and set stoned correctly', () => {
    const character = new Character('Test', 'Magician', 100);
    expect(character.stoned).toBe(false);

    character.stoned = true;
    expect(character.stoned).toBe(true);

    character.stoned = false;
    expect(character.stoned).toBe(false);
  });

  test('should get and set attack correctly', () => {
    const character = new Character('Test', 'Magician', 100);
    character.attack = 150;
    expect(character._attack).toBe(150);
  });

  test('should get correct distance multiplier', () => {
    const character = new Character('Test', 'Magician', 100);
    expect(character.getDistanceMultiplier(1)).toBe(1.0);
    expect(character.getDistanceMultiplier(2)).toBe(0.9);
    expect(character.getDistanceMultiplier(3)).toBe(0.8);
    expect(character.getDistanceMultiplier(4)).toBe(0.7);
    expect(character.getDistanceMultiplier(5)).toBe(0.6);
    expect(character.getDistanceMultiplier(6)).toBe(1.0);
  });
});

describe('Magician class', () => {
  test('should create Magician with correct properties', () => {
    const magician = new Magician('Gandalf');
    expect(magician.name).toBe('Gandalf');
    expect(magician.type).toBe('Magician');
    expect(magician.baseAttack).toBe(100);
    expect(magician).toBeInstanceOf(Character);
  });

  test('should calculate Magician attack correctly', () => {
    const magician = new Magician('Gandalf');
    magician.distance = 2;
    magician.stoned = true;
    expect(magician.attack).toBe(90);
  });
});

describe('Daemon class', () => {
  test('should create Daemon with correct properties', () => {
    const daemon = new Daemon('Balrog');
    expect(daemon.name).toBe('Balrog');
    expect(daemon.type).toBe('Daemon');
    expect(daemon.baseAttack).toBe(100);
    expect(daemon).toBeInstanceOf(Character);
  });

  test('should calculate Daemon attack correctly', () => {
    const daemon = new Daemon('Balrog');
    daemon.distance = 3;
    daemon.stoned = true;
    expect(daemon.attack).toBe(80);
  });
});
