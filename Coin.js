import { useEffect, useState } from "react";
import styles from "./Coin.module.css";

function Coin() {
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(""); // 사용자가 입력한 금액
  const [selectedCoin, setSelectedCoin] = useState(""); // 선택한 코인
  const [coinsToBuy, setCoinsToBuy] = useState(0); // 구매할 코인의 개수

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
      });
  }, []);

  const handleMoneyChange = (event) => {
    setMoney(event.target.value);
  };

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
  };

  useEffect(() => {
    if (money && selectedCoin) {
      const selectedCoinData = coins.find((coin) => coin.name === selectedCoin);
      if (selectedCoinData) {
        const price = selectedCoinData.quotes.USD.price;
        const coinsToBuy = money / price;
        setCoinsToBuy(coinsToBuy);
      }
    }
  }, [money, selectedCoin, coins]);

  return (
    <div className={styles.div}>
      <h1>The Coins! </h1>

      <h3>Your Money</h3>
      <input
        type="number"
        placeholder="money($)"
        value={money}
        onChange={handleMoneyChange}
      />

      <h3>Choose the coin you want</h3>
      <select value={selectedCoin} onChange={handleCoinChange}>
        <option value={""}>Select a coin</option>
        {coins.map((coin) => (
          <option key={coin.id}>{coin.name}</option>
        ))}
      </select>

      {selectedCoin && (
        <h3>
          You can get {coinsToBuy} {selectedCoin} Coin(s)
        </h3>
      )}
    </div>
  );
}

export default Coin;
