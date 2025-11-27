import React, { useEffect, useState } from "react";
import axios from "axios";

function Getbikes() {
  const serverUrl = import.meta.env.backendUrl;
  const [bikes, setBikes] = useState([]);
  const [editingBike, setEditingBike] = useState(null);
  const [newBike, setNewBike] = useState({
    bikename: "",
    bikeprice: "",
    bikecolor: "",
  });

  useEffect(() => {
    const getbikes = async () => {
      try {
        const response = await axios.get(`${serverUrl}/getbikes`);
        setBikes(response.data.reverse());
      } catch (err) {
        console.error("Error fetching bikes:", err);
      }
    };
    getbikes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBike({
      ...newBike,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/newbike`, newBike);
      setBikes(response.data.reverse());
      setNewBike({
        bikename: "",
        bikeprice: "",
        bikecolor: "",
      });
    } catch (err) {
      console.error("Error adding bike:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${serverUrl}/deletebike/${id}`);
      setBikes(response.data.reverse());
    } catch (err) {
      console.error("Error deleting bike:", err);
    }
  };

  const handleEdit = (bike) => {
    setEditingBike(bike._id);
    setNewBike({
      bikename: bike.bikename,
      bikeprice: bike.bikeprice,
      bikecolor: bike.bikecolor,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${serverUrl}/updatebike/${editingBike}`, newBike);
      setBikes(response.data.reverse());
      setEditingBike(null);
      setNewBike({
        bikename: "",
        bikeprice: "",
        bikecolor: "",
      });
    } catch (err) {
      console.error("Error updating bike:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h4 style={{ marginBottom: "20px", textAlign: "center" }}>{editingBike ? "Edit Bike" : "Add New Bike"}</h4>
      <form
        onSubmit={editingBike ? handleUpdate : handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          name="bikename"
          value={newBike.bikename}
          onChange={handleInputChange}
          required
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="Price"
          name="bikeprice"
          value={newBike.bikeprice}
          onChange={handleInputChange}
          required
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="Color"
          name="bikecolor"
          value={newBike.bikecolor}
          onChange={handleInputChange}
          required
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: editingBike ? "green" : "black",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          {editingBike ? "Update Bike" : "Add Bike"}
        </button>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
        }}
      >
        {bikes.length > 0 ? (
          bikes.map((bike, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
                textAlign: "center",
              }}
            >
              <h5 style={{ margin: "10px 0", fontSize: "16px" }}>{bike.bikename}</h5>
              <p style={{ margin: "5px 0", fontSize: "14px" }}><strong>Price:</strong> {bike.bikeprice}</p>
              <p style={{ margin: "5px 0", fontSize: "14px" }}><strong>Color:</strong> {bike.bikecolor}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleEdit(bike)}
                >
                  Edit
                </button>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleDelete(bike._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>No bikes found.</p>
        )}
      </div>
    </div>
  );
}

export default Getbikes;
