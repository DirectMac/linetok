import { API } from 'common/constants'
import { AuthType } from 'common/types'
import { create } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useAuthorizeMutation = () =>
  useMutation(
    ['Authorize current user'],
    async (payload: AuthType) => await create<AuthType>(API.auth, payload)
  )
