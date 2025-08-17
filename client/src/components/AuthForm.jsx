const AuthForm = ({ onSubmit, fields, submitLabel, error }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map(({ label, name, type }) => (
        <div key={name}>
          <label className="block text-sm font-medium mb-1">{label}</label>
          <input
            type={type}
            name={name}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default AuthForm;
