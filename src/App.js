import React from 'react'
import './App.css';
import axios from "axios"

function App() {

    const API_KEY = "153244c6906422656a4f";
    const baseUrl = "https://free.currconv.com";


    const [valueFr, setValueFr] = React.useState("USD");
    const [valueTo, setValueTo] = React.useState("RUB");
    const [valueCurrency, setCurrencyValue] = React.useState(null);
    const [multiplier, setMultiplier] = React.useState(null);

    const [currencies, setCurrencies] = React.useState([]);



    let requests = {
        fetchValue: baseUrl + `/api/v7/convert?q=${valueFr}_${valueTo}&compact=ultra&apiKey=${API_KEY}`,
        fetchList : baseUrl + `/api/v7/currencies?apiKey=${API_KEY}`
    };


    React.useEffect(() => {
        async function getData() {
            let request = await axios.get(requests.fetchList);
            setCurrencies(Object.keys(request.data.results))
        }

        getData()
    }, []);

    React.useEffect(() => {
        async function getValue() {
            let request = await axios.get(requests.fetchValue);
            setCurrencyValue(request.data[Object.keys(request.data)[0]])

        }
        getValue();
    }, [valueFr, valueTo]);


    let handleChangeFr = (event) => {
        setValueFr(event.target.value)
    };
    let handleChangeTo = (event) => {
        setValueTo(event.target.value)
    };
    let handleChangeMultiply = (event) => {
        setMultiplier(event.target.value)
    };

    return (
        <div className="App">
            <div className="title">
                Конвертатор Валют
            </div>
            <div className="converter_inputs">
                <div className="converter_input currency_from">
                    <label htmlFor="CURR-FR">Имеющаяся Валюта</label>
                    <input id="CURR-FR" value={multiplier} onChange={handleChangeMultiply} className="input_from"
                           type="text"/>
                    <select onChange={handleChangeFr}>
                        {currencies.map((item, index) => <option key={item + index} selected={item === "USD"}
                                                                 value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="converter_input currency_to">
                    <label htmlFor="CURR-TO">Нужная Валюта</label>
                    <input id="CURR-TO" value={Math.floor(valueCurrency * multiplier)} className="input_to"
                           type="text"/>
                    <select onChange={handleChangeTo}>
                        {currencies.map((item, index) => <option key={item + index} selected={item === "RUB"}
                                                                 value={item}>{item}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default App;
