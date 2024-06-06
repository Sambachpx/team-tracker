const editPage = () => (
  <div>
    <h1>
      edit player
      <form>
        First Name:
        <input type="text" />
        <br />
        Last Name:
        <input type="text" />
        <br />
        Salary:
        <input type="number" />
        <br />
        Team:
        <input type="text" />
        <br />
        <button type="submit">Save</button>
      </form>
    </h1>
  </div>
);

export default editPage;
