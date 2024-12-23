import React, { useEffect, useState } from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import {Link, useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import video from '../assets/video.mp4'
import video2 from '../assets/video 2.mp4'
import video3 from '../assets/video3.mp4'
import video4 from '../assets/video4.mp4'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id,cat)=>{
      console.log(id,cat)
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

      navigate(url)
      console.log(url)
  }



  const [currentImage,setCurrentImage] = useState(0)

  const desktopImages = [
      video,
      video,
     
  ]
  const mobileImages = [
   video,
  video4,
  video3,
  
   
]

 

  const nextImage = () =>{
      if(mobileImages.length - 1 > currentImage){
          setCurrentImage(preve => preve + 1)
      }
  }

  const preveImage = () =>{
      if(currentImage != 0){
          setCurrentImage(preve => preve - 1)
      }
  }


  useEffect(()=>{
      const interval = setInterval(()=>{
          if(mobileImages.length - 1 > currentImage){
              nextImage()
          }else{
              setCurrentImage(0)
          }
      }, 12000)

      return ()=> clearInterval(interval)
  },[currentImage])


  return (
   <section className='bg-white'>
      <div className='container mx-auto'>
          <div className={`w-full md:h-full  md:min-h-48 min-h-44  bg-blue-100 rounded  md:flex overflow-hidden ${!banner && "animate-pulse my-2" } `}>

          {
                        desktopImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all hidden lg:flex' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full'/>
                            </div>
                            )
                        })
                }
              {/* <img
                src={banner}
                className='w-full h-full hidden lg:block'
                alt='banner' 
                 <video src={imageURl} className='w-full h-full object-cover'/>
              /> */}


           <div className='flex h-full w-full overflow-x-visible md:hidden'>
                {
                        mobileImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                             
                                <video src={imageURl} autoPlay loop muted className='w-full h-40  p-2 overflow-scroll autoplay rounded-lg border-4 scroll-py-12 mt-1 bg-black '/>
                            </div>
                            )
                        })
                }
              </div>
              {/* <img
                src={bannerMobile}
                className='w-full h-full lg:hidden'
                alt='banner' 
              /> */}
          </div>
      </div>
      
      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2 '>
          {
            loadingCategory ? (
              new Array(12).fill(null).map((c,index)=>{
                return(
                  <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                    <div className='bg-blue-100 min-h-24 rounded'></div>
                    <div className='bg-blue-100 h-8 rounded'></div>
                  </div>
                )
              })
            ) : (
              categoryData.map((cat,index)=>{
                return(
                  <div key={cat._id+"displayCategory"} className='w-full h-full' onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}>
                    <div>
                        <img 
                          src={cat.image}
                          className='w-full h-full object-scale-down rounded-md border-2 border-slate-200 '
                        />
                    </div>
                    <div className='text-center text-xs md:text-sm  font-normal  line-clamp-1  '>
                    {cat?.name}
                    </div>
                  </div>
                )
              })
              
            )
          }
      </div>

      {/***display category product */}
      {
        categoryData?.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay 
              key={c?._id+"CategorywiseProduct"} 
              id={c?._id} 
              name={c?.name}
            />
          )
        })
      }



   </section>
  )
}

export default Home
