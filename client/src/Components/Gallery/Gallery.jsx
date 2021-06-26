import React, { Component,useState,useEffect,useCallback } from 'react';
import './Gallery.css';
import Navigation from '../NavBar/Nav';
import axios from 'axios';
import ImageViewer from 'react-simple-image-viewer';  //for Create Image-Viewer

export default function Gallery(){
    //currentImage,isViewerOpen - Handled by Image-Viewer
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    //images - Hold gallery images from backend
    const[images,setImages]=useState([])
    //UseEffect - get images from Backend
    useEffect(()=>{
        axios.get('http://localhost:8080/gallery')
        .then(res=>{
            let image_list=[];
            for(const img of res.data){
                image_list.push(`http://localhost:8080/${img.image}`)
            }
            setImages(image_list)
        })
    },[])
    //openImageViewer - Open Image Viwer when image is clicked
    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
      }, []);
    //closeImageViwer - Close ImageViewer
    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
      };
    return(
        <div>
            <Navigation/>
            <div id="gallery-section">
            <h2>Gallery</h2>
            <div>Explore the HOT Barbecues experience through the eyes of our customers. Check out some of the best moments craeted and shared at HOT Barbecues.</div>
            <div id="imagelists">
            {images.map((value,index)=>{
                return(
                <img src={value} className="gallery-images" alt="Pics" onClick={ () => openImageViewer(index) }></img>
                )
            })}
            {isViewerOpen && (
                <ImageViewer
                src={ images }
                currentIndex={ currentImage }
                onClose={ closeImageViewer }
                />
            )}
            </div>
            </div>
        </div>
    )
}