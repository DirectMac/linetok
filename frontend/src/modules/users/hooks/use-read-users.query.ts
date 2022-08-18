import { API } from 'common/constants'
import { UserType } from 'common/types'
import { read } from 'common/utils'
import { useQuery } from '@tanstack/react-query'

type ParametersType = {
  initialData?: UserType[]
}

export const useReadUsersQuery = ({ initialData }: ParametersType) =>
  useQuery(['Read all users'], async () => await read<UserType>(API.users), {
    initialData
  })
