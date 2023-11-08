import { useEffect, useState } from 'react';
import {
  db,
  productsDataType,
  useAppDispatch,
  useAppSelector,
} from '@reatfirebase/shared-ui';
import { collection, getDocs } from 'firebase/firestore';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from '@material-tailwind/react';


/* eslint-disable-next-line */
export interface ProductsProps {}

export function Products(props: ProductsProps) {
  const status = useAppSelector((state) => state.authUser.status);
  const dispactch = useAppDispatch();
  const [products, setProducts] = useState<productsDataType[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const docRef = collection(db, 'products');
      const querySnapshot = await getDocs(docRef);
      const productsData = querySnapshot.docs.map((doc) => doc.data());
      setProducts(productsData);
    };
    getProducts().then(() => {
      setLoading(false);
    });
    console.log(products)
  }, [status]);
  return (
    <>
    <div className=' grid grid-cols-4 gap-10 container mx-auto mt-6 '>
    {
      products && products?.map((product) =>(
          <Card className="hover:scale-105 duration-200 p-2 flex flex-col" key={product.id}>
      <CardHeader shadow={false} floated={false} className="h-64">
        <img
        src={product.image ? product.image : "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"}
          // src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
          className="w-full h-full p-5 object-contain "
        />
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography color="blue-gray" className="font-medium">
            Apple AirPods
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            $95.00
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          With plenty of talk and listen time, voice-activated Siri access, and
          an available wireless charging case.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
      ))
    }
  </div>    
    </>
  );
}

export default Products;
