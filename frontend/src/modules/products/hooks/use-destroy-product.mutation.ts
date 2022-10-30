import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { destroy } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useDestroyProductMutation = () =>
  useMutation(
    ['Destroy the product'],
    async (id: number) => await destroy<ProductType>(API.products, id)
  )
