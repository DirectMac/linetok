import { useTranslation } from 'common/hooks'
import { NextPage } from 'next'
import { Center } from '@chakra-ui/react'

const ContactPage: NextPage = () => {
  const { t } = useTranslation()

  return (
    <Center>
      <span>{t.contactPageWillBeHereInFuture}</span>
    </Center>
  )
}

export default ContactPage
