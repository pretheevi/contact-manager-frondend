function ContactCreate({ Name, Email, Phone, setName, setEmail, setPhone, AddContact, loading }) {
  return (
    <>
      <div className='nav-bottom d-md-none mt-auto mb-5'>
        <nav>
          <ul className='nav-links-2 d-flex justify-content-around'>
            <li>home</li>
            <li>about</li>
            <li>profile</li>
          </ul>
        </nav>
      </div>

      <div className='text-center'>
        <h1 className='contact-heading mt-5'>Add New Contact</h1>
      </div>  

      <div className='d-flex flex-row justify-content-center m-0 p-0'>
        <form className='form d-flex flex-column justify-content-around'>
          <label className='Label-contact' htmlFor='name'>Name</label>
          <input
            className='Input-contact'
            id="name"
            type='text'
            required
            onChange={(e) => setName(e.target.value)}
            value={Name}
          />

          <label className='Label-contact' htmlFor='email'>Email</label>
          <input
            className='Input-contact'
            id="email"
            type='text'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
          />

          <label className='Label-contact' htmlFor='phone'>Phone</label>
          <input
            className='Input-contact'
            id="phone"
            type='number'
            required
            onChange={(e) => setPhone(e.target.value)}
            value={Phone}
          />

          <div className='d-flex flex-row justify-content-center mt-3'>
            <button className='Button' type='button' onClick={AddContact} disabled={loading}>
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>  
    </>
  );
};

export default ContactCreate;
