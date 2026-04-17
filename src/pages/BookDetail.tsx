import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router"
import { fetchBookDetails } from "../service/api";
import { motion } from "framer-motion";
import type { BookDetailsType } from "../types/database";

export default function BookDetail() {

    const { id } = useParams();

    const navigate = useNavigate();

    const {data, isLoading, isError } = useQuery<BookDetailsType>({
        queryKey: ["books", id],
        queryFn: () => fetchBookDetails(id!),
        enabled: !!id
    })

    if (isLoading) return <p>Books loading...</p>;

    if (isError) return <p>Error fetching books.</p>;

  return (
   <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-6"
   >

    <button 
        onClick={() => navigate(-1)}
        className="mb-6 text-lg text-amber-600 cursor-pointer"
    >
        ← BACK TO SEARCH
    </button>
    
    <div>
        <h2>{data.title}</h2>
        <p>
        {typeof data?.description === "string"
          ? data.description
          : data?.description?.value}
      </p>
      <p>{data.subjects}</p>
        
    </div>



   </motion.div>
  )
}

