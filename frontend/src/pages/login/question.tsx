import { Box, Button, Highlight, Text } from '@chakra-ui/react'

type QuestionProps = {
  isRegistrationMode: boolean
  question: string
  tip: string
  toggle: () => void
}

export const Question: React.FC<QuestionProps> = ({
  isRegistrationMode,
  question,
  toggle,
  tip
}) => (
  <Box
    w="65%"
    sx={{
      mt: '80px !important',
      textAlign: 'center'
    }}
  >
    <Text fontSize="xs" lineHeight="tall">
      <Highlight
        query={['есть', 'нет']}
        styles={{
          bg: isRegistrationMode ? 'green.100' : 'red.100',
          px: '2',
          py: '1',
          rounded: 'full'
        }}
      >
        {question}
      </Highlight>
    </Text>
    <Button onClick={toggle} variant="link">
      {tip}
    </Button>
  </Box>
)
