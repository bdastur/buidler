/*
 * openTab
 * openTab API is used in conjunction with custom tabs.
*/
function openTab(evt, tabHeadingClass, tabContentClass, tabContentId) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName(tabContentClass);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName(tabHeadingClass);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabContentId).style.display = "block";
    evt.currentTarget.className += " active";
  }

/**************************************************
 * ReactJS Components:
 *
 * This library will use the core ReactJS APIs and not rely
 * on the JSX.
 * Each JSX element is just syntactic sugar for calling
 *
 * Tow main APIs:
 * 1. Create a new component/element:
 *   React.createElement(component, props, ...children).
 *
 * So, anything you can do with JSX can also be done with just
 *  plain JavaScript.
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
 *
***************************************************/


/*
 * Category Content.
 * Jumbotron:
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
        console.log("componentDidMount");
        this.setState({data: this.props.text});
    }

    // componentWillMount () {
    //     console.log("componentWillUnmount");
    // }

    set_style (prop_style) {
        //Set default style
        let header_style = {
            color: "black",
            backgroundColor: "White",
            padding: "10px",
            fontFamily: "Sans Serif"
        };
        //Overrides.
        for (let idx in this.style_overrides) {
          let override = this.style_overrides[idx];
          if (override in prop_style) {
            console.log("Override: " + override);
            header_style[override] = prop_style[override];
          }
        }
        return(header_style);
    }

    set_id (props) {
        let id = "jumbo-" + Math.ceil(Math.random() * 100000);
        if (this.props.hasOwnProperty("id") && this.props.id != undefined) {
            console.log("Id is specified, set it "  + this.props.id);
            id = props.id;
        }
        return(id);
    }

    clickHandler = (event, data) => {
      console.log("clicked " + event.target.value);
      let rand_str = "Random: " + Math.ceil(Math.random() * 100000);
      this.setState({data: "Clicked " + rand_str});
    }

    render () {
        console.log("Jumbotron, render!");
        const header_style = this.set_style(this.props.style);

        let id = this.set_id(this.props);

        let props = {
          id: id,
          style: header_style
        };

        if ("class" in this.props) {
          props['class'] = this.props.class;
        }
        props['onClick'] = this.clickHandler;

        let elem =  React.createElement(
            this.props.element_type, props, this.state.data);

        return(elem);
    }
}


create_jumbotron = (user_input, container) => {
    const valid_elements = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const valid_class = ["display-1", "display-2", "display-3",
                   "display-4", "display-5", "display-6"];

    if (! valid_elements.includes(user_input.element_type)) {
        console.log("Pass valid h elements");
        return;
    }

    if (! valid_class.includes(user_input.class)) {
      console.log("Pass valid class elements");
      return
    }

    /*
     * Set default props.
     */
    let jtprops = {
        id: user_input.id,
        element_type: user_input.element_type,
        class: user_input.display,
        text: user_input.text,
        style: {
            color: "black",
            fontFamily: "Times New Roman",
            backgroundColor: "#d6edd5"
        }
    }

    let jt = React.createElement(Jumbotron, jtprops, null);
    ReactDOM.render(jt, container);
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

    componentWillMount () {
        console.log("Table - componentWillmount");
        this.setState({data: this.props.data});
        console.log(this.state.data);
        console.log("end -- componentWillMount");
    }

    update_state = (data) => {
        alert("Submitted")
        console.log(data);
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


// function create_element(elem) {
//   let new_jumbotron = React.createElement(eval(elem), newp, null);
//   ReactDOM.render(new_jumbotron, document.getElementById("root2"));
// }


class FormGroup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        help_text: ""
    }
  }

  fg_email_props = {
    label: "Email address",
    type: "email",
    placeholder: "Email address",
    small_text: "We will never share your email with anyone"
  }

  set_style (props) {
    let fg_props = {
      label: props.label,
      type: props.type,
      placeholder: props.placeholder,
      small_text: props.small_text
    }
    return (fg_props);
  }


  onChangeHandler = (event) => {
    console.log("Value: " + event.target.value);
    let data = {
      type: this.props.type,
      value: event.target.value
    }
    if (this.props.type == "password") {
      if (event.target.value.length < 8) {
        this.setState({help_text: "Password Does not Meet Standards"});
      } else {
        this.setState({help_text: "Password Meets Standards"});
      }

    }
    this.props.callback(data);
  }

  render () {
    let fg_props = this.set_style(this.props);

    let help_text = this.state.help_text;
    if (fg_props.small_text != "") {
        help_text = fg_props.small_text;
    }

    let email_label = React.createElement(
      "label", null, fg_props.label);

    let email_input = React.createElement(
      "input",
      {type: fg_props.type ,
       onChange: this.onChangeHandler,
       class: "form-control",
       placeholder: fg_props.placeholder},
      null);
    let email_small = React.createElement(
      "small",
      {class: "form-text text-muted"},
       help_text);

    let div_email = React.createElement(
      "div", {class: "form-group"}, email_label, email_input, email_small);

    return (div_email);
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
      password: ""
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
    console.log("Callback Invoked!");
    if (data.type == "email") {
      this.setState({email: data.value});
    } else {
      this.setState({password: data.value});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle Submit:  " + JSON.stringify(this.state));
    alert("Submit " + JSON.stringify(this.state));
    console.log("Handle Submit!");
    let url = "/signup"
    ajaxCall(url,
            this.ajax_success_handler,
            this.ajax_error_handler,
            this.state,
            "POST");
  }

  render () {
    let fg_email_props = {
      label: "Email address",
      type: "email",
      placeholder: "Email address",
      small_text: "We will never share your email with anyone",
      callback: this.formGroupCallback
    }
    let fg_email = React.createElement(FormGroup, fg_email_props, null);

    let fg_password_props = {
      label: "Password",
      type: "password",
      placeholder: "password (min 8 chars)",
      small_text: "",
      callback: this.formGroupCallback
    }
    let fg_password = React.createElement(FormGroup, fg_password_props, null);

    let submit_button = React.createElement(
      "button", {type: "submit", value: "Submit", class: "btn btn-primary"}, "Submit");

    let form_props = {
      onSubmit: this.handleSubmit
    }
    if ("class" in this.props) {
      form_props['class'] = this.props.class;
    }
     

    let form = React.createElement(
      "form", form_props, fg_email, fg_password, submit_button)
    return (form);
  }
}




/*
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

    set_style (columns) {
        let grid_template_columns = "repeat(" + columns + ", 1fr)";

        let grid_style = {
            display: 'grid',
            gridAutoRows: 'minmax(20px, auto)',
            gridGap: '5px',
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
      element_type: "h2",
      class: "display-2 gelem  c1c4  r1r2  colored",
      text: "Sample header",
      style: {
          color: "black",
          fontFamily: "Times New Roman",
          backgroundColor: "#d6edd5"
      }
    }

      let jumbotron = React.createElement(Jumbotron,
          jumbo_props, null);
      // let gelem1 = React.createElement(
      //     "div", {class: "gelem  c1c4  r1r2  colored" }, "One");
      let gelem2 = React.createElement(
          "div", {class: "gelem  c1c2 r2r4 colored" }, "two");

      let signup_props = {
        class: "gelem c2c4 r2r4"
      };
      let signup = React.createElement(Signup, signup_props, null);          
      // let gelem3 = React.createElement(
      //     "div", {class: "gelem c2c4 r2r4 colored" }, "three");

      let grid_style = this.set_style(this.props.columns);

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



