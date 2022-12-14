import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react'
import { ProductType } from 'common/types'

type Setter = Dispatch<SetStateAction<ProductType>>
type Props = PropsWithChildren & { context: ProductType }

const initialData: ProductType = {
  amount: 0,
  description: '',
  id: -1,
  images: [],
  name: '',
  price: 0
}

const ProductContext = createContext<ProductType>(initialData)
const ProductSetter = createContext<Setter>(() => null)

export const ProductProvider: FC<Props> = ({ children, context }) => {
  const [product, setProduct] = useState(context ?? initialData)

  return (
    <ProductContext.Provider value={product}>
      <ProductSetter.Provider value={setProduct}>
        {children}
      </ProductSetter.Provider>
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)
export const useProductSetter = () => {
  const set: Setter = useContext(ProductSetter)
  const setProduct = useCallback(
    (payload: ProductType) =>
      set((previousValues: ProductType) => ({ ...previousValues, ...payload })),
    [set]
  )
  return setProduct
}
