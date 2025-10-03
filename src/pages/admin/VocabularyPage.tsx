import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  addVocab,
  deleteVocab,
  fetchVocabs,
  updateVocab,
 
} from "../../stores/slices/vocabSLice";
import PaginationAntd from "../../components/common/Pagination";
import Footer from "../../components/common/Footer";
import type { Vocab } from "../../types/vocab";

const VocabularyPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { vocabs = [], loading = false } = useSelector(
    (state: any) => state.vocabs || {}
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editVocab, setEditVocab] = useState<Vocab | null>(null);
  const [wordInput, setWordInput] = useState("");
  const [meaningInput, setMeaningInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchVocabs());
  }, [dispatch]);

  const openModal = (vocab?: Vocab) => {
    if (vocab) {
      setEditVocab(vocab);
      setWordInput(vocab.word);
      setMeaningInput(vocab.meaning);
      setCategoryInput(vocab.topic);
    } else {
      setEditVocab(null);
      setWordInput("");
      setMeaningInput("");
      setCategoryInput("");
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveVocab = () => {
    if (!wordInput || !meaningInput || !categoryInput) return;
    if (editVocab) {
      dispatch(
        updateVocab({
          ...editVocab,
          word: wordInput,
          meaning: meaningInput,
          topic: categoryInput,
        })
      );
    } else {
      dispatch(
        addVocab({ word: wordInput, meaning: meaningInput, topic: categoryInput })
      );
    }
    closeModal();
  };

  const removeVocab = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the vocabulary!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteVocab(id));
      }
    });
  };

  // Lọc theo search + category
  const filtered = vocabs.filter((v: Vocab) => {
    const matchWord = v.word.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "All Categories" || v.topic === selectedCategory;
    return matchWord && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Lấy danh sách category duy nhất
  const categories = Array.from(new Set(vocabs.map((v: Vocab) => v.topic)));

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-fill container mt-5 pt-5">
        {/* Header + Filter + Search + Add Button */}
       <div className="d-flex justify-content-between align-items-center mb-2">
    <h2 className="fw-bold fs-1 mb-0">Vocabulary Words</h2>
    <button
  style={{
    backgroundColor: "#22C55E",
    color: "white",
    padding: "10px 20px", // tăng diện tích nút
    fontSize: "1rem",     // chữ to vừa phải
    border: "none",
    borderRadius: "8px",  // bo tròn nhẹ
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)", // bóng nhỏ
    cursor: "pointer",
  }}
  onClick={() => openModal()}
>
  Add New Vocabulary
</button>

  </div>

          <div className="mb-2" style={{ maxWidth: "100%" }}>
            
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
                
              }}
               style={{ backgroundColor: "#EFEFEF" }}
            >

              <option  >All Categories</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="mb-2" style={{ maxWidth: "100%" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search vocabulary..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

        

        {/* Vocabulary Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Word</th>
                <th>Meaning</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((v: Vocab) => (
                <tr key={v.id}>
                  <td>{v.word}</td>
                  <td>{v.meaning}</td>
                  <td>{v.topic}</td>
                  <td>
                    <span
                      className="text-primary me-3 action-text"
                      onClick={() => openModal(v)}
                    >
                      Edit
                    </span>
                    <span
                      className="text-danger action-text"
                      onClick={() => removeVocab(v.id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
              {displayed.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center">
                    No vocabulary found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="d-flex justify-content-end mt-3">
          <PaginationAntd
            currentPage={currentPage}
            totalItems={filtered.length}
            pageSize={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </main>

    

      {/* Modal */}
      {modalOpen && (
        <div
          className="custom-modal-backdrop"
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          <div
            className="custom-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <div className="custom-modal-header d-flex justify-content-between align-items-center mb-3">
              <h5>{editVocab ? "Edit Vocabulary" : "Add Vocabulary"}</h5>
              <button className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="custom-modal-body mb-3">
              <label>Word</label>
              <input
                type="text"
                className="form-control mb-2"
                value={wordInput}
                onChange={(e) => setWordInput(e.target.value)}
              />
              <label>Meaning</label>
              <input
                type="text"
                className="form-control mb-2"
                value={meaningInput}
                onChange={(e) => setMeaningInput(e.target.value)}
              />
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
              />
            </div>
            <div className="custom-modal-footer d-flex justify-content-end gap-2">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveVocab}>
                {editVocab ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
       <Footer></Footer>
    </div>
  );
};

export default VocabularyPage;
