import { PropsWithChildren } from 'react'
import { Text } from '@chakra-ui/react'

type LabelProps = PropsWithChildren & {
  text: string
}

export const Label: FC<LabelProps> = ({ text }) => (
  <Text sx={{ color: 'white' }}>{text}</Text>
)
