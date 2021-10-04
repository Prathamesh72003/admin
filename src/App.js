import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState, Component, useEffect } from "react";
import Select from "react-select";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
const Countries = [
  { label: "Approved", value: 355 },
  { label: "Improper content", value: 54 },
  { label: "Invalid detials", value: 43 },
  { label: "Thumbnail missing", value: 61 },
  { label: "Index missing", value: 965 },
  { label: "Thumbnail and Index missing", value: 46 },
];

const data = [
  {
    id: 1,
    department_id: 1,
    name: "xyz",
    pdf_url: "http://www.africau.edu/images/default/sample.pdf",
    description: "hello world",
  },
  {
    id: 2,
    department_id: 1,
    name: "xyz1",
    pdf_url: "http://www.africau.edu/images/default/sample.pdf",
    description: "hello world",
  },
  {
    id: 3,
    department_id: 1,
    name: "xyz2",
    pdf_url: "http://www.africau.edu/images/default/sample.pdf",
    description: "hello world",
  },
  {
    id: 4,
    department_id: 1,
    name: "xyz3",
    pdf_url: "http://www.africau.edu/images/default/sample.pdf",
    description: "hello world",
  },
];

function App() {
  const [val, setVal] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("working!");
    axios
      .get("http://localhost:8082/api/pdf")
      .then((res) => {
        console.log(res.data);
        setPdfData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const approve_pdf = (id) => {
    // alert(id);
    axios
      .put("http://localhost:8082/api/pdf/approve/" + id)
      .then((res) => {
        console.log(res.data);
        alert("Done!");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed!");
      });
  };

  const reject_pdf = (id, message) => {
    alert(id + " " + message.label);
    const data = {
      status: "false",
      status_msg: message.label,
      status_color: "red",
    };
    axios
      .put("http://localhost:8082/api/pdf/reject/" + id, data)
      .then((res) => {
        console.log(res.data);
        alert("Done!");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed!");
      });
  };

  const updateIndex = (option, index) => {
    console.log(option.label + " " + index);
    let updatedArray = [...val];
    updatedArray[index] = option;
    setVal(updatedArray);
  };
  return (
    <>
      <Table stripped bordered hover size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>pdf Name</th>
            <th>pdf url</th>
            <th>dept_id</th>
            <th>Description</th>
            <th>reason</th>
            <th>approve</th>
            <th>reject</th>
          </tr>
        </thead>
        <tbody>
          {pdfData.map((item, index) => {
            return (
              <tr>
                <td width="170">{item._id}</td>
                <td width="170">{item.name}</td>
                <td width="170">
                  <a href={item.pdf_url} target="_blank">
                    link{" "}
                  </a>
                </td>
                <td width="170">{item.department_id}</td>
                <td width="170">{item.description}</td>

                <td width="170">
                  <Select
                    value={val[index]}
                    onChange={(option) => updateIndex(option, index)}
                    options={Countries}
                  />
                </td>
                <td width="170">
                  <Button
                    variant="success"
                    onClick={() => approve_pdf(item._id)}
                  >
                    Approve
                  </Button>{" "}
                </td>
                <td width="170">
                  <Button
                    variant="danger"
                    onClick={() => reject_pdf(item._id, val[index])}
                  >
                    Reject
                  </Button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default App;
