import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createList } from '../../slices/listsSlice'; // Adjust the import path
import './AddListPopup.css';

// eslint-disable-next-line react/prop-types
const AddListPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) setCategory(data[0]); // Set default category
      } catch (err) {
        setError('Failed to load categories', err);
      }
    };
    
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (listName.trim() === '') {
      setError('List name cannot be empty');
      return;
    }

    const newList = { name: listName, category, items: [] };

    try {
      await dispatch(createList(newList)).unwrap(); // Dispatch the createList action
      onClose(); // Close the popup
    } catch (err) {
      setError('Failed to add list', err);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Add New List</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="listName">List Name</label>
            <input
              type="text"
              id="listName"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Enter list name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-btn">Add List</button>
        </form>
      </div>
    </div>
  );
};

export default AddListPopup;

