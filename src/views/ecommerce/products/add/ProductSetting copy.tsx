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
import { Checkbox, FormControlLabel, MenuItem } from '@mui/material'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import { useState } from 'react'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Data Imports
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Dark Knight', year: 2008 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'Schindler\'s List', year: 1993 }
];


type DataType = {
  year: number
  title: string
}

const fixedOptions = [top100Films[0]]

const ProductSetting = () => {
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

    content: `
      <p>
        Keep your account secure with authentication step.
      </p>
    `
  })

  const options = top100Films.map(option => {
    const firstLetter = option.title[0].toUpperCase()

    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option
    }
  })

  // const [value, setValue] = useState<DataType[]>([...fixedOptions, top100Films[0]])
  const [value, setValue] = useState<DataType[]>([])
  const [date, setDate] = useState<Date | null | undefined>(new Date())

  return (
    <Card>
      <CardHeader title='Settings' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <FormControlLabel label='Checked' control={<Checkbox defaultChecked name='basic-checked' />} />
            <FormControlLabel label='Unchecked' control={<Checkbox name='basic-unchecked' />} />
            <FormControlLabel label='Unchecked' control={<Checkbox name='basic-unchecked' />} />
            <FormControlLabel label='Unchecked' control={<Checkbox name='basic-unchecked' />} />
            <FormControlLabel label='Unchecked' control={<Checkbox name='basic-unchecked' />} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AppReactDatepicker
            selected={date}
            id='basic-input'
            onChange={(date: Date | null) => setDate(date)}
            placeholderText='Click to select a date'
            customInput={<CustomTextField label='Public On' fullWidth />}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductSetting 
