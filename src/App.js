import { useState } from "react";
import "./App.css";
import List from "./List";
import { uid } from 'uid'

function App() {

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Dimas Kenzo',
      telp: '123456'
    },
    {
      id: 2,
      name: 'Kenan Quinno',
      telp: '654321'
    }
  ])

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false })
  const [formData, setFormData] = useState({
    name: '',
    telp: ''
  })


  function handleChange(e) {
    let data = { ...formData }
    data[e.target.name] = e.target.value
    setFormData(data)
  }

  function handleSubmit(e) {
    e.preventDefault()
    let data = [...contacts]
    if (formData.name === '') {
      return false
    }
    if (formData.telp === '') {
      return false
    }
    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name
          contact.telp = formData.telp
        }
      })
    } else {
      data.push({ id: uid(), name: formData.name, telp: formData.telp })
    }
    setIsUpdate(false);
    setContacts(data)
    setFormData({ name: '', telp: '' })
  }

  function handleEdit(id) {
    // cari data di state
    // isi data ke state form
    let data = [...contacts];
    console.log(setIsUpdate);
    let foundData = data.find((contacts) => contacts.id === id);
    setIsUpdate({ status: true, id: id });
    setFormData({ name: foundData.name, telp: foundData.telp });
  }

  function handleDelete(id) {
    let data = [...contacts]
    let filteredData = data.filter((contacts) => contacts.id !== id)
    setContacts(filteredData)
  }

  return (
    <div className="App">
      <h1 className="px-3 py-3">My Contact List</h1>

      <form className="px-3 py-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input type="text" className="form-control"
            value={formData.name} name="name"
            onChange={handleChange} />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">No. Telp</label>
          <input type="text" className="form-control"
            value={formData.telp} name="telp"
            onChange={handleChange} />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={contacts}
      />
    </div>
  );
}

export default App;