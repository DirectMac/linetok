import { useMutation } from '@tanstack/react-query'
import { API } from 'common/constants'
import { AuthType } from 'common/types'
import { create } from 'common/utils'

export const useRegisterMutation = () =>
  useMutation(
    ['Register current user'],
    async (payload: AuthType) => await create<AuthType>(API.users, payload)
  )
