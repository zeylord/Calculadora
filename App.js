import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, 'x', 6, 5, 4, '-', 3, 2, 1, '+', 0, '.', '+/-', '='];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const operator = splitNumbers[1];
    let secondNumber = parseFloat(splitNumbers[2]);

    // Calcular a porcentagem
    if (operator === '%') {
      secondNumber = firstNumber * (secondNumber / 100);
    }

    let result;
    // Executar a ação referente à tecla pressionada
    switch (operator) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case 'x':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;
      default:
        return;
    }

    return result;
  }

  function handleInput(buttonPressed) {
    console.log(buttonPressed); // Mostra no Console a tecla pressionada

    if (['+', '-', 'x', '/'].includes(buttonPressed)) {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
      return;
    }

    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 2));
        break;
      case 'LIMPAR':
        setLastNumber('');
        setCurrentNumber('');
        break;
      case '=':
        setLastNumber(currentNumber + ' = ');
        const result = calculator();
        // Exibir o resultado com duas casas decimais
        setCurrentNumber(result.toFixed(2).toString());
        break;
      case '+/-':
        setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        break;
      case '.':
        if (!currentNumber.includes('.')) {
          setCurrentNumber(currentNumber + '.');
        }
        break;
      case '%':
        const convertedNumber = (parseFloat(currentNumber) / 100).toString();
        setCurrentNumber(convertedNumber);
        break;
      default:
        setCurrentNumber(currentNumber + buttonPressed);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' ? (
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={[styles.button, { backgroundColor: '#3dd0e3' }]}
            >
              <Text style={[styles.textButton, { color: 'white', fontSize: 30 }]}>{button}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
              <Text
                style={[
                  styles.textButton,
                  { color: typeof button === 'number' ? 'black' : '#0093a6' },
                ]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#2C1A3D',
  },
  resultText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText: {
    color: '#FFFFFF',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#4B0082',
  },
  button: {
    backgroundColor: '#4B0082',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 90,
    flex: 2,
    color: 'white'
  },
  textButton: {
    color: 'white',
    fontSize: 20,
  },
});
