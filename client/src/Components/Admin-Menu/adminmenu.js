import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';
import blank from './2048px-Solid_white.svg.png';

//This Component allow admin to Add or Edit his restaurant Menu
export default function AdminMenu(){
    //Orginal_menu - Hold the menu items from backend
    //Menu - Hold both menu items from backend and newly created menu that are not saved to backend.
    const[original_menu,setOriginalmenu]=useState([])
    const[menu,setMenu]=useState([]);
    //useEffect to get menu from backend
    useEffect(()=>{
        getEditDetails()
    },[])
    const getEditDetails=()=>{
        document.getElementById("edit").style.color="yellow";
        document.getElementById("buss").style.color="white";
        document.getElementById("book").style.color="white";
        axios.get('http://localhost:8080/menu')
        .then(res=>{
            setMenu(res.data)
            setOriginalmenu(res.data)
        })
    }
    let image; //hold the image file that is selected for Edit
    // updateMenu - Used to update the Menu
    const updateMenu=(id,index)=>{
        const name=document.getElementsByClassName('itemname')[index].value;
        const items=document.getElementsByClassName('itemlist')[index].value;
        if(name==="" || items===""){
            alert("Name and list of menu items Shouldn't be None")
            return
        }
        if(id===undefined){
            if(image===undefined){
                alert("Select Image")
                return
            }
            //formData - hold name,items,image of form
            //and image is processed by multer in backend
            const formData = new FormData(); 
            formData.append('name', name);
            formData.append('items', items);
            formData.append('image', image);
            axios.post('http://localhost:8080/menu',formData)
            .then(res=>{
                getEditDetails();
                alert("Update Success")
            })
            .catch(err=>alert("Please try Later"))
        }
        else{
            const array_items=items.split(',')
            if(image===undefined){
                axios.put(`http://localhost:8080/menu/${id}`,{
                    name:name,
                    items:array_items
                })
                .then(val=>{
                getEditDetails();
                alert("Update Success")
                })
                .catch(err=>{
                    alert("Update fail please try later")
                })
            }
            else{
                const formData = new FormData();
                formData.append('name', name);
                formData.append('items', items);
                formData.append('image', image);
                axios.put(`http://localhost:8080/menuall/${id}`,formData)
                .then(val=>{
                    getEditDetails();
                    alert("Update Success")
                })
                .catch(err=>{
                    alert("Update fail please try later")
                })
            }
        }
     }
     //deleteMenu - Used to delete the menu items
     const deleteMenu=(id,index)=>{
         if(id===undefined){
            const new_menu=[...menu];
            new_menu.splice(index,1)
            setMenu(new_menu)
            return
         }
         axios.delete(`http://localhost:8080/menu/${id}`)
         .then(val=>{
             getEditDetails();
             alert("Deleted Successfully")
         })
         .catch(err=>{
             alert("Failed to Delete please try later")
         })
    }
    //changeImage - used to change the image for edit
    const changeImage=(e)=>{
         image=e.target.files[0];
    }
    //newmenuhandler - when update button is clicked
    //this update the menu in backend or alert if any error occur
    const newmenuhandler=()=>{
        if(original_menu.length!==menu.length){
            alert("Update or Delete the Previous menu")
        }
        else{
            setMenu([...menu,{name:"",image:"",items:""}])
        }
    }
    return(
            <>
                <div className="menu-list" >
                            {menu.map((value,index)=>{
                                let imagebe;
                                if(value.image===""){
                                    imagebe=blank
                                }
                                else{
                                    imagebe=`http://localhost:8080/${value.image}`
                                }
                                return(
                                        <form className="edit" key={index} encType='multipart/form-data'>
                                            <input type="text" defaultValue={value.name} name="name" className="itemname"></input>
                                            <textarea defaultValue={value.items} name="items" className="itemlist"></textarea>
                                            <div id="change-image">
                                                <img src={imagebe} alt="items" className='dishes-menu'></img>
                                                <input type="file" id="chosen-image" name="image"  onChange={changeImage}></input>
                                            </div>
                                            <button type='button' className="update-menu" onClick={()=>updateMenu(value._id,index)}>Update</button>
                                            <button type="button" className="delete-menu" onClick={()=>deleteMenu(value._id,index)}>Delete</button>
                                        </form>
                                    )
                            })
                        }
                    <button type="button" id="addnewmenu" onClick={newmenuhandler}>Add+</button>
                </div>
            </>
        )
}