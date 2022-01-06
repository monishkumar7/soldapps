import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 flex flex-col">
      <label
        className="uppercase text-gray-400 text-sm font-semibold tracking-wider"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className="border border-gray-100 p-2 focus-visible:outline-none rounded-md shadow-md"
        {...field}
        {...props}
      />
      <div className="text-sm italic text-red-500 text-right h-4">
        {meta.touched && meta.error ? meta.error : null}
      </div>
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 flex flex-col">
      <label
        className="uppercase text-gray-400 text-sm font-semibold tracking-wider"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        className="border border-gray-100 p-2 focus-visible:outline-none rounded-md shadow-md"
        {...field}
        {...props}
      />
      <div className="text-sm italic text-red-500 text-right h-4">
        {meta.touched && meta.error ? meta.error : null}
      </div>
    </div>
  );
};

const InputForm = ({ submitProject }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        url: '',
        description: '',
        category: ''
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        url: Yup.string().url('Invalid URL').required('Required'),
        description: Yup.string()
          .max(100, 'Must be 100 characters or less')
          .required('Required'),
        category: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required')
      })}
      onSubmit={(values) => {
        submitProject({ ...values, submitted: true });
      }}
    >
      <Form className="my-8">
        <h2 className="text-3xl font-extrabold mb-4">Submit DApp</h2>
        <MyTextInput
          label="Name"
          name="name"
          type="text"
          placeholder="DApp Name"
        />
        <MyTextInput
          label="URL"
          name="url"
          type="text"
          placeholder="https://dappname.xyz"
        />
        <MyTextInput
          label="Description"
          name="description"
          type="text"
          placeholder="What does the DApp do?"
        />
        <MySelect label="Category" name="category">
          <option value="">Select a DApp category</option>
          <option value="social">Social</option>
          <option value="utility">Utility</option>
          <option value="defi">DeFi</option>
          <option value="nft">NFT</option>
          <option value="gaming">Gaming</option>
        </MySelect>
        <button
          className="bg-purple-600 text-white font-semibold w-full rounded-md p-2 mt-8"
          type="submit"
        >
          Submit DApp
        </button>
      </Form>
    </Formik>
  );
};

export default InputForm;
