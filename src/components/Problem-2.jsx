import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Problem2 = () => {
  const [data, setData] = useState(null);
  const [modalClicked, setModalClicked] = useState("");
  const [show, setShow] = useState(false);
  const [toggle, setToogle] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (modal) => {
    setModalClicked(modal);
    setShow(true);
  };

  const handleAll = async (modal) => {
    if (modal === "modala") {
      setModalClicked("modala");
      setShow(true);

      try {
        const response = await axios.get(
          "https://contact.mediusware.com/api/contacts/"
        );

        return setData(response.data.results);
      } catch (error) {
        console.error("Error fetching", error);
        throw error;
      }
    } else if (modal === "modalb") {
      setModalClicked("modalb");
      setShow(true);

      try {
        const response = await axios.get(
          "https://contact.mediusware.com/api/country-contacts/United%20States/"
        );
        return setData(response.data.results);
      } catch (error) {
        console.error("Error fetching", error);
        throw error;
      }
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={() => handleShow("modala")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => handleShow("modalb")}
          >
            {" "}
            US Contacts
          </button>
          {modalClicked === "modala" && (
            <ModalA
              show={show}
              handleClose={handleClose}
              handleAll={handleAll}
              data={data}
              toggle={toggle}
              setToogle={setToogle}
            />
          )}
          {modalClicked === "modalb" && (
            <ModalB
              show={show}
              handleClose={handleClose}
              handleAll={handleAll}
              data={data}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Problem2;

function ModalA({ show, handleClose, data, handleAll }) {
  return (
    <Modal show={show}>
      <Modal.Header className="d-flex justify-content-evenly">
        <Button
          variant="primary"
          style={{ color: "#46139f", background: "white" }}
          onClick={() => handleAll("modala")}
        >
          All Contacts
        </Button>
        <Button
          variant="primary"
          style={{ color: "#ff7f50", background: "white" }}
          onClick={() => handleAll("modalb")}
        >
          US Contacts
        </Button>
        <Button
          variant="primary"
          onClick={handleClose}
          style={{
            border: "1px solid #46139f",
            background: "white",
            color: "#46139f",
          }}
        >
          Close
        </Button>
      </Modal.Header>
      <Modal.Body>
        {data?.map((count) => (
          <Modals3 key={count.id} count={count}>
            {" "}
          </Modals3>
        ))}
      </Modal.Body>
    </Modal>
  );
}
function ModalB({ show, handleClose, data, handleAll }) {
  return (
    <Modal show={show}>
      <Modal.Header className="d-flex justify-content-evenly">
        <Button
          variant="primary"
          style={{ color: "#46139f", background: "white" }}
          onClick={() => handleAll("modala")}
        >
          All Contacts
        </Button>
        <Button
          variant="primary"
          style={{ color: "#ff7f50", background: "white" }}
          onClick={() => handleAll("modalb")}
        >
          Us Contacts
        </Button>
        <Button
          variant="primary"
          onClick={handleClose}
          style={{
            border: "1px solid #46139f",
            background: "white",
            color: "#46139f",
          }}
        >
          Close
        </Button>
      </Modal.Header>
      <Modal.Body>
        {data?.map((count) => (
          <Modals3 key={count.id} count={count}>
            {" "}
          </Modals3>
        ))}
      </Modal.Body>
    </Modal>
  );
}

function Modals3({ count }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        onClick={handleShow}
        style={{ border: "1px solid green", margin: "2px" }}
      >
        {count.phone}
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>{count?.country.name}</Modal.Body>
      </Modal>
    </>
  );
}
