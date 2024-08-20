import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateList, deleteList } from '../../slices/listsSlice';
import './ListCrudPopup.css';

const ListCrudPopup = ({ list, onClose }) => {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState('');
  const [editedItem, setEditedItem] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleAddItem = () => {
    if (newItem) {
      const updatedList = { ...list, items: [...list.items, newItem] };
      dispatch(updateList(updatedList));
      setNewItem('');
    }
  };

  const handleEditItem = () => {
    if (selectedItemIndex !== null && editedItem) {
      const updatedList = {
        ...list,
        items: list.items.map((item, index) =>
          index === selectedItemIndex ? editedItem : item
        ),
      };
      dispatch(updateList(updatedList));
      setEditedItem('');
      setSelectedItemIndex(null);
    }
  };

  const handleDeleteItem = (index) => {
    const updatedList = {
      ...list,
      items: list.items.filter((_, i) => i !== index),
    };
    dispatch(updateList(updatedList));
  };

  return (
    <div className="listCrudPopup">
      <button onClick={onClose} className="closeButton">X</button>
      <h2>Manage Items in {list.name}</h2>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      {list.items.length > 0 && (
        <ul>
          {list.items.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
              <button onClick={() => { setSelectedItemIndex(index); setEditedItem(item); }}>Edit</button>
              <button onClick={() => handleDeleteItem(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {selectedItemIndex !== null && (
        <div>
          <input
            type="text"
            value={editedItem}
            onChange={(e) => setEditedItem(e.target.value)}
            placeholder="Edit item"
          />
          <button onClick={handleEditItem}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default ListCrudPopup;
