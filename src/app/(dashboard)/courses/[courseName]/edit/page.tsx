"use client"
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
import { useEffect, useState } from 'react'
import { useCreateCourseMutation, useEditCourseMutation, useGetCourseQuery, useRemoveImageMutation, useUploadImageMutation } from '@/redux-store/features/course/courseApi'
import { useParams, useRouter } from "next/navigation";

// const eCommerceProductsAdd = () => {
const eCommerceProductsAdd: React.FC = () => {
  const [uploadImage] = useUploadImageMutation();
  const [removeImage] = useRemoveImageMutation();

  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [editCourse, { isLoading: isUpdating }] = useEditCourseMutation();

  // const [createCourse, { isLoading, isSuccess, error }] =
  //   useCreateCourseMutation();

  // untuk tumbhnail sementara disimpan di files dulu saja
  // jika sudah submit baru di simpan di image
  const [files, setFiles] = useState<File[]>([])

  // const [image, setImage] = useState({
  //     // course_image: {
  //         file_name: "Group 2 (1).png",
  //         file_size: 47171,
  //         // file_url: "/files/Group 2 (1).png"
  //     // }
  // })

  // const [information, setInformation] = useState({
  //     title: "Ducimus expedita ea",
  //     short_introduction: "Ut impedit minima v",
  //     description: "<p>Tempor deleniti earu.</p>",
  //     video_link: "Aliquam quis delectu",
  //     tags: "",
  //     category: "Education",
  // })

  // const [instructors, setInstructors] = useState([{
  //     instructors:" kocengdrawing@gmail.com"
  // }])

  // const [setting, setSetting] = useState({
  //     published: true,
  //     upcoming: false,
  //     disable_self_learning: false,
  //     featured: false,
  //     enable_certification: false,
  //     published_on: null,
  // })

  // const [pricing, setPricing] = useState({
  //     paid_course: true,
  //     course_price: 0,
  //     currency: "AUD",
  // })


  // State untuk setiap form section
  const [image, setImage] = useState({
    file_name: '',
    file_size: 0,
    file_url: '',
  });

  // console.log(image)

  const [information, setInformation] = useState({
    title: '',
    short_introduction: '',
    description: '',
    video_link: '',
    tags: '',
    category: '',
  });

  // const [instructors, setInstructors] = useState([{ instructor: '' }]);
  const [instructors, setInstructors] = useState([]);

  const [setting, setSetting] = useState({
    published: false,
    upcoming: false,
    disable_self_learning: false,
    featured: false,
    enable_certification: false,
    published_on: null,
  });

  const [pricing, setPricing] = useState({
    paid_course: false,
    course_price: 0,
    currency: '',
  });

  console.log(information)
  console.log(instructors)

  //Router
  // Ambil parameter dari URL
  const params = useParams();
  const router = useRouter();
  const courseName = params.courseName; // Parameter 'courseName' dari URL

  // Fetch course data
  // const { data: courseData, isLoading } = useGetCourseQuery(courseName);
  const {
    data: courseData,
    isLoading: courseIsLoading,
    refetch: courseRefetch,
  } = useGetCourseQuery(params.courseName);

  // Update state jika data kursus tersedia
  useEffect(() => {
    if (courseData?.message) {
      const course = courseData.message;
      console.log(course)

      // Update state sesuai data kursus
      setImage({
        file_name: course.image ? course.image.split('/').pop() || '' : '',
        file_size: 0, 
        file_url: course.image || '',
      });

      setInformation({
        title: course.title || '',
        short_introduction: course.short_introduction || '',
        description: course.description || '',
        video_link: course.video_link || '',
        tags: course.tags || '',
        category: course.category || '',
      });

      setInstructors(
        course.instructors.map((instructor: any) => ({
          instructor: instructor.owner || '',
        }))
      );

      setSetting({
        published: !!course.published,
        upcoming: !!course.upcoming,
        disable_self_learning: !!course.disable_self_learning,
        featured: !!course.featured,
        enable_certification: !!course.enable_certification,
        published_on: course.published_on || null,
      });

      setPricing({
        paid_course: !!course.paid_course,
        course_price: course.course_price || 0,
        currency: course.currency || '',
      });
    }
  }, [courseData]);




  //Router
  // Mock data pengguna
  const user = {
    data: {
      is_moderator: false,
      is_instructor: true,
    },
  };

  useEffect(() => {
    if (!courseName) return; // Tunggu hingga `courseName` terisi

    // Jika courseName adalah "new" dan pengguna tidak memiliki akses
    if (
      courseName === "new" &&
      !user.data?.is_moderator &&
      !user.data?.is_instructor
    ) {
      router.push("/courses"); // Arahkan ke halaman Courses
    }

    // Jika courseName bukan "new", lakukan reload resource
    if (courseName !== "new") {
      // console.log("Reloading course data for:", courseName);
      // Panggil fungsi untuk memuat ulang data course
      reloadCourseData(courseName as string);
    } else {
      // console.log("New course form opened");
      captureEvent("course_form_opened");
    }
  }, [courseName, user, router]);

  const reloadCourseData = (id: string) => {
    // Implementasi logika untuk memuat ulang data course berdasarkan id
    // console.log(`Loading course data for ID: ${id}`);
  };

  const captureEvent = (event: string) => {
    // Fungsi untuk mencatat event
    // console.log(`Event captured: ${event}`);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // console.log(`Key pressed: ${e.key}`);
    // Implementasikan shortcut keyboard di sini
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); 

  //Edit
  // const {
  //   data: course,
  //   isLoading: courseIsLoading,
  //   refetch: courseRefetch,
  // } = useGetCourseQuery(params.courseName);

  //Submit
  // const handleCourseCreateUpdate = async (e: any) => {

  //   try {
  //     if (files.length !== 0 ) {
  //       const file = files[0];
  //       const formData = new FormData();

  //       formData.append("file", file);
  //       // Unggah file terlebih dahulu
  //       const uploadedFile = await uploadImage(formData).unwrap();
  //       // console.log("Uploaded file response:", uploadedFile);

  //       setImage({
  //         file_name: uploadedFile.file_name || files[0].name,
  //         file_size: uploadedFile.file_size || files[0].size,
  //         file_url: uploadedFile.file_url || uploadedFile.url, 
  //       });
  //     }

  //     const data = {
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
  //       currency: pricing.currency,
  //     };

  //     // Kirim data setelah file diunggah
  //     if (!isLoading) {
  //       await createCourse(data);
  //       // console.log("Course created successfully");
  //     }
  //   } catch (error) {
  //     // console.error("Error creating course:", error);
  //   }
  // };


  const handleSubmit = async () => {
    const courseId = params.courseName || null; // Ambil ID kursus jika ada
    const formData = {
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

    await handleCourseCreateUpdate(courseId, files, formData);
  };



  const handleCourseCreateUpdate = async (courseId: any | null, files: File[], formData: any) => {
    try {
      let imageFile = null; 
      // let uploadedFile = null;
      // Unggah gambar jika ada
      if (files.length !== 0) {
        const file = files[0];
        const formDataFile = new FormData();
        formDataFile.append("file", file);
        const uploadedFile = await uploadImage(formDataFile).unwrap();

        // image = {
        //   file_name: uploadedFile.message.file_name || files[0].name,
        //   file_size: uploadedFile.message.file_size || files[0].size,
        //   file_url: uploadedFile.message.file_url || uploadedFile.message.url, 
        // };

        imageFile = uploadedFile.message;
      } else {

      }

      const data = {
        image: imageFile?.file_url || image?.file_url,
        course_image: image,
        ...formData, // Data lainnya dari form
      };

      console.log(data)

      // Tentukan apakah akan create atau update
      if (courseId !== "new") {
        await editCourse({ courseId, data }).unwrap();
        alert("Course updated successfully!");
      } else {
        // await createCourse(data).unwrap();
        await createCourse(data);
        alert("Course created successfully!");
      }
    } catch (error) {
      console.error("Error handling course:", error);
      alert("Failed to save the course.");
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductAddHeader 
          handleCourseCreate={handleSubmit}
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
        </Grid>
      </Grid>
    </Grid>
  )
}

export default eCommerceProductsAdd
