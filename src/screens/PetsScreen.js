// import React, { useState, useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import Swiper from 'react-native-deck-swiper';
// import { fetchPets } from '../api';
// import PetCard from './components/PetCard'

// const PetsScreen = () => {
//     const [pets, setPets] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadPets = async () => {
//             try {
//                 const fetchedPets = await fetchPets();
//                 setPets(fetchedPets);
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadPets();
//     }, []);

//     if (loading) {
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     return (
//         <View>
//             <Swiper 
//                 cards={pets}
//                 renderCard={(pet) => <PetCard pet={pet} />}
//             />
//         </View>
//     );
// };

// export default PetsScreen;
