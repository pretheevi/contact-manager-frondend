import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function ContactList({filteredContacts = [], DeleteContact, LikeContact}){

  return (
    <>
      <div className='contact-list d-flex justify-content-center'>
        <div className='contact-list-container'>
          <ul className='p-3'>
            {filteredContacts?.length > 0 ? (
              filteredContacts.map(contact => (
                <li key={contact.contact_id} style={{listStyleType: 'none'}}>
                  <div className='contact-list-box p-2 d-flex justify-content-between'>
                    <span>
                      <h1>{contact.name}</h1>
                      <h2>{contact.phone}</h2>
                    </span>
                    <span>
                      <span>
                        <FontAwesomeIcon 
                          icon={faPen}
                          className={`dustBin`}
                          size="2x"
                          onClick={() => console.log("Edit")} />
                      </span>
                      <span className='m-3'>
                        { contact.liked === true ?
                        <FontAwesomeIcon 
                        className='liked' 
                        icon={solidHeart} 
                        size="2x"
                        color="white"
                        onClick={() => LikeContact(contact.contact_id, true)}
                        />  :
                        <FontAwesomeIcon 
                        className='text-secondary liked' 
                        icon={regularHeart} 
                        size="2x"
                        color="white"
                        onClick={() => LikeContact(contact.contact_id, false)}
                        />
                        }
                      </span>
                      <FontAwesomeIcon 
                        className='dustBin' 
                        icon={faTrash} 
                        size="2x" 
                        color="white"
                        onClick={() => DeleteContact(contact.contact_id, true)} 
                      />
                    </span>
                  </div>
                </li>
                ))) : (<p>No contacts available</p>)}
              </ul>
            </div>
          </div>
      </>
)}

export default ContactList;