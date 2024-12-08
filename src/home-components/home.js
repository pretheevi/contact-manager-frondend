import { useEffect, useState } from 'react';
import api from '../api';
import './home.css';
import { Link, useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ContactCreate from './home-components/contactSideBar';
import ContactList from './home-components/contactList';
// Notifications Library
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'



function Home(){
  const Navigate = useNavigate();
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [contactAdded, setContactAdded] = useState(false);
  //loading animation on button for create contact
  const [loading, setLoading] = useState(false);
  //save all contact list at the beginning
  const [contactList, setContactList] = useState([]);
  //filter contact for search engine
  const [filteredContacts, setFilteredContacts] = useState([]);
  //show total contact number in side bar
  const [totalContact, setTotalContact] = useState('');
  //onclick hamburger menu to display contact side bar
  const [displaySideBar, setDisplaySideBar] = useState();
  //liked
  const [likedContacts, setLikedContacts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');


  async function getAllContacts(){
    try{
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No JWT token found. Please log in.");
        return Navigate('/');
      };

      const response = await api.get('/api/contacts', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      console.log(response.data.data);
      setContactList(response.data.data)
      setFilteredContacts(response.data.data);
    }catch(error){
      console.error(error);
    }
  }




  const AddContact = async (event) => {
    event.preventDefault();
  
    // Retrieve JWT token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, display an error message or handle accordingly
      console.log("No JWT token found. Please log in.");
      return Navigate('/');
    }
  
    setLoading(true); // Start loading
    // If the token exists, include it in the request headers
    try {
      const response = await api.post('/api/contacts', {
        name: Name,
        email: Email,
        phone: Phone,
        liked: false
      }, {
        headers: {
          'Authorization': `Bearer ${token}`  // Add the token to the Authorization header
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Contact Added Successfully',
        text: response.data.message
      }) // Log response data or handle it as required
      setContactList((prevList) => [...prevList, response.data.data])
      setContactAdded(true); // Mark contact as added successfully
      getAllContacts();
      
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!...',
        text: error.response.data.message,
        confirmButtonText: 'Okay'
      })
      setContactAdded(false); // Mark as failed
    } finally {
      setLoading(false); // Stop loading after the request is completed
    }
  };




    //update the contact list when click on liked button
    async function LikeContact(contactID, isLiked) {
      try{
        const token = localStorage.getItem('token');
        if (!token) {
          console.log("No JWT token found. Please log in.");
          return Navigate('/');
        };
  
        const response = await api.put(`/api/contacts/${contactID}`,
          { liked: !isLiked}, 
          {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });
      getAllContacts();
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: 'Error in deleting contact',
          text: error.data.message
        })
      }
    }
  

  //Delete the contact list when click on DustBin button
  async function DeleteContact(contactID) {
    try{
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No JWT token found. Please log in.");
        return Navigate('/');
      };

      const confirmation = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this contact 🤔❓',
        text: 'you cannot retrieve this contact from your account.',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText:'No, Keep it',
      })

      if(confirmation.isConfirmed) {
        const response = await api.delete(`/api/contacts/${contactID}`, {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        Swal.fire({
          icon: 'success',
          title: 'contact deleted successfully',
          text: 'Removed contact from list'
        });

        // Update the contact list by filtering out the deleted contact
        setContactList((prev) => prev.filter((contact) => contact.contact_id !== contactID));
        getAllContacts();
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Delete request is Cancelled! ✅',
        });
      }
    
    }catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Error in deleting contact',
        text: error.data.message
      })
    }
  }





  //Search Engine logic 
  function SearchContacts(searchTerm) {
    try {
      if (!searchTerm.trim()) {
        // If search input is empty, don't filter; just show the full contact list
        setFilteredContacts(contactList);
        return;
      }
      // Filter contacts by name or other fields (case-insensitive)
      const searchedContacts = contactList.filter((contact) => {

        if(!Number(searchTerm)){
          return contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        } else if(Number(searchTerm)){
          return contact.phone.includes(searchTerm)
        }
      });
      setFilteredContacts(searchedContacts);
    } catch (error) {
      console.error("Error searching contacts:", error);
    }
  };

  //Update contact side bar display
  const sidebar = document.querySelector('.contact-create-bar');
  useEffect(() => {
    if (sidebar) {
      sidebar.classList.toggle('show');
    }
  }, [displaySideBar])

  const handleSelect = (criteria) => {
    setSortCriteria(criteria);
    handleSort(criteria); // Call the sort function with the selected criteria
  };


  const handleSort = (criteria) => {
    // Always reset the list to the original state first
    const defaultList = [...contactList]; // Original list
  
    if (criteria === "all") {
      // No sorting, just reset to default
      setFilteredContacts(defaultList);
    } else {
      const sortedList = [...defaultList]; // Clone the default list
  
      if (criteria === "alphabetical") {
        sortedList.sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical order
      } else if (criteria === "favorites") {
        sortedList.sort((a, b) => b.liked - a.liked || a.name.localeCompare(b.name)); // Favorites first, then alphabetical
      }
  
      setFilteredContacts(sortedList); // Update the filtered list
    }
  
    setSortCriteria(criteria); // Update the selected sort criteria
  };
  

  /********************************************************************
   *******************NECESSARY UseEffect******************************
   ********************************************************************/
  useEffect(() => {
    // Handle contact addition
    if (contactAdded) {
      setName('');
      setEmail('');
      setPhone('');
      setContactAdded(false); // Reset success state after clearing fields
    }
  
    // Update total and liked contacts
    if (!contactList || contactList.length === 0) {
      setTotalContact(0);
      setLikedContacts(0);
    } else {
      const total = contactList.length;
      const likedCount = contactList.reduce((count, contact) => count + (contact.liked ? 1 : 0), 0);
      setTotalContact(total);
      setLikedContacts(likedCount);
    }
  }, [contactAdded, contactList]);
  
  useEffect(() => {
    // Fetch all contacts on component mount
    getAllContacts();
  }, []);



  //return JXS 
return (
    <>
  <div className='home-container'>

      <div className="navigation">
        <nav>
          <ul className='nav-links'>
            <li>
              <Link to="/home" className='logo'>BuddyList</Link>
            </li>
            <li className='mt-2 d-none d-md-block'>
              <Link to="/about" className='home-nav-link'>about</Link>
            </li>
            {/* <li className='mt-2 d-none d-md-block'>
              <Link to="/profile" className='home-nav-link'>profile</Link>
            </li> */}
            <li className='mt-2 d-block d-md-none hamburger-icon'>
              <FontAwesomeIcon icon={faBars} onClick={() => setDisplaySideBar(true)} />
            </li>
          </ul>
        </nav>
      </div>



      <div className="container-fluid p-0">
        <div className="row">


          <div className="col-12 col-md-7 contact-main-area p-0">
            <div className='contact-nav d-flex justify-content-end'>
              <div>
              <div className="sorting-dropdown">
                <select 
                  className="sorting-select" 
                  value={sortCriteria} 
                  onChange={(e) => handleSelect(e.target.value)}
                >
                  <option value="" disabled>
                    Sort by
                  </option>
                  <option value="all">
                    All
                  </option>
                  <option value="alphabetical">
                    A-Z
                  </option>
                  <option value="favorites">
                    Favorites
                  </option>
                </select>
              </div>



              </div>
              <nav>
                <input className='searchInput' onChange={(e) => {SearchContacts(e.target.value)}} placeholder='Search Contacts' />
                <button className='searchBtn m-3'> <FontAwesomeIcon onClick={(e) => {SearchContacts(e.target.value)}} icon={faSearch} className='icon' size="2x" color="gray" /></button>
              </nav>
            </div>
            <div>
              <ContactList 
                filteredContacts={filteredContacts} 
                DeleteContact={DeleteContact}
                LikeContact={LikeContact}
              />
            </div>
          </div>


          <div className={`col-12 col-md-5 contact-create-bar`}>
            <ContactCreate 
              Name={Name} 
              Email={Email} 
              Phone={Phone} 
              setName={setName}
              setEmail={setEmail}
              setPhone={setPhone}
              AddContact={AddContact}
              loading={loading}
              setLoading={setLoading}
              totalContact={totalContact}
              likedContacts={likedContacts}
              setDisplaySideBar={setDisplaySideBar}
                          />
          </div>


        </div>
      </div>
      </div>

    </>
  )
}

export default Home;