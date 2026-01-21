// Функция для генерации случайного числа в диапазоне [-100, 100]
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Создание двумерного массива 10x10
function create2DArrayWithRandomNumbers() {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr[i] = [];
    for (let j = 0; j < 10; j++) {
      arr[i][j] = getRandomInt(-100, 100);
    }
  }
  return arr;
}

// Поиск строки с min числом
function findRowWithMinNumber(arr) {
  let minValue = Infinity;
  let minRowIndex = -1;
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] < minValue) {
        minValue = arr[i][j];
        minRowIndex = i;
      }
    }
  }
  
  return { minValue, minRowIndex };
}

// Функция для подсчета минимального количества замен
function countReplacements(row) {
  let replacements = 0;
  
  for (let i = 0; i < row.length - 2; i++) {
    const num1 = row[i];
    const num2 = row[i + 1];
    const num3 = row[i + 2];
    
    // Проверка на 3 положительных числа подряд
    const threePositive = num1 > 0 && num2 > 0 && num3 > 0;
    // Проверка на 3 отрицательных числа подряд
    const threeNegative = num1 < 0 && num2 < 0 && num3 < 0;
    
    if (threePositive || threeNegative) {
      replacements++;
      // увеличиваем i на 2, т.к. уже проверили два следующих за индексом числа
      i += 2;
    }
  }
  
  return replacements;
}

// Выводим в консоль двумерный массив
function log2DArray(arr) {
  const { minValue, minRowIndex } = findRowWithMinNumber(arr);

  console.log('Двумерный массив 10x10:');
  console.log('─'.repeat(60));
  
  arr.forEach((row, index) => {
    const rowFormatted = row.map(num => {
      return num.toString().padStart(4, ' ');
    }).join(' ');

    // Добавляем * к min числу
    const marker = index === minRowIndex ? ' *' : '  ';

    // Находим наименьшее положительное число в строке
    const positiveNumbers = row.filter(num => num > 0);
    const minPositive = positiveNumbers.length > 0 
      ? Math.min(...positiveNumbers) 
      : null;
    
    const minPositiveStr = minPositive !== null 
      ? ` | Мин. полож.: ${minPositive}` 
      : ' | Мин. полож.: нет';

    // Кол-во необходимых замен
    const replacements = countReplacements(row);
    const replacementsStr = ` | Замен: ${replacements}`;

    console.log(`${rowFormatted}${marker}${minPositiveStr}${replacementsStr}`);
  });
  
  console.log('─'.repeat(60));
  console.log(`\n* - строка с минимальным числом (${minValue})`);
}

const arr2D = create2DArrayWithRandomNumbers();

log2DArray(arr2D);