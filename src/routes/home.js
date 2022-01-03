import React, { useEffect, useState } from "react";
import "../App.css";
import { logout } from "../app/actions/auth";
import { useNavigate } from "react-router-dom";
import { getUser } from "../app/Selector/selector";
import {
  addNewMember,
  getAllMembersList,
  deleteOneMember,
} from "../services/index";
function Home() {
  const [members, setMembers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [showCompanyFilter, setShowCompanyFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  const [companies,setCompanies] = useState([])
  const [statuses,setstatuses] = useState([])

  const navigate = useNavigate();
  useEffect(() => {
    let loggedInUser = getUser();
    if (loggedInUser == null) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    getAllMembersList()
      .then((mem) => {
        setMembers(mem)
        let c = []
        let s = []
        mem.forEach(element => {
          if(!c.includes(element.company)){
            c.push(element.company)
          }
          if(!s.includes(element.status)){
            s.push(element.status)
          }
        });
        setCompanies(c)
        setstatuses(s)
        setSelectedCompany(c)
        setSelectedStatus(s)
      })
      .catch((err) => console.log(err));
    console.log(members);
  }, []);

  const filterCompany = (e,comp) => {
    if(comp == "all"){
      if(companies.length==selectedCompany.length){
        setSelectedCompany([])
        return
      }
      setSelectedCompany(companies);
      return
    }
    if(selectedCompany.includes(comp)){
      setSelectedCompany(selectedCompany.filter(item => item !== comp))
    }else{
      let temp = [...selectedCompany]
      temp.push(comp)
      setSelectedCompany(temp)
      
    }
  };

  const filterStatus = (e,st) => {
    if(st == "all"){
      if(statuses.length==selectedStatus.length){
        setSelectedStatus([])
        return
      }
      setSelectedStatus(statuses);
      return
    }
    if(selectedStatus.includes(st)){
      setSelectedStatus(selectedStatus.filter(item => item !== st))
    }else{
      let temp = [...selectedStatus]
      temp.push(st)
      setSelectedStatus(temp)
      
      
    }

  };

  const logoutUser = () => {
    logout();
    navigate("/login");
  };
  const addMember = (e) => {
    e.preventDefault();
    let inpValues = {
      name: e.target.name.value,
      company: e.target.company.value,
      status: e.target.status.value,
      Notes: e.target.notes.value,
    };
    addNewMember(inpValues)
      .then((res) => {
        if (res) {
          getAllMembersList()
            .then((mem) => {
              setMembers(mem);
              e.target.reset();
              setShowAddMemberForm(false);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteMember = (id) => {
    deleteOneMember(id)
      .then((res) => {
        getAllMembersList()
          .then((mem) => {
            setMembers(mem);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return members.length == 0 ? (
    <div>Loading</div>
  ) : (
    <div className="Home">
      <div
        className="add-member-model"
        style={{ display: showAddMemberForm ? "flex" : "none" }}
      >
        <div className="add-member-div">
          <div>
            <p
              className="close-add-member"
              onClick={(e) => setShowAddMemberForm(false)}
            >
              X
            </p>
          </div>
          <h3>Add Members</h3>
          <form onSubmit={(e) => addMember(e)}>
            <div className="member-form-input-div">
              <label>Name</label>
              <input name="name" placeholder="Name" />
            </div>
            <div className="member-form-input-div">
              <label>Company</label>
              <input name="company" placeholder="Company" />
            </div>
            <div className="member-form-input-div">
              <label>Status</label>
              <input name="status" placeholder="Status" />
            </div>
            <div className="member-form-input-div">
              <label>Notes</label>
              <input name="notes" placeholder="Notes" />
            </div>
            <div style={{textAlign:'right'}}>
              <button
                className="add-member-action add-member-cancel"
                onClick={(e) => setShowAddMemberForm(false)}
              >
                Cancel
              </button>
              <input type="submit" value="Save" className="add-member-action" />
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="header">
          <div className="heading">Team Members</div>
          <button
            className="addMember"
            onClick={(e) => setShowAddMemberForm(true)}
          >
            Add Members +
          </button>
          <button className="logout-button" onClick={logoutUser}>
            Logout
          </button>
        </div>
        <div className="filters-div">
        <div className="filter">
            <div className="filter-head" onClick={(e)=> setShowCompanyFilter(!showCompanyFilter)}>
              Company({selectedCompany.length}) 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
            <div className="filter-list" style={{display:showCompanyFilter ? "flex" : "none"}}>
            <span>
                <input onChange={e => filterCompany(e,"all")} checked={selectedCompany.length == companies.length ? true : false} type="checkbox" /> Select All
              </span>
            {companies.map((elm) => (
              <span key={elm}>
                <input onChange={e => filterCompany(e,elm)} checked={selectedCompany.includes(elm) ? true : false} type="checkbox" /> {elm}
              </span>
              ))}
            </div>
          </div>
          <div className="filter">
            <div className="filter-head" onClick={(e)=> setShowStatusFilter(!showStatusFilter)}>
              Status({selectedStatus.length}) 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
            <div className="filter-list" style={{display:showStatusFilter ? "flex" : "none"}}>
            <span>
                <input onChange={e => filterStatus(e,"all")} checked={selectedStatus.length == statuses.length ? true : false} type="checkbox" /> Select All
              </span>
            {statuses.map((elm) => (
              <span key={elm}>
                <input onChange={e => filterStatus(e,elm)} checked={selectedStatus.includes(elm) ? true : false} type="checkbox" /> {elm}
              </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <table className="main-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Name</th>
              <th>Company</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Notes</th>
              <th></th>
              <th className="end-cell"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((elm) => (selectedCompany.includes(elm.company) && selectedStatus.includes(elm.status)) ? (
              <tr key={elm.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{elm.name}</td>
                <td>{elm.company}</td>
                <td>{elm.status}</td>
                <td>{elm.LastUpdated.toDate().toLocaleDateString()}</td>
                <td>{elm.Notes}</td>
                <td>
                  <svg
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteMember(elm.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                </td>
                <th className="end-cell"></th>
              </tr>
            ):null)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
