import { useMutation } from '@tanstack/react-query'
import { API } from 'common/constants'
import { UserType } from 'common/types'
import { update } from 'common/utils'

export const useUpdateUserMutation = () =>
  useMutation(
    ['Update the user'],
    async (payload: UserType) => await update(API.users, payload)
  )
