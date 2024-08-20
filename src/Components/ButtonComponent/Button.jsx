import './Button.css';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

// eslint-disable-next-line react/prop-types
const AddButton = ({ onAdd, onClear }) => {
  return (
    <div className='addButton'>
      <button className='Btn' onClick={onAdd}>
        <AddIcon /> ADD AN ITEM
      </button>
      <button className='Btn2' onClick={onClear}>
        <ClearIcon /> CLEAR LIST
      </button>
    </div>
  );
};

export default AddButton;
