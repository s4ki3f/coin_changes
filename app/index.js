import React, { useState, useRef } from 'react';
import { Text, TextInput, TouchableOpacity, View, Modal, StyleSheet } from 'react-native';

/**
 * Home component for the Coin Changes app.
 * @returns {JSX.Element} The Home component.
 */
const Home = () => {
  const [billAmount, setBillAmount] = useState('');
  const [change, setChange] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const billAmountRef = useRef(null);

  /**
   * Calculates the change for the given bill amount and updates the state with the calculated change.
   */
  const calculateChange = () => {
    const denominations = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
    let remainingAmount = billAmount;
    const calculatedChange = denominations.reduce((acc, denomination) => {
      const count = Math.floor(remainingAmount / denomination);
      remainingAmount -= count * denomination;
      if (count > 0) {
        acc.push({ denomination, count });
      }
      return acc;
    }, []);
    setChange(calculatedChange);
    setHistory([...history, { billAmount, change: calculatedChange }]);
    billAmountRef.current.clear();
  };

  /**
   * Clears the bill amount and change history.
   */
  const clearAll = () => {
    setBillAmount('');
    setChange([]);
    setHistory([]);
    billAmountRef.current.clear();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Coin Changes</Text>
      <TextInput
        ref={billAmountRef}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: 200 }}
        placeholder="Enter bill amount"
        keyboardType="numeric"
        value={billAmount}
        onChangeText={setBillAmount}
      />
      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginBottom: 10 }}
        onPress={calculateChange}
      >
        <Text style={{ color: 'white' }}>Calculate Change</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}
        onPress={clearAll}
      >
        <Text style={{ color: 'white' }}>Clear All</Text>
      </TouchableOpacity>
      {change.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Change:</Text>
          {change.map(({ denomination, count }) => (
            <Text key={denomination} style={{ fontSize: 16 }}>
              {count} x {denomination} &#2547;
            </Text>
          ))}
        </View>
      )}
      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, marginTop: 20 }}
        onPress={() => setShowHistory(!showHistory)}
      >
        <Text style={{ color: 'white' }}>Show History</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showHistory}
        onRequestClose={() => setShowHistory(false)}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowHistory(false)}
          >
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18 }}>History:</Text>
            {history.map(({ billAmount, change }, index) => (
              <View key={index} style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 16 }}>Bill Amount: {billAmount}</Text>
                <Text style={{ fontSize: 16 }}>Change:</Text>
                {change.map(({ denomination, count }) => (
                  <Text key={denomination} style={{ fontSize: 16 }}>
                    {count} x {denomination} &#2547;
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Home;
