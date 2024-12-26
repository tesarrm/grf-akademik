// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

// Component Imports
import Form from '@components/Form'
import CustomTextField from '@core/components/mui/TextField'
import { MenuItem } from '@mui/material'
import { FC } from 'react'

type Props = {
  pricing: any;
  setPricing: (pricing: any) => void;
};

// const ProductPricing = () => {
const ProductPricing: FC<Props> = ({
  pricing,
  setPricing,
}) => {
  return (
    <Card>
      <CardHeader title='Pricing' />
      <CardContent>
        <Form>
          <FormControlLabel className='mbe-6' control={<Checkbox defaultChecked />} label='Paid Course' />
          <CustomTextField fullWidth label='Course Price' placeholder='' className='mbe-6' />
          <CustomTextField select fullWidth defaultValue='' label='Currency' id='custom-select'>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </CustomTextField>
          {/* <Divider className='mlb-2' />
          <div className='flex items-center justify-between'>
            <Typography>In stock</Typography>
            <Switch defaultChecked />
          </div> */}
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProductPricing
