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
***************************************************/


/*
 * Category Content.
 * Jumbotron:
 * 
 * 
 * 
 * 
 */
new_set_style = () => {
    let header_style = {
        color: this.props.style.color,
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
    };

    return(header_style);

}
class Jumbotron1 extends React.Component {
    constructor (props) {
        super(props); 
    }

    set_style () {
        let header_style = {
            color: this.props.style.color,
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Sans Serif"
        };
        return(header_style);
    }
    
    render () {
        const header_style = this.set_style();
        let element_type = "h1";
        let props = {
          style: header_style
        }
        if (this.props.element_type == "display") {
            props['class'] = "display-1"
            element_type = "h1"
        }
        let elem =  React.createElement(
            element_type, props, "Name: ",  this.props.text);

        return(elem);
    }
}

create_jumbotron1 = (element_type) => {
    let jtprops = {
        element_type: "display",
        text: "jslib: This is a prop text! new jumbotron",
        style: {
            color: "yellow"
        }
    }  

    let jt = React.createElement(Jumbotron1, jtprops, null);
    ReactDOM.render(jt, document.getElementById("jt"));

}

create_jumbotron1();



class Jumbotron extends React.Component {
  constructor (props) {
      super(props);
      this.state = { name: 'Testing'};
  }

  clickHandler = () => {
      console.log("Clicked!");
      this.setState({name: "Clicked!"});
  }

  render () {
      const header_style = {
          color: this.props.style.color,
          backgroundColor: "DodgerBlue",
          padding: "10px",
          fontFamily: "Arial"
      }
      let props = {
          style: header_style,
          onClick: this.clickHandler
      }
      if ("class" in this.props) {
          props['class'] = this.props.class;
      }

      let elem =  React.createElement(
          "h1", props, "Name: ",  this.props.text);

      return elem
  }
}

class Card extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
      const header_style = {
          color: this.props.style.color,
          backgroundColor: "DodgerBlue",
          padding: "10px",
          fontFamily: "Arial"
      }

      let jumbo = React.createElement(Jumbotron, this.props, null);
      let elem =  React.createElement(
          "div", {style: header_style, onClick: this.clickHandler}, jumbo);


      return elem
  }
}

let  card_prop = {
  text: "Card data",
  style: {
      color: "white"
  }
}
let card1 = React.createElement(Card, card_prop, null);
ReactDOM.render(card1, document.getElementById("card"));

let props = {
  text: "jslib: This is a prop text!",
  style: {
      color: "yellow"
  }
}

let jumbotron = React.createElement(Jumbotron, props, null);
ReactDOM.render(jumbotron, document.getElementById("root"));

function create_element(elem) {
  console.log("Create elementt!");
  let newp = {
      text: "jslib: This is a new prop!",
      style: {
          color: "red"
      }
  }
  let new_jumbotron = React.createElement(eval(elem), newp, null);
  ReactDOM.render(new_jumbotron, document.getElementById("root2"));
}

create_element("Jumbotron");

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
          style: this.props.style,
          class: "gelem  c1c4  r1r2  colored"
      }

      let jumbotron = React.createElement(Jumbotron, 
          jumbo_props, null);
      let gelem1 = React.createElement(
          "div", {class: "gelem  c1c4  r1r2  colored" }, "One");
      let gelem2 = React.createElement(
          "div", {class: "gelem  c1c2 r2r4 colored" }, "two");
      let gelem3 = React.createElement(
          "div", {class: "gelem c2c4 r2r4 colored" }, "three");

      let grid_style = this.set_style(this.props.columns);

      console.log(grid_style);
      let elem = React.createElement(
          "div", {style: grid_style}, "main grid", jumbotron, gelem2, gelem3);

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



