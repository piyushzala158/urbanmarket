import { Fragment, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ProductSchema,
  authError,
  db,
  productsDataType,
  setStatus,
  storage,
  useAppDispatch,
} from '@reatfirebase/shared-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Transition, Dialog } from '@headlessui/react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-hot-toast';

/* eslint-disable-next-line */
export interface UpdateproductProps {
  modal: boolean;
  handleOpen: () => void;
  data: productsDataType | null | undefined;
}

export function Updateproduct(props: UpdateproductProps) {
  const dispactch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [oldData, setOldData] = useState<productsDataType | null>(null);
  const cancelButtonRef = useRef(null);

  const [preview, setPreview] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(ProductSchema) });
  const onSubmit: SubmitHandler<productsDataType> = (data) => {
    const updateHandler = async () => {
      const productRef = doc(db, 'products', `${props.data?.id}`);
      await updateDoc(productRef, {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        brand: data.brand,
      });
    };
    updateHandler().then(() => {
      props.handleOpen();
      toast.success('Product updated successfully');
      setLoading(false);
      dispactch(setStatus());
      reset();
    });
  };

  useEffect(() => {
    const getProducts = async () => {
      if (props.data) {
        const q = query(
          collection(db, 'products'),
          where('id', '==', props.data.id)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (doc.exists()) {
            setOldData(doc.data());
          }
        });
      }
    };
    getProducts();
  }, [props]);

  useEffect(() => {
    setValue('name', oldData?.name ?? '');
    setValue('brand', oldData?.brand ?? '');
    setValue('category', oldData?.category ?? '');
    setValue('description', oldData?.description ?? '');
    setPreview(oldData?.image);
    setValue('price', oldData?.price ?? 100);
  }, [oldData, preview, setPreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(file);
      const reader = new FileReader();
      uploadImage(file);
      reader.onload = () => {
        const imagePreview = document.getElementById(
          'image-preview'
        ) as HTMLImageElement;
        if (imagePreview) {
          imagePreview.src = reader.result as string;
        }
      };

      reader.readAsDataURL(file);
    } else {
      setPreview(''); // Allow null value for the image field
      const imagePreview = document.getElementById(
        'image-preview'
      ) as HTMLImageElement;
      if (imagePreview) {
        imagePreview.src = ''; // Reset the image preview
      }
    }
  };

  const uploadImage = (file: any) => {
    const uniqueId = oldData?.id;
    const storageRef = ref(storage, `images/${uniqueId}`);
    uploadBytes(storageRef, file)
      .then(() => {
        // Get the download URL of the uploaded image
        getDownloadURL(storageRef)
          .then((downloadURL) => {
            // Handle the download URL (e.g., update Firestore document with the new URL)
            const productRef = doc(db, 'products', `${props.data?.id}`);
            updateDoc(productRef, {
              image: downloadURL,
            })
              .then(() => {
                toast.success('Image updated successfully');
              })
              .catch((err) => {
                // Handle error
                toast.error(authError(err));
              });
          })
          .catch((error) => {
            // Handle error
            toast.error(authError(error));
          });
      })
      .catch((error) => {
        // Handle error
        toast.error(authError(error));
      });
  };

  return (
    <Transition.Root show={props.modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.handleOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div>
                  <XMarkIcon
                    onClick={() => props.handleOpen()}
                    ref={cancelButtonRef}
                    className=" w-6 ml-auto mt-2 mr-2 text-red-600 hover:scale-125 duration-200 "
                  />
                  <h2 className="text-3xl font-bold text-gray-900 text-center">
                    Update Product
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    {loading ? loading : null}
                  </p>
                </div>
                <form
                  className="mt-8 space-y-3 px-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                      Product Name
                    </label>
                    <input
                      className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      type="text"
                      placeholder="Product Name"
                      {...register('name')}
                    />
                  </div>
                  <p className=" text-red-500 ps-2 ">{errors.name?.message}</p>
                  <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                      Product Description
                    </label>
                    <input
                      className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      type="text"
                      placeholder="Product Description"
                      {...register('description')}
                    />
                  </div>
                  <p className=" text-red-500 ps-2 ">
                    {errors.description?.message}
                  </p>
                  <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                      Product Categoty
                    </label>
                    <input
                      className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      type="text"
                      placeholder="Product Categoty"
                      {...register('category')}
                    />
                  </div>
                  <p className=" text-red-500 ps-2 ">
                    {errors.category?.message}
                  </p>
                  <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                      Product Brand
                    </label>
                    <input
                      className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      type="text"
                      placeholder="Product Brand"
                      {...register('brand')}
                    />
                  </div>
                  <p className=" text-red-500 ps-2 ">{errors.brand?.message}</p>
                  <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                      Product Price
                    </label>
                    <input
                      className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none foc  us:border-indigo-500"
                      type="number"
                      placeholder="Product Price"
                      {...register('price')}
                    />
                  </div>
                  <p className=" text-red-500 ps-2 ">{errors.price?.message}</p>
                  <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                      Upload Photo
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-48 p-5 group text-center">
                        <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-5 text-blue-400 group-hover:text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                            <img
                              id="image-preview"
                              className="has-mask h-28 object-center"
                              src={
                                preview ||
                                'https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg'
                              }
                              alt="freepik image"
                            />
                          </div>
                          <p className="pointer-none text-gray-500 ">
                            <span className="text-sm">Drag and drop</span> files
                            here <br /> or{' '}
                            <a
                              href=""
                              id=""
                              className="text-blue-600 hover:underline"
                            >
                              select a file
                            </a>
                            from your computer
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          {...register('image')}
                          accept="image/*"
                          onChange={(e) => handleImageChange(e)}
                        />
                      </label>
                    </div>
                    <p className=" text-red-500 ps-2 ">
                      {errors.image?.message}
                    </p>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span>File type: doc,pdf,types of images</span>
                  </p>
                  <div>
                    <button
                      type="submit"
                      className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                        font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Updateproduct;
