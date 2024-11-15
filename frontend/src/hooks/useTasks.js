// hooks/useProducts.js
import { useState, useEffect, useCallback } from "react";
import { getFilteredProducts } from "../http/product";

const useTasks = (initialFilters, initialSkip = 0, initialLimit = 6) => {
  const [filters, setFilters] = useState(initialFilters);
  const [skip, setSkip] = useState(initialSkip);
  const [limit, setLimit] = useState(initialLimit);
  const [filteredResults, setFilteredResults] = useState([]);
  const [error, setError] = useState("");
  const [size, setSize] = useState(0);

  const loadFilteredResults = useCallback(() => {
    getFilteredProducts(skip, limit, filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  }, [filters, limit, skip]);

  const loadMore = useCallback(() => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(0);
      }
    });
  }, [filteredResults, filters, limit, skip]);

  useEffect(() => {
    loadFilteredResults();
  }, [loadFilteredResults]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button className="btn btn-warning mb-5" onClick={loadMore}>
          Load More
        </button>
      )
    );
  };

  const updatePagination = (newSkip, newLimit) => {
    setSkip(newSkip);
    setLimit(newLimit);
  };

  return {
    filteredResults,
    error,
    updateFilters,
    updatePagination,
    loadMoreButton,
  };
};

export default useTasks;
