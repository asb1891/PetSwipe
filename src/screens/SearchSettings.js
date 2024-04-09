import React, { useState } from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchSettings = () => {
  const [searchParams, setSearchParams] = useState({
    Dog: false,
    Cat: false,
    Male: false,
    Female: false
  }); // Create an object to hold the searchParams

  const navigation = useNavigation(); // Pass the navigation function to the useNavigation hook

  //Search function to update the searchParams
  const handleSearch = async () => {
    const queryParams = Object.entries(searchParams)
      .filter(([key, value]) => value) // Filter for true values
      .map(([key, value]) => {
        if (key === 'Dog' || key === 'Cat') {
          return `type=${key}`;
        } else if (key === 'Male' && value) {
          return `gender=male`;
        } else if (key === 'Female' && value) {
          return `gender=female`;
        }
      })
      .join("&");

    navigation.navigate("Home", { queryParams });
  };
  // Update the searchParams when a checkbox is toggled
  const toggleSearchParam = (param) => {
    setSearchParams((currentParams) => ({
      ...currentParams,
      [param]: !currentParams[param],
    }));
  };

  // Helper component for a custom checkbox
  const CustomCheckbox = ({ value, onToggle, label }) => (
    <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
      <View style={[styles.checkboxBox, value && styles.checkboxChecked]}>
        {value && <Text style={styles.checkboxCheckmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomCheckbox
        label="Dogs"
        value={searchParams.Dog}
        onToggle={() => toggleSearchParam("Dog")}
      />
      <CustomCheckbox
        label="Cats"
        value={searchParams.Cat}
        onToggle={() => toggleSearchParam("Cat")}
      />
      <CustomCheckbox
        label="Male"
        value={searchParams.Male} // Make sure this matches the state key exactly
        onToggle={() => toggleSearchParam("Male")} // Pass the key as a string directly
      />
      <CustomCheckbox
        label="Female"
        value={searchParams.Female} // Make sure this matches the state key exactly
        onToggle={() => toggleSearchParam("Female")} // Pass the key as a string directly
      />
      <Button title="Update Search Filter" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  checkbox: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  checkboxBox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#000",
  },
  checkboxCheckmark: {
    color: "#fff",
  },
  label: {
    marginLeft: 8,
  },
});

export default SearchSettings;
