import { Component } from "react";

class MultiplierButton extends Component {
  render() {
    // Object deconstruction
    const { changeMultiplier, multiplier, active } = this.props;

    // Render HTML
    return (
      <button
        onClick={() => changeMultiplier(multiplier)}
        className={!active ? `button--disabled` : ``}
      >
        <span>x {multiplier}</span>
        <style jsx>{`
          span {
            margin: 0.125rem 0;
          }
          button {
            color: white;
            background-color: #12303a;
            text-transform: uppercase;
            outline: none;
            border: none;
            border-radius: 10px;
            font-weight: bold;
            font-size: 1.5rem;
            width: 30%;
            padding: 1rem 0;
            margin: 0.5rem 0;
            max-width: 320px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          button.button--disabled {
            background-color: lightgrey;
          }
        `}</style>
      </button>
    );
  }
}

export default MultiplierButton;
