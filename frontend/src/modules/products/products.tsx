import { useCallback } from 'react'
import { useSnackbar } from 'notistack'
import { Spinner, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { Product } from './components'
import { useGetProductsQuery, useRemoveProductMutation } from './hooks'

export const Products: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { data: products, isLoading, refetch } = useGetProductsQuery()
  const { mutateAsync, isLoading: isRemoveLoading } = useRemoveProductMutation()

  const noDataReceived = !products || products.length === 0

  const remove = useCallback(
    async (id: string) => {
      await mutateAsync(id)
      refetch()
      enqueueSnackbar('Product removed.', { variant: 'success' })
    },
    [products]
  )

  return (
    <>
      {isLoading ? (
        <Stack style={{ fontSize: '75px' }}>
          <Spinner />
        </Stack>
      ) : noDataReceived ? (
        <Text>No products found. Please, come later! 🤩</Text>
      ) : (
        <Wrap>
          {products.map((product) => (
            <WrapItem key={product.id}>
              <Product
                onRemove={() => remove(product.id)}
                loading={isRemoveLoading}
                {...product}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  )
}
