import { useMutation } from '@tanstack/react-query'
import { API } from 'common/constants'
import { UserType } from 'common/types'
import { destroy } from 'common/utils'

export const useDestroyUserMutation = () =>
  useMutation(
    ['Destroy the user'],
    async (id: string) => await destroy<UserType>(API.users, id)
  )
