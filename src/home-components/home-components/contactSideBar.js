import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function ContactCreate({ Name, Email, Phone, setName, setEmail, setPhone, AddContact, loading, totalContact, likedContacts, setDisplaySideBar}) {

  const navigation = useNavigate();
  return (
  <>
  <div className='contact-side-bar-container'>
    <div className='nav-bottom d-md-none mt-auto mb-5'>
      <nav>
        <ul className='nav-links-2 d-flex justify-content-start'>
          <li style={{cursor:'pointer'}}
              onClick={() => setDisplaySideBar(false)}>home</li>
          <li style={{cursor:'pointer'}}
              onClick={() => navigation('/about')}>about</li>
          {/* <li style={{cursor:'pointer'}}
              onClick={() => navigation('/profile')}>profile</li> */}
          <li
            style={{cursor:'pointer'}} 
            onClick={() => setDisplaySideBar(false)}><FontAwesomeIcon icon={faTimes} /></li>
        </ul>
      </nav>
    </div>
    
    <div className='contacts-sort'>
      <div>
        <div className="d-flex">
          <span>
          <FontAwesomeIcon icon={faAddressBook} size="2x" color="white" />
          </span>
          <span className='contact-all'>
            <h1>All Contacts</h1>
            <p>{ totalContact } contact</p>
          </span>
        </div>
        <div className="d-flex mt-3">
          <span>
          <FontAwesomeIcon icon={faHeart} size="2x" color="white" />
          </span>
          <span className='contact-all'>
            <h1>Favorite Contacts</h1>
            <p>{likedContacts} Favorite</p>
          </span>
        </div>
      </div>
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

          <label className='Label-contact' htmlFor='phone'>Phone</label>
          <input 
            className='Input-contact' 
            id="phone" 
            type='number' 
            required 
            onChange={(e) => setPhone(e.target.value)} 
            value={Phone} />

          <label className='Label-contact' htmlFor='email'>Email (Optional)</label>
          <input 
            className='Input-contact' 
            id="email" 
            type='text' 
            required 
            onChange={(e) => setEmail(e.target.value)} 
            value={Email} />

          <div className='d-flex flex-row justify-content-center mt-3'>
            <button className='Button' type='button' onClick={AddContact} disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
      </form>
    </div> 
    </div> 
  </>
  );
};

export default ContactCreate;