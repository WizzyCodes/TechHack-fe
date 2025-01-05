import { useEffect, useState } from "react";
import { viewProduct } from "../API/storeApi";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, addProductToStore } from "../global/storeSlice";
import Header from "../static/Header";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.products);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 10; // Items to display per page

  useEffect(() => {
    viewProduct().then((res) => {
      dispatch(addProductToStore(res));
    });
  }, []);

  // Calculate the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  return (
    <div className="flex flex-col">
      <Header />

      <div className="mx-10">
        <p>Product</p>

        <div className="w-full gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedData?.map((el: any) => (
            <div key={el?.id} className="m-2">
              <img
                src={el?.productImage}
                className="w-full h-[340px] rounded-t-md object-cover"
              />
              <p className="font-semibold mt-2">{el?.productName}</p>
              <div className="mt-3 w-full flex justify-between items-center">
                <p>₦{el?.productPrice}</p>
                <button
                  className="bg-neutral-950 hover:bg-neutral-900 transition-all duration-300 text-white py-2 px-4 text-[12px] rounded-md"
                  onClick={() => {
                    dispatch(addProductToCart(el));
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-5 flex justify-center items-center gap-4">
          <button
            className="bg-neutral-200 hover:bg-neutral-300 px-4 py-2 rounded-md"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-neutral-200 hover:bg-neutral-300 px-4 py-2 rounded-md"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
