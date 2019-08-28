const AdminButton = ({ title, onButtonClick, className }) => (
  <button className={className} onClick={onButtonClick}>
    {title}
    <style jsx>
      {`
        button {
          color: white;
          background-color: #12303a;
          text-transform: uppercase;
          outline: none;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          font-size: 1.5rem;
          width: 100%;
          padding: 2rem 0;
          margin: 0.5rem 0;
          max-width: 320px;
          display: block;
        }
        button.button--disabled {
          background-color: lightgrey !important;
        }
        button.button--app-has-results {
          background-color: red;
        }
      `}
    </style>
  </button>
);

export default AdminButton;
