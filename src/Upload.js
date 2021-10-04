import React, { useEffect, useState } from "react";
import Subs from "./subs.json";
import axios from "axios";

function Upload() {
  const [data, setData] = useState([]);
  useEffect(() => {
    let result = [];
    Subs.map((item) => {
      let obj = {
        name: item.name,
        department_id: parseInt(item.department_id),
        level: item.level,
        img_url:
          "https://officialbook4u.000webhostapp.com/subject_image/" +
          item.subject_image,
        year: parseInt(item.year),
      };
      console.log(obj.year);
      result.push(obj);
    });
    console.log("Started");
    axios
      .post("http://localhost:8082/api/pdf/add_subject", result)
      .then((res) => {
        console.log(res.data);
        alert("Done!");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed!");
      });
    setData(result);
    // console.log(result[0]);
  }, []);
  return (
    <div>
      {data.map((item) => {
        return <div>{item.img_url}</div>;
      })}
    </div>
  );
}

export default Upload;
