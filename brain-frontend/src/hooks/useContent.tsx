import {useState,useEffect} from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function useContent(){
    const [content,setContent]=useState([])
    useEffect(()=>{
        axios.get(BACKEND_URL+'/api/v1/content',{
            headers:{
                "authorization":localStorage.getItem('authorization')
            }
        }).then((response)=>{
            setContent(response.data.contents)
        })
    },[])
    return content
}