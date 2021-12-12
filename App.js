import React, { useState, useEffect } from "react";

export default function AppCopy() {
  const [data, setData] = useState("");
  const [isBackSpace, setIsBackSpace] = useState(0);
  const [isValid, setIsValid] = useState(false);

  let dateInputField = document.getElementById("dateInput");

  const validateDate = (n) => {
    console.log("data lenght", data.length, "input", n);

    if (!isValid) {
      return;
    }

    if (data.length === 0 && n >= 4 && n <= 9) {
      setData(0 + n);
    } else if (data.length === 0 && n >= 0 && n <= 3) {
      setData(n);
    } else if (data.length === 1 && n <= 31) {
      setData(n);
    } else if (data.length < 4) {
      let val = parseInt(n.charAt(3));
      if (val > 1 && val <= 9) {
        setData(data + "0" + val);
      } else if (val === 1) {
        setData(data + val);
      }
    } else if (data.length < 5) {
      let val = parseInt(n.charAt(4));
      if (val <= 2) setData(data + val);
    } else {
      if (n.charAt(data.length) <= 9) setData(n);
    }
  };

  useEffect(() => {
    let newData = "";
    if (data.length === 2 || data.length === 5) {
      if (!data.match(/\//g)) {
        newData = data + "/";
        setData(newData);
      } else if (data.match(/\//g).length < 2 && data.indexOf("/") === 2) {
        newData = data + "/";
        setData(newData);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data.length === 7 || data.length === 4) {
      console.log("dateInputField.value.length", dateInputField.value.length);
      setCaretPosition(dateInputField, dateInputField.value.length - 1);
    }
    if (data.length === 6) {
      setData(data.slice(0, 4));
    }
    if (data.length === 3) {
      console.log("called");
      setData(data.slice(0, 1));
    }
    if (data.length <= 4) {
      setData(data.slice(0, data.length - 1));
    }
  }, [isBackSpace]);

  const handleOnChage = (e) => {
    validateDate(e.target.value);
  };

  const onKeyDown = (e) => {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 8) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    if (e.keyCode === 8) setIsBackSpace(isBackSpace + 1);
  };

  const setCaretPosition = (ctrl, pos) => {
    // Modern browsers
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);

      // IE8 and below
    } else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  };

  return (
    <>
      <h1>{`${data} - ${data.length} - ${typeof data}`}</h1>
      <input
        inputMode="numeric"
        autoComplete="on"
        id="dateInput"
        value={data}
        onChange={handleOnChage}
        maxLength={10}
        placeholder="DD/MM/YYYY"
        onKeyDown={onKeyDown}
      />
    </>
  );
}
