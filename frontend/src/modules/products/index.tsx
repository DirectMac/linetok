import useEvent from 'react-use-event-hook'
import { ProductType } from 'common/types'
import { ProductsProps } from 'pages/admin/products'
import { Center, Text, Wrap, WrapItem, useToast } from '@chakra-ui/react'
import { EditableProduct } from './components'
import { useDestroyProductMutation } from './hooks'

export const Products: React.FC<ProductsProps> = ({
  initialData: data,
  refetch
}) => {
  const toast = useToast()

  const { mutateAsync, isLoading: isDestroyLoading } =
    useDestroyProductMutation()

  const noDataReceived = !data || data.length === 0

  const onRemove = useEvent((id: string) => async () => {
    await mutateAsync(id, {
      onSuccess: () => {
        refetch()
        toast({
          title: 'Product removed',
          description: "We've just removed the product for you.",
          status: 'success',
          isClosable: true
        })
      }
    })
  })

  if (noDataReceived) {
    return (
      <Center>
        <Text>No products found. Please, come later! 🤩</Text>
      </Center>
    )
  }

  return (
    <Wrap>
      {data?.map((product: ProductType) => (
        <WrapItem key={`${product.id} <Product />`}>
          <EditableProduct
            onRemove={() => onRemove(product.id)}
            loading={isDestroyLoading}
            {...product}
          />
        </WrapItem>
      ))}
    </Wrap>
  )
}
