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
import { useCreateCourseMutation, useRemoveImageMutation, useUploadImageMutation } from '@/redux-store/features/course/courseApi'

const eCommerceProductsAdd = () => {
  const [uploadImage] = useUploadImageMutation();
  const [removeImage] = useRemoveImageMutation();

  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  // untuk tumbhnail sementara disimpan di files dulu saja
  // jika sudah submit baru di simpan di image
  const [files, setFiles] = useState<File[]>([])

  const [image, setImage] = useState({
      // course_image: {
          file_name: "Group 2 (1).png",
          file_size: 47171,
          // file_url: "/files/Group 2 (1).png"
      // }
  })

  const [information, setInformation] = useState({
      title: "Ducimus expedita ea",
      short_introduction: "Ut impedit minima v",
      description: "<p>Tempor deleniti earu.</p>",
      video_link: "Aliquam quis delectu",
      tags: "",
      category: "Education",
  })
  const [instructors, setInstructors] = useState([{
      instructors:" kocengdrawing@gmail.com"
  }])

  const [setting, setSetting] = useState({
      published: true,
      upcoming: false,
      disable_self_learning: false,
      featured: false,
      enable_certification: false,
      published_on: null,
  })

  const [pricing, setPricing] = useState({
      paid_course: true,
      course_price: 0,
      currency: "AUD",
  })

  console.log(files)


  // const handleCourseCreate = async (e: any) => {
  //   setImage({
  //     file_name: files[0].name,
  //     file_size: files[0].size,
  //     // file_url: files[0].url,
  //   })

  //   const data = {
  //       course_image: image,

  //       title: information.title,
  //       short_introduction: information.short_introduction,
  //       description: information.description,
  //       video_link: information.video_link,
  //       tags: information.tags,
  //       category: information.category,
  //       instructors: instructors,

  //       published: setting.published,
  //       upcoming: setting.upcoming,
  //       disable_self_learning: setting.disable_self_learning,
  //       featured: setting.featured,
  //       enable_certification: setting.enable_certification,
  //       published_on: setting.published_on,

  //       paid_course: pricing.paid_course,
  //       course_price: pricing.course_price,
  //       currency: pricing.currency 
  //   }

  //   if (!isLoading) {
  //     await createCourse(data);
  //   }
  // };

  const handleCourseCreate = async (e: any) => {
    // e.preventDefault();

    if (files.length === 0) {
      console.error("No files to upload.");
      return;
    }

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Unggah file terlebih dahulu
      const uploadedFile = await uploadImage(formData).unwrap(); // Pastikan `unwrap` sesuai implementasi Redux Toolkit
      console.log("Uploaded file response:", uploadedFile);

      const image = {
        file_name: uploadedFile.file_name || files[0].name,
        file_size: uploadedFile.file_size || files[0].size,
        file_url: uploadedFile.file_url || uploadedFile.url, // Pastikan properti sesuai dengan API Anda
      };

      const data = {
        course_image: image,
        title: information.title,
        short_introduction: information.short_introduction,
        description: information.description,
        video_link: information.video_link,
        tags: information.tags,
        category: information.category,
        instructors: instructors,
        published: setting.published,
        upcoming: setting.upcoming,
        disable_self_learning: setting.disable_self_learning,
        featured: setting.featured,
        enable_certification: setting.enable_certification,
        published_on: setting.published_on,
        paid_course: pricing.paid_course,
        course_price: pricing.course_price,
        currency: pricing.currency,
      };

      // Kirim data setelah file diunggah
      if (!isLoading) {
        await createCourse(data);
        console.log("Course created successfully");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductAddHeader 
          handleCourseCreate={handleCourseCreate}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ProductImage 
              image={image}
              setImage={setImage}
              files={files}
              setFiles={setFiles}
            />
          </Grid>
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
