'use client'

import { format } from 'date-fns';

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
import { ChangeEvent, FC, useEffect, useState } from 'react'
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

type Props = {
  setting: any;
  setSetting: (setting: any) => void;
};

// const ProductSetting = () => {
const ProductSetting: FC<Props> = ({
  setting,
  setSetting,
}) => {
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
  // const [date, setDate] = useState<Date | null | undefined>(new Date())
  const [date, setDate] = useState<Date | null | undefined>(null)


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSetting((prev:any) => ({
      ...prev,
      [name]: checked,
    }));
  };

  useEffect(() => {
    if (date) {
      setSetting({
        ...setting,
        published_on: format(date, 'yyyy-MM-dd'),
      });
    } else {
      setSetting({
        ...setting,
        published_on: null,
      });
    }
  }, [date]);

  return (
    <Card>
      <CardHeader title='Settings' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <FormControlLabel
              label="Published"
              control={
                <Checkbox
                  name="published"
                  checked={setting.published}
                  onChange={handleCheckboxChange}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <FormControlLabel
              label="Upcoming"
              control={
                <Checkbox
                  name="upcoming"
                  checked={setting.upcoming}
                  onChange={handleCheckboxChange}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <FormControlLabel
              label="Disable Self-Learning"
              control={
                <Checkbox
                  name="disable_self_learning"
                  checked={setting.disable_self_learning}
                  onChange={handleCheckboxChange}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <FormControlLabel
              label="Featured"
              control={
                <Checkbox
                  name="featured"
                  checked={setting.featured}
                  onChange={handleCheckboxChange}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <FormControlLabel
              label="Enable Certification"
              control={
                <Checkbox
                  name="enable_certification"
                  checked={setting.enable_certification}
                  onChange={handleCheckboxChange}
                />
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AppReactDatepicker
            selected={date}
            id='basic-input'
            value={setting.published_on}
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
