import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Mylibrary.css";

const Mylibrary = () => {

  const [mySnippets, setMySnippets] = useState([]);
  const [savedSnippets, setSavedSnippets] = useState([]);

  // EDIT STATES
  console.log(savedSnippets);
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    language: "",
    code: "",
  });

  const token = localStorage.getItem("token");

  // FETCH MY SNIPPETS
  const fetchMySnippets = async () => {
    try {

      const res = await api.get("/snippets/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMySnippets(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // FETCH SAVED SNIPPETS
  const fetchSaved = async () => {
    try {

      const res = await api.get("/snippets/saved", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSavedSnippets(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMySnippets();
    fetchSaved();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {

      await api.delete(`/snippets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMySnippets(
        mySnippets.filter((s) => s._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  // CLICK EDIT
  const handleEditClick = (snip) => {

    setEditingId(snip._id);

    setEditData({
      title: snip.title,
      language: snip.language,
      code: snip.code,
    });
  };

  // UPDATE
  const handleUpdate = async () => {
    try {

      const res = await api.put(
        `/snippets/${editingId}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // UPDATE UI
      setMySnippets((prev) =>
        prev.map((s) =>
          s._id === editingId ? res.data : s
        )
      );

      // CLOSE EDIT MODE
      setEditingId(null);

    } catch (err) {
      console.log(err);
    }
  };
  // REMOVE SAVED
const handleRemoveSaved = async (id) => {
  try {

    await api.delete(
      `/snippets/unsave/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // UPDATE UI
    setSavedSnippets((prev) =>
      prev.filter((s) => s._id !== id)
    );

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="library-container">

      {/* MY SNIPPETS */}
      <h2>My Snippets</h2>

      <div className="grid">

        {mySnippets.map((snip) => (
          <div className="card" key={snip._id}>

            {editingId === snip._id ? (

              <>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      title: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={editData.language}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      language: e.target.value,
                    })
                  }
                />

                <textarea
                  value={editData.code}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      code: e.target.value,
                    })
                  }
                />

                <button onClick={handleUpdate}>
                  Save
                </button>
              </>

            ) : (

              <>
                <h3>{snip.title}</h3>

                <p>{snip.language}</p>

                <pre>{snip.code}</pre>

                <div className="btns">

                  <button
                    onClick={() => handleEditClick(snip)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(snip._id)}
                    className="delete"
                  >
                    Delete
                  </button>

                </div>
              </>

            )}

          </div>
        ))}

      </div>

{/* SAVED SNIPPETS */}
<h2>Saved Snippets</h2>

<div className="grid">

  {savedSnippets.map((snip) => (
    <div className="card" key={snip._id}>

      <h3>{snip.title}</h3>

      <p>{snip.language}</p>

      <pre>{snip.code}</pre>

      {/* META */}
      <div className="meta">

        <span>
          👤 {snip.createdBy?.username}
        </span>

        <span>
          📅{" "}
          {new Date(
            snip.createdAt
          ).toLocaleDateString()}
        </span>

      </div>

      {/* REMOVE BUTTON */}
      <button
        className="delete"
        onClick={() =>
          handleRemoveSaved(snip._id)
        }
      >
        Remove Saved
      </button>

    </div>
  ))}

</div>

    </div>
  );
};

export default Mylibrary;