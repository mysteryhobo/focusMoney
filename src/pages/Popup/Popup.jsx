import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import './Popup.css';

const itemImageLink =
  'https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/139/13973/13973361.jpg';
const target = 340;
const itemName = 'Roomba';
const incrementValue = 0.5;

const Popup = () => {
  const [total, setTotal] = React.useState(0);
  console.log('running total: ', total);
  React.useEffect(() => {
    chrome.storage.local.get(['total'], function (items) {
      console.log('items:', items);
      if (items.total) setTotal(items.total);
    });

    chrome.storage.onChanged.addListener(function (changes, namespace) {
      console.log('CHANGES:', changes);
      if (changes.total) setTotal(changes.total.newValue);
    });
  }, []);

  const ItemImage = React.useMemo(
    () => () => <img src={itemImageLink} className="itemImage" />,
    []
  );

  const addToTotal = () => {
    chrome.storage.local.set({
      total: total ? total + incrementValue : incrementValue,
    });
  };
  const subtractFromTotal = () => {
    chrome.storage.local.set({
      total: total ? total - incrementValue : 0,
    });
  };

  return (
    <div className="App">
      <h1>
        Progess to {itemName}: {`$${total || 0} / $${target}`}
      </h1>
      <ProgressBar
        completed={Math.floor((total / target) * 100)}
        bgColor="#3A6EA5"
        height={40}
      />

      <div className="priceContainer">
        <Button color="success" size="large" onClick={addToTotal}>
          {`+ $${incrementValue}`}
        </Button>
        <Button color="error" size="large" onClick={subtractFromTotal}>
          {`- $${incrementValue}`}
        </Button>
      </div>
      <div className="itemImageContainer">
        <ItemImage />
      </div>
    </div>
  );
};

export default Popup;
