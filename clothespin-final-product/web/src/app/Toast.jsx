import Icon from "../components/Icon";
import { useApp } from "../state/AppState";

export default function Toast() {
  const { toast, dismissToast } = useApp();
  if (!toast) return null;
  return (
    <div className="toast" role="status" aria-live="polite" key={toast.id}>
      <span className="toast-icon">
        <Icon name={toast.icon} size={17} />
      </span>
      <span>{toast.message}</span>
      <button type="button" className="toast-close" onClick={dismissToast} aria-label="Dismiss">
        <Icon name="x" size={14} />
      </button>
    </div>
  );
}
