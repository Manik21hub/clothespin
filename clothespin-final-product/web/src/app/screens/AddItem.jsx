import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { CATEGORIES, CATEGORY_META } from "../../data/items";
import { compressImage } from "../../lib/image";
import { useApp } from "../../state/AppState";
import Sheet from "../components/Sheet";

export default function AddItem() {
  const { addItem } = useApp();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("tops");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [notes, setNotes] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setBusy(true);
    try {
      setImage(await compressImage(file));
    } catch {
      setImage(null);
    } finally {
      setBusy(false);
    }
  };

  const valid = Boolean(image && name.trim());

  const save = () => {
    if (!valid) return;
    const item = addItem({
      name: name.trim(),
      category,
      brand: brand.trim() || null,
      color: color.trim() || "Unknown",
      size: size.trim() || "Unknown",
      notes: notes.trim() || null,
      customImage: image,
    });
    setAdded(item);
    setImage(null);
    setName("");
    setBrand("");
    setColor("");
    setSize("");
    setNotes("");
    setCategory("tops");
    setDetailsOpen(false);
  };

  return (
    <div className="screen">
      <header className="page-head">
        <div className="page-head-row">
          <div className="page-head-copy">
            <span className="page-eyebrow">grow the rotation</span>
            <h1>add item</h1>
          </div>
        </div>
      </header>

      <section className="add-section">
        <h2>photo</h2>
        {image ? (
          <div className="add-preview">
            <img src={image} alt="Selected clothing item" />
            <button
              type="button"
              className="add-preview-remove"
              onClick={() => setImage(null)}
              aria-label="Remove photo"
            >
              <Icon name="x" size={16} />
            </button>
          </div>
        ) : (
          <>
            <div
              className={`dropzone ${dragging ? "dropzone-active" : ""}`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                handleFile(event.dataTransfer.files?.[0]);
              }}
            >
              <Icon name="camera" size={40} />
              <strong>{busy ? "processing photo..." : "add a photo"}</strong>
              <p>drag one here, or use the buttons below</p>
            </div>
            <div className="add-photo-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => inputRef.current?.click()}
              >
                <Icon name="camera" size={17} />
                camera
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => inputRef.current?.click()}
              >
                <Icon name="image" size={17} />
                gallery
              </button>
            </div>
            <p className="add-hint">your photo stays in your browser — nothing is uploaded</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </section>

      <section className="add-section">
        <h2>name</h2>
        <input
          className="text-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="enter item name"
          maxLength={60}
        />
        <h2 className="add-subhead">category</h2>
        <div className="chip-scroll">
          {CATEGORIES.map((value) => (
            <button
              key={value}
              type="button"
              className={`chip ${category === value ? "chip-active" : ""}`}
              onClick={() => setCategory(value)}
            >
              <Icon name={CATEGORY_META[value].icon} size={15} />
              {value}
            </button>
          ))}
        </div>
      </section>

      <section className="add-section add-details">
        <button
          type="button"
          className="add-details-toggle"
          onClick={() => setDetailsOpen((value) => !value)}
          aria-expanded={detailsOpen}
        >
          <span>more details (optional)</span>
          <Icon name={detailsOpen ? "chevronDown" : "chevronRight"} size={16} />
        </button>
        {detailsOpen && (
          <div className="add-details-fields">
            <div className="field-grid">
              <label>
                <span>brand</span>
                <input
                  className="text-input"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  placeholder="e.g. everlane"
                />
              </label>
              <label>
                <span>color</span>
                <input
                  className="text-input"
                  value={color}
                  onChange={(event) => setColor(event.target.value)}
                  placeholder="e.g. sage"
                />
              </label>
              <label>
                <span>size</span>
                <input
                  className="text-input"
                  value={size}
                  onChange={(event) => setSize(event.target.value)}
                  placeholder="e.g. M"
                />
              </label>
            </div>
            <label>
              <span>notes</span>
              <textarea
                className="text-input"
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="how does it fit? where did you get it?"
              />
            </label>
          </div>
        )}
      </section>

      <button type="button" className="btn btn-primary btn-block add-submit" disabled={!valid} onClick={save}>
        <Icon name="plusCircle" size={18} />
        add item
      </button>

      <p className="add-hint add-hint-center">
        no photo or name yet? both are needed before it can be pinned.
      </p>

      <Sheet
        open={Boolean(added)}
        onClose={() => setAdded(null)}
        title="item added successfully!"
      >
        <div className="add-success">
          <span className="add-success-icon">
            <Icon name="checkCircle" size={40} />
          </span>
          <p>
            your {added?.category} has been added to your closet.
          </p>
          <div className="add-success-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setAdded(null);
                navigate("/app/closet");
              }}
            >
              view in closet
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setAdded(null)}>
              add another
            </button>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
