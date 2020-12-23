
/**********************************************************************
 * ReactJS Components:
 *
 * This library will use the core ReactJS APIs and not rely
 * on the JSX. Each JSX element is just syntactic sugar for calling
 *
 * Tow main APIs:
 * 1. Create a new component/element:
 *   React.createElement(component, props, ...children).
 *
 * So, anything you can do with JSX can also be done with just plain JavaScript.
 *
 * https://reactjs.org/docs/react-api.html#createelement
 *
 * 2. Render a React Component:
 *   ReactDOM.render(element, container[, callback])
 *
 * Other lifecycle methods:
 *   componentDidMount() method runs after the component
 *   output has been rendered to the DOM.
 *
 * =========================================================================
 *  Lifecycle:
 *  ------------------------------------------------------------------------
 *  MOUNTING:
 *  ---------------------------
 *  These methods are called in the following order when an instancce of the
 *  component is created.
 *  | constructor()
 *  | static getDerivedStateFromProps()
 *  | render()
 *  v componentDidMount()
 * 
 *  UPDATING:
 *  ----------------------------
 *  | static getDerivedStateFromProps()
 *  | shouldComponentUpdate() : Default behavior render  
 *  | render()
 *  | getSnapshotBeforeUpdate()
 *  v componentDidUpdate()
 * 
 *  UNMOUNTING
 * -------------------------------
 *  componentWillUnmount()
 * 
 * =========================================================================
 *  Guidelines:
 *  ------------------------------------------------------------------------
 * 
 *  PROPS:
 * ----------------------------------------------------------
 *  - All Components should handle the following props:
 *   common:
 *   - id       : DOM ID
 *   - class    : CSS Class
 *   - style    : Object that can define additional styles.
 * 
 *   - callback : A callback for communicatig with parent component
 *   - Additional props specific to component
 * 
 *  NAMING CONVENTIONS:
 * ------------------------------------------------------------
 *  - Use Camelcase for variables, functions, class
 *  - Event handlers: <event>Handler()
 *  - Callback handlers: <component name>Callback()
 * 
 *  NOTES:
 * - A parent can add additional css classes to the childs class.
 * 
***************************************************************************/



/******************************************************************
 * Category: Content
 ******************************************************************/

/*
 * Category:  Content.
 * Component: Jumbotron
 * State: Stateless.
 *
 * PROPS Definitions:
 *  id:  <DOM ID>
 *  element_type: ["h1".. "h6"]
 *  class:  [Add "display-1".. "display-6" for BS4 display header]
 *  text: "This is the text to display"
 *  style:
 *    color: Font color
 *    fontFamily: 
 *    backgroundColor
 * 
 */
class Jumbotron extends React.Component {
    constructor (props) {
        super(props);
        console.log("Jumbotron - Constructor invoked!");
        this.state = {
            data: "Sample",
            color: "black",
            fontFamily: "Sans Serif"
        };

        this.style_overrides = [
            "color", "backgroundColor", "fontFamily"
        ];
    }

    componentDidMount () {
        console.log("componentDidMount. Text: " + this.props.text);
        this.setState({data: this.props.text});
    }

    setStyle (prop_style) {
        //Set default style
        let header_style = {
            color: "black",
            backgroundColor: "White",
            padding: "10px",
            fontFamily: "Sans Serif"
        };
        //Overrides.
        if (prop_style != undefined) {
          for (let idx in this.style_overrides) {
            let override = this.style_overrides[idx];
            if (override in prop_style) {
              header_style[override] = prop_style[override];
            }
          }
        }
        return(header_style);
    }

    setProps () {
      let props = {}
      props['id'] = "jumbo-" + Math.ceil(Math.random() * 100000);
      
      if (this.props.hasOwnProperty("id") && this.props.id != undefined) {
        props['id'] = this.props.id;
      }
      props['element_type'] = "h2";
      if (this.props.hasOwnProperty("element_type") && this.props.element_type != undefined) {
        props['element_type'] = this.props.element_type;
      }
      props['class'] = "display-2";
      if (this.props.hasOwnProperty("class") && this.props.class != undefined) {
        props['class'] = this.props.class;
      }
      props['text'] = "No text";
      if (this.props.hasOwnProperty("text") && this.props.text != undefined) {
        props['text'] = this.props.text;
      }
      return props;
    }

    clickHandler = (event, data) => {
      console.log("clicked " + event.target.value);
    }

    render () {
        console.log("Jumbotron - render: " + JSON.stringify(this.state));
        const header_style = this.setStyle(this.props.style);
        let props = this.setProps();

        props['style'] = header_style;
        props['onClick'] = this.clickHandler;
        console.log("State: " + this.state.data);

        let elem =  React.createElement(
            props.element_type, props, props.text);

        return(elem);
    }
}



/*
 * Category: Content
 * Table
 * A Table has the following sub components:
 *   . Table Header thead
 *     . header row
 *   . Table Body
 *     . Table rows
 */
class Table extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    componentDidMount () {
        console.log("componentDidMount");
        this.setState({data: this.props.data});
        console.log(this.state.data);
        console.log("end -- componentDidMount");
    }

    render () {
        console.log("Table - render");
        // Table Header
        let columns = this.state.data.headers;
        //let columns = this.props.data.headers;
        let scope = "col";
        let th_list = [];
        for (let idx in columns) {
            let obj = React.createElement(
                "th", {scope: scope, id: idx }, columns[idx]);
            th_list.push(obj);
        }
        let tr = React.createElement("tr", null, th_list);
        let thead = React.createElement("thead", null, tr)

        // Table Body.
        //let data = this.props.data.rows;
        let data = this.state.data.rows;
        let tr_list = [];
        for (let row_idx in data) {
            let th_ro = React.createElement("th", null, row_idx);
            let cols = [];
            for (let col_idx in data[row_idx]) {
                cols.push(React.createElement(
                    "td", null, data[row_idx][col_idx]));
            }
            let obj = React.createElement("tr", null, th_ro, cols);
            tr_list.push(obj);
        }
        let tbody = React.createElement("tbody", null, tr_list)

        // Table
        let table = React.createElement(
          "table", {class: "table table-bordered"}, thead, tbody);
        return (table);
    }
}


create_table = () => {
  let table_props = {
      data: {
          headers: ["#", "First", "Last", "Hanndle"],
          rows: [
              ["Larry", "Bird", "@bird"],
              ["Justin", "Donahue", "@donahue"],
              ["John", "Johnson", "@jj"]
          ]
      }
  }
  let tb = React.createElement(Table, table_props, null);
  ReactDOM.render(tb, document.getElementById("table1"));
}

class Form extends React.Component {
    constructor (props) {
        super(props);
    }

    submitForm = (event, value) => {
        alert("Submitted")
        console.log(value);
    }

    render () {
        let props = {
            data: {
                headers: ["#", "First", "Last", "Hanndle"],
                rows: [
                    ["Larry", "Bird", "@bird"],
                    ["Justin", "Donahue", "@donahue"],
                     ["John", "Johnson", "@jj"]
                ]
            }
        }
        let table = React.createElement(Table, props, null);
        let button = React.createElement(
            "button", {onClick: this.submitForm}, "Submit");
        let div = React.createElement("div", null, table, button);
        return(div);
    }
}

/*
 * Category: Content
 * Component: InputFormGroup.
 * 
 * A FormGroup has the following elements:
 *  - A label (describing what the input should be)
 *  - An input field.
 *  - A help text
 * 
 *  PROPS:
 *   label: <label text>
 *   type:  <input type>
 *   class: "form-control-lg", "form-control-sm" (Default always added "form-control")
 *   placeholder: The placeholder text for input
 *   small_text: The helper text underneath the input.
 * 
 * NOTE: 
 * This is a generic component, so it should not have specifics of
 * what data the caller uses. All specific logic should be set
 * in the parent.
 */

class InputFormGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  setProps (props) {
    
    let fgProps = {
      label: props.label,
      type: props.type,
      placeholder: props.placeholder,
      small_text: props.small_text
    }

    fgProps['class'] = "form-control ";
    if (this.props.hasOwnProperty("class") && this.props.class != undefined) {
      fgProps['class'] +=  props.class;
    }

    return (fgProps);
  }

  onChangeHandler = (event) => {
    console.log("Value: " + event.target.value);

    let data = {
      type: this.props.type,
      value: event.target.value
    }
  
    // Invoke the provided callback.
    this.props.callback(data);
  }

  render () {
    let fgProps = this.setProps(this.props);

    let label = React.createElement("label", 
                                    null, 
                                    fgProps.label);

    let input = React.createElement("input", {type: fgProps.type ,
                                    onChange: this.onChangeHandler, 
                                    class: fgProps.class,
                                    placeholder: fgProps.placeholder},
                                    null);

    let small = React.createElement("small",
                                   {class: "form-text text-muted"},
                                   fgProps.small_text);

    let divFg = React.createElement("div", 
                                    {class: "form-group"}, 
                                    label, input, small);

    return (divFg);
  }
}


/*
 * Category: Content
 * Component: SelectFormGroup.
 * 
 * A FormGroup has the following elements:
 *  - A label (describing what the input should be)
 *  - A Select field.
 *  - A help text
 * 
 *  PROPS:
 *   label: <label text>
 *   type:  <input type>
 *   class: "form-control-lg", "form-control-sm" (Default always added "form-control")
 *   placeholder: The placeholder text for input
 *   small_text: The helper text underneath the input.
 *   select_options: A list of values for select options.
 * 
 * NOTE: 
 * This is a generic component, so it should not have specifics of
 * what data the caller uses. All specific logic should be set
 * in the parent.
 */
class SelectFormGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  setProps (props) {
    
    let fgProps = {
      label: props.label,
      placeholder: props.placeholder,
      small_text: props.small_text,
      options: props.select_options
    }

    fgProps['class'] = "form-control ";
    if (this.props.hasOwnProperty("class") && this.props.class != undefined) {
      fgProps['class'] +=  props.class;
    }

    return (fgProps);
  }

  onChangeHandler = (event) => {
    console.log("Value: " + event.target.value);

    let data = {
      type: this.props.type,
      value: event.target.value
    }
  
    // Invoke the provided callback.
    this.props.callback(data);
  }

  render () {
    let fgProps = this.setProps(this.props);

    let label = React.createElement("label", 
                                    null, 
                                    fgProps.label);
    
    let x = 0
    let options = [];
    for (x in fgProps.options) {
      options.push(React.createElement("option", {key: x}, fgProps.options[x]));
    }

    let select = React.createElement("select", {type: fgProps.type ,
                                    onChange: this.onChangeHandler, 
                                    class: fgProps.class,
                                    placeholder: fgProps.placeholder},
                                    options);

    let small = React.createElement("small",
                                   {class: "form-text text-muted"},
                                   fgProps.small_text);

    let divFg = React.createElement("div", 
                                    {class: "form-group"}, 
                                    label, select, small);

    return (divFg);
  }
}


/*
 * Category: Content
 * Component: FormCheck.
 * 
 * A FormCheck has the following elements:
 *  - A label (describing what the input should be)
 *  - A Select field.
 *  - A help text
 * 
 *  PROPS:
 *   label: <label text>
 *   type:  <input type>
 *   class: "form-control-lg", "form-control-sm" (Default always added "form-control")
 *   placeholder: The placeholder text for input
 *   small_text: The helper text underneath the input.
 *   select_options: A list of values for select options.
 * 
 * NOTE: 
 * This is a generic component, so it should not have specifics of
 * what data the caller uses. All specific logic should be set
 * in the parent.
 */
class FormCheck extends React.Component {
  constructor (props) {
    super(props);
  }

  setProps (props) {
    let fgProps = {
      label: props.label,
      type: props.type,
      placeholder: props.placeholder,
      small_text: props.small_text,
      options: props.select_options
    }

    fgProps['class'] = "form-check-input ";
    if (this.props.hasOwnProperty("class") && this.props.class != undefined) {
      fgProps['class'] +=  props.class;
    }

    return (fgProps);
  }

  onChangeHandler = (event) => {
    console.log("Value: " + event.target.value);
    console.log("Checked: " + event.target.checked);
    let data = {
      type: this.props.type,
      value: event.target.checked
    }
  
    // Invoke the provided callback.
    this.props.callback(data);
  }

  render () {
    let fgProps = this.setProps(this.props);

    let label = React.createElement("label",
                                    {class: "form-check-label"},
                                    fgProps.label);
   
    let checkInput = React.createElement("input",
                                         {type: fgProps.type, class: fgProps.class,
                                          onChange: this.onChangeHandler, }, null);

    // let small = React.createElement("small",
    //                                {class: "form-text text-muted"},
    //                                fgProps.small_text);

    let divFc = React.createElement("div", 
                                    {class: "form-check"}, 
                                     checkInput, label);

    return (divFc);
  }
}



/*
 * Category: Form
 * Component: Signup
 *
 *
 */
class Signup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: "dummy",
      password: "",
      password_help_text: ""
    }
  }

  ajax_success_handler(data, status, xhr)
  {
    let curdate = new Date()
    let lastupdated_string = curdate.toDateString() + " " +
                         curdate.toTimeString()

    let timeStamp = Math.floor(Date.now() / 1000);
    let lastUpdatedTimestamp = timeStamp;

    console.log("Ajax Success Handler: ", curdate.toDateString(),
                "TIME: ", curdate.toTimeString());
    console.log(JSON.stringify(data));
    console.log(status);
  }

  ajax_error_handler(jqXHR, textStatus, errorThrown)
  {
    console.log("Ajax Error Handler: ", textStatus, "Error: ", errorThrown);
    console.log("Date: ", Date.now());
  }

  formGroupCallback = (data) => {
    if (data.type == "email") {
      this.setState({email: data.value});
    } else {
      this.setState({password: data.value});
      if (data.value.length < 8) {
        this.setState({password_help_text: "Password does not meet our standards"});
      } else {
        this.setState({password_help_text: "Password is Good!"});
      }
    }
  }

  handleonSubmit = (event) => {
    event.preventDefault();
    console.log("Handle Submit:  " + JSON.stringify(this.state));
    let url = "/signup"
    ajaxCall(url,
            this.ajax_success_handler,
            this.ajax_error_handler,
            this.state,
            "POST");
  }

  render () {
    let fg_email_props = {
      label:       "Email address",
      type:        "email",
      placeholder: "Email address",
      small_text:  "We will never share your email with anyone",
      callback:    this.formGroupCallback
    }
    let fg_email = React.createElement(InputFormGroup, fg_email_props, null);

    let fg_password_props = {
      label:       "Password",
      type:        "password",
      placeholder: "password (min 8 chars)",
      small_text:  this.state.password_help_text,
      callback:    this.formGroupCallback
    }
    let fg_password = React.createElement(InputFormGroup, fg_password_props, null);

    let submit_button = React.createElement("button", 
                                            {type: "submit", 
                                            value: "Submit", 
                                            class: "btn btn-primary"}, 
                                            "Submit");

    let form_props = {
      onSubmit: this.handleonSubmit
    }
    if ("class" in this.props) {
      form_props['class'] = this.props.class;
    }
     
    let form = React.createElement("form", 
                                   form_props, 
                                   fg_email, fg_password, submit_button)
    return (form);
  }
}


/******************************************************************
 * Category: Containers
 ******************************************************************/


/*
 * Category: Container.
 * Component: Card
 * 
 * 
 */
class Card extends React.Component {
  constructor (props) {
    super(props);
  }

  setStyle (props) {
    let cardStyle = {
      width: "22rem",
      boxShadow: "5px 10px #c1d1bc"
    };
    return (cardStyle)
  }
  
  render () {
    console.log("Card - render");
    let cardStyle = this.setStyle(this.props);
    
    let jumboProps = {
      id: "j1",
      element_type: "h4",
      class: "display-4",
      text: "Card Header",
      style: {
        color: "black",
        fontFamily: "Roboto, sans-serif",
        backgroundColor: "#fffff"
      }
    };

    let hCardTitle = React.createElement("h5", {class: "card-title"}, "Card Title");
    let jumboCardTitle = React.createElement(Jumbotron,jumboProps, null);

    let signup_props = {
      class: "gelem c2c4 r2r4"
    };
    let signup = React.createElement(Signup, signup_props, null); 

    let divCardBody = React.createElement(
      "div", {class: "card-body"}, hCardTitle, signup, "Card Body");

    let divCard = React.createElement(
      "div", {class: "card", style: cardStyle}, jumboCardTitle, divCardBody);
    
    return (divCard);
  }
}


class CollapseCard extends React.Component {
  constructor (props) {
    super(props);
  }

  setProps(props) {
    let cardProps = {
          header_text: props.header_text,
          card_body_text: props.card_body_text,
          card_id: props.card_id
        }  
    return(cardProps);
  }

  render () {
    let cardProps = this.setProps(this.props);
     
    let button = React.createElement("button",
                                    {class: "btn btn-link", 
                                    'data-toggle': "collapse",
                                    'data-target': "#" + cardProps.card_id,
                                    'aria-expanded': "true",
                                    'aria-controls': cardProps.card_id}, 
                                    cardProps.header_text);
    let header = React.createElement("h5", 
                                    {class: "mb-0"}, 
                                    button);
    let cardHeader = React.createElement("div",
                                          {class: "card-header"}, header);

    let card_body = React.createElement("div",
                                        {class: "card-body"}, 
                                        cardProps.card_body_text);
    let card_collapse_body = React.createElement("div",
                                                 {id: cardProps.card_id,
                                                 'aria-labelledby': "headingOne",
                                                 'data-parent': '#accordian',
                                                 class: "collapse"}, 
                                                 card_body);

    let card = React.createElement("div",
                                   {class: "card"}, 
                                   cardHeader, card_collapse_body);
    return(card);
  }
}

/*
 * Category: Container
 * Component: Collapse
 */
class Collapse extends React.Component {
  constructor (props) {
    super(props);
  }

  setProps(props) {
    for (let x in props.card_info) {
      console.log(props.card_info[x]);
    }
  }

  render () {
    
    let cards = [];
    let collapseProps = this.setProps(this.props);

    let cardProps = {};
    for (let x in this.props.card_info) {
      cardProps = {
        header_text: this.props.card_info[x]['header_text'],
        card_body_text: this.props.card_info[x]['card_body_text'],
        card_id: this.props.card_info[x]['card_id'],
        key: x
      };
      cards.push(React.createElement(CollapseCard, cardProps, null));
    }

    let collapse = React.createElement("div", 
                                       {id: "accordian"}, 
                                       cards);

    return(collapse);
  }
}


/*
 * Category: Container.
 * Component: Grid
 * Grid Layout.
 * This is a encompassing component.
 * Available props:
 * {
 *     columns: <no of columns>
 * }
 *
 */

class Grid extends React.Component {
    constructor (props) {
        super(props);
    }

    setStyle (columns) {
        let grid_template_columns = "repeat(" + columns + ", 1fr)";

        let grid_style = {
            display: 'grid',
            gridAutoRows: 'minmax(20px, auto)',
            gridGap: '5px',
            boxShadow: "5px 10px #c1d1bc",
            gridTemplateColumns: grid_template_columns
        };

        return (grid_style);
    }

    prepare_grid () {
        console.log("Prepare grid");
    }

  render () {
    let jumbo_props = {
      id: "test-1",
      element_type: "h3",
      class: "display-3 gelem  c1c4  r1r2  colored",
      text: "Signup now!!",
      style: {
          color: "black",
          fontFamily: "Roboto, sans-serif",
          backgroundColor: "#d6edd5"
      }
    }

      let jumbotron = React.createElement(Jumbotron,
          jumbo_props, null);
      // let gelem1 = React.createElement(
      //     "div", {class: "gelem  c1c4  r1r2  colored" }, "One");
      let gelem2 = React.createElement(
          "div", {class: "gelem  c1c2 r2r4 " }, "Signup to try");

      let signup_props = {
        class: "gelem c2c4 r2r4"
      };
      let signup = React.createElement(Signup, signup_props, null);          
      // let gelem3 = React.createElement(
      //     "div", {class: "gelem c2c4 r2r4 colored" }, "three");

      let grid_style = this.setStyle(this.props.columns);

      console.log(grid_style);
      let elem = React.createElement(
          "div", {style: grid_style}, jumbotron, gelem2, signup);

          return elem
  }
}

let gridprops = {
  columns: 3,
  style: {
      color: "yellow"
  }
}
let main_grid = React.createElement(Grid, gridprops, null);
ReactDOM.render(main_grid, document.getElementById("main-grid"));



/******************************************************************
 * Category: Charts
 ******************************************************************/

class  BarChart extends React.Component {
  constructor (props) {
    super(props);
    this.chartRef = React.createRef();
  }

  createChart (ctx) {
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    });
  }

  componentDidMount() {
    let ctx = document.getElementById("canvas").getContext('2d');
    this.myChart = this.createChart(ctx);
  }

  render () {
    let canvas = React.createElement("canvas", 
                                  {id: "canvas", width: "400", height: "200",
                                   ref: this.chartRef}, 
                                  null);

    //let myChart = this.createChart(ctx);
   
    return(canvas);
  }

}
