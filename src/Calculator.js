import React from "react"


class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "0",
            result: "0"
        }

        this.RenderedElements = this.RenderedElements.bind(this)
        this.HandleChange = this.HandleChange.bind(this)
        this.Equals = this.Equals.bind(this)
        this.Clear = this.Clear.bind(this)
    }

    elements = {
        "seven": 7,
        "eight": 8,
        "nine": 9,
        "four": 4,
        "five": 5,
        "six": 6,
        "one": 1,
        "two": 2,
        "three": 3,
        "zero": 0,
        "decimal": ".",
        "add": "+",
        "subtract": "-",
        "multiply": "*",
        "divide": "/"
    };
    keys = Object.keys(this.elements);


    RenderedElements(){
        return this.keys.map(k=>{
            return (
                <div className="butn btn btn-primary col-3 m-1" id={k} key={k} value={this.elements[k]} onClick={this.HandleChange}>{this.elements[k]}</div>
            )
        })
    }

    HandleChange(event){
        let newInput = this.state.input.concat(event.target.innerText);
        let notStartWithZero = newInput.replace(/^0+|(?<=[^0-9\.])0|(?<=\.\d*)\./g, "");
        let oneMinus = notStartWithZero.replace(/\-(?=[\-\+\*\/])/, "")
        let noMultibleOperators = oneMinus.replace(/[\+\/\*]{2,}$/, oneMinus[oneMinus.length-1])

    
  
        this.setState({
            input: noMultibleOperators
        })
    }

    Equals(){
        let res = eval(this.state.input).toString();
        this.setState({
            input: res,
            result: res
        })
    }

    Clear(){
        this.setState({
            input: "0",
            result: "0"
        })
    }
  
  componentDidUpdate(prevProps, prevState) {
       if (prevState.input !== this.state.input) {
          this.setState({
            result: this.state.input.match(/[0-9\.\-]+$/)?this.state.input.match(/[0-9\.\-]+$/):"0"
          })
        }
      }

    render(){
        return (
            <div className="calContainer container text-center">
            <div className="screen resultScreen">
                <h1 id="display" >{this.state.result}</h1>            
            </div>
            <div className="screen inputScreen">
            <h3 >{this.state.input}</h3>
            </div>
            <div className="elementsContainer continer-fluid grid g-2 content-center p-3 well">
            <this.RenderedElements />
            <div className="butn col-3 m-1 btn btn-danger" id="clear" value="C" onClick={this.Clear}>C</div>
            <div className="butn col-7 m-2 btn btn-success" id="equals" value="=" onClick={this.Equals}>=</div>
            </div>
            </div>
        );
    }
};

export default Calculator;