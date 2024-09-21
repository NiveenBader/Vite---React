function Input({ label, error, ...rest }) {
  return (
    <div className="mb-3 ">
      <label htmlFor={rest.name} className="form-label fs-4 fw-bold ">
        {label}
        {rest.required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        {...rest}
        className={["form-control fs-5", error && "is-invalid"]
          .filter(Boolean)
          .join(" ")}
        id={rest.name}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}

export default Input;
