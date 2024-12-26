'use client'
// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ProductAddHeader from '@views/ecommerce/products/add/ProductAddHeader'
import ProductInformation from '@views/ecommerce/products/add/ProductInformation'
import ProductImage from '@views/ecommerce/products/add/ProductImage'
import ProductVariants from '@views/ecommerce/products/add/ProductVariants'
import ProductInventory from '@views/ecommerce/products/add/ProductInventory'
import ProductPricing from '@views/ecommerce/products/add/ProductPricing'
import ProductOrganize from '@views/ecommerce/products/add/ProductOrganize'
import ProductSetting from '@/views/ecommerce/products/add/ProductSetting'
import { useState } from 'react'

const eCommerceProductsAdd = () => {
  const [image, setImage] = useState({
      course_image: {
          file_name: "Group 2 (1).png",
          file_size: 47171,
          file_url: "/files/Group 2 (1).png"
      }
  })

  const [information, setInformation] = useState({
      title: "Ducimus expedita ea",
      short_introduction: "Ut impedit minima v",
      description: "<p>Tempor deleniti earu.</p>",
      video_link: "Aliquam quis delectu",
      tags: "",
      category: "Education",
  })
  const [instructors, setInstructors] = useState([
      "kocengdrawing@gmail.com",
  ])

  const [setting, setSetting] = useState({
      published: true,
      upcoming: false,
      disable_self_learning: false,
      featured: false,
      enable_certification: false,
      published_on: null,
  })

  const [pricing, setPricing] = useState({
      paid_course: false,
      course_price: 0,
      currency: "",
  })

  console.log(information)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductAddHeader />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          {/* <Grid item xs={12}>
            <ProductImage 
              image={image}
              setImage={setImage}
            />
          </Grid> */}
          <Grid item xs={12}>
            <ProductInformation 
              information={information}
              setInformation={setInformation}
              instructors={instructors}
              setInstructors={setInstructors}
            />
          </Grid>
          <Grid item xs={12}>
            <ProductSetting 
              setting={setting}
              setSetting={setSetting}
            />
          </Grid>
          <Grid item xs={12}>
            <ProductPricing 
              pricing={pricing}
              setPricing={setPricing}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <ProductVariants />
          </Grid>
          <Grid item xs={12}>
            <ProductInventory />
          </Grid> */}
        </Grid>
      </Grid>
      {/* <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ProductPricing />
          </Grid>
          <Grid item xs={12}>
            <ProductOrganize />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  )
}

export default eCommerceProductsAdd
