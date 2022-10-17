import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import useEvent from 'react-use-event-hook'
import {
  ERROR_WHILE_CREATING_PRODUCT,
  SUCCESSFULLY_CREATED_PRODUCT
} from 'common/i18n'
import { ProductType } from 'common/types'
import {
  useCreateProductMutation,
  useReadProductsQuery
} from 'modules/products/hooks'
import { ProductsProps } from 'pages/admin/products'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast
} from '@chakra-ui/react'

type FormDataType = ProductType

export const ProductCreationForm: React.FC<ProductsProps> = () => {
  const uid = useId()
  const toast = useToast()

  const { refetch } = useReadProductsQuery()

  const [formData, setFormData] = useState<FormDataType>({
    amount: 0,
    description: '',
    id: uid,
    images: [],
    name: '',
    price: 0
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductType>({
    defaultValues: formData
  })

  const { mutateAsync, isLoading: isCreationLoading } =
    useCreateProductMutation()

  const onChange = useEvent((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  })

  const onSubmit = useEvent((formData: FormDataType) => async () => {
    await mutateAsync(formData, {
      onError: () => {
        toast(ERROR_WHILE_CREATING_PRODUCT)
      },
      onSuccess: () => {
        refetch()
        reset()
        toast(SUCCESSFULLY_CREATED_PRODUCT)
      }
    })
  })

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit((formData) => onSubmit(formData))}
      sx={{
        margin: '0 auto',
        maxWidth: '250px'
      }}
    >
      <FormLabel htmlFor="name">Назва прадукту</FormLabel>
      <Input
        {...register('name', {
          maxLength: {
            message: 'Назва павінна быць не больш за 20 сімвалаў',
            value: 20
          },
          minLength: {
            message: 'Назва павінна быць не менш за 3 сімвалы',
            value: 3
          },
          required: true
        })}
        name="name"
        id={`product_name_${uid}`}
        placeholder={`Apple Macbook 13"`}
        onChange={onChange}
        value={formData.name}
      />
      {errors.name && <p>Name is required</p>}

      <FormLabel htmlFor="description">Апісанне</FormLabel>
      <Input
        {...register('description')}
        name="description"
        id={`product_description_${uid}`}
        placeholder="Яблык - гэта фрукт."
        onChange={onChange}
        value={formData.description}
      />
      {errors.description && <p>Апісанне ёсць абавязковым</p>}

      <FormLabel htmlFor="price">Цана</FormLabel>
      <InputGroup>
        <InputLeftElement>$</InputLeftElement>
        <Input
          {...register('price', { required: true })}
          id={`product_price_${uid}`}
          type="number"
          placeholder="666"
          onChange={onChange}
          value={formData.price}
        />
      </InputGroup>
      {errors.price && <p>Цана ёсць абавязковай</p>}

      <FormLabel htmlFor="price">Колькасць</FormLabel>
      <Input
        {...register('amount')}
        name="amount"
        id={`product_amount_${uid}`}
        type="number"
        onChange={onChange}
        sx={{
          display: 'flex',
          margin: '15px 0',
          width: '100%'
        }}
      />

      <Stack>
        <Button type="submit" disabled={isCreationLoading}>
          Стварыць
        </Button>
      </Stack>
    </FormControl>
  )
}
