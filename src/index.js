import './styles.css';
import Magician from './js/Magician';
import Daemon from './js/Daemon';

const magician = new Magician('Gandalf');
const daemon = new Daemon('Balrog');

let magicianPos = { x: 1, y: 2 };
let daemonPos = { x: 3, y: 2 };
let selected = 'magician';

function getDistance() {
  return Math.abs(magicianPos.x - daemonPos.x) + Math.abs(magicianPos.y - daemonPos.y);
}

function updateDisplay() {
  const dist = getDistance();
  const gameDist = Math.min(dist, 5);

  magician.setDistance(gameDist);
  daemon.setDistance(gameDist);

  const magBase = magician.attack;
  const daemonBase = daemon.attack;

  let magFinal = magBase;
  let daemonFinal = daemonBase;

  const debuffValue = Math.log2(gameDist + 1) * 5;

  if (magician.stoned) {
    daemonFinal = daemonBase - debuffValue;
  }

  if (daemon.stoned) {
    magFinal = magBase - debuffValue;
  }

  magFinal = Math.max(0, Math.round(magFinal * 100) / 100);
  daemonFinal = Math.max(0, Math.round(daemonFinal * 100) / 100);

  const grid = document.getElementById('gameGrid');
  grid.innerHTML = '';

  function createCell(x, y) {
    const cell = document.createElement('div');
    cell.className = 'cell';

    if (magicianPos.x === x && magicianPos.y === y) {
      cell.classList.add('magician');
      cell.textContent = '🧙';
    } else if (daemonPos.x === x && daemonPos.y === y) {
      cell.classList.add('daemon');
      cell.textContent = '👿';
    }

    cell.onclick = function clickHandler() {
      if (selected === 'magician') {
        if (daemonPos.x === x && daemonPos.y === y) return;
        magicianPos = { x, y };
      } else {
        if (magicianPos.x === x && magicianPos.y === y) return;
        daemonPos = { x, y };
      }
      updateDisplay();
    };

    return cell;
  }

  for (let y = 0; y < 5; y += 1) {
    for (let x = 0; x < 5; x += 1) {
      grid.appendChild(createCell(x, y));
    }
  }

  const multipliers = {
    1: 1.0,
    2: 0.9,
    3: 0.8,
    4: 0.7,
    5: 0.6,
  };
  const mult = multipliers[gameDist];

  let magText = 'База: 100\n';
  magText += `Расстояние ${gameDist} → ×${mult}\n`;
  magText += `После расстояния: ${magBase}\n`;

  if (daemon.stoned) {
    const debuff = Math.log2(gameDist + 1) * 5;
    magText += `👿 Демон насылает дурман: -${debuff.toFixed(2)}\n`;
  }
  magText += `Итоговая атака мага: ${magFinal}`;

  let daemonText = 'База: 100\n';
  daemonText += `Расстояние ${gameDist} → ×${mult}\n`;
  daemonText += `После расстояния: ${daemonBase}\n`;

  if (magician.stoned) {
    const debuff = Math.log2(gameDist + 1) * 5;
    daemonText += `🧙 Маг насылает дурман: -${debuff.toFixed(2)}\n`;
  }
  daemonText += `Итоговая атака демона: ${daemonFinal}`;

  document.getElementById('magicianAttack').textContent = magFinal;
  document.getElementById('daemonAttack').textContent = daemonFinal;
  document.getElementById('distance').textContent = gameDist;
  document.getElementById('magicianStoned').textContent = magician.stoned ? '✅' : '❌';
  document.getElementById('daemonStoned').textContent = daemon.stoned ? '✅' : '❌';
  document.getElementById('magicianCalc').innerHTML = magText.replace(/\n/g, '<br>');
  document.getElementById('daemonCalc').innerHTML = daemonText.replace(/\n/g, '<br>');

  const magicianBtn = document.getElementById('magicianStonedBtn');
  const daemonBtn = document.getElementById('daemonStonedBtn');

  magicianBtn.textContent = magician.stoned ? '✨ Снять дурман мага' : '🧪 Дурман мага';
  daemonBtn.textContent = daemon.stoned ? '✨ Снять дурман демона' : '🧪 Дурман демона';
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'm') {
    selected = 'magician';
    updateDisplay();
  }
  if (key === 'd') {
    selected = 'daemon';
    updateDisplay();
  }
});

document.getElementById('magicianStonedBtn').onclick = () => {
  magician.stoned = !magician.stoned;
  updateDisplay();
};

document.getElementById('daemonStonedBtn').onclick = () => {
  daemon.stoned = !daemon.stoned;
  updateDisplay();
};

document.getElementById('resetBtn').onclick = () => {
  magicianPos = { x: 1, y: 2 };
  daemonPos = { x: 3, y: 2 };
  magician.stoned = false;
  daemon.stoned = false;
  selected = 'magician';
  updateDisplay();
};

updateDisplay();
