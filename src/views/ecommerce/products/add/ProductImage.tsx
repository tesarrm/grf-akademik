'use client'

// React Imports
import { FC, useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'

// Third-party Imports
import { useDropzone } from 'react-dropzone'

// Component Imports
import Link from '@components/Link'
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import AppReactDropzone from '@/libs/styles/AppReactDropzone'
import { useRemoveImageMutation, useUploadImageMutation } from '@/redux-store/features/course/courseApi'
import Box from '@mui/material/Box'
import { Avatar } from '@mui/material'

type FileProp = {
  name: string
  type: string
  size: number
  fileId?: string
}

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)<BoxProps>(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight
    }
  }
}))

type Props = {
  image: any;
  setImage: (image: any) => void;
  files: any;
  setFiles: (files: any) => void;
};


// const ProductImage = () => {
const ProductImage: FC<Props> = ({
  image,
  setImage,
  files,
  setFiles,
}) => {
  // Hooks
  // const { getRootProps, getInputProps } = useDropzone({
  //   multiple: false,
  //   accept: {
  //     'image/*': ['.png', '.jpg', '.jpeg', '.gif']
  //   },
  //   onDrop: (acceptedFiles: File[]) => {
  //     setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
  //   }
  // })

  // const img = files.map((file: FileProp) => (
  //   <img key={file.name} 
  //     alt={file.name} 
  //     className='single-file-image' 
  //     src={URL.createObjectURL(file as any)} 
  //   />
  // ))

  const [existingImage, setExistingImage] = useState<string | null>(null);

  // Ambil gambar yang sudah ada saat data course tersedia
  useEffect(() => {
    if (image) {
      setExistingImage(image.file_url);
    }
  }, [image]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)));
      setExistingImage(null); // Hapus gambar lama jika gambar baru diunggah
    },
  });

  const baseURL = process.env.NEXT_PUBLIC_SERVER_URI || '';

  // Tampilkan gambar yang ada atau gambar yang diunggah
  const img = () => {
    if (files.length > 0) {
      return files.map((file: File) => (
        <img
          key={file.name}
          alt={file.name}
          className="single-file-image"
          src={URL.createObjectURL(file)}
        />
      ));
    }

    if (existingImage) {
      return (
        <img
          alt="Existing"
          className="single-file-image"
          src={`${baseURL}${existingImage}`}
        />
      );
    }

    return <p>No image available</p>; // Placeholder jika tidak ada gambar
  };


  return (
    <Dropzone>
      <Card>
        <CardContent>
          <Box {...getRootProps({ className: 'dropzone' })} 
            {...((files.length > 0 || existingImage) && 
              { sx: { height: 450 } })}
          >
            <input {...getInputProps()} />
            {files.length > 0 || existingImage ? (
              img()
            ) : (
              <div className='flex items-center flex-col'>
                <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
                  <i className='tabler-upload' />
                </Avatar>
                <Typography variant='h4' className='mbe-2.5'>
                  Drop files here or click to upload.
                </Typography>
                <Typography>
                  Drop files here or click{' '}
                  <a href='/' onClick={e => e.preventDefault()} className='text-textPrimary no-underline'>
                    browse
                  </a>{' '}
                  thorough your machine
                </Typography>
              </div>
            )}
          </Box>
        </CardContent>
      </Card>
    </Dropzone>
  )
}

export default ProductImage
