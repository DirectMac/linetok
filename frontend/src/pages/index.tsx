import { useTranslation } from 'react-i18next'
import type { NextPage } from 'next'
import { Center, Heading } from '@chakra-ui/react'

export const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <Center>
      <Heading>{t('welcome')}</Heading>
    </Center>
  )
}

export default Home
