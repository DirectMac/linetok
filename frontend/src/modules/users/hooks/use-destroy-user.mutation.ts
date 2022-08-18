import { API } from 'common/constants'
import { UserType } from 'common/types'
import { destroy } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useDestroyUserMutation = () =>
  useMutation(
    ['Destroy the user'],
    async (id: number) => await destroy<UserType>(API.users, id)
  )
