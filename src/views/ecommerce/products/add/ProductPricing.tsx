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
import { ChangeEvent, FC, useState } from 'react'
import { useGetAllCurrencyQuery } from '@/redux-store/features/course/courseApi'

type Props = {
  pricing: any;
  setPricing: (pricing: any) => void;
};


// const ProductPricing = () => {
const ProductPricing: FC<Props> = ({
  pricing,
  setPricing,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPricing((prev:any) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPricing((prev: any) => ({ ...prev, [name]: value }))
  }

  //-----------------
  //Currency
  const {
    data: currency,
    isLoading: currencyIsLoading,
    refetch: currencyRefetch,
  } = useGetAllCurrencyQuery({});

  const [selectedCurrency, setSelectedCurrency] = useState<string>(pricing.currency || '');

  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <Card>
      <CardHeader title='Pricing' />
      <CardContent>
        <Form>
          {/* <FormControlLabel className='mbe-6' control={<Checkbox defaultChecked />} label='Paid Course' /> */}
          <FormControlLabel
            className='mbe-6'
            label="Paid Course"
            control={
              <Checkbox
                name="paid_course"
                checked={pricing.paid_course}
                onChange={handleCheckboxChange}
              />
            }
          />
          <CustomTextField 
            fullWidth 
            label='Course Price' 
            placeholder='' 
            className='mbe-6' 
            name="course_price"
            value={pricing.course_price}
            onChange={handleInputChange}
            type='number'
          />
          <CustomTextField 
            // select 
            // fullWidth 
            // defaultValue='' 
            // label='Currency' 
            // id='custom-select'

            select
            fullWidth
            label="Currency"
            id="custom-select"
            value={selectedCurrency}
            onChange={handleChangeCurrency}
            variant="outlined"
          >
            {/* <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}

            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {currencyIsLoading ? (
              <MenuItem disabled>
                <em>Loading...</em>
              </MenuItem>
            ) : (
              currency?.data?.map((cat:any, index:any) => (
                <MenuItem key={index} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))
            )}
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
