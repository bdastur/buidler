
function createChart(chartProps) {
    let data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Hazel'],
        datasets: [{
            label: '# of Votes',
            data: [2, 29, 31, 5, 22, 3],
            backgroundColor: 'rgba(129, 7, 29, 0.2)',
            borderColor:'rgba(255, 99, 132, 1)',
            borderWidth: 2
        },
        {
          label: '# of People',
          data: [21, 22, 13, 5, 2, 23],
          backgroundColor: 'rgba(19, 7, 237, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
      }]
    };
    chartProps['data'] = data


    let chartObj = React.createElement(LineChart, chartProps, null);
    return(chartObj)
}



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
        placeholder: "Enter initial balance",
        small_text:  "Initial starting balance (USD)",
        class: "form-control-sm col-md-4"
    }
    fgProps['callback'] = this.FgCallback

    let fgObj = React.createElement(InputFormGroup, fgProps, null);
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
        label:       "Buy Threshold (% change)",
        type:        "number",
        placeholder: "Buy threshold",
        small_text:  "% change in price that will trigger a buy",
        class: "form-control-sm col-md-4"
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
        label:       "Sell Threshold (% change)",
        type:        "number",
        placeholder: "Sell threshold",
        small_text:  "% change in price that will trigger a sell",
        class: "form-control-sm col-md-4"
    }
    fgProps['callback'] = this.FgCallback

    let fgObj = React.createElement(InputFormGroup, fgProps, null);
    return(fgObj);
}


function setupGrid () {
    let mainContainer = document.getElementById("main");
    
    let inputData = {
        start_balance: 0,
        buy_threshold: -1.0,
        sell_threshold: 1.0,
        stock_price: 240,
        buy_batch: 50,
        sell_batch: 50,
        transactions: 100000 
    }

    // Define Form group.
    setValue = (data) => {
        console.log("SetValue Callback: " + JSON.stringify(data));
        key = data['name'];
        inputData[key] = data['value'];
    }

    let balanceFg = creatBalanceFormGroup(setValue, 'start_balance');
    let buyThresholdFg = creatBuyThresholdFormGroup(setValue, 'buy_threshold');
    let sellThresholdFg = creatSellThresholdFormGroup(setValue, 'sell_threshold');

    let submit = React.createElement("button", 
                                            {type: "submit", 
                                            value: "Submit", 
                                            class: "btn btn-primary"}, 
                                            "Submit");

    let formProps = {
        onSubmit: this.handleonSubmit
    }
    
    let form = React.createElement("form", 
                                    formProps, 
                                    balanceFg, buyThresholdFg, 
                                    sellThresholdFg, submit)

    let chartProps = {
        class: "gelem c1c3 r3r4"
    }
    let chartObj = createChart(chartProps);

    let gridProps = {
        grid: {
            columns: 2,
            style: {
                display: "grid",
                gridAutoRows: 'minmax(20px, auto)',
                gridGap: '10px',
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
                class: "gelem c1c2 r2r3",
                style: {
                    width: "32rem",
                    boxShadow: "none"
                },
                cardHeader: {
                    text: "Basic Input",
                    text_size: 5,
                    style: {
                        backgroundColor: "rgba(0, 5, 255, 0.70)"
                    }
                }
            }       
        }
    }

    let jt1 = React.createElement(Jumbotron, gridProps.children['jumbotext1']);

    let card1 = React.createElement(Card, 
                                    gridProps.children['card1'], 
                                    form);
    
       
    let grid = React.createElement(Grid, gridProps.grid, jt1, card1, chartObj);
     ReactDOM.render(grid, mainContainer);
}

setupGrid()