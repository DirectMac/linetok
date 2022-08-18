import { useCallback, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import useEvent from 'react-use-event-hook'
import { ProductType } from 'common/types'
import { useCreateProductMutation } from 'modules/products/hooks'
import { useSnackbar } from 'notistack'
import { ProductsProps } from 'pages/admin/products'
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack
} from '@chakra-ui/react'

type FormDataType = Omit<ProductType, 'id'>

export const ProductCreationForm: React.FC<ProductsProps> = ({ refetch }) => {
  const uid = useId()
  const { enqueueSnackbar } = useSnackbar()

  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    price: 0,
    available: true
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductType>()

  const {
    mutateAsync,
    isLoading: isMutationLoading,
    isSuccess
  } = useCreateProductMutation()

  const handleChange = useEvent((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  })

  const onSubmit = useCallback(
    async (payload: ProductType) => {
      await mutateAsync(payload)
      if (isSuccess) {
        reset(formData)
        refetch()
        enqueueSnackbar('Product created.', { variant: 'success' })
      }
      enqueueSnackbar('Product creation failed.', { variant: 'error' })
    },
    [enqueueSnackbar, formData, isSuccess, mutateAsync, refetch, reset]
  )

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit((formData: ProductType) => onSubmit(formData))}
      sx={{
        maxWidth: '250px',
        margin: '0 auto'
      }}
    >
      <FormLabel htmlFor="name">Product name</FormLabel>
      <Input
        {...register('name', {
          required: true,
          minLength: {
            value: 3,
            message: 'Name must be at least 3 characters long'
          },
          maxLength: {
            value: 20,
            message: 'Name must be at most 20 characters long'
          }
        })}
        name="name"
        id={`product_name_${uid}`}
        placeholder="Papuga"
        onChange={handleChange}
        value={formData.name}
      />
      {errors.name && <p>Name is required</p>}

      <FormLabel htmlFor="price">Price</FormLabel>
      <InputGroup>
        <InputLeftElement>$</InputLeftElement>
        <Input
          {...register('price', { required: true })}
          id={`product_price_${uid}`}
          type="number"
          placeholder="666"
          onChange={handleChange}
          value={formData.price}
        />
      </InputGroup>
      {errors.price && <p>Price is required</p>}

      <Checkbox
        {...register('available')}
        name="available"
        id={`product_available_${uid}`}
        type="checkbox"
        defaultChecked={true}
        onChange={handleChange}
        checked={formData.available}
        sx={{
          display: 'flex',
          width: '100%',
          margin: '15px 0'
        }}
      >
        Available
      </Checkbox>

      <Stack>
        <Button type="submit" disabled={isMutationLoading}>
          Submit
        </Button>
      </Stack>
    </FormControl>
  )
}
