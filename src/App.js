import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CarList() {
   // State variables
   const [cars, setCars] = useState([]);
   const [newCar, setNewCar] = useState({ make: '', model: '', bodyType: '', seats: 0, price: 0 });
  function fetchCars() {
    axios.get('http://localhost:8080/api/v1/car/all')
      .then(response => {
        console.log(response.data); // for debug
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewCar({ ...newCar, [name]: value });
  }

  function addCar() {
    console.log(newCar);
    axios.post('http://localhost:8080/api/v1/car/add', newCar)
      .then(() => {
        // After adding the new car, fetch the updated list of cars
        fetchCars();
        // Reset the new car form
        setNewCar({ make: '', model: '', bodyType: '', seats: 0, price: 0 });
      })
      .catch(error => {
        console.error('Error adding car:', error);
      });
  }

  // Fetch the list of cars when the component mounts
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <h1>Cars</h1>
      {/* New car form */}
      <form onSubmit={addCar}>
        <input type="text" name="make" placeholder="Make" value={newCar.make} onChange={handleInputChange} />
        <input type="text" name="model" placeholder="Model" value={newCar.model} onChange={handleInputChange} />
        <input type="text" name="bodyType" placeholder="Body Type" value={newCar.bodyType} onChange={handleInputChange} />
        <input type="number" name="seats" placeholder="Seats" value={newCar.seats} onChange={handleInputChange} />
        <input type="number" name="price" placeholder="Price" value={newCar.price} onChange={handleInputChange} />
        <button type="submit">Add Car</button>
      </form>
      {/* Display the list of cars */}
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.make} - {car.model} - {car.bodyType} - Seats: {car.seats} - Price: {car.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;