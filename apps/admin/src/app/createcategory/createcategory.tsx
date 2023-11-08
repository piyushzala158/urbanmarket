import { ProductSchema, authError, categoryDataType, db, setStatus, storage, useAppDispatch } from '@reatfirebase/shared-ui';
import styles from './createcategory.module.scss';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid'

/* eslint-disable-next-line */
export interface CreatecategoryProps {}

export function Createcategory(props: CreatecategoryProps) {

  const dispactch = useAppDispatch();
  const[loading,setLoading] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(ProductSchema) });
  const onSubmit:SubmitHandler<categoryDataType> = (data) => {
    const uniqueId = uuidv4();
    const storageRef = ref(storage, `images/${uniqueId}`);
    const uploadTask = uploadBytesResumable(storageRef, data.imageurl[0]);
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
          setDoc(doc(db, "category", uniqueId), {
            name: data.name,
            description: data.description,
            image: downloadURL,
            items: data.items,
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
    <Card  shadow={false} className='p-3 text-center'>
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex flex-col gap-6">
        <label htmlFor='image' >
          <p className=' text-left'>Upload Image</p>
        <img src='https://weblearnbd.net/tphtml/ebazer/assets/img/icons/upload.png' className=' mx-auto' />
        <Button className="mt-6" fullWidth>
        Upload Image
      </Button>
        <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className=' hidden'
        />
        </label>
        <Input size="lg" label="Name" />
        <Input size="lg" label="DESCRIPTION" />
        <Input size="lg" label="ITEMS" />
      </div>
      <Button className="mt-6" fullWidth type='submit'>
        ADD CATEGORY
      </Button>
    </form>
  </Card>
  );
}

export default Createcategory;
