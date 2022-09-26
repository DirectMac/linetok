import { useToast } from '@chakra-ui/react'
import {
  browserSupportsWebAuthn,
  startAuthentication,
  startRegistration
} from '@simplewebauthn/browser'
import {
  AuthenticationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
  RegistrationCredentialJSON
} from '@simplewebauthn/typescript-types'
import axios from 'axios'

type Parameters = {
  isRegistrationMode: boolean
}

export const useBiometrics = () => {
  const toast = useToast()

  const authorize = async (parameters: Parameters): Promise<boolean> => {
    const { isRegistrationMode } = parameters

    if (!browserSupportsWebAuthn()) {
      toast({
        description: "Your browser doesn't support biometry.",
        status: 'warning'
      })
      return false
    }

    const options: PublicKeyCredentialCreationOptionsJSON = await axios
      .get(
        isRegistrationMode
          ? 'api/generate-registration-options'
          : 'api/generate-authentication-options'
      )
      .then((response) => response.data)

    const credentials:
      | RegistrationCredentialJSON
      | AuthenticationCredentialJSON = isRegistrationMode
      ? await startRegistration(options)
      : await startAuthentication(options)

    const verified = await axios
      .post(
        isRegistrationMode
          ? 'api/verify-registration'
          : 'api/verify-authentication',
        credentials
      )
      .then((response) => response.data.verified)
      .catch((e) => {
        console.error(e)
        return false
      })

    return verified
  }

  return { authorize }
}
