import { memo } from 'react'
import ChakraCarousel from 'components/carousel'
import { useProductContext } from 'modules/products/context'
import { Stack, Image } from '@chakra-ui/react'

export const ProductCardImages: React.FC = memo(function ProductCardImages() {
  const { images } = useProductContext()

  return (
    <Stack
      sx={{
        placeItems: 'center'
      }}
    >
      {images?.length && (
        <Image src={images[0]} alt="Product hero" boxSize={200} />
      )}
      <ChakraCarousel gap={32}>
        {images?.slice().map((image, index) => (
          <Image src={image} alt="Product" key={`${index} product`} />
        ))}
      </ChakraCarousel>
    </Stack>
  )
})

ProductCardImages.displayName = 'ProductCardImages'
