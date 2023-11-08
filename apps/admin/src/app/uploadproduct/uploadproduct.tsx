import { ProductSchema, authError, db, productsDataType, setStatus, storage, useAppDispatch } from '@reatfirebase/shared-ui';
import styles from './uploadproduct.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResolverOptions, SubmitHandler, useForm } from 'react-hook-form';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc } from 'firebase/firestore';


/* eslint-disable-next-line */
export interface UploadproductProps {}

export function Uploadproduct(props: UploadproductProps) {
  const dispactch = useAppDispatch();
  const[loading,setLoading] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(ProductSchema) });
  const onSubmit:SubmitHandler<productsDataType> = (data) => {
    const uniqueId = uuidv4();
    const storageRef = ref(storage, `images/${uniqueId}`);
    const uploadTask = uploadBytesResumable(storageRef, data.image[0]);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setLoading(progress);
        switch (snapshot.state) {
          case 'running':
            setLoading("Uploading...");
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        setLoading(error.message);
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDoc(doc(db, "products", uniqueId), {
            name: data.name,
            brand: data.brand,
            category: data.category,
            price: data.price,
            description: data.description,
            image: downloadURL,
            id:uniqueId
          }).then(() => {
          //redirect to the HOME Page
          // toast.success("Signed in successfully");
          // navigate("/");
          setLoading("Successfully Uploaded")
          dispactch(setStatus())
          setTimeout(() => {
            setLoading(null);
          }, 1000);
          reset();

        })
        .catch((error) => {
          toast.error(authError(error));
        });

        })
      }
    );
    
    
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
      style={{backgroundImage: "url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)"}}>
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="sm:max-w-lg w-full pt-5 px-10 bg-white rounded-xl z-10">
        <div >
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Product Upload!
          </h2>
          
          <p className="mt-2 text-sm text-gray-400">{loading ? loading : null}</p>
        </div>
            <form className="mt-8 space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 space-y-2">
                            <label className="text-sm font-bold text-gray-500 tracking-wide">Product Name</label>
                                <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Product Name" {...register("name")} />
                        </div>
                        <p className=" text-red-500 ps-2 ">
                          {errors.name?.message}
                        </p>
                        <div className="grid grid-cols-1 space-y-2">
                            <label className="text-sm font-bold text-gray-500 tracking-wide">Product Description</label>
                                <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Product Description" {...register("description")} />
                        </div>
                        <p className=" text-red-500 ps-2 ">
                          {errors.description?.message}
                        </p>
                        <div className="grid grid-cols-1 space-y-2">
                            <label className="text-sm font-bold text-gray-500 tracking-wide">Product Categoty</label>
                                <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Product Categoty" {...register('category')} />
                        </div>
                        <p className=" text-red-500 ps-2 ">
                          {errors.category?.message}
                        </p>
                        <div className="grid grid-cols-1 space-y-2">
                            <label className="text-sm font-bold text-gray-500 tracking-wide">Product Brand</label>
                                <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Product Brand" {...register('brand')} />
                        </div>
                        <p className=" text-red-500 ps-2 ">
                          {errors.brand?.message}
                        </p>
                        <div className="grid grid-cols-1 space-y-2">
                            <label className="text-sm font-bold text-gray-500 tracking-wide">Product Price</label>
                                <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none foc  us:border-indigo-500" type="number" placeholder="Product Price" {...register("price")} />
                        </div>
                        <p className=" text-red-500 ps-2 ">
                          {errors.price?.message}
                        </p>
                        <div className="grid grid-cols-1 space-y-2">
                                        <label className="text-sm font-bold text-gray-500 tracking-wide">Upload Photo</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-48 p-5 group text-center">
                                    <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-5 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                        <img className="has-mask h-28 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                                        </div>
                                        <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                    </div>
                                    <input type="file" className="hidden" {...register("image")} />
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
                            <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                        font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                            Upload
                        </button>
                        </div>
            </form>
      </div>
    </div>
    
      
  );
}

export default Uploadproduct;
