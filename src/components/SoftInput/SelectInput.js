import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const SelectInput = forwardRef(({ options, value, onChange, error, success, disabled, ...rest }, ref) => {
    const selectStyle = {
        padding: "8px",
        borderRadius: "4px",
    };

  return (
    <select
      {...rest}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{
        ...selectStyle,
        border: `2px solid ${error ? "red" : success ? "green" : "gray"}`,
        background: disabled ? "gray" : "white",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      ref={ref}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

SelectInput.defaultProps = {
  value: "",
  options: [],
  error: false,
  success: false,
  disabled: false,
};

SelectInput.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SelectInput;
