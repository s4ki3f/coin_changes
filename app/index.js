import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const [billAmount, setBillAmount] = useState('');
  const [change, setChange] = useState([]);

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
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Coin Changes</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: 200 }}
        placeholder="Enter bill amount"
        keyboardType="numeric"
        value={billAmount}
        onChangeText={setBillAmount}
      />
      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
        onPress={calculateChange}
      >
        <Text style={{ color: 'white' }}>Calculate Change</Text>
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
    </View>
  );
};

export default Home;
