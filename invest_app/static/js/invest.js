

function creatBalanceFormGroup (updateCallback, name) {
    // Define Form group.
    FgCallback = (data) => {
        let dataObj = {
            'name': name
        }
        dataObj['value'] = data['value'];
        console.log("balanceFg Callback: " + JSON.stringify(data));
        updateCallback(dataObj);
    }

    let fgProps = {
        label:       "Start Balance",
        type:        "number",
        placeholder: "1000",
        small_text:  "Initial starting balance (USD)",
        class: "form-control-sm"
    }
    fgProps['callback'] = this.FgCallback

    let fgObj = React.createElement(InputFormGroup, fgProps, null);
    return(fgObj);
}

function creatStockFormGroup (updateCallback, name) {
    // Define Form group.
    FgCallback = (data) => {
        let dataObj = {
            'name': name
        }
        dataObj['value'] = data['value'];
        console.log("balanceFg Callback: " + JSON.stringify(data));
        updateCallback(dataObj);
    }

    let fgProps = {
        label:       "Stock",
        type:        "text",
        select_options: ["SPY", "TSLA"],
        small_text:  "Stock symbol",
        class: "form-control-sm"
    }
    fgProps['callback'] = this.FgCallback

    
    let fgObj = React.createElement(SelectFormGroup, fgProps, null);
    return(fgObj);
}

function creatBuyThresholdFormGroup (updateCallback, name) {
    // Define Form group.
    FgCallback = (data) => {
        let dataObj = {
            'name': name
        }
        dataObj['value'] = data['value'];
        console.log("buyThreshold Callback: " + JSON.stringify(data));
        updateCallback(dataObj);
    }

    let fgProps = {
        label:       "Buy Threshold",
        type:        "number",
        placeholder: "1.0",
        small_text:  "% price change triggers a buy",
        class: "form-control-sm col-md-6"
    }
    fgProps['callback'] = this.FgCallback

    let fgObj = React.createElement(InputFormGroup, fgProps, null);
    return(fgObj);
}

function creatSellThresholdFormGroup (updateCallback, name) {
    // Define Form group.
    FgCallback = (data) => {
        let dataObj = {
            'name': name
        }
        dataObj['value'] = data['value'];
        console.log("buyThreshold Callback: " + JSON.stringify(data));
        updateCallback(dataObj);
    }

    let fgProps = {
        label:       "Sell Threshold",
        type:        "number",
        placeholder: "1.0",
        small_text:  "% price change triggers a sell",
        class: "form-control-sm col-md-6"
    }
    fgProps['callback'] = this.FgCallback

    let fgObj = React.createElement(InputFormGroup, fgProps, null);
    return(fgObj);
}

function buyBatchFormGroup (updateCallback, name) {
    // Define Form group.
    FgCallback = (data) => {
        let dataObj = {
            'name': name
        }
        dataObj['value'] = data['value'];
        console.log("buyThreshold Callback: " + JSON.stringify(data));
        updateCallback(dataObj);
    }

    let fgProps = {
        label:       "Buy batch",
        type:        "number",
        placeholder: "5",
        small_text:  "Largest batch size to buy",
        class: "form-control-sm col-md-4"
    }
    fgProps['callback'] = this.FgCallback

    let fgObj = React.createElement(InputFormGroup, fgProps, null);
    return(fgObj);
}

function sellBatchFormGroup (updateCallback, name) {
    // Define Form group.
    FgCallback = (data) => {
        let dataObj = {
            'name': name
        }
        dataObj['value'] = data['value'];
        console.log("buyThreshold Callback: " + JSON.stringify(data));
        updateCallback(dataObj);
    }

    let fgProps = {
        label:       "Sell batch",
        type:        "number",
        placeholder: "5",
        small_text:  "Largest batch size to sell",
        class: "form-control-sm col-md-4"
    }
    fgProps['callback'] = this.FgCallback

    let fgObj = React.createElement(InputFormGroup, fgProps, null);
    return(fgObj);
}


class InputForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            start_balance: 1000,
            buy_threshold: 1.0,
            sell_threshold: 1.0,
            stock_price: 240,
            buy_batch: 50,
            sell_batch: 50,
            transactions: 100000,
            stock: 'spy'
        };
    }

    formGroupCallback = (data) => {
        console.log("SetValue Callback: " + JSON.stringify(data));
        let key = data['name'];
        switch(key) {
            case "start_balance":
                this.setState({start_balance: data['value']});
                break;
            case "buy_threshold":
                this.setState({buy_threshold: data['value']});
                break;
            case "sell_threshold":
                this.setState({sell_threshold: data['value']});
                break;
            case "stock_price":
                this.setState({stock_price: data['value']});
                break;
            case "buy_batch":
                this.setState({buy_batch: data['value']});
                break;
            case "sell_batch":
                this.setState({sell_batch: data['value']});
                break
            default:
                console.log("Default casse: " + key);    
        }
        console.log("Key is: " + key);
    }

    handleonSubmit = (event) => {
        event.preventDefault();
        console.log("Handle Submit:  " + JSON.stringify(this.state));
        let url = "/chart"
        ajaxCall(url,
            this.ajax_success_handler,
            this.ajax_error_handler,
            this.state,
            "POST");
    }

    ajax_success_handler = (data, status, xhr) => {
        let curdate = new Date()
        let lastupdated_string = curdate.toDateString() + " " +
                            curdate.toTimeString()

        let timeStamp = Math.floor(Date.now() / 1000);
        let lastUpdatedTimestamp = timeStamp;

        console.log("Ajax Success Handler: ", curdate.toDateString(),
                    "TIME: ", curdate.toTimeString());
        console.log(JSON.stringify(data));
        console.log(status);
        this.props.callback(data);
    }

    ajax_error_handler = (jqXHR, textStatus, errorThrown) => {
        console.log("Ajax Error Handler: ", textStatus, "Error: ", errorThrown);
        console.log("Date: ", Date.now());
    }


    render () {
        let balanceFg = creatBalanceFormGroup(this.formGroupCallback, 'start_balance');
        let stockFg = creatStockFormGroup(this.formGroupCallback, 'stock');
        let buyThresholdFg = creatBuyThresholdFormGroup(this.formGroupCallback, 'buy_threshold');
        let sellThresholdFg = creatSellThresholdFormGroup(this.formGroupCallback, 'sell_threshold');
        let buyBatchFg = buyBatchFormGroup(this.formGroupCallback, 'buy_batch');
        let sellBatchFg = sellBatchFormGroup(this.formGroupCallback, 'sell_batch');

        let  stockFormRow = React.createElement("div", 
                                                {class: "form-row"}, 
                                                balanceFg, stockFg);

        let thresholdFormRow = React.createElement("div", 
                                          {class: "form-row"}, 
                                          buyThresholdFg, sellThresholdFg);
    
        let batchFormRow = React.createElement("div", 
                                          {class: "form-row"}, 
                                          buyBatchFg, sellBatchFg);

        let submit = React.createElement("button", 
                                         {type: "submit", 
                                         value: "Submit", 
                                         onClick: this.handleonSubmit,
                                         class: "btn btn-primary"}, 
                                         "Submit");
      
        let formProps = {
            onSubmit: this.handleonSubmit 
        };

        let form = React.createElement("form", 
                                        formProps, 
                                        stockFormRow, 
                                        thresholdFormRow, 
                                        batchFormRow, 
                                        submit)
        return(form);
    }
}


class InvestGrid extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            labels: [],
            balances: []
        }
    }

    setProps () {
        let grid_template_columns = "repeat( 5, 1fr)";
        let gridProps = {
            grid: {
                columns: 2,
                style: {
                    display: "grid",
                    gridAutoRows: 'minmax(20px, auto)',
                    gridGap: '5px',
                    gridTemplateColumns: grid_template_columns
                }
            },
            children: {
                "jumbotext1": {
                  id: "test-1",
                  class: "gelem c1c3 r1r2 colored",
                  text: "Investool",
                  text_size: 4,
                  style: {
                    color: "black",
                    fontFamily: "Roboto, sans-serif",
                    backgroundColor: "#d6edd5"
                  }
                },
                "card1": {
                    class: "gelem c1c3 r1r2",
                    style: {
                        width: "100%",
                        boxShadow: "none"
                    },
                    cardHeader: {
                        text: "Investool - strategize",
                        text_size: 4,
                        style: {
                            backgroundColor: "rgba(0, 5, 255, 0.70)"
                        }
                    }
                },
                "chart": {
                    class: "gelem c1c3 r2r3"
                }       
            }
        }
        return(gridProps);
    }

    setChartValue = (data) => {
        let balances = [];
        let labels = [];

        for (let idx in data) {
            balances.push(data[idx]['current_value'])
            labels.push(data[idx]['date'])
        }
        this.setState({balances: balances});
        this.setState({labels: labels});
    
    }

    render () {
        console.log("Render InvestGrid!");
        let gridProps = this.setProps()
        let gridStyle = gridProps.style;

         // Define Form group.
        let formProps = {
            callback: this.setChartValue,
            class: "foobar"
        }

        let form = React.createElement(InputForm, formProps, null);

        //let jt1 = React.createElement(Jumbotron, gridProps.children['jumbotext1']);

        let card1 = React.createElement(Card, 
                                        gridProps.children['card1'], 
                                        form);
        //create chart.
        console.log("State balances: " + this.state.balances);  
        let dataval = [11, 2, 43, 25, 22, 3];
        let labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Hazel'];
        if (this.state.balances.length > 1) {
            dataval = this.state.balances;
            labels = this.state.labels;
        } 
        console.log("Data val ------->> " + dataval);
        console.log("Lablels: " + labels);

        let chartData = {
            labels: labels,
            datasets: [{
                label: 'Current Portfolio Value',
                data: dataval,
                backgroundColor: 'rgba(129, 7, 29, 0.2)',
                borderColor:'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }]
        };
        let chartProps = {
            data: chartData,
            class: gridProps.children['chart'].class
        }
    
        let chartObj = React.createElement(LineChart, chartProps, null);
        
        // let grid = React.createElement(Grid, gridProps.grid, jt1, card1, chartObj);
        let grid = React.createElement("div", 
                                       {style: gridStyle}, card1, chartObj);
        return(grid);
    }
}

function setupInvestGrid () {
    let mainContainer = document.getElementById("main");
    let grid = React.createElement(InvestGrid, null, null);
    ReactDOM.render(grid, mainContainer);
}

setupInvestGrid();

