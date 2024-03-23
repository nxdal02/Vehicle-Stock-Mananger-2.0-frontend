import React, { useState } from 'react';
import axios from 'axios';

function AddCar() {
  const [newCar, setNewCar] = useState({ make: '', model: '', bodyType: '', seats: 0, price: 0 });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCar({ ...newCar, [name]: value });
  };

  function addCar(event) {
    axios.post('http://localhost:8080/api/v1/car/add', newCar)
      .then(() => {
        // Reset the new car form
        setNewCar({ make: '', model: '', bodyType: '', seats: 0, price: 0 });
      })
      .catch(error => {
        console.error('Error adding car:', error);
      });
  }

  return (
    <div>
      <h2>Add Car</h2>
      <form onSubmit={addCar}>
        <input type="text" name="make" placeholder="Make" value={newCar.make} onChange={handleInputChange} />
        <input type="text" name="model" placeholder="Model" value={newCar.model} onChange={handleInputChange} />
        <input type="text" name="bodyType" placeholder="Body Type" value={newCar.bodyType} onChange={handleInputChange} />
        <input type="number" name="seats" placeholder="Seats" value={newCar.seats} onChange={handleInputChange} />
        <input type="number" name="price" placeholder="Price" value={newCar.price} onChange={handleInputChange} />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default AddCar;