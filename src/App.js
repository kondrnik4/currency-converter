import React from 'react'
import './App.css';
import axios from "axios"

function App() {

    const API_KEY = "153244c6906422656a4f";
    const API_KEY_FIXER = "c4d905ebf5adf697aa4f75772badab0e";
    const baseUrl = "https://free.currconv.com";


    const [valueFr, setValueFr] = React.useState("USD");
    const [valueTo, setValueTo] = React.useState("RUB");
    const [valueCurrency, setCurrencyValue] = React.useState(null);
    const [multiplier, setMultiplier] = React.useState(null);

    const [currencies, setCurrencies] = React.useState([]);



    let requests = {
        fetchValue : baseUrl + `/api/v7/convert?q=${valueFr}_${valueTo}&compact=ultra&apiKey=${API_KEY}`,
        fetchLatest: `http://data.fixer.io/api/latest?access_key=${API_KEY_FIXER}`
    };


    React.useEffect ( ()=> {
        async function getData() {
            let request = await axios.get(requests.fetchLatest);
            setCurrencies(Object.keys(request.data.rates))

        }
        getData()
    }, []);

    React.useEffect(() => {
        async function getValue() {
            let request = await axios.get(requests.fetchValue);
            setCurrencyValue(request.data[Object.keys(request.data)[0]])

        }

        getValue();
    }, [valueFr,valueTo]);


    let handleChangeFr = (event) => {
        setValueFr(event.target.value)
    };
    let handleChangeTo = (event) => {
        setValueTo(event.target.value)
    };
    let handleChangeMultiply = (event) => {
        setMultiplier(event.target.value)
    };


    console.log(valueFr);
    console.log(valueTo);
    return (
        <div className="App">
            <div className="title">
                Конвертатор Валют
            </div>
            <div className="converter_inputs">
                <div className="converter_input currency_from">
                    <label htmlFor="CURR-FR">Имеющаяся Валюта</label>
                    <input id="CURR-FR" value={multiplier} onChange={handleChangeMultiply}  className="input_from" type="text"/>
                    <select  onChange={handleChangeFr}>
                        {currencies.map((item, index) => <option  key={item+index} selected={item === "USD"} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="converter_input currency_to">
                    <label htmlFor="CURR-TO">Нужная Валюта</label>
                    <input id="CURR-TO" value={Math.floor(valueCurrency * multiplier)}  className="input_to" type="text"/>
                    <select  onChange={handleChangeTo}>

                        {currencies.map((item, index) => <option key={item+index} selected={item === "RUB"} value={item} >{item}</option>)}

                    </select>
                </div>
            </div>
        </div>
    );
};

export default App;
