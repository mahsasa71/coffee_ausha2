import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../counter/CounterTimer";
import "./SpecialOffer.css";

const SuperOfferSection = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleNavigate = () => {
    navigate("/allgifts");
  };

  return (
    <>
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <section className="supper-offer-section">
                  <div className="container-fluid">
                    <div className="row justify-content-center">
                      <div className="col-lg-12">
                        <div className="supper-offer-box">
                          <div className="body container">
                            <div
                              className="row"
                              style={{ textAlign: "center" }}
                            >
                              <div className="col-lg-12">
                                <div className="specification">
                                  <div className="price-row">
                                    <div className="off">
                                      <h1>توجه</h1>
                                    </div>
                                  </div>
                                  <div className="title2">
                                    با هر خرید بالای 500 هزار تومان <br />
                                    یکی از جوایز زیر را به انتخاب خود ما هدیه
                                    بگیرید
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      className="remaining-time alarm"
                                      style={{ marginTop: "10px" }}
                                    >
                                      زمان باقی مانده تا پایان سفارش:
                                    </div>
                                    <div className="countdown-timer">
                                      <CountdownTimer
                                        hours={19}
                                        minutes={26}
                                        seconds={40}
                                      />
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-primary mt-3"
                                    onClick={handleNavigate} style={{backgroundColor:'rgba(253, 63, 85, 1)'}}
                                  >
                                    مشاهده جوایز
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperOfferSection;
