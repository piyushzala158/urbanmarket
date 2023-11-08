import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Spinner,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import {
  db,
  productsDataType,
  setStatus,
  useAppDispatch,
  useAppSelector,
} from '@reatfirebase/shared-ui';
import { Link } from 'react-router-dom';
import Updateproduct from '../updateproduct/updateproduct';
import { toast } from 'react-hot-toast';

/* eslint-disable-next-line */
export interface ProductlistingProps {}

const TABLE_HEAD = ['Name', 'Brand', 'Category', , 'Price', ''];

export function Productlisting(props: ProductlistingProps) {
  const status = useAppSelector((state) => state.authUser.status);
  const dispactch = useAppDispatch();
  const [products, setProducts] = useState<productsDataType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [editModal, setModal] = useState(false);
  const [edit, setEdit] = useState<productsDataType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [indexOfLastProduct, setIndexOfLastProduct] = useState<number>(1);
  const [indexOfFirstProduct, setIndexOfFirstProduct] = useState<number>(0);
  const [currentProducts, setCurrentProducts] = useState<
    productsDataType[] | null | undefined
  >(null);
  const [filterData, setFilterData] = useState<
    productsDataType[] | null | undefined
  >(null);
  const [productsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filterData?.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setIndexOfLastProduct(indexOfLastProduct);
    setIndexOfFirstProduct(indexOfFirstProduct);
    setCurrentProducts(currentProducts);
  }, [currentPage, filterData]);

  useEffect(() => {
    setCurrentPage(1); // Set the current page to 1 when a new search query is entered
    if (products) {
      if (searchQuery.length > 0) {
        const filteredProducts = products.filter((product) =>
          product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilterData(filteredProducts);
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = filteredProducts?.slice(
          indexOfFirstProduct,
          indexOfLastProduct
        );

        setIndexOfLastProduct(indexOfLastProduct);
        setIndexOfFirstProduct(indexOfFirstProduct);
        setCurrentProducts(currentProducts);
      } else {
        setFilterData(products);
      }
    }
  }, [searchQuery, products, productsPerPage]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const docRef = collection(db, 'products');
      const querySnapshot = await getDocs(docRef);
      const productsData = querySnapshot.docs.map((doc) => doc.data());
      setProducts(productsData);
      setFilterData(productsData);
    };
    getProducts().then(() => {
      setLoading(false);
    });
  }, [status]);

  const handleModal = (id?: string | undefined) => {
    setModal(true);
    setEdit({ id });
  };

  //handle pop-up close button
  const handleDelete = async (id?: string) => {
    await deleteDoc(doc(db, 'products', `${id}`)).then(() => {
      toast.success('Product deleted successfully');
      dispactch(setStatus());
    });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="h-full w-11/12 mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Your Products
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              All Your Products are listed below
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link to={'/addproduct'}>
              <Button
                className="flex items-center gap-1"
                color="blue"
                size="sm"
              >
                <PlusIcon strokeWidth={4} className="h-6 w-6" />
                Add New
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  <Spinner className="h-8 w-8 m-auto" />
                </td>
              </tr>
            ) : currentProducts && currentProducts.length ? (
              currentProducts?.map(
                ({ name, brand, category, image, price, id }, index) => {
                  const isLast = index === currentProducts.length - 1;
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50';

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={image}
                            alt={name}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {brand}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() => handleModal(id)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => handleDelete(id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  There is No Products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          variant="outlined"
          color="blue-gray"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {filterData &&
            Array.from(
              Array(Math.ceil(filterData.length / productsPerPage)).keys()
            ).map((pageNumber) => (
              <IconButton
                key={pageNumber + 1}
                variant={
                  currentPage === pageNumber + 1 ? undefined : 'outlined'
                }
                color="blue-gray"
                size="sm"
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                {pageNumber + 1}
              </IconButton>
            ))}
        </div>
        {filterData  && (
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            disabled={indexOfLastProduct >= filterData.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        )}
      </CardFooter>

      {editModal && edit?.id && (
        <Updateproduct
          modal={editModal}
          // setmodal={handleClose}
          handleOpen={handleModal}
          data={edit}
        />
      )}
    </Card>
  );
}

export default Productlisting;
