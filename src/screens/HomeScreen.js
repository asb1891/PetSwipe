import { ActivityIndicator, Text, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import PetSwiper from "./components/PetCard";
import useAuth from "../../hooks/useAuth";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation, route }) => {
  const [pets, setPets] = useState([]); //Pets array
  const { logout } = useAuth(); //Pass the logout function to the useAuth hook
  const [isFetchingMore, setIsFetchingMore] = useState(false); //Fetching more pets indicator
  const [page, setPage] = useState(1); //Current page number

  const fetchPets = async (pageNumber = 1, queryParams = "") => {
    setIsFetchingMore(true); // Set the fetching more indicator to true
    const params = new URLSearchParams(queryParams); // Create a new URLSearchParams object
    params.set("page", pageNumber); // Use `set` to ensure the page number is always set correctly

    //the local ip address changes based on the WIFI connection
    //use ifconfig to get your local IP address on macOS
    //remember to switch back to IP addresss of the apartment
    const localIP = "192.168.1.92"; // Use your local IP address
    const url = `http://${localIP}:4000/api/pets?${params.toString()}`; // Create the URL to fetch the pets from

    console.log(`Fetching pets from: ${url}`);

    try {
      const response = await fetch(url); // Fetch the pets
      const data = await response.json(); // Parse the JSON response
      setPets((prevPets) => (pageNumber === 1 ? data : [...prevPets, ...data])); // Add the new pets to the pets array
      setPage((prevPage) => (data.length > 0 ? pageNumber : prevPage)); // Set the page number to 1 if there are no more pets
    } catch (error) {
      console.error("Error fetching pets: ", error);
    } finally {
      setIsFetchingMore(false);
    }
  };
  // Effect for initial fetch and when search parameters change
  useEffect(() => {
    const queryParams = route.params?.queryParams || ""; // Get the search parameters from the route
    fetchPets(1, queryParams); // Fetch the pets with the search parameters
    // Reset the pets array and page state when search parameters change
    return () => {
      setPets([]);
      setPage(1);
    };
  }, [route.params?.queryParams]); // Only re-run the effect when the search parameters change

  // Function to fetch more pets when nearing end of the swiper stack
  const fetchMorePets = () => {
    // Increment the page number and fetch more pets
    if (!isFetchingMore && page > 1) {
      fetchPets(page); // Fetch more pets
    }
  };
  // Function to handle swiping to fetch more pets when nearing end of the swiper
  const handleSwipe = (cardIndex) => {
    // Fetch more pets when nearing the end of the swiper stack
    if (cardIndex === pets.length - 10) {
      fetchMorePets();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isFetchingMore ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View className="flex-1 justify-between">
          <View className="flex-row justify-between items-center px-4 mt-4 mb-2">
            <View className="flex-row items-center">
              <Ionicons
                name="arrow-back"
                size={30}
                color="red"
                style={{ marginRight: 8 }}
              />
              <Text className="text-lg font-bold text-gray-800">
                Left For Next
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-lg font-bold text-gray-800">
                Right To Save
              </Text>
              <Ionicons
                name="arrow-forward"
                size={30}
                color="green"
                style={{ marginLeft: 8 }}
              />
            </View>
          </View>
          {pets.length > 0 ? (
            <View className="flex-1 justify-center items-center">
              <PetSwiper pets={pets} />
            </View>
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-lg">No pets available.</Text>
            </View>
          )}
          <View style={{ height: 100 }} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
