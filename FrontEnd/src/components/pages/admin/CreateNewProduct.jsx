import React, { useState } from "react";
import Axios from "../../../constants/Axios";
import { useForm, useFieldArray } from "react-hook-form";

const CreateProduct = () => {
  const { register, handleSubmit, setValue, control } = useForm();
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category_id", data.category_id);

    data.variants.forEach((variant, variantIndex) => {
      formData.append(`variants[${variantIndex}][name]`, variant.name);

      variant.sizes.forEach((size, sizeIndex) => {
        formData.append(
          `variants[${variantIndex}][sizes][${sizeIndex}][name]`,
          size.name
        );
        formData.append(
          `variants[${variantIndex}][sizes][${sizeIndex}][stock_quantity]`,
          size.stock_quantity
        );
        formData.append(
          `variants[${variantIndex}][sizes][${sizeIndex}][price]`,
          size.price
        );
      });

      if (variant.images && variant.images.length > 0) {
        for (let i = 0; i < variant.images.length; i++) {
          formData.append(
            `variants[${variantIndex}][images][${i}]`,
            variant.images[i]
          );
        }
      }
    });

    try {
      const response = await Axios.post("/create-new-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product created successfully:", response.data);
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleAddSize = (variantIndex) => {
    const updatedVariants = [...variantFields];
    updatedVariants[variantIndex].sizes = [
      ...updatedVariants[variantIndex].sizes,
      {},
    ];
    setValue("variants", updatedVariants);
  };

  const handleRemoveSize = (variantIndex, sizeIndex) => {
    const updatedVariants = [...variantFields];
    updatedVariants[variantIndex].sizes = updatedVariants[
      variantIndex
    ].sizes.filter((_, index) => index !== sizeIndex);
    setValue("variants", updatedVariants);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-left">Create New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">Product Name</label>
          <input
            {...register("name")}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            {...register("description")}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Price</label>
          <input
            type="number"
            {...register("price")}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Category ID</label>
          <input
            type="number"
            {...register("category_id")}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-left">Variants</h2>
          {variantFields.map((variant, variantIndex) => (
            <div
              key={variant.id}
              className="mb-6 border border-gray-300 p-4 rounded-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Variant {variantIndex + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeVariant(variantIndex)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Variant Name
                </label>
                <input
                  {...register(`variants[${variantIndex}].name`)}
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Sizes</h4>
                {variant.sizes &&
                  variant.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className="mb-4 border p-4 rounded-md">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-md font-semibold">
                          Size {sizeIndex + 1}
                        </h5>
                        {variant.sizes.length > 1 && <button
                          type="button"
                          onClick={() => handleRemoveSize(variantIndex, sizeIndex)}
                          className="text-red-500"
                        >
                          Remove
                        </button>}
                      </div>
                      <div className="mb-2">
                        <label className="block text-md font-medium mb-2">
                          Size Name
                        </label>
                        <input
                          {...register(
                            `variants[${variantIndex}].sizes[${sizeIndex}].name`
                          )}
                          className="border border-gray-300 p-2 w-full rounded-md"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-md font-medium mb-2">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          {...register(
                            `variants[${variantIndex}].sizes[${sizeIndex}].stock_quantity`
                          )}
                          className="border border-gray-300 p-2 w-full rounded-md"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-md font-medium mb-2">
                          Price
                        </label>
                        <input
                          type="number"
                          {...register(
                            `variants[${variantIndex}].sizes[${sizeIndex}].price`
                          )}
                          className="border border-gray-300 p-2 w-full rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => handleAddSize(variantIndex)}
                  className="text-blue-500"
                >
                  Add Size
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Images</label>
                <input
                  type="file"
                  {...register(`variants[${variantIndex}].images`)}
                  multiple
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendVariant({ sizes: [{}], images: [] })}
            className="text-blue-500"
          >
            Add Variant
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
