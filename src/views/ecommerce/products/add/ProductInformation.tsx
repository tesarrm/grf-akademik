'use client'

// MUI Imports
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import type { Editor } from '@tiptap/core'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import '@/libs/styles/tiptapEditor.css'
import { MenuItem } from '@mui/material'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useGetAllCategoryQuery, useGetAllUserQuery } from '@/redux-store/features/course/courseApi'

// Data Imports
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Dark Knight', year: 2008 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'Schindler\'s List', year: 1993 }
];

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1 pbs-6 pbe-4 pli-6'>
      <CustomIconButton
        {...(editor.isActive('bold') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <i className={classnames('tabler-bold', { 'text-textSecondary': !editor.isActive('bold') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('underline') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <i className={classnames('tabler-underline', { 'text-textSecondary': !editor.isActive('underline') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('italic') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i className={classnames('tabler-italic', { 'text-textSecondary': !editor.isActive('italic') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('strike') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <i className={classnames('tabler-strikethrough', { 'text-textSecondary': !editor.isActive('strike') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'left' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <i
          className={classnames('tabler-align-left', { 'text-textSecondary': !editor.isActive({ textAlign: 'left' }) })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'center' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <i
          className={classnames('tabler-align-center', {
            'text-textSecondary': !editor.isActive({ textAlign: 'center' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'right' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <i
          className={classnames('tabler-align-right', {
            'text-textSecondary': !editor.isActive({ textAlign: 'right' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'justify' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      >
        <i
          className={classnames('tabler-align-justified', {
            'text-textSecondary': !editor.isActive({ textAlign: 'justify' })
          })}
        />
      </CustomIconButton>
    </div>
  )
}

type DataType = {
  // year: number
  name: string
}

const fixedOptions = [top100Films[0]]

type Props = {
  information: any;
  setInformation: (information: any) => void;
  instructors: any;
  setInstructors: (instructors: any) => void;
};

// const ProductInformation = () => {
const ProductInformation: FC<Props> = ({
  information,
  setInformation,
  instructors,
  setInstructors,
}) => {
  //-----------------
  // Editor

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something here...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    content: information.description,
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getHTML();
      setInformation({ ...information, description: updatedContent });
    },
  })

  useEffect(() => {
    if (editor && information.description) {
      editor.commands.setContent(information.description);
    }
  }, [information.description, editor]);

  //-----------------
  //Instructor
  const {
    data: user,
    isLoading: userIsLoading,
    refetch: userRefetch,
  } = useGetAllUserQuery({});

  const options = top100Films.map(option => {
    const firstLetter = option.title[0].toUpperCase()

    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option
    }
  })

  // const [value, setValue] = useState<DataType[]>([])

  // useEffect(() => {
  //   if (user?.data) {
  //     const initialSelected = user.data.filter((u:any) =>
  //       instructors.some((instructorObj:any) => instructorObj.instructor === u.name)
  //     );
  //     setValue(initialSelected);
  //   }
  // }, [user, instructors]);

  console.log(instructors)

  // useEffect(() => {
  //   setInstructors(value)
  // }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInformation((prev: any) => ({ ...prev, [name]: value }))
  }

  //-----------------
  //Category
  const {
    data: category,
    isLoading: categoryIsLoading,
    refetch: categoryRefetch,
  } = useGetAllCategoryQuery({});

  // const [selectedCategory, setSelectedCategory] = useState<string>(information.category || '');

  // const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInformation({
  //     category: event.target.value,
  //     ...information
  //   });
  //   console.log(event.target.value)
  // };

  return (
    <Card>
      <CardHeader title='Details' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Title"
              placeholder="Enter the course title"
              name="title"
              value={information.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField 
              fullWidth 
              label='Short Introduction' 
              placeholder='A one line introduction to the course that appears on the course card' 
              name="short_introduction"
              value={information.short_introduction}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Typography className='mbe-1'>Description</Typography>
        <Card className='p-0 border shadow-none mbe-6'>
          <CardContent className='p-0'>
            <EditorToolbar editor={editor} />
            <Divider className='mli-6' />
            <EditorContent editor={editor} className='bs-[135px] overflow-y-auto flex ' />
          </CardContent>
        </Card>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <CustomTextField 
              fullWidth 
              label='Preview Video' 
              placeholder='' 
              name="video_link"
              value={information.video_link}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField 
              fullWidth 
              label='Tags' 
              placeholder='' 
              name="tags"
              value={information.tags}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField 
              // select 
              // fullWidth 
              // defaultValue='' 
              // label='Category' 
              // id='custom-select'
              select
              fullWidth
              label="Category"
              id="custom-select"
              name="category"
              value={information.category}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {categoryIsLoading ? (
                <MenuItem disabled>
                  <em>Loading...</em>
                </MenuItem>
              ) : (
                category?.data?.map((cat:any, index:any) => (
                  <MenuItem key={index} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))
              )}
            </CustomTextField>
          </Grid>
          <Grid item xs={12}>
            <CustomAutocomplete
              multiple
              value={instructors}
              options={user ? user.data : [{}]}
              id='autocomplete-fixed-option'
              getOptionLabel={option => option?.instructor || ''}
              renderInput={params => <CustomTextField {...params} label='Instructors' placeholder='' />}
              onChange={(event, newValue) => {
                setInstructors([...newValue])
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductInformation
