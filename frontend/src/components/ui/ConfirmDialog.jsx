/* src/components/ui/ConfirmDialog.jsx */
import React from 'react';
import Modal from './Modal';
import { AlertTriangle, Trash2 } from 'lucide-react';

const ConfirmDialog = ({
  onClose,
  onConfirm,
  title = 'Are you absolute sure?',
  description = 'This change is permanent and cannot be undone.',
  confirmText = 'Delete Item',
  cancelText = 'Cancel',
  isDanger = true
}) => {
  const footer = (
    <>
      <button className="btn btn-secondary btn-sm" onClick={onClose}>
        {cancelText}
      </button>
      <button
        className={`btn btn-sm ${isDanger ? 'btn-danger' : 'btn-primary'}`}
        onClick={() => {
          onConfirm();
          onClose();
        }}
      >
        {confirmText}
      </button>
    </>
  );

  return (
    <Modal onClose={onClose} title="Confirmation Required" footer={footer}>
      <div className="confirm-dialog-content">
        <div className={`confirm-icon-wrapper ${!isDanger ? 'badge-status-in_progress' : ''}`} style={{
          backgroundColor: isDanger ? 'var(--danger-light)' : 'var(--primary-light)',
          color: isDanger ? 'var(--danger)' : 'var(--primary)'
        }}>
          {isDanger ? <Trash2 size={22} /> : <AlertTriangle size={22} />}
        </div>
        <div className="confirm-text">
          <h4 className="confirm-title">{title}</h4>
          <p className="confirm-description">{description}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
