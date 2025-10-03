import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
  
} from "../../stores/slices/categoriesSlice";
import "./Categories.css";
import PaginationAntd from "../../components/common/Pagination";
import Footer from "../../components/common/Footer";
import type { Category } from "../../types/category";


const CategoriesPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { categories = [], loading = false } = useSelector(
    (state: any) => state.categories || {}
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const openModal = (cat?: Category) => {
    if (cat) {
      setEditCategory(cat);
      setNameInput(cat.name);
      setDescriptionInput(cat.topic);
    } else {
      setEditCategory(null);
      setNameInput("");
      setDescriptionInput("");
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveCategory = () => {
    if (!nameInput || !descriptionInput) return;
    if (editCategory) {
      dispatch(
        updateCategory({ ...editCategory, name: nameInput, topic: descriptionInput })
      );
    } else {
      dispatch(addCategory({ name: nameInput, topic: descriptionInput }));
    }
    closeModal();
  };

  const removeCategory = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id));
      }
    });
  };

  // Filter + pagination
  const filtered = categories.filter((cat: Category) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Main */}
      <main className="flex-fill container mt-5 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold fs-1">Vocabulary Categories</h2>
          <button className="btn btn-fresh-green" onClick={() => openModal()}   style={{
    backgroundColor: "#22C55E"}}>
            Add New Category
          </button>
        </div>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset page khi search
          }}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((cat: Category) => (
                <tr key={cat.id}>
                  <td>{cat.name}</td>
                  <td>{cat.topic}</td>
                  <td>
                    <span
                      className="text-primary me-3 action-text"
                      onClick={() => openModal(cat)}
                    >
                      Edit
                    </span>
                    <span
                      className="text-danger action-text"
                      onClick={() => removeCategory(cat.id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
              {displayed.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <PaginationAntd
          currentPage={currentPage}
          totalItems={filtered.length}
          pageSize={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-auto">
        &#169; 2024 VocabApp. All rights reserved.
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="custom-modal-backdrop" onClick={closeModal}>
          <div
            className="custom-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="custom-modal-header">
              <h5>{editCategory ? "Edit Category" : "Add Category"}</h5>
              <button className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="custom-modal-body">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <label>Description</label>
              <textarea
                className="form-control"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
            </div>
            <div className="custom-modal-footer">
              <button className="btn btn-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={saveCategory}>
                {editCategory ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default CategoriesPage;
