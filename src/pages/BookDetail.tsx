import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { fetchBookDetails } from "../service/api";
import { motion } from "framer-motion";
import type { BookDetailsType } from "../types/database";
import { NavLink } from "react-router";
import Loader from "../components/Loader";



export default function BookDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<BookDetailsType>({
    queryKey: ["books", id],
    queryFn: () => fetchBookDetails(id!),
    enabled: !!id,
  });

  if (isLoading) return <Loader />

  if (isError) return <p>Error fetching books.</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=""
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
      <footer className="flex justify-between m-3">
        <h2 className="text-slate-800 font-bold text-2xl">The Editorial Scholar</h2>
        <p>&copy; {new Date().getFullYear()} The Editorial Scholar. A Digital Curator Experience.</p>
        <div className="flex gap-4">
          <NavLink to="#">Privacy Policy</NavLink>
          <NavLink to="#">Terms of Service</NavLink>
          <NavLink to="#">Archive Access</NavLink>
        </div>
      </footer>
    </motion.div>
  );
}
