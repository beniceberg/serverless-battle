class Ceo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { overlayVisible: false };
  }
  doClick = () => {
    const { doClick, ceoName } = this.props;
    doClick && doClick(ceoName);

    // Show CEO overlay
    this.setState({
      overlayVisible: !this.state.overlayVisible
    });

    // Check if hideTimer exists and delete it
    hideTimer && clearTimeout(hideTimer);

    // Hide CEO overlay
    let hideTimer = setTimeout(() => {
      this.setState({
        overlayVisible: !this.state.overlayVisible
      });
    }, 300);
  };
  render() {
    const {
      logoSrc,
      ceoName,
      ceoSrc,
      ceoOverlaySrc,
      companyName,
      count
    } = this.props;
    return (
      <div
        className="card"
        onClick={this.doClick}
      >
        <div className="ceo">
          <img className="ceo-logo" src={logoSrc} alt={companyName} />
          <img className="ceo-profile" src={ceoSrc} alt={ceoName} />
          <img
            style={{ opacity: this.state.overlayVisible ? "1" : "0" }}
            className="ceo-profile-overlay"
            src={ceoOverlaySrc}
            alt={ceoName}
          />
          <p className="ceo-name">{ceoName}</p>
        </div>
        <p className="count">Vote count: {count}</p>
        <style jsx>{`
          .card {
            padding: 1rem 0 1.5rem 0;
            height: 25vh;
            width: 100%;
            max-width: 600px;
          }

          .ceo {
            position: relative;
            background-color: white;
            border-radius: 10px 10px 0 10px;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .ceo-logo {
            height: 80%;
            left: -46px;
            position: relative;
          }

          .ceo-profile {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 110%;
            z-index: 1;
            transform: scale(0.92);
            transform-origin: right bottom;
            transition: all 1000ms cubic-bezier(0.155, 0.905, 0.17, 1);
          }

          .ceo-profile-overlay {
            height: 88%;
            position: absolute;
            top: -10%;
            right: 0%;
            z-index: 10;
            opacity: 0;
          }

          .ceo-name {
            position: absolute;
            right: 0.25rem;
            bottom: 0.25rem;
            color: #ececec;
            z-index: 2;
            font-size: 10px;
          }

          .count {
            color: white;
            font-weight: bold;
            text-align: center;
            margin-top: 0.5rem;
          }

          @media only screen and (max-width: 320px) {
            .count {
              margin-top: 0.25rem;
              font-size: 12px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Ceo;
