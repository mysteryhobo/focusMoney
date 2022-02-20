import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';

import './Popup.css';

const itemImageLink =
  'https://multimedia.bbycastatic.ca/multimedia/products/500x500/148/14898/14898540.jpg';
// 'https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/139/13973/13973361.jpg';
const target = 400;
const itemName = 'Monitor';
const rewardsMap = [
  {
    title: 'Conscious Speaking',
    value: 0.5,
  },
  {
    title: '20min Session (1/2/3)',
    value: 1,
  },
  {
    title: '< 10min break',
    value: 1,
  },
  {
    title: 'Spaced Repetition',
    value: 5,
  },
  {
    title: 'Speaking Session',
    value: 5,
  },
];

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

  const addToTotal = (value) => {
    chrome.storage.local.set({
      total: total ? total + value : value,
    });
  };
  const subtractFromTotal = (value) => {
    chrome.storage.local.set({
      total: total ? total - value : 0,
    });
  };

  return (
    <div className="App">
      <h1>
        Progress to {itemName}: {`$${total || 0} / $${target}`}
      </h1>
      <ProgressBar
        completed={Math.floor((total / target) * 100)}
        bgColor="#3A6EA5"
        height={40}
      />

      <div className="main">
        <div className="priceContainer">
          {rewardsMap.map((currReward) => (
            <ButtonGroup className="buttonGroup">
              {/* <p>{currReward.title}</p> */}
              <Button
                color="error"
                size="large"
                variant="contained"
                onClick={() => subtractFromTotal(currReward.value)}
              >
                <ReplayIcon />
              </Button>
              <Button
                color="success"
                className="addButton"
                size="large"
                variant="contained"
                onClick={() => addToTotal(currReward.value)}
              >
                <span>
                  {currReward.title}
                  <br />
                  {/* (${currReward.value}/5min) */}
                  (${currReward.value})
                </span>
              </Button>
            </ButtonGroup>
          ))}
        </div>
        <div className="itemImageContainer">
          <ItemImage />
        </div>
      </div>

      {/* <Button
          color="error"
          size="large"
          variant="contained"
          onClick={subtractFromTotal}
        >
          {`-$${incrementValue}`}
        </Button>
        <Button
          color="success"
          size="large"
          variant="contained"
          onClick={() => addToTotal(incrementValue * 2)}
        >
          {`+Speaking (2$/5mins)`}
        </Button>
        <Button
          color="success"
          size="large"
          variant="contained"
          onClick={() => addToTotal(incrementValue)}
        >
          {`+Focus ($1/5mins)`}
        </Button>
      </div> */}
    </div>
  );
};

export default Popup;
