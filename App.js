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
    let lastNumber = parseFloat(splitNumbers[2]);
  
    // Calcular a porcentagem
    if (operator === '%') {
      lastNumber = firstNumber * (lastNumber / 100);
    }
  
    // Executar a ação referente à tecla pressionada
    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + lastNumber).toString());
        break;
      case '-':
        setCurrentNumber((firstNumber - lastNumber).toString());
        break;
      case 'x':
        setCurrentNumber((firstNumber * lastNumber).toString());
        break;
      case '/':
        setCurrentNumber((firstNumber / lastNumber).toString());
        break;
      case '%':
        setCurrentNumber(lastNumber.toString());
        break;
    }
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
        calculator();
        // Exibir o resultado com duas casas decimais
        setCurrentNumber(parseFloat(currentNumber).toFixed(2).toString());
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
        // Converter o valor em formato de porcentagem para decimal
        setCurrentNumber((parseFloat(currentNumber) / 100).toString());
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
    backgroundColor: '#f5f5f5',
  },
  resultText: {
    color: '#282F38',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText: {
    color: '#7c7c7c',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: '#7c7c7c',
    fontSize: 20,
  },
});
