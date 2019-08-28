const Overlay = () => (
  <div className="overlay">
    <img src="/static/img/logo-teqnation.png" alt="Teqnation" />
    <style jsx>{`
      div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        z-index: 0;
        padding: 4vw;
        transition: all 500ms cubic-bezier(0.155, 0.905, 0.17, 1);
      }
      img {
        width: 50%;
      }
      @media (min-width: 1000px) {
        img {
          height: 80%;
          width: initial !important;
        }
      }
    `}</style>
  </div>
);

export default Overlay;
