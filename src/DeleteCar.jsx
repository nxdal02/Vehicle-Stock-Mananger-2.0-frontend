import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteCar() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

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

  function deleteCar(id){
    axios.delete(`http://localhost:8080/api/v1/car/${id}`)
    .then(() => {
      fetchCars();
    })
    .catch(error => {
      console.error('Error deleteting car: ', error);
    });
  }

  return (
    <div>
      <h2>Delete Car</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            id: {car.id} - {car.make} - {car.model} - seats: {car.seats} - price: {car.price}
            <button onClick={() => deleteCar(car.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteCar;