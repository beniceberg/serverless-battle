class CeoBenchmark extends React.Component {
  doClick = () => {
    const { doClick, ceoName } = this.props;
    doClick && doClick(ceoName);
  };
  logContext = event => {
    return false;
  };
  render() {
    const {
      logoSrc,
      ceoName,
      ceoSrc,
      companyName,
      count,
      totalCount,
      highest
    } = this.props;

    this.percentage = isNaN(Math.round((count / totalCount) * 100))
      ? 0
      : Math.round((count / totalCount) * 100);

    this.heightPercentage = isNaN(Math.round((count * 100) / highest))
      ? 0
      : Math.round((count * 100) / highest);

    return (
      <div
        className="card"
        onClick={this.doClick}
        onContextMenu={this.logContext}
        style={{
          height:
            (isNaN(this.heightPercentage) ? "0" : this.heightPercentage) + "%"
        }}
      >
        {0 !== this.percentage ? (
          <React.Fragment>
            <p className="percentage">{`${count} - ${this.percentage}%`}</p>
          </React.Fragment>
        ) : null}
        <div className="ceo">
          <img className="ceo-logo" src={logoSrc} alt={companyName} />
          <img className="ceo-profile" src={ceoSrc} alt={ceoName} />
          <p className="ceo-name">{ceoName}</p>
        </div>
        <style jsx>{`
          .card {
            height: 0%;
            width: 33.33%;
            margin: 0 3vw;
            position: relative;
            overflow: hidden;
            transition: all 500ms cubic-bezier(0.155, 0.905, 0.17, 1);
          }

          .ceo {
            position: relative;
            background-color: white;
            border-radius: 5vw 5vw 0 0;
            width: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
          }

          .ceo-logo {
            width: 80%;
            position: relative;
          }

          .ceo-profile {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 75%;
            height: auto;
            z-index: 1;
            transform: scale(0.92);
            transform-origin: right bottom;
            transition: all 1000ms cubic-bezier(0.155, 0.905, 0.17, 1);
          }

          .ceo-name {
            position: absolute;
            right: 0.25rem;
            bottom: 0.25rem;
            color: #ececec;
            z-index: 2;
            font-size: 22px;
          }

          .percentage {
            position: absolute;
            color: white;
            font-weight: bold;
            text-align: center;
            font-size: 3vw;
            top: 1rem;
            z-index: 1;
            width: 100%;
            color: #12303a;
            text-align: center;
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

export default CeoBenchmark;
